// src/redux/profiles/profile.api.ts
import axios from "axios";
import type { ProfileView } from "../../modules/profiles/models/ProfileView";
import type { IEducation, IExperience } from "../../modules/developers/models/IDeveloper";

const BASE_URL = import.meta.env.VITE_EXPRESS_URL;

export const profileAPI = {
  getMyProfile: () =>
    axios.get<{ profile: ProfileView }>(`${BASE_URL}/api/profiles/me`),

  deleteExperience: (id: string) =>
    axios.delete<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles/experience/${id}`
    ),

  deleteEducation: (id: string) =>
    axios.delete<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles/education/${id}`
    ),

  createProfile: (data: ProfileView) =>
    axios.post<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles`,
      data
    ),

  updateProfile: (data: ProfileView) =>
    axios.put<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles`,
      data
    ),

  addEducation: (data: IEducation) =>
    axios.put<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles/education`,
      data
    ),

  addExperience: (data: IExperience) =>
    axios.put<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles/experience`,
      data
    ),
};
