import { configureStore } from "@reduxjs/toolkit";

import loginPersonData from './Slices/loginPersonData.js';

const store = configureStore({
  reducer: {
    loginPersonData,  
  },
});

export default store;