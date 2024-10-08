import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/ProductApi";
import { userApi } from "./api/UserApi";
import { cartReducer } from "./reducer/cartReducer";
import { userReducer } from "./reducer/userReducer";
import { orderApi } from "./api/OrderApi";
import { dashboardApi } from "./api/dashboardApi";
import { modalReducer } from "./reducer/modalReducer";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  //here access the name from destructure array because if the name of reducer change then here no need to change
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [modalReducer.name]: modalReducer.reducer,
  },
  middleware: (defaultMid) => [
    ...defaultMid(),
    userApi.middleware,
    productApi.middleware,
    orderApi.middleware,
    dashboardApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
