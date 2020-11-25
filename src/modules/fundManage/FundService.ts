import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FailResponseJson, SuccessResponseJson, SuccessResponse } from "../../config/responseStatusJson.config";
import { CounterGlobalService } from "../../modules-global/counters/counters.service";
import { Document, Model } from "mongoose";
import { FundInterface } from "./FundInterface";
import * as request from "request-promise"


@Injectable()
export class FundService {

    constructor(
        @InjectModel("JzModel")
        private readonly JzModel: Model<Document>,
        @InjectModel("FundModel")
        private readonly FundModel: Model<FundInterface>,
        private readonly CounterGlobalService: CounterGlobalService,
    ) { }

    // 添加基金
    public async addJz(jz = {}) {
        try {
            let JzModel = await new this.JzModel(jz);
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

}