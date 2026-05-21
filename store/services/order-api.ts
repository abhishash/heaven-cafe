import { ADDRESSES, ORDERS } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { Order, OrdersResponse } from "@/types/order";
import { AnyARecord } from "dns";
import { OrderResponse } from "@/lib/types";

const APIENDPOINT = process.env.API_ENDPOINT;

interface UpdatePaymentStatusPayload {
  payment_id: string;
  order_id: string;
  status: "success" | "failed";
}

interface UpdatePaymentStatusResponse {
  success: boolean;
  message: string;
  data?: any;
}

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
    getOrders: builder.query<OrdersResponse, string>({
      query: (status) => `${ORDERS.endpoint}/${status}`,

      // ✅ Typed response
      transformResponse: (response: OrdersResponse) => response,

      providesTags: ["orders"],
    }),

    getOrderById: builder.query<Order, number>({
      query: (orderId) => `orders/details/${orderId}`,

      // ✅ Typed response
      transformResponse: (response: OrderResponse) => response?.data,
    }),

    updatePaymentStatus: builder.mutation<
      UpdatePaymentStatusResponse,
      UpdatePaymentStatusPayload
    >({
      query: (body) => ({
        url: "orders/success",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdatePaymentStatusMutation,
} = orderApi;
