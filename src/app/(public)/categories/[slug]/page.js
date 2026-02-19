import { getCategoryDataBySlug } from "@/lib/db";

export default async function CategoryPage({ params }) {
  const { slug } =await params;


  const data = await getCategoryDataBySlug(slug);

  if (!data) {
    return <div className="p-6">Category not found.</div>;
  }

  const { category, children, products } = data;

  return (
    <div className="p-6">
      {/* CATEGORY TITLE */}
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {category.name}
      </h1>

      {/* SUBCATEGORIES (ONLY IF EXISTS) */}
      {children.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Subcategories</h2>
          <div className="flex flex-wrap gap-3">
            {children.map((child) => (
              <a
                key={child.id}
                href={`/categories/${child.slug}`}
                className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
              >
                {child.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      {products.length === 0 ? (
        <div>No products found in this category.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <a
              key={p.id}
              href={`/products/${p.slug}`}
              className="block border p-3 bg-white rounded"
            >
              <img
                src={p.images[0]}
                alt={p.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 font-medium">{p.name}</h2>
              <p className="text-green-600">₹{p.price}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
