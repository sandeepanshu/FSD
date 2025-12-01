import mongoose, { Document, Types } from "mongoose";

export interface IExperience {
  _id?: Types.ObjectId;
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
}

export interface IEducation {
  _id?: Types.ObjectId;
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
}

export interface ISocial {
  youtube: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}

export interface IProfile extends Document {
  _id: Types.ObjectId; // <-- FIXED
  user: Types.ObjectId; // <-- FIXED
  company: string;
  website: string;
  location: string;
  designation: string;
  skills: string[];
  bio: string;
  githubUsername: string;
  experience: IExperience[];
  education: IEducation[];
  social: ISocial;
  createdAt?: Date;
  updatedAt?: Date;
}
