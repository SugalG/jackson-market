import { getAllProducts } from "@/lib/db";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Products</h1>

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
              <p className="text-[#1f5b3f] font-bold mt-1">₹{p.price}</p>
            </div>
          </a>

        ))}
      </div>
    </div>
  );
}
