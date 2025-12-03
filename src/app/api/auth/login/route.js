import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createToken, setUserCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email }
  });

  // ❗ Prevent admins from logging into customer system
  if (!user || user.role !== "CUSTOMER") {
    return NextResponse.json(
      { error: "Invalid customer login" },
      { status: 401 }
    );
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  const token = createToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  await setUserCookie(token);

  return NextResponse.json({ success: true });
}
