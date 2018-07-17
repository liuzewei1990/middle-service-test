import { TypeOrmModule } from "@nestjs/typeorm";
// import { Banks } from "../bank/bank.entity";

const MoogodbTypeOrmModule = TypeOrmModule.forRoot({
    type: 'mongodb',
    host: '47.94.3.28',
    port: 8060,
    username: '',
    password: '',
    database: 'store',
    entities: [],
    synchronize: true,
});

export { MoogodbTypeOrmModule }