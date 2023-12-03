import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginPersonData: []
};

const counterSlice = createSlice({
  name: "loginPersonData",
  reducers: {
    changeloginPersonData: (state = initialState, action) => {
      state.loginPersonData = action.payload;
      console.log("state", state.loginPersonData);
      console.log("action", action.payload);
    },
  },
  initialState,
});

export const { changeloginPersonData } = counterSlice.actions;
export default counterSlice.reducer;