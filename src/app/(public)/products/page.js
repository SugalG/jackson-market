import PageBanner from "../../../components/PageBanner";
import {
  getAllProducts,
  getProductsByCategorySlug,
  getAllCategories,
} from "@/lib/db";

export default async function ProductsPage({ searchParams }) {
  const categorySlug = searchParams?.category || null;

  const categories = await getAllCategories();

  // ✅ Always get all products once (for static count)
  const allProducts = await getAllProducts();

  // ✅ Filtered products for grid
  const products = categorySlug
    ? await getProductsByCategorySlug(categorySlug)
    : allProducts;

  const bannerTitle = "Products";
  const breadcrumbCurrent = categorySlug
    ? `Products (${categorySlug})`
    : "Products";

  return (
    <div className="bg-[#eff5ee]">
      {/* ✅ PAGE BANNER */}
      <PageBanner
        title={bannerTitle}
        breadcrumbBase="Home"
        breadcrumbCurrent={breadcrumbCurrent}
      />

      {/* ✅ CONTENT */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-10">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* SIDEBAR */}
          <aside className="h-fit rounded-3xl bg-white shadow-sm p-6">

            <h2
              className="
                font-[Quicksand] font-semibold
                tracking-[0.02em]
                text-[#24443e]
                text-xl
              "
            >
              Categories
            </h2>

            <p className="mt-1 font-[Quicksand] text-sm text-[#24443e]/60">
              Filter products by category
            </p>

            <div className="mt-5 space-y-2">
              {/* ✅ All products (static count) */}
              <a
                href="/products"
                className={`
                  group flex items-center justify-between
                  px-4 py-3 rounded-2xl
                  font-[Quicksand] font-semibold text-sm
                  transition
                  ${
                    !categorySlug
                      ? "bg-[#1f5b3f] text-white shadow-sm"
                      : "bg-[#eff5ee] text-[#24443e] hover:bg-[#e7efe6]"
                  }
                `}
              >
                <span>All Products</span>
                <span
                  className={`
                    text-xs px-2 py-1 rounded-full
                    ${
                      !categorySlug
                        ? "bg-white/15 text-white"
                        : "bg-white text-[#24443e]/70"
                    }
                  `}
                >
                  {allProducts.length}
                </span>
              </a>

              {categories.map((c) => {
                const active = c.slug === categorySlug;

                return (
                  <a
                    key={c.id}
                    href={`/products?category=${c.slug}`}
                    className={`
                      flex items-center gap-3
                      px-4 py-3 rounded-2xl
                      font-[Quicksand] font-semibold text-sm
                      transition
                      ${
                        active
                          ? "bg-[#1f5b3f] text-white shadow-sm"
                          : "bg-[#eff5ee] text-[#24443e] hover:bg-[#e7efe6]"
                      }
                    `}
                  >
                    {/* category image */}
                    {c.image ? (
                      <span className="h-9 w-9 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="h-full w-full object-cover"
                        />
                      </span>
                    ) : (
                      <span className="h-9 w-9 rounded-xl bg-white shadow-sm shrink-0" />
                    )}

                    <span className="flex-1">{c.name}</span>
                  </a>
                );
              })}
            </div>
          </aside>

          {/* PRODUCTS */}
          <main className="rounded-3xl bg-white shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h1
                  className="
                    font-[Quicksand] font-semibold
                    tracking-[0.02em] md:tracking-[0.025em]
                    text-[#24443e]
                    text-[1.7rem] sm:text-[2rem]
                    leading-[1.1]
                  "
                >
                  {categorySlug ? `Products in "${categorySlug}"` : "All Products"}
                </h1>

                <p className="mt-1 font-[Quicksand] text-sm sm:text-base text-[#24443e]/60">
                  {products.length} item{products.length === 1 ? "" : "s"} available
                </p>
              </div>
            </div>

            <div className="mt-6">
              {products.length === 0 ? (
                <div className="rounded-2xl bg-[#eff5ee] p-6">
                  <p className="font-[Quicksand] text-[#24443e]/75">
                    No products found in this category.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {products.map((p) => (
                    <a
                      key={p.id}
                      href={`/products/${p.slug}`}
                      className="
                        group block rounded-3xl overflow-hidden
                        bg-[#f8fbf7]
                        border border-black/5
                        shadow-sm
                        hover:shadow-md
                        transition
                      "
                    >
                 {/* Image area (fixed size) */}
<div className="bg-white p-4 flex items-center justify-center h-[180px]">
  <img
    src={p.images?.[0]}
    alt={p.name}
    className="
      h-[140px]
      w-[140px]
      object-contain
      transition
      group-hover:scale-[1.03]
    "
  />
</div>



                      {/* Text area */}
                      <div className="p-4">
                        <h2
                          className="
                            font-[Quicksand] font-semibold
                            tracking-[0.015em]
                            text-[#24443e]
                            text-base sm:text-lg
                            leading-snug
                            line-clamp-1
                          "
                          title={p.name}
                        >
                          {p.name}
                        </h2>

                        <p className="mt-2 font-[Quicksand] font-bold text-[#1f5b3f] text-lg">
                          ₹{p.price}
                        </p>

                        <p className="mt-1 font-[Quicksand] text-xs text-[#24443e]/55">
                          View details →
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
