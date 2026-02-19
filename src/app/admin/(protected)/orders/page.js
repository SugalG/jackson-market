"use client";

import PageBanner from "@/components/PageBanner";
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

  if (loading) {
    return (
      <div>
        <PageBanner
          title="Orders"
          breadcrumbBase="Admin"
          breadcrumbCurrent="Orders"
        />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-10 font-quicksand">
          Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ✅ PAGE BANNER */}
      <PageBanner
        title="Orders"
        breadcrumbBase="Admin"
        breadcrumbCurrent="Orders"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-10 font-quicksand space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#24443e]">
            Orders
          </h1>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-8 text-gray-600">No orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b bg-[#eff5ee]">
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Order ID
                    </th>
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Customer
                    </th>
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Items
                    </th>
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Total
                    </th>
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Status
                    </th>
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Date
                    </th>
                    <th className="p-4 text-sm font-bold text-[#24443e]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-semibold text-[#24443e]">
                        #{order.id}
                      </td>

                      <td className="p-4">
                        <div className="leading-tight">
                          <div className="font-semibold text-[#24443e]">
                            {order.user?.name || "—"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.user?.email || ""}
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-[#24443e]">
                        {order.items.length} items
                      </td>

                      <td className="p-4 font-extrabold text-[#1f5b3f]">
                        ₹{order.total}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                            order.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "PAID"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="p-4 text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-bold text-[#1f5b3f] hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
