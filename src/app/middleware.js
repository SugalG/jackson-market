import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

// Must match admin-token name
const ADMIN_COOKIE = "admin_token";

// Secret (same as in auth.js)
const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // --------------------------
  // 1. Protect /admin/** pages
  // --------------------------
  if (pathname.startsWith("/admin")) {
    const adminToken = req.cookies.get(ADMIN_COOKIE)?.value;

    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }

    try {
      const admin = verify(adminToken, JWT_SECRET);

      if (admin.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/admin-login", req.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/admin/:path*", // protect everything under /admin
  ],
};
