import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { createToken, setUserCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check existing
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Hash password
    const hashed = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: "CUSTOMER",
      },
    });

    // Create token
    const token = createToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    // Set cookie
    setUserCookie(token);

    return NextResponse.json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
