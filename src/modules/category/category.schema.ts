import { Schema, Mongoose, model } from "mongoose";

export const CategorySchema = new Schema(
    {
        categoryCode: { type: Number },
        categoryName: { type: String }
    },
    {
        //不需要默认__v版本号字段
        versionKey: false,
        collection: "categorys"
    }
);
