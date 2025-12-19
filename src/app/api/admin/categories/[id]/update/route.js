import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const categoryId = Number(params.id);
  if (!categoryId) {
    return NextResponse.json({ error: "Invalid category id" }, { status: 400 });
  }

  const body = await req.json();

  const updated = await prisma.category.update({
    where: { id: categoryId },
    data: {
      name: body.name,
      slug: body.slug,
      image: body.image ?? undefined, // ✅ NEW (keep old if not sent)
    },
  });

  return NextResponse.json(updated);
}
