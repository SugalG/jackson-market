"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCart() {
    const res = await fetch("/api/cart", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      setCart(data);
    } else {
      setCart([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchCart();
  }, []);

  async function updateQty(id, qty) {
    if (qty < 1) return;

    await fetch("/api/cart", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItemId: id, quantity: qty }),
    });

    fetchCart();
  }

  async function removeItem(id) {
    await fetch("/api/cart", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItemId: id }),
    });

    fetchCart();
  }

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return <div className="p-6">Loading cart...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <Link
          href="/products"
          className="text-blue-600 hover:underline"
        >
          Continue shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow"
          >
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.product.name}</h2>
              <p className="text-green-700">₹{item.product.price}</p>

              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>

                <span className="px-3">{item.quantity}</span>

                <button
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
        <p className="text-xl font-semibold">Total: ₹{total}</p>

        <Link
          href="/checkout"
          className="px-6 py-3 bg-[#1f5b3f] text-white rounded-lg hover:bg-[#234e35]"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
