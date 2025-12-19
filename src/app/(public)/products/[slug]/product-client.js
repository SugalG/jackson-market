"use client";

import { useState } from "react";
import {
  Truck,
  BadgeCheck,
  Zap,
  ShieldCheck,
  Headset,
  Minus,
  Plus,
} from "lucide-react";

export default function ProductClient({ product }) {
  const [adding, setAdding] = useState(false);
  const [qty, setQty] = useState(1);

  function increaseQty() {
    setQty((q) => q + 1);
  }

  function decreaseQty() {
    setQty((q) => (q > 1 ? q - 1 : 1));
  }

  async function addToCart() {
    setAdding(true);

    const res = await fetch("/api/cart", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, quantity: qty }),
    });

    setAdding(false);

    if (res.ok) alert("Added to cart!");
    else alert("Could not add to cart. Please login.");
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-10 bg-[#eff5ee]">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* IMAGE */}
       {/* IMAGE */}
<div className="relative rounded-3xl bg-white shadow-sm flex items-center justify-center p-6">
  <img
    src={product.images?.[0]}
    alt={product.name}
    className="
      max-h-[260px]
      sm:max-h-[320px]
      lg:max-h-[380px]
      w-auto
      object-contain
    "
  />
</div>


          {/* DETAILS */}
          <div className="rounded-3xl bg-white shadow-sm p-6 sm:p-8">
            <h1
              className="
                font-[Quicksand] font-semibold
                tracking-[0.02em] md:tracking-[0.025em]
                text-[#24443e]
                text-[1.9rem] sm:text-[2.3rem] lg:text-[2.6rem]
                leading-[1.1]
              "
            >
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <p className="font-[Quicksand] text-[1.3rem] sm:text-[1.5rem] font-semibold text-[#1f5b3f]">
                ₹{product.price}
              </p>

            
            </div>

            <p className="mt-5 font-[Quicksand] text-[#24443e]/80 text-base sm:text-lg leading-relaxed">
              {product.description}
            </p>

            {/* ✅ Delivery strip (like screenshot) */}
            <div className="mt-6 rounded-2xl border border-dashed border-[#1f5b3f]/25 bg-[#eff5ee] px-5 py-4 flex items-center gap-3">
              <span className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Truck className="text-[#1f5b3f]" size={20} />
              </span>

              <p className="font-[Quicksand] text-[#24443e] text-sm sm:text-base font-semibold leading-snug">
                We deliver next day from <span className="font-bold">10:00 AM</span>{" "}
                to <span className="font-bold">08:00 PM</span>
              </p>
            </div>

            {/* ✅ Bullet points (below description) */}
            <ul className="mt-5 space-y-3">
              <li className="flex items-start gap-3">
                <BadgeCheck className="mt-[2px] text-[#1f5b3f]" size={18} />
                <span className="font-[Quicksand] text-[#24443e]/85 text-sm sm:text-base">
                  100% Money Back Warranty
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Zap className="mt-[2px] text-[#1f5b3f]" size={18} />
                <span className="font-[Quicksand] text-[#24443e]/85 text-sm sm:text-base">
                  Free and Fast Delivery
                </span>
              </li>

              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-[2px] text-[#1f5b3f]" size={18} />
                <span className="font-[Quicksand] text-[#24443e]/85 text-sm sm:text-base">
                  All Items Top Best Quality
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Headset className="mt-[2px] text-[#1f5b3f]" size={18} />
                <span className="font-[Quicksand] text-[#24443e]/85 text-sm sm:text-base">
                  24/7 Support
                </span>
              </li>
            </ul>

            {/* Quantity + Add to cart */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Qty selector */}
              <div className="flex items-center justify-between sm:justify-start gap-3 rounded-2xl bg-[#eff5ee] px-4 py-3">
                <button
                  onClick={decreaseQty}
                  className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center hover:opacity-95 active:scale-[0.98] transition"
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} className="text-[#24443e]" />
                </button>

                <span className="min-w-[44px] text-center font-[Quicksand] font-semibold text-[#24443e] text-xl">
                  {qty}
                </span>

                <button
                  onClick={increaseQty}
                  className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center hover:opacity-95 active:scale-[0.98] transition"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} className="text-[#24443e]" />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={addToCart}
                disabled={adding}
                className={`
                  w-full sm:flex-1
                  rounded-2xl
                  bg-[#1f5b3f] text-white
                  px-5 py-3.5
                  font-[Quicksand] font-semibold
                  text-base sm:text-lg
                  shadow-sm
                  hover:bg-[#234e35]
                  active:scale-[0.99]
                  transition
                  ${adding ? "opacity-70 cursor-not-allowed" : ""}
                `}
              >
                {adding ? "Adding..." : "Add to Cart"}
              </button>
            </div>

            {/* Optional small hint */}
            <p className="mt-4 font-[Quicksand] text-xs sm:text-sm text-[#24443e]/60">
              Secure checkout • Easy returns • Friendly support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
