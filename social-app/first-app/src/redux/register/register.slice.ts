import { createSlice } from "@reduxjs/toolkit"; 
import type { IUser } from "../../components/register/IUser";
 
export interface RegisterState {
  users: IUser[];
}

const initialState: RegisterState = {
  users: [],
};

const registerSlice = createSlice({
  name: "register",
  initialState, 
    reducers: {
    registerUser: (state, action) => {
        state.users.push(action.payload);
    },
  },
});

export const { registerUser } = registerSlice.actions;

export default registerSlice.reducer;