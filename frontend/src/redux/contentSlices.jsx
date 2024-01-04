import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const localStorage = window.localStorage;
const getToken = () => {
  return localStorage.getItem("token");
};
const instance = axios.create({
  baseURL: "http://localhost:5001/api/contents",
});
// Adding a request interceptor to include the authorization token in all requests
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Thunks for async API calls
export const fetchTrending = createAsyncThunk(
  "content/fetchTrending",
  async () => {
    const response = await instance.get("/getTrending");
    return response.data;
  }
);
export const fetchMovies = createAsyncThunk("content/fetchMovies", async () => {
  const response = await instance.get("/movies");
  return response.data;
});
export const fetchTvSeries = createAsyncThunk(
  "content/fetchTvSeries",
  async () => {
    const response = await instance.get("/tvSeries");
    return response.data;
  }
);
export const addBookmark = createAsyncThunk(
  "content/addBookmark",
  async (itemId) => {
    const response = await instance.post(`/bookmark/${itemId}`);
    return response.data;
  }
);
export const fetchBookmarks = createAsyncThunk(
  "content/fetchBookmarks",
  async () => {
    const response = await instance.get("/bookmark");
    return response.data;
  }
);
export const deleteBookmark = createAsyncThunk(
  "content/deleteBookmark",
  async (itemId) => {
    const response = await instance.delete(`/bookmark/${itemId}`);
    return response.data;
  }
);
export const searchContent = createAsyncThunk(
  "content/searchContent",
  async (searchKey) => {
    const response = await instance.post(`/search/${searchKey}`);
    return response.data;
  }
);
// Content slice
const contentSlice = createSlice({
  name: "content",
  initialState: {
    trending: [],
    movies: [],
    tvSeries: [],
    bookmarks: [],
    searchResults: [],
    selectedItem: null, // information show code
    searchWord: null,
    status: "idle",
    error: false,
    isLoading: false,
  },
  reducers: {
    // Below code is for search History clearing
    clearSearchResults: (state) => {
      state.searchResults = []; // Clear the searchResults array
      state.searchWord = null;
    },
    setSelectedItem(state, action) {
      // console.log("Payload in Reducer:", state.selectedItem);  // This is working
      state.selectedItem = action.payload;
    },
    setSearchWord(state, action) {
      // console.log("Payload in Slice Reducer:", state.searchWord);  // this is working
      state.searchWord = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Below code is for fetchTrending
      .addCase(fetchTrending.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trending = action.payload;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Below code is for Movies
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Below code is for TvSeries
      .addCase(fetchTvSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTvSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tvSeries = action.payload;
      })
      .addCase(fetchTvSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Below code is for addBookmark
      .addCase(fetchBookmarks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Below code is for Search
      .addCase(searchContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setSelectedItem, setSearchWord, clearSearchResults } =
  contentSlice.actions;
export default contentSlice.reducer;
