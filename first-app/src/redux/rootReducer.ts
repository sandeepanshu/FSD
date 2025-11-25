import { combineReducers } from "@reduxjs/toolkit";
import messageReducer from "./wish-message/wish-message.slice";
import productReducer from "./product-item/product-item.slice";
import cartReducer from "./shopping-cart/shopping-cart.slice";
import registerReducer from "./register/register.slice";
import authReducer from "./auth-user/auth-user.slice";
import employeeReducer from "./employee/employee.slice";
import hobbyReducer from "./hobby-selector/hobby-selector.slice";
import userReducer from "./user/user.slice";

export const rootReducer = combineReducers({
  msg: messageReducer,
  prod: productReducer,
  cart: cartReducer,
  register: registerReducer,
  auth: authReducer,
  employee: employeeReducer,
  hobby: hobbyReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
