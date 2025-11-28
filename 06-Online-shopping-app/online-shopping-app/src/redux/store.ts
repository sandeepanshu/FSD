import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/user.slice';
import alertReducer from './alert/alert.slice';
import productReducer from './products/product.slice';
import orderReducer from './orders/order.slice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    alerts: alertReducer,
    products: productReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;