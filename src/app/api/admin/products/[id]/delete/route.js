export async function DELETE(req, context) {
    const params = await context.params;   
    const id = Number(params.id);

    const admin = await getAdmin();
    if (!admin)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
}
