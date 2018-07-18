import { Module } from "@nestjs/common";
import { BannerController } from "./banner.controller";
import { BannerService } from "./banner.service";
import { MongooseModule } from "@nestjs/mongoose";
import { BannerSchema } from "./banner.schema";



@Module({
    imports: [MongooseModule.forFeature([{ name: "BannerModel", schema: BannerSchema }])],
    providers: [BannerService],
    controllers: [BannerController]
})
export class BannerModule { }