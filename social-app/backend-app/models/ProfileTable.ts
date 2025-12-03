import mongoose, { Model, Schema } from "mongoose";
import type { IProfile } from "./IProfile.ts";

const profileSchema: Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    company: { type: String, required: true },
    website: { type: String, required: true },
    location: { type: String, required: true },
    designation: { type: String, required: true },
    skills: { type: [String], required: true },
    bio: { type: String, required: true },
    githubUsername: { type: String, required: true },
    experience: [
      {
        title: { type: String },
        company: { type: String },
        location: { type: String },
        from: { type: String },
        to: { type: String },
        current: { type: Boolean },
        description: { type: String },
      },
    ],
    education: [
      {
        school: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        from: { type: String },
        to: { type: String },
        current: { type: Boolean },
        description: { type: String },
      },
    ],
    social: {
      youtube: { type: String, default: "" },
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  { timestamps: true }
);
const ProfileTable = mongoose.model<IProfile>("profile", profileSchema);
export default ProfileTable;
