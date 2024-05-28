import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "next/headers";

export interface Login {
  username: string;
  password: string;
  Sign: string;
}

export const loginUser = createAsyncThunk(
  "create/users",
  async (params: Login) => {
    const response = await axios.get("https://no23.lavina.tech/myself", {
      headers: {
        Key: params.username,
        Sign: params.Sign,
      },
    });

    return response.data ?? null;
  }
);

export const loginUserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default loginUserSlice.reducer;
