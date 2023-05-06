import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/all/week?api_key=85f1073d9949aa2ce5b5491a5be3334e&languages=en-US"
  );
  return response.data.results;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    deleteMovie: (state, action) => {
      state.data = state.data.filter((movie) => movie.id !== action.payload);
    },
    editMovieName: (state, action) => {
      const { id, name } = action.payload;
      const movie = state.data.find((movie) => movie.id === id);
      if (movie) {
        movie.name = name;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { deleteMovie, editMovieName } = moviesSlice.actions;

export default moviesSlice.reducer;
