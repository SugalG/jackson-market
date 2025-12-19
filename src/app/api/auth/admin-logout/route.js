import { clearAllAuthCookies } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  await clearAllAuthCookies();

  const baseUrl = new URL(req.url).origin;
  return NextResponse.redirect(`${baseUrl}/admin-login`, { status: 302 });
}
