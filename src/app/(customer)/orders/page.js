"use client";

import PageBanner from "@/app/(public)/PageBanner";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    setLoading(true);
    const res = await fetch("/api/orders", { credentials: "include" });

    if (res.ok) {
      const data = await res.json();
      setOrders(data);
    } else {
      setOrders([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        {/* ✅ PAGE BANNER */}
        <PageBanner
          title="My Orders"
          breadcrumbBase="Home"
          breadcrumbCurrent="Orders"
        />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-10">
          <div className="border border-[#1f5b3f]/20 rounded-3xl p-6">
            <p className="text-gray-700">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ✅ PAGE BANNER */}
      <PageBanner
        title="My Orders"
        breadcrumbBase="Home"
        breadcrumbCurrent="Orders"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-10 space-y-6">
        {/* ✅ TITLE + LINE */}
        <div className="flex items-center gap-4">
          <h1 className="font-quicksand text-2xl md:text-3xl font-extrabold text-[#1f5b3f] whitespace-nowrap">
            My Orders
          </h1>
          <div className="flex-1 h-px bg-[#1f5b3f]/20" />
        </div>

        {orders.length === 0 ? (
          /* ✅ EMPTY ORDERS STATE (same language as cart empty) */
          <div className="flex flex-col items-center justify-center border border-[#1f5b3f]/20 rounded-3xl py-20 px-6 text-center">
            {/* ICON */}
            <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white border border-[#1f5b3f]/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1f5b3f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10"
              >
                <path d="M21 8a2 2 0 0 0-2-2H7l-1-2H3" />
                <path d="M7 6l-2 9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l-1-7" />
                <path d="M9 21h.01" />
                <path d="M20 21h.01" />
              </svg>
            </div>

            {/* TEXT */}
            <h2 className="font-quicksand text-2xl font-extrabold text-[#1f5b3f] mb-2 uppercase tracking-wide">
              No orders yet
            </h2>

            <p className="font-quicksand text-gray-600 max-w-md mb-8">
              You haven’t placed any orders yet. Start shopping and your orders
              will appear here.
            </p>

            {/* CTA */}
            <Link
              href="/products"
              className="font-quicksand inline-flex items-center justify-center rounded-full bg-[#1f5b3f] text-white px-10 py-4 font-extrabold hover:bg-[#234e35] transition"
            >
              Start shopping →
            </Link>
          </div>
        ) : (
          /* ✅ ORDERS TABLE */
          <div className="border border-[#1f5b3f]/20 rounded-3xl overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#1f5b3f]/15 bg-white/40">
                  <th className="p-4 text-sm font-quicksand font-extrabold text-gray-900">
                    Order ID
                  </th>
                  <th className="p-4 text-sm font-quicksand font-extrabold text-gray-900">
                    Items
                  </th>
                  <th className="p-4 text-sm font-quicksand font-extrabold text-gray-900">
                    Total
                  </th>
                  <th className="p-4 text-sm font-quicksand font-extrabold text-gray-900">
                    Status
                  </th>
                  <th className="p-4 text-sm font-quicksand font-extrabold text-gray-900">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#1f5b3f]/10 last:border-b-0 hover:bg-black/[0.02] transition"
                  >
                    <td className="p-4 font-quicksand font-semibold text-gray-900">
                      #{order.id}
                    </td>

                    <td className="p-4 font-quicksand text-gray-800">
                      {order.items.length} items
                    </td>

                    <td className="p-4 font-quicksand font-extrabold text-[#1f5b3f]">
                      ₹{order.total}
                    </td>

                    <td className="p-4">
                      <span
                        className={`font-quicksand px-3 py-1 rounded-full text-xs font-extrabold ${
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

                    <td className="p-4 font-quicksand text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
