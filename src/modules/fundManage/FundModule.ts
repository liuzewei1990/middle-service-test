import { Model } from "mongoose";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FundSchema, JzSchema } from "./FundSchema";
import { FundService } from "./FundService";
import { FundController } from "./FundController";


@Module({
    imports: [MongooseModule.forFeature([{ name: "FundModel", schema: FundSchema }, { name: "JzModel", schema: JzSchema }])],
    providers: [FundService],
    controllers: [FundController]
})
export class FundModule {

}