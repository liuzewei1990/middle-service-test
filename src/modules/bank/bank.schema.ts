import { Schema } from "mongoose";

export const BankSchema = new Schema(
    {
        bankCode: { type: String },
        bankName: { type: String }
    },
    {
        collection: 'banks'
    }
);