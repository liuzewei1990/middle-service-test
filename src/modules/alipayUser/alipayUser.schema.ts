import { Schema } from "mongoose";

export const AlipayUserSchema = new Schema(
        {
                alipayUser: { type: Boolean, default: false },
                userId: { type: String },
                prizeName: { type: String },
                prizeFee: { type: String },
                bindMobile: { type: String }
        },
        {
                collection: 'alipayUser'
        }
);