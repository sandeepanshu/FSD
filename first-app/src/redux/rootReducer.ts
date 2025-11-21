// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { pizzaReducer } from "./pizzahut";

export const rootReducer = combineReducers({
  pizza: pizzaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
