import { Schema } from "mongoose";


export const ProductSchema = new Schema(
    {
        productName: { type: String },
        fee: { type: Number }
    },
    {
        collection: "products"
    }
)