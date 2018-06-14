import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankModule } from './modules/bank/bank.module';
import { Banks } from './modules/bank/bank.entity';
import { Test } from './modules/bank/tset.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '118.190.113.193',
      port: 27108,
      username: 'base',
      password: 'yeepiao2017',
      database: 'base',
      entities: [Banks, Test],
      synchronize: true,
    }),
    BankModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
