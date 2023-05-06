import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   userEmail: "",
// };

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userEmail: "",
  },
  reducers: {
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
  },
});

export const { setUserEmail, setLogin } = authSlice.actions;

export default authSlice.reducer;
