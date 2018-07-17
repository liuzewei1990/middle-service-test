import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsSchema } from "./products.schema";


@Module({
    imports: [MongooseModule.forFeature([{ name: "ProductsModel", schema: ProductsSchema }])],
    providers: [ProductsService],
    controllers: [ProductsController]
})
export class ProductsModule { }