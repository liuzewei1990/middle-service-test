
import { Injectable, Inject } from '@nestjs/common';
import { SuccessResponseJson, FailResponseJson } from "../../config/responseStatusJson.config";
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BankService {
    constructor(@InjectModel("bank111") private readonly banksModle) {

    }

    public async filtersBanks(keyword) {
        try {
            let result = [];
            //5个字起搜
            if (keyword && keyword.length >= 5) {
                const reg = new RegExp(keyword, 'gi');
                result = await this.banksModle.find({ bankName: { $regex: reg } });
            }
            return new SuccessResponseJson("查询成功", result);
        } catch (err) {
            return new FailResponseJson(err.message);
        }
    }
}