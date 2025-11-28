import mongoose, { Schema } from "mongoose";
import type { IUser } from "./IUser.ts";

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    address: {
      flat: { type: String },
      street: { type: String },
      landmark: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pin: { type: String },
      mobile: { type: String },
    },
  },
  { timestamps: true }
);

const UserTable = mongoose.model<IUser>("user", userSchema);
export default UserTable;
