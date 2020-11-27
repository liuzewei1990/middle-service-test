import { Controller, Get, All, Post, Body, Delete, Param, Query } from "@nestjs/common";
import { FundService } from "./FundService";


@Controller("fund")
export class FundController {
    constructor(private readonly FundService: FundService) { }


    // 查询基金
    @Get("/jz")
    public async findJz() {
        return this.FundService.findJz();
    }

    // 添加基金
    @Post("/jz/add")
    public async addJz(@Body() { code, name }) {
        return this.FundService.addJz(code, name);
    }

    // 删除基金
    @Post("/jz/remove")
    public async removeJz(@Body() { id }) {
        return this.FundService.removeJz(id);
    }

    @Get()
    public async findAllCategorys() {
        return this.FundService.findAllFund();
    }


    @Post("/remove")
    public async removeFund(@Body() { id }) {
        console.log(id);

        return this.FundService.removeFund(id);
    }

    @Post("/add")
    public async addFund(@Body() { code }) {
        return this.FundService.queryCodeAddFundAll(code);
    }

    @Get("/:id")
    public async requestFundList(@Param() { id }) {
        return this.FundService.fund(id);
    }


}