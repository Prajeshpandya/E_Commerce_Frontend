import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/UserApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    userApi: userApi.reducer,
  },
  middleware: (defaultMid) => [...defaultMid(), userApi.middleware],
});
