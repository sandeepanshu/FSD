import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { IContact } from "../../components/models/IContact";

// STATE INTERFACE
export interface ContactState {
  contacts: IContact[];
  selectedContact: IContact | null;
  loading: boolean;
  errorMessage: string | null;
}

// Initial state
const initialState: ContactState = {
  contacts: [],
  selectedContact: null,
  loading: false,
  errorMessage: null,
};

// FETCH CONTACTS (Async Thunk)
export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async () => {
    const response = await fetch("https://randomuser.me/api/?results=10");
    const data = await response.json();
    return data.results as IContact[];
  }
);

// SLICE
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    selectContactInfo: (state, action: PayloadAction<IContact>) => {
      state.selectedContact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false;
        state.errorMessage = "Failed to load contacts";
      });
  },
});

export const { selectContactInfo } = contactSlice.actions;
export default contactSlice.reducer;
