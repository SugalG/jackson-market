import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;   // ✅ FIX
  const categoryId = Number(id);

  await prisma.category.delete({
    where: { id: categoryId },
  });

  return NextResponse.json({ success: true });
}
