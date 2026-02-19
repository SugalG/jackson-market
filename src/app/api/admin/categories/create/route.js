import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";


export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, slug, image, parentId } = await req.json();

  if (!name || !slug) {
    return NextResponse.json(
      { error: "Name and slug are required" },
      { status: 400 }
    );
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        image: image || null, 
        parentId
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.error("Create category error:", err);

    return NextResponse.json(
      { error: "Category already exists or invalid data" },
      { status: 400 }
    );
  }
}
