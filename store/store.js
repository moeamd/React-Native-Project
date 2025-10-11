// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/userSlcie";



export const store = configureStore({
  reducer: {
    user: userReducer,

  },
});
