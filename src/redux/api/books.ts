import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Params {
  key: string;
  sign: string;
  isbn?: string;
  id?: number;
  status?: number;
  search?: string;
}

export const getAllBooks = createAsyncThunk(
  "create/users",
  async (params: Params) => {
    const response = await axios.get("https://no23.lavina.tech/books", {
      headers: {
        Key: params.key,
        Sign: params.sign,
      },
    });

    return response;
  }
);

export const getSearchedBooks = createAsyncThunk(
  "create/users",
  async (params: Params) => {
    const response = await axios.get(
      `https://no23.lavina.tech/books/${params.search}`,
      {
        headers: {
          Key: params.key,
          Sign: params.sign,
        },
      }
    );

    return response;
  }
);

export const createBook = createAsyncThunk(
  "create/book",
  async (params: Params) => {
    try {
      const response = await axios.post(
        "https://no23.lavina.tech/books",
        {
          isbn: params.isbn,
        },
        {
          headers: {
            Key: params.key,
            Sign: params.sign,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteBook = createAsyncThunk(
  "delete/bool",
  async (params: Params) => {
    await axios.delete(`https://no23.lavina.tech/books/${params.id}`, {
      headers: {
        Key: params.key,
        Sign: params.sign,
      },
    });
  }
);

export const patchBook = createAsyncThunk(
  "create/book",
  async (params: Params) => {
    const response = await axios.patch(
      `https://no23.lavina.tech/books/${params.id}`,
      {
        status: params.status,
      },
      {
        headers: {
          Key: params.key,
          Sign: params.sign,
        },
      }
    );
    return response.data;
  }
);

export const booksSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    books: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload.data.data;
    });
    builder.addCase(getAllBooks.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default booksSlice.reducer;
