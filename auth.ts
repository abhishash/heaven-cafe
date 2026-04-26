import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { isObject } from "./lib/type-guards";
import { fetchHandler } from "./lib/fetch-handler";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "username",
                    type: "username",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (
                credentials: Record<"password" | "username", string> | undefined
            ): Promise<any> => {
                /* Getting Token from generateCustomerToken */
                const input = {
                    email: credentials?.username,
                    password: credentials?.password,
                };

                try {
                    const res = await fetchHandler<any>({
                        endpoint: "login",
                        method: "POST",
                        data: input,
                    });

                    if (
                        res?.status &&
                        isObject(res?.data)
                    ) {
                        const customerInfo = res?.data;
                        return {
                            name: customerInfo?.name,
                            token: res?.token,
                            email: customerInfo?.email,
                            phone: customerInfo?.phone,
                            id: customerInfo?.id,
                            isAddress: res?.is_address,
                        };
                    } else {
                        throw new Error(res?.message as string);
                    }
                } catch (error: any) {
                    throw new Error(
                        (error?.message as string) || "Something went wrong!"
                    );
                }
                return null
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (isObject(user) && user.token) {
                token.accessToken = user.token as string;
                token.role = "customer";
                token.isAddress = user.isAddress;
            }
            return token;
        },

        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    accessToken: token.accessToken as string,
                    role: token.role,
                    isAddress: token.isAddress,
                },
                error: token.error,
            };
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
};

export const handler = NextAuth(authOptions);