import { createSlice } from "@reduxjs/toolkit";

export interface HobbyState {
  eating: boolean;
  coding: boolean;
  sleeping: boolean;
}

const initialState: HobbyState = {
  eating: false,
  coding: false,
  sleeping: false,
};

const hobbySlice = createSlice({
  name: "hobby",
  initialState,
  reducers: {
    checkEating: (state) => {
      state.eating = !state.eating;
    },
    checkCoding: (state) => {
      state.coding = !state.coding;
    },
    checkSleeping: (state) => {
      state.sleeping = !state.sleeping;
    },
  },
});

export const { checkEating, checkCoding, checkSleeping } = hobbySlice.actions;
export default hobbySlice.reducer;
