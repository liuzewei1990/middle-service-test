import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BankController } from "./bank.controller";
import { BankService } from "./bank.service";
import { BankSchema } from "./bank.schema";

const MongooseModuleForFeature = MongooseModule.forFeature([
    { name: "bank111", schema: BankSchema }//可以注入多个Schema
]);

@Module({
    imports: [MongooseModuleForFeature],
    providers: [BankService],
    controllers: [BankController]
})
export class BankModule {

}