import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { NextResponse } from "next/server";

// -----------------------------
// GET /api/cart → fetch cart
// -----------------------------
export async function GET() {
  const user = await getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cart = await prisma.cartItem.findMany({
    where: { userId: user.id },
    include: { product: true },
  });

  return NextResponse.json(cart);
}

// -----------------------------
// POST /api/cart → add to cart
// -----------------------------
export async function POST(req) {
  const user = await getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId, quantity } = await req.json();

  if (!productId)
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });

  const qty = quantity || 1;

  // Check if item already in cart
  const existing = await prisma.cartItem.findFirst({
    where: { userId: user.id, productId },
  });

  if (existing) {
    // Increment quantity
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: {
        quantity: existing.quantity + qty,
      },
    });

    return NextResponse.json(updated);
  }

  // Create new cart item
  const created = await prisma.cartItem.create({
    data: {
      userId: user.id,
      productId,
      quantity: qty,
    },
  });

  return NextResponse.json(created);
}

// -----------------------------
// PUT /api/cart → update quantity
// -----------------------------
export async function PUT(req) {
  const user = await getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { cartItemId, quantity } = await req.json();

  if (!cartItemId || quantity == null)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const updated = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });

  return NextResponse.json(updated);
}

// -----------------------------
// DELETE /api/cart → remove item
// -----------------------------
export async function DELETE(req) {
  const user = await getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { cartItemId } = await req.json();

  if (!cartItemId)
    return NextResponse.json({ error: "Missing cartItemId" }, { status: 400 });

  await prisma.cartItem.delete({
    where: { id: cartItemId },
  });

  return NextResponse.json({ success: true });
}
