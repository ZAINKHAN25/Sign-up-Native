import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEmail: '',
  userPass: ''
};

const counterSlice = createSlice({
  name: "loginPersonData",
  reducers: {
    changeloginPersonData: (state = initialState, action) => {
      state.loginPersonData = action.payload;
      console.log("state", state.loginPersonData);
      console.log("action", action.payload);
      console.log("Kam chal gya");
    },
  },
  initialState,
});

export const { changeloginPersonData } = counterSlice.actions;
export default counterSlice.reducer;