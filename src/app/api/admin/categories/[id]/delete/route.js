import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const categoryId = Number(params.id);

  if (!categoryId) {
    return NextResponse.json(
      { error: "Invalid category id" },
      { status: 400 }
    );
  }

  
  await prisma.category.update({
    where: { id: categoryId },
    data: {
      isDeleted: true,
    },
  });

  return NextResponse.json({ success: true });
}
