import { ADDRESSES } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const APIENDPOINT = process.env.API_ENDPOINT;

export const addressApi = createApi({
    reducerPath: "addressApi",

    baseQuery: fetchBaseQuery({
        baseUrl: APIENDPOINT,
        prepareHeaders: async (headers) => {
            const session = await getSession();
            const token = session?.user?.accessToken;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["addresses"],

    endpoints: (builder) => ({
        /* ---------------- ADD NEW ADDRESS ---------------- */
        addNewAddress: builder.mutation({
            query: (body) => ({
                url: "/add-new-address",
                method: "POST",
                body,
            }),
            invalidatesTags: ["addresses"],
        }),

        setDefaultAddress: builder.mutation({
            query: (body) => ({
                url: "/change-address",
                method: "POST",
                body,
            }),
            invalidatesTags: ["addresses"],
        }),

        getAddresses: builder.query({
            query: () => ADDRESSES.endpoint,
            providesTags: ["addresses"]
        }),
        deleteAddress: builder.mutation({
            query: (id: number) => ({
                url: `delete-address`,
                method: "DELETE",
                body: { id }
            }),
            // ✅ auto refetch after delete
            invalidatesTags: ["addresses"],
        }),
    }),
});

export const { useGetAddressesQuery, useDeleteAddressMutation, useAddNewAddressMutation, useSetDefaultAddressMutation } = addressApi;