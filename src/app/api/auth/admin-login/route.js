import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createToken, setAdminCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  const admin = await prisma.user.findUnique({
    where: { email },
  });

  if (!admin || admin.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Not authorized" },
      { status: 401 }
    );
  }

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  const token = createToken({
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  await setAdminCookie(token);

  return NextResponse.json({ success: true });
}
