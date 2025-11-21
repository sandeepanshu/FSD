import { combineReducers } from "@reduxjs/toolkit";
import messageReducer from "./wish-message/wish-message.slice";
import productReducer from "./product-item/product-item.slice";
import cartReducer from "./shopping-cart/shopping-cart.slice";

export const rootReducer = combineReducers({
  msg: messageReducer,
  prod: productReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
