import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document } from "mongoose";
import { FailResponseJson, SuccessResponseJson } from "config/responseStatusJson.config";



@Injectable()
export class BannerService {
    constructor(@InjectModel("BannerModel") private readonly BannerModel: Model<Document>) { }

    public async findAllBaner() {
        try {
            let docList = await this.BannerModel.find({}, { _id: 0 });
            return new SuccessResponseJson("查询成功", docList);
        } catch (err) {
            return new FailResponseJson(err.message);
        }
    }

    public async addBanner() {

    }

    public async delBanner() { }
}