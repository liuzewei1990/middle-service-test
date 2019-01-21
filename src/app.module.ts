import { Module } from '@nestjs/common';
import { BankModule } from 'modules/bank/bank.module';
import { MongooseForRootModule } from 'modules/moogodb/mogoose.module';
import { CategoryModule } from 'modules/category/category.module';
import { CountersGlobalModule } from 'modules-global/counters/counters.module';
import { BannerModule } from 'modules/banner/banner.module';
import { AlipayUserModule } from 'modules/alipayUser/alipayUser.module';

@Module({
        imports: [MongooseForRootModule, BankModule, CategoryModule, CountersGlobalModule, BannerModule, AlipayUserModule],
        controllers: [],
        providers: []
})
export class AppModule { }
