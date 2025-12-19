"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    setLoading(true);

    const res = await fetch("/api/admin/orders", {
      credentials: "include", // ✅ sends admin_token correctly
    });

    if (res.ok) {
      setOrders(await res.json());
    } else {
      console.log("ADMIN ORDERS ERROR:", await res.text());
      setOrders([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Orders</h1>

      <div className="bg-white rounded-xl shadow p-4">
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">#{order.id}</td>

                  <td className="p-3">
                    <div>
                      <div>{order.user?.name}</div>
                      <div className="text-xs text-gray-500">
                        {order.user?.email}
                      </div>
                    </div>
                  </td>

                  <td className="p-3">{order.items.length} items</td>

                  <td className="p-3 font-semibold text-[#1f5b3f]">
                    ₹{order.total}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "PENDING"
                          ? "bg-yellow-200 text-yellow-800"
                          : order.status === "PAID"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-3 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
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
