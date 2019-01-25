
import { Injectable, Inject } from '@nestjs/common';
import { SuccessResponseJson, FailResponseJson } from "../../config/responseStatusJson.config";
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from "mongoose";

@Injectable()
export class AlipayUserService {
        constructor(@InjectModel("alipayUser") private readonly AlipayUserModel: Model<Document>) { }

        public async alipayUserFind(query) {
                try {
                        let result = await this.AlipayUserModel.find({ ...query });
                        return new SuccessResponseJson("查询成功", result);
                } catch (err) {
                        return new FailResponseJson(err.message);
                }
        }

        public async alipayUserAdd(user) {
                try {
                        if (typeof user["alipayUser"] !== "boolean") return new FailResponseJson("alipayUser类型错误");
                        if (!user["bindMobile"]) return new FailResponseJson("bindMobile该字段必传");
                        let AlipayUserModel = await new this.AlipayUserModel(user);
                        AlipayUserModel.save();
                        return new SuccessResponseJson("添加成功", AlipayUserModel);
                } catch (error) {
                        return new FailResponseJson(error.message);
                }
        }
}