import mongoose, { Schema } from "mongoose";
import type { IProduct } from "./IProduct.ts";

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    usage: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductTable = mongoose.model<IProduct>("product", productSchema);
export default ProductTable;
