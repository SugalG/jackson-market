import Link from "next/link";
import { cookies } from "next/headers";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

async function getCategories() {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_token")?.value;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/categories`,
        {
            cache: "no-store",
            headers: adminToken
                ? { Cookie: `admin_token=${adminToken}` }
                : {},
        }
    );

    if (!res.ok) {
        console.error("Failed to load categories");
        return [];
    }

    return res.json();
}

export default async function AdminCategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Categories</h1>

                <Link
                    href="/admin/categories/new"
                    className="px-4 py-2 bg-[#1f5b3f] text-white rounded-full"
                >
                    + Add Category
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
                {categories.length === 0 ? (
                    <p className="text-gray-600">No categories found.</p>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Image</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Slug</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((c) => (
                                <tr
                                    key={c.id}
                                    className={`border-b ${c.isDeleted ? "opacity-50" : ""}`}
                                >
                                    {/* Image */}
                                    <td className="p-2">
                                        <img
                                            src={c.image || "/placeholder.png"}
                                            alt={c.name}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    </td>

                                    {/* Name */}
                                    <td className="p-2">{c.name}</td>

                                    {/* Slug */}
                                    <td className="p-2 text-gray-600">{c.slug}</td>

                                    {/* Status */}
                                    <td className="p-2">
                                        {c.isDeleted ? (
                                            <span className="text-xs text-red-600">Deleted</span>
                                        ) : (
                                            <span className="text-xs text-green-600">Active</span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="p-2 flex gap-3">
                                        {!c.isDeleted && (
                                            <>
                                                <Link
                                                    className="text-blue-600"
                                                    href={`/admin/categories/edit/${c.id}`}
                                                >
                                                    Edit
                                                </Link>

                                                <DeleteCategoryButton id={c.id} />
                                            </>
                                        )}
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
