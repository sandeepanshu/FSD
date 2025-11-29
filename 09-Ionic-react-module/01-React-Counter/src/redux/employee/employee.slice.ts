import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Employee {
  sno: number;
  name: string;
  age: number;
  designation: string;
  location: string;
}

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

// Type for API response user data
interface ApiUser {
  name: string;
  address: {
    city: string;
  };
}

// Fetch API Example (Replace with your API)
export const fetchEmployeeData = createAsyncThunk<Employee[]>(
  "employee/fetchData",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data: ApiUser[] = await response.json();

    return data.map((u, index) => ({
      sno: index + 1,
      name: u.name,
      age: Math.floor(Math.random() * 20) + 25,
      designation: "Software Engineer",
      location: u.address.city,
    }));
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeData.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployeeData.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch employees";
      });
  },
});

export default employeeSlice.reducer;
