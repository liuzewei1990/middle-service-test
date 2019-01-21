
import { Injectable, Inject } from '@nestjs/common';
import { SuccessResponseJson, FailResponseJson } from "config/responseStatusJson.config";
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from "mongoose";

@Injectable()
export class AlipayUserService {
        constructor(@InjectModel("alipayUser") private readonly AlipayUserModel: Model<Document>) { }

        public async filtersBanks(keyword) {
                try {
                        let result = [];
                        //5个字起搜
                        if (keyword && keyword.length >= 5) {
                                const reg = new RegExp(keyword, 'gi');
                                result = await this.AlipayUserModel.find({ bankName: { $regex: reg } });
                        }
                        return new SuccessResponseJson("查询成功", result);
                } catch (err) {
                        return new FailResponseJson(err.message);
                }
        }

        public async alipayUserAdd(user) {
                try {
                        if (typeof user["alipayUser"] !== "boolean") return new FailResponseJson("类型不对！");
                        if (!user["userId"]) return new FailResponseJson("该字段必传");
                        if (!user["prizeName"]) return new FailResponseJson("该字段必传");
                        if (!user["prizeFee"]) return new FailResponseJson("该字段必传");
                        if (!user["bindMobile"]) return new FailResponseJson("该字段必传");
                        let AlipayUserModel = await new this.AlipayUserModel(user);
                        AlipayUserModel.save();
                        return new SuccessResponseJson("添加成功", AlipayUserModel);
                } catch (error) {
                        return new FailResponseJson(error.message);
                }
        }
}