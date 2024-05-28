import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./API/userAPI";
import { userReducer } from "./Reducer/userReducer";
import { productAPI } from "./API/productAPI";
import { orderAPI } from "./API/orderAPI";
import { cartReducer } from "./Reducer/cartReducer";
import { dashboardAPI } from "./API/dashboardAPI";
import { couponAPI } from "./API/couponAPI";
import { reviewAPI } from "./API/reviewAPI";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [dashboardAPI.reducerPath]: dashboardAPI.reducer,
    [couponAPI.reducerPath]: couponAPI.reducer,
    [reviewAPI.reducerPath]: reviewAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    userAPI.middleware,
    productAPI.middleware,
    orderAPI.middleware,
    dashboardAPI.middleware,
    couponAPI.middleware,
    reviewAPI.middleware,
  ],
});

export const server = process.env.REACT_APP_SERVER;
