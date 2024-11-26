import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

export interface SearchResults {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}
interface MovieState {
  movies: Movie[];
  totalResults: number;
  searchQuery: string;
  type: "movie" | "series" | "episode";
  year: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  totalResults: 0,
  searchQuery: "Pokemon",
  type: "movie",
  year: "",
  isLoading: false,
  error: null,
};

const movieslice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
    setTotalResults(state, action: PayloadAction<number>) {
      state.totalResults = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setType(state, action: PayloadAction<"movie" | "series" | "episode">) {
      state.type = action.payload;
    },
    setYear(state, action: PayloadAction<string>) {
      state.year = action.payload;
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
  setType,
  setYear,
  setLoading,
  setError,
} = movieslice.actions;

export default movieslice.reducer;
