import { Controller, Get, All, Post, Body, Delete, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";


@Controller("categorys")
export class CategorysController {
    constructor(private readonly CategoryService: CategoryService) { }


    @Get()
    public async findAllCategorys() {
        return this.CategoryService.findAllCategorys();
    }

    @Post()
    public async addCategory(@Body() { categoryName }) {
        return this.CategoryService.addCategorys(categoryName);
    }

    @Post("del")
    public async removeCategorys(@Body() { categoryCode }){
        return this.CategoryService.deleteCategorys(categoryCode);
    }

}