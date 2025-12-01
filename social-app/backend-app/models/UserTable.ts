import mongoose, { Schema } from "mongoose";
import type { IUser } from "./IUser.ts";

const useSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const UserTable = mongoose.model<IUser>("user", useSchema);
export default UserTable;
