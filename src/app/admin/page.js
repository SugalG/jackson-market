import PageBanner from "@/app/(public)/PageBanner";

export default function AdminDashboard() {
  return (
    <div>
      {/* ✅ PAGE BANNER */}
      <PageBanner
        title="Admin Dashboard"
        breadcrumbBase="Admin"
        breadcrumbCurrent="Dashboard"
      />

      {/* ✅ CONTENT */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-10 space-y-8">

        {/* TITLE */}
        <h1 className="font-quicksand text-2xl md:text-3xl font-extrabold text-[#24443e]">
          Dashboard Overview
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {/* PRODUCTS */}
          <a
            href="/admin/products"
            className="
              group
              p-6
              bg-white
              border border-black/5
              rounded-3xl
              shadow-sm
              hover:shadow-md
              transition
              block
            "
          >
            <h2 className="font-quicksand font-semibold text-lg text-[#24443e] group-hover:text-[#1f5b3f] transition">
              Products
            </h2>

            <p className="font-quicksand text-sm text-gray-600 mt-2 leading-relaxed">
              Manage inventory, pricing, images, and availability.
            </p>
          </a>

          {/* CATEGORIES */}
          <a
            href="/admin/categories"
            className="
              group
              p-6
              bg-white
              border border-black/5
              rounded-3xl
              shadow-sm
              hover:shadow-md
              transition
              block
            "
          >
            <h2 className="font-quicksand font-semibold text-lg text-[#24443e] group-hover:text-[#1f5b3f] transition">
              Categories
            </h2>

            <p className="font-quicksand text-sm text-gray-600 mt-2 leading-relaxed">
              Organize and manage product categories.
            </p>
          </a>

          {/* ORDERS */}
          <a
            href="/admin/orders"
            className="
              group
              p-6
              bg-white
              border border-black/5
              rounded-3xl
              shadow-sm
              hover:shadow-md
              transition
              block
            "
          >
            <h2 className="font-quicksand font-semibold text-lg text-[#24443e] group-hover:text-[#1f5b3f] transition">
              Orders
            </h2>

            <p className="font-quicksand text-sm text-gray-600 mt-2 leading-relaxed">
              View, update, and complete customer orders.
            </p>
          </a>

        </div>
      </div>
    </div>
  );
}
