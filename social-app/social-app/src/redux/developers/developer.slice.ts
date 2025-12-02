import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DeveloperState } from "./developer.types";
import type { IDeveloper } from "../../modules/developers/models/IDeveloper";

const initialState: DeveloperState = {
  loading: false,
  developers: [],
  selectedDeveloper: null,
  error: null,
};

const developerSlice = createSlice({
  name: "developers",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },

    fetchAllSuccess(state, action: PayloadAction<IDeveloper[]>) {
      state.loading = false;
      state.developers = action.payload;
      state.error = null;
    },

    fetchAllFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchDeveloperSuccess(state, action: PayloadAction<IDeveloper>) {
      state.loading = false;
      state.selectedDeveloper = action.payload;
      state.error = null;
    },

    fetchDeveloperFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.selectedDeveloper = null;
    },
  },
});

export const {
  setLoading,
  fetchAllSuccess,
  fetchAllFailure,
  fetchDeveloperSuccess,
  fetchDeveloperFailure,
} = developerSlice.actions;

export default developerSlice.reducer;
