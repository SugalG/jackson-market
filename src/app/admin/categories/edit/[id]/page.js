import prisma from "@/lib/prisma";
import EditCategoryForm from "@/components/admin/EditCategoryForm";
import PageBanner from "@/app/(public)/PageBanner";

export default async function EditCategoryPage({ params }) {
  const { id } = params;
  const categoryId = Number(id);

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    return (
      <div className="p-6 text-red-600 font-quicksand">
        Category not found.
      </div>
    );
  }

  return (
    <div>
      {/* ✅ PAGE BANNER */}
      <PageBanner
        title="Edit Category"
        breadcrumbBase="Admin"
        breadcrumbCurrent="Edit Category"
      />

      {/* ✅ CONTENT */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-10 space-y-6">
        <h1 className="font-quicksand text-2xl md:text-3xl font-extrabold text-[#24443e]">
          Edit Category
        </h1>

        <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6">
          <EditCategoryForm category={category} />
        </div>
      </div>
    </div>
  );
}
