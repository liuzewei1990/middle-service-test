import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "./category.schema";
import { CategoryService } from "./category.service";
import { CategorysController } from "./category.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: "CategoryModel", schema: CategorySchema }])],
    providers: [CategoryService],
    controllers: [CategorysController]
})
export class CategoryModule {

}