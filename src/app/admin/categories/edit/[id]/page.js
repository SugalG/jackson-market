import prisma from "@/lib/prisma";
import EditCategoryForm from "@/components/admin/EditCategoryForm";

export default async function EditCategoryPage({ params }) {
  const { id } = await params;       // ✅ FIX
  const categoryId = Number(id);

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    return <div className="p-6 text-red-600">Category not found.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit Category</h1>
      <EditCategoryForm category={category} />
    </div>
  );
}
