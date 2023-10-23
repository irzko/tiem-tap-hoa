import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/cart/:path*",
    "/dashboard/:path*",
    "/auth",
    "/checkout",
    "/user/:path*",
    "/message",
  ],
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    if (pathname !== "/auth") {
      return NextResponse.rewrite(new URL("/auth", req.url));
    }
  } else if (pathname === "/auth") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if (pathname.startsWith("/api")) {
  //   return NextResponse.next();
  // }
  return NextResponse.next();
}
