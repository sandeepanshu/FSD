import { Document, Types } from 'mongoose';

export interface IAddress {
  flat: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  mobile: string;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  avatar: string;
  isAdmin: boolean;
  address: IAddress;
  createdAt?: Date;
  updatedAt?: Date;
}