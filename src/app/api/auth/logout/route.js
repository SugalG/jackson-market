import { clearUserCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  await clearUserCookie();

  const baseUrl = new URL(req.url).origin;

  // Redirect customer to home after logout
  return NextResponse.redirect(`${baseUrl}/`);
}
