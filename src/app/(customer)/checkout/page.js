"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  async function fetchCart() {
    setLoadingCart(true);
    const res = await fetch("/api/cart", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      setCart(data);
    } else {
      setCart([]);
    }

    setLoadingCart(false);
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  async function placeOrder() {
    setError("");

    if (!address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setPlacing(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });

    setPlacing(false);

    if (!res.ok) {
      let data = null;
      try {
        data = await res.json();
      } catch (e) {
        // ignore body parse errors
      }
      setError(data?.error || "Failed to place order. Please try again.");
      return;
    }

    // Later when you integrate a payment gateway, this is where
    // you'd either:
    // - redirect to payment page, or
    // - show payment options before calling /api/orders.
    // For now we just create order and go to "My Orders".
    router.push("/orders");
  }

  if (loadingCart) {
    return <div className="p-6">Loading checkout...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <Link href="/products" className="text-blue-600 hover:underline">
          Continue shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      {/* Order summary */}
      <div className="bg-white rounded-xl shadow p-4 space-y-3">
        <h2 className="font-semibold mb-2">Order Summary</h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-2 last:border-b-0"
          >
            <div>
              <div className="font-medium">{item.product.name}</div>
              <div className="text-sm text-gray-500">
                Qty: {item.quantity} × ₹{item.product.price}
              </div>
            </div>

            <div className="font-semibold">
              ₹{item.product.price * item.quantity}
            </div>
          </div>
        ))}

        <div className="pt-3 mt-2 border-t flex justify-between items-center">
          <span className="font-semibold text-lg">Total</span>
          <span className="font-semibold text-lg text-[#1f5b3f]">
            ₹{total}
          </span>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl shadow p-4 space-y-3">
        <h2 className="font-semibold">Delivery Address</h2>
        <textarea
          className="w-full border rounded-lg p-2 min-h-[100px]"
          placeholder="Enter your full delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}

      <button
        onClick={placeOrder}
        disabled={placing}
        className="w-full py-3 bg-[#1f5b3f] text-white rounded-lg font-semibold hover:bg-[#234e35] disabled:opacity-60"
      >
        {placing ? "Placing order..." : "Place Order"}
      </button>
    </div>
  );
}
