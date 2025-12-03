"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderDetails({ order }) {
  const router = useRouter();

  const [status, setStatus] = useState(order.status);

  async function updateStatus() {
    await fetch(`/api/admin/orders/${order.id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });

    router.push("/admin/orders");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Order #{order.id}</h1>

      
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-lg font-medium">{order.user.name}</p>
        <p className="text-gray-600">{order.user.email}</p>
      </div>

      
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Items</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Product</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((i) => (
              <tr key={i.id} className="border-b">
                <td className="p-2">{i.product.name}</td>
                <td className="p-2">{i.quantity}</td>
                <td className="p-2">₹{i.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <h2 className="font-semibold">Update Status</h2>

        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
          <option value="DELIVERED">Delivered</option>
        </select>

        <button
          onClick={updateStatus}
          className="px-5 py-2 bg-[#1f5b3f] text-white rounded hover:bg-[#234e35]"
        >
          Save
        </button>
      </div>
    </div>
  );
}
