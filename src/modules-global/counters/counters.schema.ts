import { Schema } from "mongoose";


export const CounterSchema = new Schema(
    {
        sequenceKey: { type: String, default: "counter" },
        sequenceValue: { type: Number, default: 10000 }
    },
    {
        versionKey: false,
        collection: "counter"
    }
)
