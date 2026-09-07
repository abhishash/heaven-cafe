import { ADDRESSES, ALL_PRODUCTS, CATEGORIES, HOMEPAGE_PRODUCTS } from "@/lib/constants";
import { Category, CategoryResponse, ProductsDataTypes } from "@/lib/types";
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

        getCategories: builder.query<Category[], void>({
            query: () => ({
                url: CATEGORIES?.endpoint,
                method: CATEGORIES?.method,
            }),
            transformResponse: (response: CategoryResponse) => response?.data,
        }),

        getProducts: builder.query<ProductsDataTypes[], void>({
            query: () => ({
                url: HOMEPAGE_PRODUCTS?.endpoint,
                method: HOMEPAGE_PRODUCTS?.method,
            }),
            transformResponse: (response: any) => response?.data,
        }),

        getAllProduct: builder.query<ProductsDataTypes[], void>({
            query: () => ({
                url: ALL_PRODUCTS?.endpoint,
                method: ALL_PRODUCTS?.method,
            }),
            transformResponse: (response: any) => response?.data,
        }),

        addToCartProduct: builder.mutation<any, {
            product_id: number;
            qty: number; type: "custom" | "remove" | "add";
        }>({
            query: (payload) => ({
                url: "cart/add",
                method: "POST",
                body: payload
            }),
        }),
    })
})

export const { useGetFAQQuery, useGetCategoriesQuery, useGetProductsQuery, useGetAllProductQuery, useAddToCartProductMutation } = api;