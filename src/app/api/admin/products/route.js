import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: { id: "desc" },
  });

  return NextResponse.json(products);
}
