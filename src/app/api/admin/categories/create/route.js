import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, slug } = await req.json();

  const category = await prisma.category.create({
    data: { name, slug },
  });

  return NextResponse.json(category);
}
