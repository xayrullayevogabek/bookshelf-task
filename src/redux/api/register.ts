import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Register {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "create/users",
  async (params: Register) => {
    const response = await axios.post("https://no23.lavina.tech/signup", {
      name: params.name,
      email: params.email,
      key: params.username,
      secret: params.password,
    });

    return response.data ?? null;
  }
);

export const registerUserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default registerUserSlice.reducer;
