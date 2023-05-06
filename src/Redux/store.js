import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./MoviesSlice";
import authReducer from "./authSlice";
import commentReducer from "./commentSlice";
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    comments: commentReducer,
  },
});

// export default store;
