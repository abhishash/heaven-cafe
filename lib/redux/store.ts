import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import { api } from "@/store/services/api";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

// 👉 Root State Type
export type RootState = ReturnType<typeof store.getState>;

// 👉 Dispatch Type
export type AppDispatch = typeof store.dispatch;