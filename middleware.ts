import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  } else {
    if (pathname === "/login" || pathname === "/signup") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else if (pathname === "/") {
      return NextResponse.rewrite(new URL("/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/login")) {
    return NextResponse.rewrite(new URL("/", req.url));
  }

  // if (pathname.startsWith("/dashboard")) {
  //   return NextResponse.rewrite(new URL("/", req.url));
  // }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
