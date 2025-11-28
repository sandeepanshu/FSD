import { createSlice, createAsyncThunk, type PayloadAction,   } from "@reduxjs/toolkit";
import axios from "axios";
import { type IProduct } from "../../components/products/models/IProduct";

const BASE_URL = "http://127.0.0.1:5000/api/products";

// STATE
export interface ProductState {
  products: IProduct[];
  selectedProduct: IProduct;
  loading: boolean;
  errorMessage: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: {} as IProduct,
  loading: false,
  errorMessage: null,
};

// ===================================================
// FETCH ALL PRODUCTS
// ===================================================
export const fetchAllProducts = createAsyncThunk(
  "bigBasket/fetchAllProducts",
  async () => {
    const res = await axios.get(BASE_URL);
    return res.data.products; // Backend returns {products: [...]}
  }
);

// ===================================================
// FETCH SINGLE PRODUCT
// ===================================================
export const fetchProduct = createAsyncThunk(
  "bigBasket/fetchProduct",
  async (productId: string) => {
    const res = await axios.get(`${BASE_URL}/${productId}`);
    return res.data.product; // Backend returns {product: {...}}
  }
);

// ===================================================
// CREATE PRODUCT
// ===================================================
export const createProduct = createAsyncThunk(
  "bigBasket/createProduct",
  async (
    {
      product,
      navigate,
    }: { product: IProduct; navigate: (path: string) => void },
    thunkAPI
  ) => {
    await axios.post(BASE_URL, product);
    navigate("/products/admin");
    thunkAPI.dispatch(fetchAllProducts());
  }
);

// ===================================================
// UPDATE PRODUCT
// ===================================================
export const updateProduct = createAsyncThunk(
  "bigBasket/updateProduct",
  async (
    {
      product,
      productId,
      navigate,
    }: { product: IProduct; productId: string; navigate: (path: string) => void },
    thunkAPI
  ) => {
    await axios.put(`${BASE_URL}/${productId}`, product);
    navigate("/products/admin");
    thunkAPI.dispatch(fetchAllProducts());
  }
);

// ===================================================
// DELETE PRODUCT
// ===================================================
export const deleteProduct = createAsyncThunk(
  "bigBasket/deleteProduct",
  async (productId: string, thunkAPI) => {
    await axios.delete(`${BASE_URL}/${productId}`);
    thunkAPI.dispatch(fetchAllProducts());
  }
);

// ===================================================
// SLICE
// ===================================================
const bigBasketSlice = createSlice({
  name: "bigBasket",
  initialState,
  reducers: {
    updateProductForm: (
      state,
      action: PayloadAction<{ key: keyof IProduct;
    value: IProduct[keyof IProduct]; }>
    ) => {
      state.selectedProduct = {
        ...state.selectedProduct,
        [action.payload.key]: action.payload.value,
      };
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH ALL
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      // FETCH SINGLE
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })

      // CREATE
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })

      // UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })

      // DELETE
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { updateProductForm } = bigBasketSlice.actions;
export default bigBasketSlice.reducer;
