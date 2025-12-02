// src/redux/users/user.saga.ts
import { takeLatest, put, call } from "redux-saga/effects";
import {
  REGISTER_USER,
  LOGIN_USER,
  GET_USER_INFO,
  type RegisterPayload,
  type LoginPayload,
} from "./user.types";

import {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  getUserInfoSuccess,
  getUserInfoFailure,
  setLoading,
  logout,
} from "./user.slice";

import { userAPI } from "./user.api";
import { setAlert } from "../alerts/alert.actions";
import { AuthUtil } from "../../../src/authUtil/AuthUtil";
import type { ApiError } from "../../../src/types/ApiError";
import type { UserView } from "../../modules/users/models/UserView";
import type { PayloadAction } from "@reduxjs/toolkit";

// -------------------------------
// REGISTER USER
// -------------------------------
function* handleRegister(action: PayloadAction<RegisterPayload>) {
  try {
    yield put(setLoading());

    const response: { data: { msg: string } } = yield call(() =>
      userAPI.register(action.payload.user)
    );

    yield put(registerSuccess());
    yield put(setAlert(response.data.msg, "success"));

    action.payload.navigate("/users/login");
  } catch (error) {
    const err = error as ApiError;

    yield put(
      registerFailure(err.response?.data?.message ?? "Register failed")
    );

    const errors = err.response?.data?.errors ?? [];
    for (const e of errors) {
      yield put(setAlert(e.msg, "danger"));
    }
  }
}

// LOGIN USER
function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    yield put(setLoading());

    const response: { data: { token: string } } = yield call(() =>
      userAPI.login(action.payload.user)
    );

    sessionStorage.setItem("token", response.data.token);
    AuthUtil.setTokenHeader(response.data.token);

    yield put(loginSuccess(response.data.token));
    yield put(setAlert("Login Successful", "success"));

    yield put({ type: GET_USER_INFO });

    action.payload.navigate("/profiles/dashboard");
  } catch (error) {
    const err = error as ApiError;

    yield put(loginFailure(err.response?.data?.message ?? "Login failed"));

    const errors = err.response?.data?.errors ?? [];
    for (const e of errors) {
      yield put(setAlert(e.msg, "danger"));
    }
  }
}

// GET USER INFO
function* handleGetUserInfo() {
  try {
    yield put(setLoading());

    const token = sessionStorage.getItem("token");
    AuthUtil.setTokenHeader(token);

    const response: { data: { user: UserView } } = yield call(() =>
      userAPI.getUserInfo()
    );

    yield put(getUserInfoSuccess(response.data.user));
  } catch {
    yield put(getUserInfoFailure("Failed to fetch user info"));
    yield put(logout());
  }
}

// -------------------------------
// ROOT USER SAGA
// -------------------------------
export function* userSaga() {
  yield takeLatest(REGISTER_USER, handleRegister);
  yield takeLatest(LOGIN_USER, handleLogin);
  yield takeLatest(GET_USER_INFO, handleGetUserInfo);
}
