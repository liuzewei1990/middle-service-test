import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { ProductSchema } from "./product.schema";


@Module({
    imports: [MongooseModule.forFeature([{ name: "ProductModel", schema: ProductSchema }])],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductsModule { }