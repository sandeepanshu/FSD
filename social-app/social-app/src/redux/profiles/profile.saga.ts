// src/redux/profiles/profile.saga.ts
import { takeLatest, put, call } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

import {
  FETCH_MY_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  ADD_EDUCATION,
  ADD_EXPERIENCE,
  type DeletePayload,
  type SubmitProfilePayload,
  type AddEducationPayload,
  type AddExperiencePayload,
} from "./profile.types";

import { setLoading, setProfile, setError } from "./profile.slice";
import { profileAPI } from "./profile.api";
import { setAlert } from "../alerts/alert.actions";
import type { ApiError } from "../../types/ApiError";
import type { ProfileView } from "../../modules/profiles/models/ProfileView";

// ----------------------------------
// GET MY PROFILE
// ----------------------------------
function* handleGetMyProfile() {
  try {
    yield put(setLoading());

    const response: AxiosResponse<{ profile: ProfileView }> = yield call(
      profileAPI.getMyProfile
    );

    yield put(setProfile(response.data.profile));
  } catch (error) {
    const err = error as ApiError;
    yield put(setError(err.response?.data?.message ?? "Failed to load profile"));
  }
}

// ----------------------------------
// DELETE EXPERIENCE
// ----------------------------------
function* handleDeleteExperience(action: PayloadAction<DeletePayload>) {
  try {
    yield put(setLoading());

    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.deleteExperience, action.payload.id);

    yield put(setProfile(response.data.profile));
    yield put(setAlert(response.data.msg, "success"));
  } catch {
    yield put(setError("Failed to delete experience"));
  }
}

// ----------------------------------
// DELETE EDUCATION
// ----------------------------------
function* handleDeleteEducation(action: PayloadAction<DeletePayload>) {
  try {
    yield put(setLoading());

    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.deleteEducation, action.payload.id);

    yield put(setProfile(response.data.profile));
    yield put(setAlert(response.data.msg, "success"));
  } catch {
    yield put(setError("Failed to delete education"));
  }
}

// ----------------------------------
// CREATE PROFILE
// ----------------------------------
function* handleCreateProfile(action: PayloadAction<SubmitProfilePayload>) {
  try {
    const { profile, navigate } = action.payload;
    yield put(setLoading());

    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.createProfile, profile);

    yield put(setProfile(response.data.profile));
    yield put(setAlert(response.data.msg, "success"));
    navigate("/profiles/dashboard");
  } catch {
    yield put(setError("Failed to create profile"));
  }
}

// ----------------------------------
// UPDATE PROFILE
// ----------------------------------
function* handleUpdateProfile(action: PayloadAction<SubmitProfilePayload>) {
  try {
    const { profile, navigate } = action.payload;
    yield put(setLoading());

    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.updateProfile, profile);

    yield put(setProfile(response.data.profile));
    yield put(setAlert(response.data.msg, "success"));
    navigate("/profiles/dashboard");
  } catch {
    yield put(setError("Failed to update profile"));
  }
}

// ----------------------------------
// ADD EDUCATION
// ----------------------------------
function* handleAddEducation(action: PayloadAction<AddEducationPayload>) {
  try {
    const { education, navigate } = action.payload;
    yield put(setLoading());

    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.addEducation, education);

    yield put(setProfile(response.data.profile));
    yield put(setAlert(response.data.msg, "success"));
    navigate("/profiles/dashboard");
  } catch {
    yield put(setError("Failed to add education"));
  }
}

// ----------------------------------
// ADD EXPERIENCE
// ----------------------------------
function* handleAddExperience(action: PayloadAction<AddExperiencePayload>) {
  try {
    const { experience, navigate } = action.payload;
    yield put(setLoading());

    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.addExperience, experience);

    yield put(setProfile(response.data.profile));
    yield put(setAlert(response.data.msg, "success"));
    navigate("/profiles/dashboard");
  } catch {
    yield put(setError("Failed to add experience"));
  }
}

// ----------------------------------
// EXPORT ROOT SAGA
// ----------------------------------
export function* profileSaga() {
  yield takeLatest(FETCH_MY_PROFILE, handleGetMyProfile);
  yield takeLatest(DELETE_EXPERIENCE, handleDeleteExperience);
  yield takeLatest(DELETE_EDUCATION, handleDeleteEducation);
  yield takeLatest(CREATE_PROFILE, handleCreateProfile);
  yield takeLatest(UPDATE_PROFILE, handleUpdateProfile);
  yield takeLatest(ADD_EDUCATION, handleAddEducation);
  yield takeLatest(ADD_EXPERIENCE, handleAddExperience);
}
