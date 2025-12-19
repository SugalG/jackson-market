"use client";

import PageBanner from "../PageBanner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCart() {
    const res = await fetch("/api/cart", { credentials: "include" });

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemId: id, quantity: qty }),
    });

    fetchCart();
  }

  async function removeItem(id) {
    await fetch("/api/cart", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemId: id }),
    });

    fetchCart();
  }

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#eff5ee] min-h-screen">
      {/* ✅ PAGE BANNER */}
      <PageBanner title="Cart" breadcrumbBase="Home" breadcrumbCurrent="Cart" />

      {/* ✅ LOADING */}
      {loading && (
        <section className="w-full px-4 sm:px-6 lg:px-12 py-10">
          <div className="mx-auto max-w-7xl rounded-3xl bg-white shadow-sm p-8">
            <p className="font-[Quicksand] text-[#24443e]/70">
              Loading cart...
            </p>
          </div>
        </section>
      )}

      {/* ✅ EMPTY CART */}
      {!loading && cart.length === 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-12 py-10">
          <div className="mx-auto max-w-7xl rounded-3xl bg-white shadow-sm p-10 sm:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-[#eff5ee] flex items-center justify-center shadow-sm">
                <ShoppingBag className="text-[#1f5b3f]" size={34} />
              </div>

              <h2
                className="
                  mt-6
                  font-[Quicksand] font-semibold
                  tracking-[0.02em]
                  text-[#24443e]
                  text-2xl sm:text-3xl
                  leading-tight
                "
              >
                Your cart is currently empty
              </h2>

              <p className="mt-3 font-[Quicksand] text-[#24443e]/65 max-w-md">
                Looks like you haven’t added anything yet. Browse our products
                and start shopping.
              </p>

              <Link
                href="/products"
                className="
                  mt-8 inline-flex items-center gap-2
                  rounded-full bg-[#1f5b3f] text-white
                  px-10 py-4
                  font-[Quicksand] font-semibold
                  shadow-sm
                  hover:bg-[#234e35]
                  active:scale-[0.99]
                  transition
                "
              >
                Return to shop <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ✅ CART CONTENT */}
      {!loading && cart.length > 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-12 py-10">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            {/* ITEMS */}
            <div className="rounded-3xl bg-white shadow-sm p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h1
                    className="
                      font-[Quicksand] font-semibold
                      tracking-[0.02em] md:tracking-[0.025em]
                      text-[#24443e]
                      text-[1.7rem] sm:text-[2rem]
                      leading-[1.1]
                    "
                  >
                    Your Cart
                  </h1>

                  <p className="mt-1 font-[Quicksand] text-[#24443e]/60">
                    {cart.length} item{cart.length === 1 ? "" : "s"} in your cart
                  </p>
                </div>

                <Link
                  href="/products"
                  className="
                    hidden sm:inline-flex items-center gap-2
                    font-[Quicksand] font-semibold
                    text-sm text-[#1f5b3f]
                    hover:opacity-80 transition
                  "
                >
                  Continue shopping <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="
                      rounded-3xl
                      bg-[#f8fbf7]
                      border border-black/5
                      p-4 sm:p-5
                      flex flex-col sm:flex-row
                      gap-4
                      sm:items-center
                    "
                  >
                    {/* image */}
                    <div className="h-24 w-full sm:w-24 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden">
                      <img
                        src={item.product.images?.[0]}
                        alt={item.product.name}
                        className="max-h-[72px] w-auto object-contain"
                      />
                    </div>

                    {/* info */}
                    <div className="flex-1 min-w-0">
                      <h2
                        className="
                          font-[Quicksand] font-semibold
                          text-[#24443e]
                          text-lg
                          leading-snug
                          truncate
                        "
                        title={item.product.name}
                      >
                        {item.product.name}
                      </h2>

                      <p className="mt-1 font-[Quicksand] font-bold text-[#1f5b3f]">
                        ₹{item.product.price}
                      </p>

                      {/* qty */}
                      <div className="mt-3 inline-flex items-center gap-3 rounded-2xl bg-[#eff5ee] px-3 py-2">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="
                            h-9 w-9 rounded-xl bg-white shadow-sm
                            flex items-center justify-center
                            hover:opacity-95 active:scale-[0.98]
                            transition
                          "
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} className="text-[#24443e]" />
                        </button>

                        <span className="min-w-[32px] text-center font-[Quicksand] font-semibold text-[#24443e]">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="
                            h-9 w-9 rounded-xl bg-white shadow-sm
                            flex items-center justify-center
                            hover:opacity-95 active:scale-[0.98]
                            transition
                          "
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} className="text-[#24443e]" />
                        </button>
                      </div>
                    </div>

                    {/* remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="
                        inline-flex items-center gap-2
                        font-[Quicksand] font-semibold
                        text-sm
                        text-red-600
                        hover:opacity-80
                        transition
                        self-start sm:self-center
                      "
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <aside className="rounded-3xl bg-white shadow-sm p-6 sm:p-8 h-fit lg:sticky lg:top-24">
              <h2
                className="
                  font-[Quicksand] font-semibold
                  tracking-[0.02em]
                  text-[#24443e]
                  text-xl
                "
              >
                Order Summary
              </h2>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-[Quicksand] text-[#24443e]/70">
                    Subtotal
                  </span>
                  <span className="font-[Quicksand] font-semibold text-[#24443e]">
                    ₹{total}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-[Quicksand] text-[#24443e]/70">
                    Delivery
                  </span>
                  <span className="font-[Quicksand] font-semibold text-[#24443e]">
                    Calculated at checkout
                  </span>
                </div>

                <div className="h-px bg-black/10 my-2" />

                <div className="flex items-center justify-between">
                  <span className="font-[Quicksand] text-[#24443e] font-semibold">
                    Total
                  </span>
                  <span className="font-[Quicksand] font-bold text-[#1f5b3f] text-xl">
                    ₹{total}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="
                  mt-7 w-full inline-flex items-center justify-center gap-2
                  rounded-2xl bg-[#1f5b3f] text-white
                  px-6 py-3.5
                  font-[Quicksand] font-semibold
                  shadow-sm
                  hover:bg-[#234e35]
                  active:scale-[0.99]
                  transition
                "
              >
                Proceed to Checkout <ArrowRight size={18} />
              </Link>

              <p className="mt-4 font-[Quicksand] text-xs text-[#24443e]/55">
                Secure checkout • Easy returns • Friendly support
              </p>
            </aside>
          </div>
        </section>
      )}
    </div>
  );
}
