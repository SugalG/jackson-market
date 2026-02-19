"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Search, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
export default function MainHeader({user}) {

    const {data:cartCount, isLoading} = useQuery({
      queryKey: ["cart-count"],
      queryFn:  async function fetchCartCount() {
                const res = await fetch("/api/cart", {
                    credentials: "include",
                });

                if (!res.ok) {
                   return 0;
                    
                }

                const data = await res.json();
                const count = data.reduce((sum, item) => sum + item.quantity, 0);
                return count;
            }
    })
  

    return (
        <div className=" bg-gradient-to-r
    from-[#0b3b25]
    via-[#0a4729]
    to-[#0b3b25] text-white">
        <div className=" px-4 py-5 flex items-center justify-between gap-6">

          
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.svg" className="h-20 w-20" alt="Logo" />
            <div className="font-extrabold text-lg leading-tight">
              Jackson Market
            </div>
          </a>

          
          <div className="flex items-center gap-8">

          
            <div className="hidden md:flex flex-col items-center text-sm">
              <User className="h-6 w-6 mb-1" />
              {user ? (
                <form
                  action={
                    user.role === "ADMIN"
                      ? "/api/auth/admin-logout"
                      : "/api/auth/logout"
                  }
                  method="POST"
                >
                  <button className="hover:underline">Logout</button>
                </form>
              ) : (
                <a href="/login" className="hover:underline">
                  Sign In
                </a>
              )}
            </div>

            <a
              href="/cart"
              className="relative flex flex-col items-center text-sm"
            >
              <ShoppingCart className="h-6 w-6 mb-1" />
              Cart

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </div>
    )
}