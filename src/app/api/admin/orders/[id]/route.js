import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const admin = await getAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // FIX: unwrap params
  const { id } = await context.params;

  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
      items: { include: { product: true } },
    },
  });

  return NextResponse.json(order);
}

export async function PUT(req, context) {
  const admin = await getAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // FIX: unwrap params
  const { id } = await context.params;
  const body = await req.json();

  const updated = await prisma.order.update({
    where: { id: Number(id) },
    data: { status: body.status },
  });

  return NextResponse.json(updated);
}
