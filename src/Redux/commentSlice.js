import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    commentData: [],
  },
  reducers: {
    addComment: (state, action) => {
      // Add a new comment to the array
      state.commentData.push(action.payload);
    },
  },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
