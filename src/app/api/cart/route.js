import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { NextResponse } from "next/server";

/* =========================
   GET - Fetch Cart
========================= */
export async function GET() {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await prisma.cartItem.findMany({
    where: { userId: user.id },
    include: { product: true },
      orderBy: {
      id: "asc", 
    },
  });

  return NextResponse.json(cart);
}

/* =========================
   POST - Add To Cart
========================= */
export async function POST(req) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, quantity = 1 } = await req.json();

  if (!productId) {
    return NextResponse.json(
      { error: "Missing productId" },
      { status: 400 }
    );
  }

  // Check if product already exists in cart
  const existing = await prisma.cartItem.findFirst({
    where: {
      userId: user.id,
      productId,
    },
  });

  // If exists → increase quantity
  if (existing) {
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });

    return NextResponse.json(updated);
  }

  // Otherwise create new cart item
  const newItem = await prisma.cartItem.create({
    data: {
      userId: user.id,
      productId,
      quantity,
    },
  });

  return NextResponse.json(newItem);
}


export async function PUT(req) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cartItemId, quantity } = await req.json();

  if (!cartItemId || quantity == null) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }


  const existing = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      userId: user.id,
    },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });

  return NextResponse.json(updated);
}


export async function DELETE(req) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cartItemId } = await req.json();

  if (!cartItemId) {
    return NextResponse.json(
      { error: "Missing cartItemId" },
      { status: 400 }
    );
  }


  await prisma.cartItem.deleteMany({
    where: {
      id: cartItemId,
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
