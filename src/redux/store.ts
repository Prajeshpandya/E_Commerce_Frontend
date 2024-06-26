import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/UserApi";
import { userReducer } from "./reducer/userReducer";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  //here access the name from destructure array because if the name of reducer change then here no need to change 
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [userReducer.name] : userReducer.reducer,   
  },
  middleware: (defaultMid) => [...defaultMid(), userApi.middleware],
});
