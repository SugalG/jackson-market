"use client";

import { useState } from "react";

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: qty,
      }),
    });

    setAdding(false);

    if (res.ok) {
      alert("Added to cart!");
    } else {
      alert("Could not add to cart. Please login.");
    }
  }

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full rounded-lg object-cover"
        />

        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-xl text-green-600 mt-2">₹{product.price}</p>

          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* 🔥 Quantity Selector */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={decreaseQty}
              className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded text-xl hover:bg-gray-300"
            >
              −
            </button>

            <span className="text-2xl font-semibold w-10 text-center">
              {qty}
            </span>

            <button
              onClick={increaseQty}
              className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded text-xl hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* 🔥 Add to Cart */}
          <button
            onClick={addToCart}
            disabled={adding}
            className={`mt-6 w-full bg-[#1f5b3f] text-white px-4 py-3 rounded-lg text-lg font-medium shadow hover:bg-[#234e35] transition ${
              adding ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
