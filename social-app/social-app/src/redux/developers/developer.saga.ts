// src/redux/developers/developer.saga.ts
import { takeLatest, put, call } from "redux-saga/effects";
import {
  FETCH_ALL_DEVELOPERS,
  FETCH_DEVELOPER,
  type FetchDeveloperPayload,
} from "./developer.types";

import {
  setLoading,
  fetchAllSuccess,
  fetchAllFailure,
  fetchDeveloperSuccess,
  fetchDeveloperFailure,
} from "./developer.slice";

import {
  developerAPI,
  type GetAllDevelopersResponse,
  type GetDeveloperResponse,
} from "./developer.api";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import type { SagaIterator } from "redux-saga";

// -----------------------------------
// FETCH ALL DEVELOPERS
// -----------------------------------
function* handleFetchAll(): SagaIterator {
  try {
    yield put(setLoading());

    const response: AxiosResponse<GetAllDevelopersResponse> = yield call(
      developerAPI.getAll
    );

    yield put(fetchAllSuccess(response.data.profiles));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch developers";
    yield put(fetchAllFailure(message));
  }
}

// -----------------------------------
// FETCH SINGLE DEVELOPER
// -----------------------------------
function* handleFetchDeveloper(
  action: PayloadAction<FetchDeveloperPayload>
): SagaIterator {
  try {
    yield put(setLoading());

    const response: AxiosResponse<GetDeveloperResponse> = yield call(
      developerAPI.getOne,
      action.payload.profileId
    );

    yield put(fetchDeveloperSuccess(response.data.profile));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch developer";
    yield put(fetchDeveloperFailure(message));
  }
}

// -----------------------------------
// ROOT SAGA
// -----------------------------------
export function* developerSaga(): SagaIterator {
  yield takeLatest(FETCH_ALL_DEVELOPERS, handleFetchAll);
  yield takeLatest(FETCH_DEVELOPER, handleFetchDeveloper);
}
