// src/features/movieSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  movies: any[];
  totalResults: number;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  totalResults: 0,
  searchQuery: "Indiana", // Default search term
  isLoading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<any[]>) {
      state.movies = action.payload;
    },
    setTotalResults(state, action: PayloadAction<number>) {
      state.totalResults = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setMovies,
  setTotalResults,
  setSearchQuery,
  setLoading,
  setError,
} = movieSlice.actions;
export default movieSlice.reducer;
