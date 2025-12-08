import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

// Prevent Vercel from failing build by calling GET on this route
export async function GET() {
  return NextResponse.json({ message: "Category create endpoint" });
}

export async function POST(req) {
  const admin = await getAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, slug } = await req.json();

  if (!name || !slug) {
    return NextResponse.json(
      { error: "Name and slug are required" },
      { status: 400 }
    );
  }

  const category = await prisma.category.create({
    data: { name, slug },
  });

  return NextResponse.json(category);
}
