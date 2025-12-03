import { NextResponse } from "next/server";
import { getUser, getAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getAdmin();
  if (admin) {
    return NextResponse.json({
      isAuthenticated: true,
      isAdmin: true,
      user: admin,
    });
  }

  const user = await getUser();
  if (user) {
    return NextResponse.json({
      isAuthenticated: true,
      isAdmin: false,
      user,
    });
  }

  return NextResponse.json({
    isAuthenticated: false,
    isAdmin: false,
    user: null,
  });
}
