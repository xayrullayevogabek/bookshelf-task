import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerUserSlice from "./api/register";
import loginUserSlice from "./api/login";
import booksSlice from "./api/books";
import bookshelfSlice from "./slices/bookshelfSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    register: registerUserSlice,
    login: loginUserSlice,
    books: booksSlice,
    bookshelf: bookshelfSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
