import prisma from "@/lib/prisma";
import EditProductForm from "./EditProductForm";
import { fetchParentCategories } from "@/actions/fetchParentCategory";

export default async function EditProductPage(props) {
  const params = await props.params;  // ✅ FIX
  const productId = Number(params.id);

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });

  const {result:categories} = await fetchParentCategories();
  

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  return (
    <div className="space-y-6">
      
      <EditProductForm product={product} categories={categories} />
    </div>
  );
}





