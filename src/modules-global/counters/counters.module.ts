import { Module, Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CounterSchema } from "./counters.schema";
import { CounterGlobalService } from "./counters.service";

@Global()
@Module({
    imports: [MongooseModule.forFeature([{ name: "CounterModel", schema: CounterSchema }])],
    providers: [CounterGlobalService],
    exports: [CounterGlobalService]
})
export class CountersGlobalModule { }