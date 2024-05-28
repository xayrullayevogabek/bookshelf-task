import { getItem, removeItem, setItem } from "@/lib/utils";
import { BookType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const books = getItem("books");

const initialState = {
  books: books ? JSON.parse(books) : [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setBookToShelf(state, action) {
      const existBook = state.books.find(
        (book: BookType) => book.id === action.payload.id
      );
      if (existBook) {
        state.books = state.books.filter(
          (item: BookType) => item.id !== action.payload.id
        );
      } else {
        state.books = [...state.books, action.payload];
      }
      setItem("books", state.books);
    },
  },
});

export const { setBookToShelf } = authSlice.actions;

export default authSlice.reducer;
