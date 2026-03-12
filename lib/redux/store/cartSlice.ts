import { CartItem, CartItemPayload, CartState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  // cart: [],
  items: [],
  totalAmount: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItemPayload>) => {
      const existIndex = state.items.findIndex(
        (item) => item.cart_id === action.payload.cart_id
      );

      // console.log( JSON.parse(JSON.stringify(exist)), action.payload  )

      if (existIndex !== -1) {

        // 🔥 Replace entire object
        state.items[existIndex] = {
          ...action.payload,
          qty: Number(action.payload.qty),
        };
      } else {
        state.items.push({
          ...action.payload, qty: action.payload.qty as unknown as number,
        });
      }

      // 🔥 Recalculate total properly
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + (item.qty),
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.cart_id !== action.payload
      );
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + (item.qty),
        0
      );
    },

    setCart(state, action: PayloadAction<{ total: number, data: CartItem[] }>) {
      const { total, data } = action.payload;
      state.items = data;
      state.totalAmount = total;
    },

    updateQty: (
      state,
      action: PayloadAction<{ id: number; qty: number }>
    ) => {
      // const { id, qty } = action.payload;
      // const item = state.cart.find((i) => i.id === id);
      // if (item) item.qty = qty;
    },

    clearCart: (state) => {
      // state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  setCart,
  setCartLoading
} = cartSlice.actions;

export default cartSlice.reducer;