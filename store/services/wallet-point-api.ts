import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { Order, OrdersResponse } from "@/types/order";
import { WalletPoint } from "@/types/wallet";
import { setWalletPoints } from "@/lib/redux/slice/walletSlice";

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

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    // 👇 Store in Redux slice
                    dispatch(setWalletPoints(data.points));

                } catch (error) {
                    console.error("Wallet fetch error:", error);
                }
            },

            providesTags: ["wallet"],
        }),
    }),
});

export const { useGetWalletPointQuery } = walletApi;