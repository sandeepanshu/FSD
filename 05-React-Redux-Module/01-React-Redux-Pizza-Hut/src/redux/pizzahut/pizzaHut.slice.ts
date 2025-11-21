// redux/pizzahut/pizzaHut.slice.ts
import { createSlice } from "@reduxjs/toolkit";

export interface PizzaState {
  count: number;
}

const initialState: PizzaState = {
  count: 55,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    buyPizza: (state) => {
      if (state.count > 0) state.count -= 1;
    },
  },
});

export const { buyPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
