import mongoose, { Schema } from "mongoose";
import type { IUser } from "./IUser.ts";

const userSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

const UserTable = mongoose.model<IUser>("user", userSchema);
export default UserTable;
