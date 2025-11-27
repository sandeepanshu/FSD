import { Document, Types } from "mongoose";

export interface IItem {
  _id?: string;
  name: string;
  brand: string;
  price: number;
  qty: number;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  mobile: string;
  tax: number;
  total: number;
  items: IItem[];
  createdAt?: Date;
  updatedAt?: Date;
}