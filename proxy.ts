import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    const publicRoutes = [
        "/login",
        "/register",
        "/forget-password",
    ];

    const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // No token → allow ONLY auth pages
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(
            new URL("/login", req.url)
        );
    }

    // Token exists → don't allow auth pages
    if (token && isPublicRoute) {
        return NextResponse.redirect(
            new URL("/", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/forget-password",
        "/",
    ],
};