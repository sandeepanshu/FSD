// src/redux/profiles/profile.slice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileState } from "./profile.types";
import type { ProfileView } from "../../modules/profiles/models/ProfileView";

const initialState: ProfileState = {
  loading: false,
  profile: null,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },

    setProfile(state, action: PayloadAction<ProfileView>) {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    },

    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    clearProfile(state) {
      state.profile = null;
    },
  },
});

export const { setLoading, setProfile, setError, clearProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
