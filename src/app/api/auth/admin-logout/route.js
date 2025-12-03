import { clearAdminCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  // ❗ MUST await
  await clearAdminCookie();

  // Get the real origin
  const baseUrl = new URL(request.url).origin;

  return NextResponse.redirect(`${baseUrl}/admin-login`, {
    status: 302,
  });
}
