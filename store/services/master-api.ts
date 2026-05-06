import { ADDRESSES } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
const APIENDPOINT = process.env.API_ENDPOINT;

type FAQItem = {
  name: string;
  description: string;
};

type FAQResponse = {
  status: boolean;
  message: string;
  data: FAQItem[];
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: APIENDPOINT,
        prepareHeaders: async (headers) => {
            const session = await getSession();
            const token = session?.user?.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        }
    }),
    tagTypes: ["addresses"],
    endpoints: (builder) => ({
        getFAQ: builder.query<FAQItem[], void>({
            query: () => ({
                url: `faq`,
                method: "GET",
            }),
            transformResponse: (response: FAQResponse) => response?.data,
        }),
    })
})

export const { useGetFAQQuery } = api;