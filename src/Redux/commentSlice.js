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
    editComment: (state, action) => {
      const { id, comment } = action.payload;
      const commentToEdit = state.commentData.find(
        (comment) => comment.id === id
      );
      if (commentToEdit) {
        commentToEdit.comment = comment;
      }
    },
  },
});

export const { addComment, editComment } = commentsSlice.actions;
export default commentsSlice.reducer;
