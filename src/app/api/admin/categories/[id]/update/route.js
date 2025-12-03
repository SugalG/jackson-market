import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;   // ✅ FIX
  const categoryId = Number(id);

  const body = await req.json();

  const updated = await prisma.category.update({
    where: { id: categoryId },
    data: {
      name: body.name,
      slug: body.slug,
    },
  });

  return NextResponse.json(updated);
}
