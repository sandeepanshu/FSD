import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "./user.types";
import type { UserView } from "../../modules/users/models/UserView";

const initialState: UserState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
  isRegistered: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },

    registerSuccess(state) {
      state.loading = false;
      state.isRegistered = true;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isRegistered = false;
    },

    loginSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload;
      sessionStorage.setItem("token", action.payload);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    getUserInfoSuccess(state, action: PayloadAction<UserView>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    getUserInfoFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },

    logout(state) {
      sessionStorage.removeItem("token");
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const {
  setLoading,
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  getUserInfoSuccess,
  getUserInfoFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
