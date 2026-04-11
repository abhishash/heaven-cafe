import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WalletPoint } from "@/types/wallet";

interface WalletState {
  points: number;
}

const initialState: WalletState = {
  points: 0,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletPoints: (state, action: PayloadAction<number>) => {
      state.points = action.payload;
    },
    resetWallet: (state) => {
      state.points = 0;
    },
  },
});

export const { setWalletPoints, resetWallet } = walletSlice.actions;
export default walletSlice.reducer;