import { headers } from "next/headers";
import Link from "next/link";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

async function getProducts() {
  const store = await headers();
  const host = store.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const cookie = store.get("cookie") ?? ""; // forward admin cookie

  const res = await fetch(`${protocol}://${host}/api/admin/products`, {
    method: "GET",
    cache: "no-store",
    headers: {
      cookie,
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch admin products");
    return [];
  }

  return res.json();
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>

        <Link
          href="/admin/products/create"
          className="px-4 py-2 bg-[#1f5b3f] text-white rounded-full hover:bg-[#234e35]"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-xl p-3 shadow-sm hover:shadow transition"
            >
              <img
                src={p.images?.[0] || "/placeholder.png"}
                alt={p.name}
                className="w-full h-28 object-cover rounded-lg"
              />

              <h3 className="mt-2 font-medium flex items-center gap-2">
                {p.name}

                {/* Soft-delete badge */}
                {p.isDeleted && (
                  <span className="text-xs text-red-600">(Deleted)</span>
                )}
              </h3>

              <p className="text-sm text-gray-600">Stock: {p.stock}</p>
              <p className="text-[#1f5b3f] font-semibold">₹{p.price}</p>

              <div className="flex gap-2 mt-2">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="flex-1 text-center py-1 border rounded-md hover:bg-gray-100 text-sm"
                >
                  Edit
                </Link>

                {/* New delete button (client component) */}
                <DeleteProductButton id={p.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
