import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import { api } from "@/store/services/api";
import { orderApi } from "@/store/services/order-api";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [api.reducerPath]: api.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, orderApi.middleware),
});

// 👉 Root State Type
export type RootState = ReturnType<typeof store.getState>;

// 👉 Dispatch Type
export type AppDispatch = typeof store.dispatch;