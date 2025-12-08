import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Utility: generate URL-friendly slug
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")   // replace spaces and special chars
    .replace(/^-+|-+$/g, "");      // remove hyphens from start/end
}

// Utility: ensure slug is unique — add -1, -2, -3... if needed
async function uniqueSlug(baseSlug) {
  let finalSlug = baseSlug;
  let counter = 1;

  while (true) {
    const exists = await prisma.product.findUnique({
      where: { slug: finalSlug },
    });

    if (!exists) return finalSlug;

    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, price, description, stock, categoryId, images } = body;

    // Validation
    if (!name || !price || !description || !stock || !categoryId) {
      return NextResponse.json(
        { error: "All fields except images are required." },
        { status: 400 }
      );
    }

    // 1️⃣ Create base slug
    const baseSlug = slugify(name);
    const slug = await uniqueSlug(baseSlug);

    // 2️⃣ Create new product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        price: parseFloat(price),
        description,
        stock: parseInt(stock),
        categoryId: parseInt(categoryId),
        images: images || [],
      },
    });

    return NextResponse.json({ success: true, product });

  } catch (err) {
    console.error("❌ Product creation error:", err);
    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 }
    );
  }
}
