
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banks } from "./bank.entity";
import { SuccessResponseJson, FailResponseJson } from "../../config/responseStatusJson.config";


@Injectable()
export class BankService {
    constructor(@InjectRepository(Banks) private readonly banksModle) {

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