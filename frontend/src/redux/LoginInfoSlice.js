import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userid: 0,
};

export const LoginInfoSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    updateUserId: (state, action) => {
      console.log(action.payload);
      state.userid = action.payload;
    },
  },
});

export const { updateUserId } = LoginInfoSlice.actions;

export default LoginInfoSlice.reducer;
