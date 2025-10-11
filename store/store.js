// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/userSlcie";
import authReducer from "../Redux/authSlice";



export const store = configureStore({
  reducer: {
    user: userReducer,

    auth: authReducer,


 e7d5a36a01c93672ec3857fba9e09d8dcfcdab30
  },
});
