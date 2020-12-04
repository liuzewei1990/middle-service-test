import { Model } from "mongoose";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FundSchema, FundInfoSchema, JzSchema } from "./FundSchema";
import { FundService } from "./FundService";
import { FundController } from "./FundController";


@Module({
    imports: [MongooseModule.forFeature([{ name: "FundModel", schema: FundSchema }, { name: "FundInfoModel", schema: FundInfoSchema }, { name: "JzModel", schema: JzSchema }])],
    providers: [FundService],
    controllers: [FundController]
})
export class FundModule {

}