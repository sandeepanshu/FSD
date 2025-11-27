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

export interface ProductState {
  loading: boolean;
  product: IProduct | null;
  products: IProduct[];
  errorMessage: string;
}

const initialState: ProductState = {
  loading: false,
  product: null,
  products: [],
  errorMessage: "",
};

// Async thunks
export const uploadProduct = createAsyncThunk(
  "products/uploadProduct",
  async (product: IProduct, { dispatch, rejectWithValue }) => {
    try {
      if (AuthUtil.isLoggedIn()) {
        const token = AuthUtil.getToken();
        TokenUtil.setTokenHeader(token);
        const dataURL = `${
          import.meta.env.VITE_SERVER_URL
        }/api/products/upload`;
        const response = await axios.post(dataURL, product, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(
          addAlert({ message: response.data.msg, color: "success", id: "" })
        );
        return response.data;
      }
    } catch (error: any) {
      console.error(error?.response?.data);
      const errorMsg = error?.response?.data?.msg || "Failed to upload product";
      dispatch(addAlert({ message: errorMsg, color: "danger", id: "" }));
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const getMenProductsCollection = createAsyncThunk(
  "products/getMenCollection",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const dataURL = `${import.meta.env.VITE_SERVER_URL}/api/products/men`;
      const response = await axios.get(dataURL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(error?.response?.data);
      dispatch(
        addAlert({
          message: error?.response?.data?.msg || "Failed to fetch men products",
          color: "danger",
          id: "",
        })
      );
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const getWomenProductsCollection = createAsyncThunk(
  "products/getWomenCollection",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const dataURL = `${import.meta.env.VITE_SERVER_URL}/api/products/women`;
      const response = await axios.get(dataURL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(error?.response?.data);
      dispatch(
        addAlert({
          message:
            error?.response?.data?.msg || "Failed to fetch women products",
          color: "danger",
          id: "",
        })
      );
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const getKidsProductsCollection = createAsyncThunk(
  "products/getKidsCollection",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const dataURL = `${import.meta.env.VITE_SERVER_URL}/api/products/kids`;
      const response = await axios.get(dataURL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(error?.response?.data);
      dispatch(
        addAlert({
          message:
            error?.response?.data?.msg || "Failed to fetch kids products",
          color: "danger",
          id: "",
        })
      );
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (productId: string, { dispatch, rejectWithValue }) => {
    try {
      const dataURL = `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${productId}`;
      const response = await axios.get(dataURL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(error?.response?.data);
      dispatch(
        addAlert({
          message: error?.response?.data?.msg || "Failed to fetch product",
          color: "danger",
          id: "",
        })
      );
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Upload Product
    builder
      .addCase(uploadProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = String(action.payload);
      });

    // Get Men Products
    builder
      .addCase(getMenProductsCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getMenProductsCollection.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(getMenProductsCollection.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = String(action.payload);
      });

    // Get Women Products
    builder
      .addCase(getWomenProductsCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getWomenProductsCollection.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(getWomenProductsCollection.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = String(action.payload);
      });

    // Get Kids Products
    builder
      .addCase(getKidsProductsCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getKidsProductsCollection.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(getKidsProductsCollection.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = String(action.payload);
      });

    // Get Single Product
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.loading = false;
          state.product = action.payload;
        }
      )
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = String(action.payload);
      });
  },
});

export default productSlice.reducer;
