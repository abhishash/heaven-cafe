import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import walletReducer from "./slice/walletSlice";
import { api } from "@/store/services/api";
import { orderApi } from "@/store/services/order-api";
import { walletApi } from "@/store/services/wallet-point-api";
import { userApi } from "@/store/services/customer-api";
import orderTypeReducer from "./slice/orderTypeSlice";

import { addressApi } from "@/store/services/address-api";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wallet: walletReducer,
    orderType: orderTypeReducer,
    [api.reducerPath]: api.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [addressApi.reducerPath] : addressApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, orderApi.middleware, walletApi.middleware, userApi.middleware, addressApi.middleware),
});

// Root State Type
export type RootState = ReturnType<typeof store.getState>;

// Dispatch Type
export type AppDispatch = typeof store.dispatch;