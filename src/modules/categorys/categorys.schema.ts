import { Schema, Mongoose, model } from "mongoose";

export const CategorysSchema = new Schema(
    {
        categorysCode: { type: Number },
        categorysName: { type: String }
    },
    {
        //不需要默认__v版本号字段
        versionKey: false,
        collection: "categorys"
    }
);
