// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movieslice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export default store;
