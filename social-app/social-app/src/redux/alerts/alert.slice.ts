import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertState, IAlert } from "./alert.types";

const initialState: AlertState = {
  alerts: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertSuccess(state, action: PayloadAction<IAlert>) {
      state.alerts.push(action.payload);
    },
    removeAlertSuccess(state, action: PayloadAction<string>) {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { setAlertSuccess, removeAlertSuccess } = alertSlice.actions;
export default alertSlice.reducer;
