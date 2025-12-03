import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  // Check admin auth
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch orders
  const orders = await prisma.order.findMany({
    orderBy: { id: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json(orders);
}
