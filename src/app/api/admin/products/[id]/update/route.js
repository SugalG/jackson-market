import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
    const params = await context.params;   
    const id = Number(params.id);

    const admin = await getAdmin();
    if (!admin)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    // console.log("UPDATE route hit!", id, body);
    // console.log("URL:", req.url);

    const updated = await prisma.product.update({
        where: { id },
        data: {
            name: body.name,
            slug: body.slug,
            price: body.price,
            stock: body.stock,
            description: body.description,
            categoryId: body.categoryId,
            images: body.images,
        },
    });

    return NextResponse.json(updated);
}
