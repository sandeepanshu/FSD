import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  sno: number;
  image: string;
  name: string;
  price: number;
  qty: number;
}

export interface ProductState {
  product: Product;
}

const initialState: ProductState = {
  product: {
    sno: 101,
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    name: "Samsung TV",
    price: 45000,
    qty: 1,
  },
};

const productSlice = createSlice({
  name: "prod",
  initialState,
  reducers: {
    incrProductQty: (state) => {
      state.product.qty += 1;
    },
    decrProductQty: (state) => {
      if (state.product.qty > 1) {
        state.product.qty -= 1;
      }
    },
  },
});

export const { incrProductQty, decrProductQty } = productSlice.actions;
export default productSlice.reducer;
