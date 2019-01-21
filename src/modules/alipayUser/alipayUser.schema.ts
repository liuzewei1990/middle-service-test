import { Schema } from "mongoose";

export const AlipayUserSchema = new Schema(
        {
                alipayUser: { type: Boolean, default: false },
                userId: { type: String,default:null },
                prizeName: { type: String,default:null },
                prizeFee: { type: String,default:null },
                bindMobile: { type: String,default:null }
        },
        {
                collection: 'alipayUser'
        }
);