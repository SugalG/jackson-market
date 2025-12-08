import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

// ----------------------------
// Helper: convert name → slug
// ----------------------------
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ----------------------------
// Helper: ensure unique slug
// ----------------------------
async function uniqueSlug(base, productId) {
  let slug = base;
  let counter = 1;

  while (true) {
    const exists = await prisma.product.findFirst({
      where: {
        slug,
        NOT: { id: productId }, // allow same product to keep its slug
      },
    });

    if (!exists) return slug;

    slug = `${base}-${counter}`;
    counter++;
  }
}

export async function PUT(req, { params }) {
  try {
    const admin = await getAdmin();
    if (!admin)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = Number((await params).id);
    const body = await req.json();

    const { name, price, stock, description, categoryId, images } = body;

    // Get existing product
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    
    let finalSlug = product.slug;

    if (name && name !== product.name) {
      const baseSlug = slugify(name);
      finalSlug = await uniqueSlug(baseSlug, id);
    }

    
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug: finalSlug,
        price: parseFloat(price),
        stock: parseInt(stock),
        description,
        categoryId: parseInt(categoryId),
        images: images || [],
      },
    });

    return NextResponse.json({ success: true, product: updated });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
