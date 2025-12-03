

import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { NextResponse } from "next/server";

// -----------------------------
// GET /api/orders
// -----------------------------
export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { id: "desc" },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json(orders);
}

// -----------------------------
// POST /api/orders
// -----------------------------
export async function POST(req) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { address } = await req.json();

  if (!address || address.trim() === "") {
    return NextResponse.json(
      { error: "Address is required" },
      { status: 400 }
    );
  }

  // NOTE: adjust table name if your cart name differs
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: user.id },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    return NextResponse.json(
      { error: "Cart is empty" },
      { status: 400 }
    );
  }

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Create order
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      address,
      total,
      items: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  // Clear cart
  await prisma.cartItem.deleteMany({
    where: { userId: user.id },
  });

  return NextResponse.json(order);
}
