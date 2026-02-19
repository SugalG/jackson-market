import Link from "next/link";
import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";
import { redirect } from "next/navigation";
import PageBanner from "@/components/PageBanner";

export default async function AdminCategoriesPage() {
  const admin = await getAdmin();

  // Extra safety (middleware already protects, but this avoids blank page)
  if (!admin) {
    redirect("/admin-login");
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      {/* ✅ PAGE BANNER */}
      <PageBanner
        title="Categories"
        breadcrumbBase="Admin"
        breadcrumbCurrent="Categories"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-10 font-quicksand space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#24443e]">
            Categories
          </h1>

          <Link
            href="/admin/categories/new"
            className="
              inline-flex items-center justify-center
              px-5 py-2.5
              bg-[#1f5b3f] text-white
              rounded-full
              font-bold
              hover:bg-[#234e35]
              transition
              whitespace-nowrap
            "
          >
            + Add Category
          </Link>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
          {categories.length === 0 ? (
            <div className="p-8 text-gray-600">No categories found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b bg-[#eff5ee]">
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Image
                    </th>
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Name
                    </th>
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Slug
                    </th>
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Status
                    </th>
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((c) => (
                    <tr
                      key={c.id}
                      className={`border-b last:border-b-0 ${
                        c.isDeleted ? "opacity-50" : ""
                      } hover:bg-gray-50 transition`}
                    >
                      <td className="p-4">
                        <img
                          src={c.image || "/placeholder.png"}
                          alt={c.name}
                          className="h-12 w-12 rounded-xl object-cover border border-black/5"
                        />
                      </td>

                      <td className="p-4 font-semibold text-[#24443e]">
                        {c.name}
                      </td>

                      <td className="p-4 text-gray-600">{c.slug}</td>

                      <td className="p-4">
                        {c.isDeleted ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                            Deleted
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                            Active
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        {!c.isDeleted && (
                          <div className="flex items-center gap-4">
                            <Link
                              className="text-[#1f5b3f] font-bold hover:underline"
                              href={`/admin/categories/edit/${c.id}`}
                            >
                              Edit
                            </Link>

                            <DeleteCategoryButton id={c.id} />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
