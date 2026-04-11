import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Public routes
  const publicRoutes = [
    "/login",
    "/register",
    "/forget-password",
  ];

  const isPublic = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );


  // If NOT logged in and trying to access protected page
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in and trying to access login/register
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*", "/login", "/register", "/forget-password"], // run on all routes
};