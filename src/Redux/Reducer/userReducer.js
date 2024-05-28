import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    userNotExist: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { userExist, userNotExist } = userReducer.actions;
