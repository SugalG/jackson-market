"use client";

import PageBanner from "@/app/(public)/PageBanner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderDetails({ order }) {
  const router = useRouter();
  const [status, setStatus] = useState(order.status);
  const [saving, setSaving] = useState(false);

  async function updateStatus() {
    try {
      setSaving(true);

      await fetch(`/api/admin/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      router.push("/admin/orders");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* ✅ PAGE BANNER */}
      <PageBanner
        title="Order Detail"
        breadcrumbBase="Admin"
        breadcrumbCurrent="Order Details"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-10 font-quicksand space-y-6">
        {/* TITLE */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#24443e]">
            Order #{order.id}
          </h1>
          <div className="flex-1 h-px bg-[#1f5b3f]/25" />
        </div>

        {/* CUSTOMER */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6">
          <p className="text-lg font-extrabold text-[#24443e]">
            {order.user?.name || "—"}
          </p>
          <p className="text-sm text-gray-600">{order.user?.email || ""}</p>
        </div>

        {/* ITEMS */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
          <div className="p-6 border-b bg-[#eff5ee]">
            <h2 className="text-lg font-extrabold text-[#24443e]">Items</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-sm font-bold text-[#24443e]">
                    Product
                  </th>
                  <th className="p-4 text-sm font-bold text-[#24443e]">Qty</th>
                  <th className="p-4 text-sm font-bold text-[#24443e]">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((i) => (
                  <tr
                    key={i.id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-semibold text-[#24443e]">
                      {i.product?.name || "—"}
                    </td>
                    <td className="p-4 text-[#24443e]">{i.quantity}</td>
                    <td className="p-4 font-extrabold text-[#1f5b3f]">
                      ₹{i.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* UPDATE STATUS */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-extrabold text-[#24443e]">
            Update Status
          </h2>

          <select
            className="w-full sm:w-[280px] border border-black/10 bg-[#f8fbf7] px-4 py-3 rounded-2xl font-semibold text-[#24443e] outline-none focus:ring-2 focus:ring-[#1f5b3f]/30"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="DELIVERED">Delivered</option>
          </select>

          <button
            onClick={updateStatus}
            disabled={saving}
            className="
              inline-flex items-center justify-center
              rounded-full
              bg-[#1f5b3f] text-white
              px-10 py-3
              font-extrabold
              hover:bg-[#234e35]
              transition
              disabled:opacity-60
            "
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
