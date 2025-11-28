import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  price: number;
  brand: string;
  qty: number;
  image: string;
  category: string;
  description: string;
  usage: string;
  createdAt?: Date;
  updatedAt?: Date;
}
