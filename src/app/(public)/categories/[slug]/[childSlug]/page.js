import { getProductsByCategorySlug } from "@/lib/db";

export default async function SubCategoryPage(props) {

  const param = await props.params;
  
  const { slug, childSlug } = await props.params;
  
  

  const products = await getProductsByCategorySlug(`${slug}/${childSlug}`);

  if (!products || products.length === 0) {
    return <div className="p-6">No products found in this category.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 capitalize">
        {slug} Category
      </h1>

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
    </div>
  );
}
