import { createSlice } from "@reduxjs/toolkit";

export interface MessageState {
  message: string;
}

const initialState: MessageState = {
  message: "Click a button to get a message!"
};

const messageSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    sayGoodMorning: (state) => {
      state.message = "🌅 Good Morning!";
    },
    sayGoodAfternoon: (state) => {
      state.message = "🌞 Good Afternoon!";
    },
    sayGoodEvening: (state) => {
      state.message = "🌙 Good Evening!";
    }
  }
});

export const { 
  sayGoodMorning, 
  sayGoodAfternoon, 
  sayGoodEvening 
} = messageSlice.actions;

export default messageSlice.reducer;
