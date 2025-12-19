import {
  getAllProducts,
  getProductsByCategorySlug,
  getAllCategories,
} from "@/lib/db";

export default async function ProductsPage({ searchParams }) {
  const categorySlug = searchParams?.category || null;

  const categories = await getAllCategories();

  const products = categorySlug
    ? await getProductsByCategorySlug(categorySlug)
    : await getAllProducts();

  return (
    <div className="flex gap-6 p-6 max-w-7xl mx-auto">
      
      {/* SIDEBAR */}
      <aside className="w-56 shrink-0">
        <h2 className="font-semibold text-lg mb-4">Categories</h2>

        <ul className="space-y-1">
          {/* All products */}
          <li>
            <a
              href="/products"
              className={`block px-3 py-2 rounded-lg text-sm ${
                !categorySlug
                  ? "bg-[#1f5b3f] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              All Products
            </a>
          </li>

          {categories.map((c) => {
            const active = c.slug === categorySlug;

            return (
              <li key={c.id}>
                <a
                  href={`/products?category=${c.slug}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                    active
                      ? "bg-[#1f5b3f] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {/* Optional category image */}
                  {c.image && (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-6 w-6 rounded object-cover"
                    />
                  )}
                  <span>{c.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* PRODUCTS GRID */}
      <main className="flex-1">
        <h1 className="text-2xl font-semibold mb-4">
          {categorySlug
            ? `Products in "${categorySlug}"`
            : "All Products"}
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-600">
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <a
                key={p.id}
                href={`/products/${p.slug}`}
                className="block border bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-3">
                  <h2 className="font-semibold text-lg">{p.name}</h2>
                  <p className="text-[#1f5b3f] font-bold mt-1">
                    ₹{p.price}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
