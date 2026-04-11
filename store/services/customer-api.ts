import { ADDRESSES } from "@/lib/constants";
import { AuthResponse, User } from "@/types/customer";
import { WalletPoint } from "@/types/wallet";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
const APIENDPOINT = process.env.API_ENDPOINT;
export const userApi = createApi({
    reducerPath: 'user-api',
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
    tagTypes: ["user"],
    endpoints: (builder) => ({
        getUserDetail: builder.query<User, void>({
            query: () => "/user-profile",
            transformResponse: (response: AuthResponse) => response.user,
            providesTags: ["user"]
        }),
    })
})

export const { useGetUserDetailQuery } = userApi;