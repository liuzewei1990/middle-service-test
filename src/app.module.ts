import { Module } from '@nestjs/common';
import { BankModule } from 'modules/bank/bank.module';
import { MongooseForRootModule } from 'modules/moogodb/mogoose.module';
import { CategorysModule } from 'modules/categorys/categorys.module';
import { CountersGlobalModule } from 'modules-global/counters/counters.module';

@Module({
  imports: [MongooseForRootModule, BankModule, CategorysModule, CountersGlobalModule],
  controllers: [],
  providers: []
})
export class AppModule { }
