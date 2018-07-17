import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorysSchema } from "./categorys.schema";
import { CategorysService } from "./categorys.service";
import { CategorysController } from "./categorys.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: "CategorysModel", schema: CategorysSchema }])],
    providers: [CategorysService],
    controllers: [CategorysController]
})
export class CategorysModule {

}