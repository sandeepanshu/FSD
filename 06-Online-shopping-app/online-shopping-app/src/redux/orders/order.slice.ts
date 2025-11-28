/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { AuthUtil } from "../../util/AuthUtil";
import { TokenUtil } from "../../util/TokenUtil";
import { addAlert } from "../alert/alert.slice";
import { type IProduct } from "../../modules/products/models/IProduct";
import { type IOrder } from "../../modules/orders/models/IOrder";

export interface OrderState {
  loading: boolean;
  cartItems: IProduct[];
  order: IOrder | null;
  orderList: IOrder[];
  errorMessage: string;
}

const initialState: OrderState = {
  loading: false,
  cartItems: [],
  order: null,
  orderList: [],
  errorMessage: "",
};

// Async thunks
export const makeStripePayment = createAsyncThunk(
  "orders/makeStripePayment",
  async (
    { paymentIntentId, order }: { paymentIntentId: string; order: IOrder },
    { dispatch, rejectWithValue }
  ) => {
    try {
      if (AuthUtil.isLoggedIn()) {
        const token = AuthUtil.getToken();
        TokenUtil.setTokenHeader(token);

        const url = `${
          import.meta.env.VITE_SERVER_URL
        }/api/payments/verify-payment`;
        const response = await axios.post(url, { paymentIntentId });

        if (response.data.success) {
          const finalOrder = {
            ...order,
            paymentId: paymentIntentId,
            paymentStatus: "paid",
            paymentMethod: "card",
          };

          dispatch(placeOrder(finalOrder));
          return response.data;
        }

        throw new Error("Payment verification failed");
      }
    } catch (err: any) {
      dispatch(
        addAlert({
          message: err?.response?.data?.message || "Payment failed",
          color: "danger",
          id: "",
        })
      );
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (order: IOrder, { dispatch, rejectWithValue }) => {
    try {
      if (AuthUtil.isLoggedIn()) {
        const token = AuthUtil.getToken();
        TokenUtil.setTokenHeader(token);
        const dataURL = `${import.meta.env.VITE_SERVER_URL}/api/orders/place`;
        const response = await axios.post(dataURL, order);
        dispatch(
          addAlert({
            message: "Order placed successfully",
            color: "success",
            id: "",
          })
        );
        return response.data;
      }
    } catch (error: any) {
      console.error(error?.response?.data);
      dispatch(
        addAlert({
          message: error?.response?.data?.msg || "Failed to place order",
          color: "danger",
          id: "",
        })
      );
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (AuthUtil.isLoggedIn()) {
        const token = AuthUtil.getToken();
        TokenUtil.setTokenHeader(token);
        const dataURL = `${import.meta.env.VITE_SERVER_URL}/api/orders`;
        const response = await axios.get(dataURL);
        return response.data;
      }
    } catch (error: any) {
      console.error(error?.response?.data);
      dispatch(
        addAlert({
          message: error?.response?.data?.msg || "Failed to fetch orders",
          color: "danger",
          id: "",
        })
      );
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: IProduct; qty: number }>
    ) => {
      const { product, qty } = action.payload;
      const existing = state.cartItems.find((item) => item._id === product._id);

      if (!existing) {
        state.cartItems.push({
          ...product,
          qty,
        });
      }
    },
    incrProductQty: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem._id === action.payload
      );
      if (item && item.qty) {
        item.qty += 1;
      }
    },
    decrProductQty: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem._id === action.payload
      );
      if (item && item.qty && item.qty > 1) {
        item.qty -= 1;
      }
    },
    deleteCartProduct: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    // Make Stripe Payment
    builder
      .addCase(makeStripePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeStripePayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(makeStripePayment.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = String(action.payload);
      });

    // Place Order
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.order = action.payload.order;
        state.cartItems = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = String(action.payload);
      });

    // Get All Orders
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // state.orderList = action.payload.orders;
        const payload = action.payload;

        if (Array.isArray(payload)) {
          // if backend returns array directly
          state.orderList = payload;
        } else {
          // if backend returns { orders: [] }
          state.orderList = payload?.orders || [];
        }
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = String(action.payload);
      });
  },
});

export const {
  addToCart,
  incrProductQty,
  decrProductQty,
  deleteCartProduct,
  clearCart,
} = orderSlice.actions;
export default orderSlice.reducer;
