// import {} from "mongoose";

import { Schema } from "mongoose";

export const FundSchema = new Schema(
    {
        // 基金代码
        code: { type: String },
        // 股票代码
        zcCode: { type: String },
        // 股票名称
        zcName: { type: String },
        // 股票类型
        zcType: { type: String },

        enddate: { type: String },
        hold: { type: String },
        totalPrice: { type: String },
        ccRate: { type: String },
        price: { type: String },
        rate: { type: String },
        oldzcCode: { type: String }
    },
    {
        collection: "fund",
    }
);

export const JzSchema = new Schema(
    {
        code: String,
        name: String,
        addDate: String
    },
    {
        collection: "jz"
    }
);