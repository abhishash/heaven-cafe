import { createSlice } from "@reduxjs/toolkit";

type OrderTypeState = {
  isDineIn: boolean;
  tableNumber: string | null;
};

const initialState: OrderTypeState = {
  isDineIn: false,
  tableNumber: null,
};

const orderTypeSlice = createSlice({
  name: "orderType",
  initialState,
  reducers: {
    toggleOrderType: (state) => {
      state.isDineIn = !state.isDineIn;
    },
    setOrderType: (state, action) => {
      state.isDineIn = action.payload === "dining";
    },
    setTableNumber: (state, action) => {
      state.tableNumber = action.payload;
    },
  },
});

export const { toggleOrderType, setOrderType, setTableNumber } = orderTypeSlice.actions;
export default orderTypeSlice.reducer;