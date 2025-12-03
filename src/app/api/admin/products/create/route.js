import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, slug, price, description, stock, categoryId, images } = body;

    if (!name || !slug || !price || !description || !stock || !categoryId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

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
    console.error("Create product error", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
