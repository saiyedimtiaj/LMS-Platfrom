import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistationToken: (state, action) => {
      state.token = action.payload;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.access_token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      (state.token = ""), (state.user = "");
    },
  },
});

export const { userRegistationToken, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
