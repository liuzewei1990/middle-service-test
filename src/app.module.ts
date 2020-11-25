import { Module } from '@nestjs/common';
import { BankModule } from './modules/bank/bank.module';
import { MongooseForRootModule } from './modules/moogodb/mogoose.module';
import { CategoryModule } from './modules/category/category.module';
import { CountersGlobalModule } from './modules-global/counters/counters.module';
import { BannerModule } from './modules/banner/banner.module';
import { AlipayUserModule } from './modules/alipayUser/alipayUser.module';
import { FundModule } from 'modules/fundManage/FundModule';

@Module({
    imports: [MongooseForRootModule, BankModule, CategoryModule, CountersGlobalModule, BannerModule, AlipayUserModule, FundModule],
    controllers: [],
    providers: []
})
export class AppModule { }
