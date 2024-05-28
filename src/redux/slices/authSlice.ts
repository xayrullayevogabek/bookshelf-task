import { getItem, removeItem, setItem } from "@/lib/utils";
import { UserType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const user = getItem("user");

interface initialStateType {
  user: UserType | null;
}

const initialState: initialStateType = {
  user: user ? JSON.parse(user) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload;
      setItem("user", state.user);
    },
    logOut(state) {
      state.user = null;
      removeItem("user");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
