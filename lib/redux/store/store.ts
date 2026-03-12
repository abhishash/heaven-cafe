import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// 👉 Root State Type
export type RootState = ReturnType<typeof store.getState>;

// 👉 Dispatch Type
export type AppDispatch = typeof store.dispatch;