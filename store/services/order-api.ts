import { ADDRESSES, ORDERS } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { Order, OrdersResponse } from "@/types/order";

const APIENDPOINT = process.env.API_ENDPOINT;

export const orderApi = createApi({
  reducerPath: "orderApi",
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
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => ORDERS.endpoint,

      // ✅ Typed response
      transformResponse: (response: OrdersResponse) => response.data,

      providesTags: ["orders"],
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;