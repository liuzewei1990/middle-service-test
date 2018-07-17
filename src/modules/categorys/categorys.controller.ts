import { Controller, Get, All, Post, Body } from "@nestjs/common";
import { CategorysService } from "./categorys.service";


@Controller("categorys")
export class CategorysController {
    constructor(private readonly CategorysService: CategorysService) { }


    @Get()
    public async findAllCategorys() {
        return this.CategorysService.findAllCategorys();
    }

    @Post()
    public async addCategorys(@Body() { categorysName }) {
        return this.CategorysService.addCategorys(categorysName);
    }

}