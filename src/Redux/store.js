import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./MoviesSlice";
import authReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
  },
});

// export default store;
