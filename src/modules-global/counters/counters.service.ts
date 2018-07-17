import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CounterGlobalService {
    constructor(@InjectModel("CounterModel") private readonly CounterModel) { }

    /**
     * 实现一个自增序列数字 没有则添加 默认从1开始
     * @param sequenceKey 序列的key
     */
    public async getNextSequenceValue(sequenceKey: string) {
        await this.CounterModel.update(
            { sequenceKey: sequenceKey },
            { $inc: { sequenceValue: 1 } },
            { upsert: true }
        );
        let sequenceDocument = await this.CounterModel.find({ sequenceKey });
        return sequenceDocument[0].sequenceValue;
    }
}