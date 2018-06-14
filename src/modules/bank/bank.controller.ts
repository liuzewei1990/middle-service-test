import { Controller, Get, ForbiddenException, Body, Query } from "@nestjs/common";
import { SuccessResponseJson, FailResponseJson } from "../../config/responseStatusJson.config";
import { BankService } from "./bank.service";



@Controller("banks")
export class BankController {
    constructor(private readonly bankService: BankService) {

    }

    @Get()
    public filterBanks(@Query() { keyword }) {

        try {
            return this.bankService.filtersBanks(keyword);
        } catch (err) {
            return new ForbiddenException(err);
        }
    }
}