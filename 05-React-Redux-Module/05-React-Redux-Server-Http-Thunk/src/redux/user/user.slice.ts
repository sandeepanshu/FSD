import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
  };
}

export interface UserState {
  users: User[];
  loading: boolean;
  
  errorMessage: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  errorMessage: null,
};

// Async Thunk (modern replacement for fetchUser / fetchUserAsyncAwait)
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return await res.json();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.errorMessage = "Failed to load users";
      });
  },
});

export default userSlice.reducer;
