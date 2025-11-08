import { configureStore } from "@reduxjs/toolkit";
import messageReducer from './MessageSlice';
import authReducer from './AuthSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: messageReducer,
  },
});