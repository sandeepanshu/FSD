// src/redux/profiles/profile.types.ts
import type { NavigateFunction } from "react-router-dom";
import type { ProfileView } from "../../modules/profiles/models/ProfileView";
import type { IEducation, IExperience } from "../../modules/developers/models/IDeveloper";

// ------------------------
// State
// ------------------------
export interface ProfileState {
  loading: boolean;
  profile: ProfileView | null;
  error: string | null;
}

// ------------------------
// Saga Trigger Action Types
// (same pattern as USER_...)
// ------------------------
export const FETCH_MY_PROFILE = "profile/FETCH_MY_PROFILE" as const;
export const DELETE_EXPERIENCE = "profile/DELETE_EXPERIENCE" as const;
export const DELETE_EDUCATION = "profile/DELETE_EDUCATION" as const;
export const CREATE_PROFILE = "profile/CREATE_PROFILE" as const;
export const UPDATE_PROFILE = "profile/UPDATE_PROFILE" as const;
export const ADD_EDUCATION = "profile/ADD_EDUCATION" as const;
export const ADD_EXPERIENCE = "profile/ADD_EXPERIENCE" as const;

// ------------------------
// Payloads
// ------------------------
export interface DeletePayload {
  id: string;
}

export interface SubmitProfilePayload {
  profile: ProfileView;
  navigate: NavigateFunction;
}

export interface AddEducationPayload {
  education: IEducation;
  navigate: NavigateFunction;
}

export interface AddExperiencePayload {
  experience: IExperience;
  navigate: NavigateFunction;
}
