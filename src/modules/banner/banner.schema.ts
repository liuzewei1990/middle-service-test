import { Schema } from "mongoose";


export const BannerSchema = new Schema(
    {
        bannerImg: String,
        bannerLink: String,
        lastTime: { type: Date, default: Date.now }
    },
    {
        collection: "banner",
        versionKey: false,
        timestamps: { updatedAt: "lastTime" }
    }
)