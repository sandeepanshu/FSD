import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartProduct {
  sno: string;
  image: string;
  name: string;
  price: number;
  qty: number;
}

export interface CartState {
  products: CartProduct[];
}

const initialState: CartState = {
  products: [
    {
      sno: "101",
      image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
      name: "Samsung TV",
      price: 45000,
      qty: 1,
    },
    {
      sno: "102",
      image: "https://cdn-icons-png.flaticon.com/512/1165/1165674.png",
      name: "Nike Shoes",
      price: 3500,
      qty: 2,
    },
  ],
};

const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrProductQty: (state, action: PayloadAction<string>) => {
      const item = state.products.find((p) => p.sno === action.payload);
      if (item) item.qty += 1;
    },

    decrProductQty: (state, action: PayloadAction<string>) => {
      const item = state.products.find((p) => p.sno === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },
  },
});

export const { incrProductQty, decrProductQty } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
