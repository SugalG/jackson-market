"use client";

import PageBanner from "@/components/PageBanner";
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
    const res = await fetch("/api/cart", { credentials: "include" });

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });

    setPlacing(false);

    if (!res.ok) {
      let data = null;
      try {
        data = await res.json();
      } catch (e) {}
      setError(data?.error || "Failed to place order. Please try again.");
      return;
    }

    router.push("/orders");
  }

  return (
    <div className="w-full">
      {/* ✅ BANNER */}
      <PageBanner
        title="Checkout"
        breadcrumbBase="Home"
        breadcrumbCurrent="Checkout"
      />

      {/* ✅ PAGE CONTENT */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 py-10">
        {loadingCart ? (
          <div className="text-gray-700">Loading checkout...</div>
        ) : cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-[#1f5b3f]/20 rounded-3xl py-20 px-6 text-center">
            {/* ICON */}
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white border border-[#1f5b3f]/15">
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
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
            </div>

            <h2 className="font-quicksand text-2xl font-extrabold text-[#1f5b3f] uppercase tracking-wide">
              Your cart is empty
            </h2>

            <p className="font-quicksand text-gray-600 max-w-md mt-3 mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>

            <Link
              href="/products"
              className="font-quicksand inline-flex items-center justify-center rounded-full bg-[#1f5b3f] text-white px-10 py-4 font-bold hover:bg-[#234e35] transition"
            >
              Return to shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT: ADDRESS */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border border-[#1f5b3f]/20 rounded-3xl p-6">
                <h2 className="font-quicksand text-xl font-extrabold text-[#1f5b3f]">
                  Delivery Address
                </h2>

                <p className="font-quicksand text-sm text-gray-600 mt-1">
                  Please enter your full address so we can deliver smoothly.
                </p>

                <textarea
                  className="font-quicksand w-full mt-4 border border-[#1f5b3f]/15 rounded-2xl p-4 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#1f5b3f]/25"
                  placeholder="Enter your full delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {error && (
                <div className="font-quicksand text-red-600 text-sm bg-red-50 border border-red-200 rounded-2xl p-3">
                  {error}
                </div>
              )}

              <button
                onClick={placeOrder}
                disabled={placing}
                className="
                  font-quicksand
                  w-full
                  rounded-full
                  bg-[#1f5b3f]
                  text-white
                  px-8
                  py-4
                  font-extrabold
                  hover:bg-[#234e35]
                  transition
                  disabled:opacity-60
                "
              >
                {placing ? "Placing order..." : "Place Order"}
              </button>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:col-span-5">
              <div className="border border-[#1f5b3f]/20 rounded-3xl p-6 sticky top-6">
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="font-quicksand text-xl font-extrabold text-[#1f5b3f] whitespace-nowrap">
                    Order Summary
                  </h2>
                  <div className="flex-1 h-px bg-[#1f5b3f]/20" />
                </div>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="font-quicksand font-bold text-gray-900 truncate">
                          {item.product.name}
                        </p>

                        <p className="font-quicksand text-sm text-gray-600 mt-1">
                          Qty: {item.quantity} × ₹{item.product.price}
                        </p>
                      </div>

                      <p className="font-quicksand font-extrabold text-gray-900 whitespace-nowrap">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-[#1f5b3f]/15 flex items-center justify-between">
                  <span className="font-quicksand font-extrabold text-lg text-gray-900">
                    Total
                  </span>
                  <span className="font-quicksand font-extrabold text-lg text-[#1f5b3f]">
                    ₹{total}
                  </span>
                </div>

                <Link
                  href="/cart"
                  className="font-quicksand inline-flex mt-6 w-full items-center justify-center rounded-full border border-[#1f5b3f]/25 px-6 py-3 font-bold text-[#1f5b3f] hover:bg-[#1f5b3f] hover:text-white transition"
                >
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
