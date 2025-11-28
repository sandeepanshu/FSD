/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { type IUser, type IAddress } from "../../modules/users/models/IUser";
import { AuthUtil } from "../../util/AuthUtil";
import { TokenUtil } from "../../util/TokenUtil";
import { addAlert } from "../alert/alert.slice";

interface UserState {
  loading: boolean;
  user: Partial<IUser>;
  token: string;
  isAuthenticated: boolean;
  errorMessage: string;
}

const initialState: UserState = {
  loading: true,
  user: {},
  token: "",
  isAuthenticated: false,
  errorMessage: "",
};

/* ---------------------- REGISTER ---------------------- */
export const registerUser = createAsyncThunk(
  "users/register",
  async (
    userData: { name?: string; email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const dataURL = `${import.meta.env.VITE_SERVER_URL}/api/users/register`;
      const response = await axios.post(dataURL, userData);

      dispatch(
        addAlert({
          message: response.data.msg,
          color: "success",
          id: "",
        })
      );

      return response.data;
    } catch (error: any) {
      const errorList = error?.response?.data?.errors;
      if (errorList) {
        errorList.forEach((err: any) => {
          dispatch(
            addAlert({
              message: err.msg,
              color: "danger",
              id: "",
            })
          );
        });
      }

      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

/* ---------------------- LOGIN ---------------------- */
export const loginUser = createAsyncThunk(
  "users/login",
  async (
    userData: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const dataURL = `${import.meta.env.VITE_SERVER_URL}/api/users/login`;
      const response = await axios.post(dataURL, userData);

      // store token
      localStorage.setItem(
        import.meta.env.VITE_AUTH_TOKEN_KEY,
        response.data.token
      );

      dispatch(
        addAlert({
          message: response.data.msg,
          color: "success",
          id: "",
        })
      );

      return response.data;
    } catch (error: any) {
      const errorList = error?.response?.data?.errors;
      if (errorList) {
        errorList.forEach((err: any) => {
          dispatch(
            addAlert({
              message: err.msg,
              color: "danger",
              id: "",
            })
          );
        });
      }

      localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_KEY);
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

/* ---------------------- GET USER INFO ---------------------- */
export const getUserInfo = createAsyncThunk(
  "users/getUserInfo",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (AuthUtil.isLoggedIn()) {
        const token = AuthUtil.getToken();
        TokenUtil.setTokenHeader(token);

        const dataURL = `${import.meta.env.VITE_SERVER_URL}/api/users`;
        const response = await axios.get(dataURL);

        return response.data;
      }
    } catch (error: any) {
      const errorList = error?.response?.data?.errors;
      if (errorList) {
        errorList.forEach((err: any) => {
          dispatch(
            addAlert({
              message: err.msg,
              color: "danger",
              id: "",
            })
          );
        });
      }
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

/* ---------------------- UPDATE ADDRESS ---------------------- */
export const updateAddress = createAsyncThunk(
  "users/updateAddress",
  async (address: IAddress, { dispatch, rejectWithValue }) => {
    try {
      if (AuthUtil.isLoggedIn()) {
        const token = AuthUtil.getToken();
        TokenUtil.setTokenHeader(token);

        const dataURL = `${import.meta.env.VITE_SERVER_URL}/api/users/address`;
        const response = await axios.post(dataURL, address);

        dispatch(
          addAlert({
            message: response.data.msg,
            color: "success",
            id: "",
          })
        );

        return response.data;
      }
    } catch (error: any) {
      const errorList = error?.response?.data?.errors;
      if (errorList) {
        errorList.forEach((err: any) => {
          dispatch(
            addAlert({
              message: err.msg,
              color: "danger",
              id: "",
            })
          );
        });
      }
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

/* ---------------------- SLICE ---------------------- */
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_KEY);
      state.loading = false;
      state.token = "";
      state.isAuthenticated = false;
      state.user = {};
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    /* Register */
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = String(action.payload);
      });

    /* LOGIN */
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        // ❗ DO NOT SET USER HERE — backend does NOT return user
        // user will be loaded by getUserInfo()
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.token = "";
        state.isAuthenticated = false;
        state.errorMessage = String(action.payload);
      });

    /* GET USER INFO */
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = String(action.payload);
      });

    /* UPDATE ADDRESS */
    builder
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = String(action.payload);
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
