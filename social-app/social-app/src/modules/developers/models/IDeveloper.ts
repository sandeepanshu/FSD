export interface IExperience {
  _id?: string;
  title: string;
  company: string;
  location: string;
  from: string;
  to?: string;
  current: boolean;
  description: string;
}

export interface IEducation {
  _id?: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: string;
  to?: string;
  current: boolean;
  description: string;
}

export interface ISocial {
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}

export interface IUserInfo {
  _id?: string;
  name: string;
  avatar: string;
}

export interface IDeveloper {
  _id?: string;

  user: IUserInfo;

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

  createdAt?: string;
  updatedAt?: string;
}
