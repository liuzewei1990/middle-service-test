import { Schema } from "mongoose";


export const ProductsSchema = new Schema(
    {
        productName: { type: String },
        fee: { type: Number }
    },
    {
        collection: "products"
    }
)