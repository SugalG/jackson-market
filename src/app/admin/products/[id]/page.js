import prisma from "@/lib/prisma";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage(props) {
  const params = await props.params;  // ✅ FIX
  const productId = Number(params.id);

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });

  const categories = await prisma.category.findMany();

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <EditProductForm product={product} categories={categories} />
    </div>
  );
}
