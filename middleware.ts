// import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    "/cart/:path*",
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/checkout",
    "/user/:path*",
  ],
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  /* tslint:disable */

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    if (pathname !== "/login" && pathname !== "/signup") {
      return NextResponse.rewrite(new URL("/login", req.url));
    }
  } else if (pathname === "/login" || pathname === "/signup") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if (pathname.startsWith("/api")) {
  //   return NextResponse.next();
  // }

  return NextResponse.next();
}
