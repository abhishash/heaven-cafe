import { CART_DETAILS } from "@/lib/constants";
import { fetchHandler, methods } from "@/lib/fetch-handler";
import {
  CartItem,
  CartItemPayload,
  CartState,
} from "@/lib/types";

import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

// ✅ Add initialized flag
const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
  delhiveryCharge: "0",
  loading: false,
  initialized: false,
};

// 🔥 Fetch cart only once
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (accessToken:
    string
  ) => {
    const res = await fetchHandler({
      endpoint: CART_DETAILS?.endpoint,
      method: CART_DETAILS?.method as methods,
      token: accessToken
    });

    // 👉 IMPORTANT: return correct shape
    return res;
  }
);

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

      if (existIndex !== -1) {
        state.items[existIndex] = {
          ...action.payload,
          qty: Number(action.payload.qty),
        };
      } else {
        state.items.push({
          ...action.payload,
          qty: Number(action.payload.qty),
        });
      }

      // ✅ Recalculate total qty
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + Number(item.qty),
        0
      );

      // ✅ Recalculate Subtotal total Price
      state.totalPrice = state.items.reduce(
        (acc, item) => acc + Number(item.price),
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.cart_id !== action.payload
      );



      // ✅ Recalculate total qty
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + Number(item.qty),
        0
      );

      // ✅ Recalculate Subtotal total Price
      state.totalPrice = state.items.reduce(
        (acc, item) => acc + Number(item.price),
        0
      );
    },

    setCart(
      state,
      action: PayloadAction<{ total: number; data: CartItem[] }>
    ) {
      state.items = action.payload.data;
      state.totalAmount = action.payload.total;
    },

    updateQty: (
      state,
      action: PayloadAction<{ id: number; qty: number }>
    ) => {
      const { id, qty } = action.payload;

      const item = state.items.find(
        (i) => i.cart_id === id
      );

      if (item) {
        item.qty = qty;
      }

      state.totalAmount = state.items.reduce(
        (acc, item) => acc + Number(item.qty),
        0
      );

      // ✅ Recalculate Subtotal total Price
      state.totalPrice = state.items.reduce(
        (acc, item) => acc + Number(item.price),
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
      state.loading = false;
      state.initialized = false;
    },
  },

  // ✅ FIXED: extraReducers OUTSIDE reducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const res = action.payload;
        console.log(res);

        // 🔥 adjust based on your API response
        state.items = res?.data || [];
        state.totalAmount = res?.total_qty
        state.totalPrice = res?.totalPrice || 0;
        state.delhiveryCharge = res?.delhivery_charge || 0;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  setCart,
  setCartLoading,
} = cartSlice.actions;

export default cartSlice.reducer;