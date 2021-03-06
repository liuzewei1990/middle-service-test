import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FailResponseJson, SuccessResponseJson, SuccessResponse } from "../../config/responseStatusJson.config";
import { CounterGlobalService } from "../../modules-global/counters/counters.service";
import { Document, Model } from "mongoose";
import { FundInterface } from "./FundInterface";
import * as request from "request-promise"
import * as cheerio from "cheerio";
import * as iconv from "iconv-lite"


@Injectable()
export class FundService {

    constructor(
        @InjectModel("JzModel")
        private readonly JzModel: Model<Document>,
        @InjectModel("FundInfoModel")
        private readonly FundInfoModel: Model<Document>,
        @InjectModel("FundModel")
        private readonly FundModel: Model<FundInterface>,

        private readonly CounterGlobalService: CounterGlobalService,
    ) { }

    // 添加基金
    public async addJz(code, name) {
        if (!(code && name)) return new FailResponseJson("基金代码或基金名称必填！");
        try {
            let res = await this.JzModel.find({ code });
            if (res.length !== 0) return new FailResponseJson("已经添加过该基金了");

            let list = await this.requestFundList(code);
            list = list.sort((a, b) => b.zcCode - a.zcCode);
            let JzModel = await new this.JzModel({ code, name, list });
            JzModel.save();
            return new SuccessResponseJson("添加成功");
        } catch (error) {
            return new FailResponseJson(error.message);
        }
    }

    // 查询基金
    public async findJz() {
        try {
            let jzList = await this.JzModel.find();
            let resData = {};
            resData["data"] = jzList
            resData["count"] = jzList.length;
            return new SuccessResponseJson("查询成功", resData);
        } catch (error) {
            return new FailResponseJson(error.message);
        }
    }

    // 删除基金
    public async removeJz(id) {
        try {
            let res = await this.JzModel.remove({ _id: id });
            return new SuccessResponseJson("删除成功");
        } catch (error) {
            return new FailResponseJson(error.message);
        }
    }

    // 单个插入股票
    public async addFund(fund) {
        try {
            let FundModel = await new this.FundModel(fund);
            FundModel.save();
            return new SuccessResponseJson("添加成功", FundModel);
        } catch (error) {
            return new FailResponseJson(error.messsage);
        }
    }

    /**
     * 批量插入股票
     * @param fundList 持仓列表
     */
    public async addFundforEach(fundList = []) {
        if (fundList.length === 0) return new FailResponseJson("没有要添加的数据");
        try {
            for (let index = 0; index < fundList.length; index++) {
                const fund = fundList[index];
                await this.addFund(fund);
            }
            return new SuccessResponseJson("批量添加成功");
        } catch (error) {
            return new FailResponseJson(error.message);
        }
    }

    public async removeFund(id: Number) {
        if (!id) return new FailResponseJson("id不能为空！");
        try {
            let res = await this.FundModel.remove({ _id: id });
            return new SuccessResponseJson(`成功删除${res.n}个股票`);
        } catch (err) {
            return new FailResponseJson(err.message);
        }
    }


    public async findAllFund() {
        try {
            let fundList = await this.FundModel.find().sort({ zcCode: 1 });
            let resData = {};
            resData["data"] = fundList
            resData["count"] = fundList.length;
            return new SuccessResponseJson("查询成功", resData);
        } catch (error) {
            return new FailResponseJson(error.message);
        }
    }


    public async queryCodeAddFundAll(code) {
        if (!code) return new FailResponseJson("基金代码不能为空！");
        try {
            let fundList = await this.requestFundList(code);
            return this.addFundforEach(fundList);
        } catch (error) {
            return new FailResponseJson(error.message);
        }
    }

    public async fund(code = "000000") {
        try {
            let resData = await this.requestFundList(code);
            return new SuccessResponseJson("查询成功", resData);
        } catch (error) {
            return new FailResponseJson(error.message);
        }
    }

    /**
     * 根据基金代码查询持仓数据
     * @param code 基金代码
     */
    private async requestFundList(code = "000000") {
        try {
            let options = {
                uri: "http://fund.10jqka.com.cn/web/fund/stockAndBond/" + code,
                json: true // Automatically parses the JSON string in the response
            };
            let res = await request(options);
            if (res.error.id == 0) {
                if (res.data.stock.length !== 0) return res.data.stock;
                throw new Error("未查到该基金");
            } else {
                throw new Error(res.error.msg);
            }
        } catch (error) {
            throw error;
        }

    }


    public async findFundInfoById(id) {
        try {
            let resData = {};
            resData = await this.FundInfoModel.findOne({ code: id });

            if (resData === null) {
                let result = await this.requestFundInfoID(id);
                resData = await this.saveFundInfo({ code: id, businessType: result["所属申万行业："] });
            }
            return new SuccessResponseJson("查询成功", resData);

        } catch (error) {
            return new FailResponseJson(error.message);
        }
    }

    private async saveFundInfo(fundInfo = {}) {
        let fundInfoModel = await new this.FundInfoModel(fundInfo);
        fundInfoModel.save();
        return fundInfoModel;
    }

    private async requestFundInfoID(id) {
        if (id.length !== 6) {
            throw new Error("股票代码格式错误")
        }

        let result = {};
        let url = `http://basic.10jqka.com.cn/${id}/company.html#stockpage`;
        let options = {
            url: url,
            encoding: null,
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache',
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",
            }
        }
        let html = await request(options);

        let $ = cheerio.load(iconv.decode(html, 'gb2312'), { decodeEntities: false });
        // let trs = $("#detail").find(".bd").find(".m_table").eq(0).find("tr").eq(1).find("td").eq(1).find("span").text()
        let trs = $("#detail").find(".bd").find(".m_table").eq(0).find("tr");
        // console.log(trs);

        for (let index = 0; index < trs.length; index++) {
            const element = trs[index];
            let tds = $(element).find("td");
            for (let i = 0; i < tds.length; i++) {
                const element = tds[i];
                let key = $(element).find("strong").text();
                let value = $(element).find("span").text();
                if (key && value) {
                    result[key] = value;
                }
            }
        }
        if (Object.keys(result).length === 0) {
            throw new Error(`未查到该${id}股票信息`);
        }

        return result;
    }

}