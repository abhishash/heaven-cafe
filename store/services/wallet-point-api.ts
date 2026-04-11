import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { Order, OrdersResponse } from "@/types/order";
import { WalletPoint, WalletPointItem, WalletPointsResponse } from "@/types/wallet";

const APIENDPOINT = process.env.API_ENDPOINT;

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APIENDPOINT,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.user?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["wallet"],
  endpoints: (builder) => ({
    getWalletPoint: builder.query<WalletPoint, void>({
      query: () => "wallet",
      // ✅ Typed response
      transformResponse: (response: WalletPoint) => response,

      providesTags: ["wallet"],
    }),
    getLoyalityPoint: builder.query<WalletPointsResponse, void>({
      query: () => "loyalty/points",
      // ✅ Typed response
      transformResponse: (response: WalletPointsResponse) => response,

    }),
  }),
});

export const { useGetWalletPointQuery, useGetLoyalityPointQuery } = walletApi;