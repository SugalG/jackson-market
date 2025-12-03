import { getAllProducts } from "@/lib/db";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-12">

      {/* -------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* -------------------------------------------------- */}
      <section className="bg-white rounded-3xl border border-green-100 shadow-md px-8 py-12 text-center">

        <h1 className="text-4xl font-bold text-[#1f5b3f] tracking-tight mb-3">
          Jackson Market
        </h1>

        <p className="text-gray-600 text-base max-w-xl mx-auto leading-relaxed">
          Fresh groceries delivered from your trusted neighborhood store.
          Quality you expect, convenience you deserve.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <a
            href="/products"
            className="bg-[#1f5b3f] text-white px-6 py-3 rounded-full text-sm font-medium shadow hover:bg-[#184d34] transition-all"
          >
            Browse Products
          </a>
          <a
            href="/login"
            className="border border-[#1f5b3f] text-[#1f5b3f] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#1f5b3f] hover:text-white transition-all"
          >
            Login / Register
          </a>
        </div>

      </section>


      {/* -------------------------------------------------- */}
      {/* FEATURED PRODUCTS */}
      {/* -------------------------------------------------- */}
      <section>
        <h2 className="text-xl font-semibold text-[#1f5b3f] mb-5">
          Featured Products
        </h2>

        {products.length === 0 ? (
          <p className="text-sm text-gray-500">
            No products found. Add some from the Admin panel.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {products.slice(0, 8).map((p) => (
              <a
                key={p.id}
                href={`/products/${p.slug}`}
                className="group bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all block"
              >
                <div className="w-full h-32 md:h-40 overflow-hidden rounded-xl">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <h3 className="mt-3 text-sm font-medium text-gray-800">
                  {p.name}
                </h3>

                <p className="text-[#1f5b3f] font-semibold text-sm mt-1">
                  ₹{p.price}
                </p>
              </a>
            ))}

          </div>
        )}
      </section>


      {/* -------------------------------------------------- */}
      {/* CTA STRIP */}
      {/* -------------------------------------------------- */}
      <section className="bg-gradient-to-r from-[#1f5b3f] to-[#17432c] text-white rounded-2xl p-8 text-center shadow-md">
        <h3 className="text-xl font-semibold">Cash on Delivery Available</h3>
        <p className="text-white/80 text-sm mt-1">
          Place your order now and pay when it arrives at your doorstep.
        </p>

        <a
          href="/products"
          className="inline-block mt-4 bg-white text-[#1f5b3f] px-6 py-2 font-medium rounded-full shadow hover:bg-gray-100 transition"
        >
          Shop Now
        </a>
      </section>

    </div>
  );
}
