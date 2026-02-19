"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderDetails from "./order-details";

export default function AdminOrderPage(props) {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function unwrap() {
      const p = await props.params;
      setId(p.id);
    }
    unwrap();
  }, [props.params]);

  useEffect(() => {
    if (!id) return;

    async function loadOrder() {
      setLoading(true);

      const res = await fetch(`/api/admin/orders/${id}`, {
        credentials: "include", 
      });

      if (res.ok) {
        setOrder(await res.json());
      } else {
        console.error("Error loading order:", await res.text());
        setOrder(null);
      }

      setLoading(false);
    }

    loadOrder();
  }, [id]);

  if (!id) return <div className="p-6">Loading...</div>;
  if (loading) return <div className="p-6">Loading order...</div>;

  if (!order) {
    return (
      <div className="p-6">
        <p>Order not found.</p>

        <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
          onClick={() => router.push("/admin/orders")}
        >
          Back
        </button>
      </div>
    );
  }

  return <OrderDetails order={order} />;
}
