import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AlipayUserController } from "./alipayUser.controller";
import { AlipayUserService } from "./alipayUser.service";
import { AlipayUserSchema } from "./alipayUser.schema";

const MongooseModuleForFeature = MongooseModule.forFeature([
        { name: "alipayUser", schema: AlipayUserSchema }//可以注入多个Schema
]);

@Module({
        imports: [MongooseModuleForFeature],
        providers: [AlipayUserService],
        controllers: [AlipayUserController]
})
export class AlipayUserModule {

}