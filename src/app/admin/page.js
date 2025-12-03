export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        <a
          href="/admin/products"
          className="p-6 bg-white shadow border rounded-xl hover:shadow-lg transition block"
        >
          <h2 className="font-semibold text-lg">Products</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage inventory, prices & images
          </p>
        </a>

        <a
          href="/admin/categories"
          className="p-6 bg-white shadow border rounded-xl hover:shadow-lg transition block"
        >
          <h2 className="font-semibold text-lg">Categories</h2>
          <p className="text-sm text-gray-600 mt-1">
            Organize products into sections
          </p>
        </a>

        <a
          href="/admin/orders"
          className="p-6 bg-white shadow border rounded-xl hover:shadow-lg transition block"
        >
          <h2 className="font-semibold text-lg">Orders</h2>
          <p className="text-sm text-gray-600 mt-1">
            View, update & complete orders
          </p>
        </a>

      </div>
    </div>
  );
}
