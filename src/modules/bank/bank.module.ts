import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankService } from "./bank.service";
import { BankController } from "./bank.controller";
import { Banks } from "./bank.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Banks])],
    providers: [BankService],
    controllers: [BankController]
})
export class BankModule {

}