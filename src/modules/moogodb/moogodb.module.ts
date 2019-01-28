import { TypeOrmModule } from "@nestjs/typeorm";
// import { Banks } from "../bank/bank.entity";

const MoogodbTypeOrmModule = TypeOrmModule.forRoot({
        type: 'mongodb',
        host: '',
        port: 0,
        username: '',
        password: '',
        database: 'store',
        entities: [],
        //typeorm 每次启动都会根据 Entity 自动创建或者修改表的属性结构
        synchronize: true,
});

export { MoogodbTypeOrmModule }