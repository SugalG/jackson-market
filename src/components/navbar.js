"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar({ user }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/cart", label: "Cart" },
    { href: "/orders", label: "Orders" },
  ];

  const [cartCount, setCartCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // 🔹 Fetch cart count
  useEffect(() => {
    async function fetchCartCount() {
      try {
        const res = await fetch("/api/cart", {
          credentials: "include",
        });

        if (!res.ok) {
          setCartCount(0);
          return;
        }

        const data = await res.json();

        const count = data.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    }

    fetchCartCount();
  }, []);

  // ✅ Close mobile menu on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false); // md breakpoint
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full z-50 font-quicksand">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          {/* LOGO */}
          <a
            href="/"
            className="
              flex items-center gap-4
              px-5 sm:px-6 py-4
              rounded-full
              border border-white/30
              text-white
              hover:border-white/60
              transition
              backdrop-blur
            "
          >
            <img
              src="/logo.svg"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              alt="Jackson Market"
            />
            <span className="font-extrabold text-base sm:text-lg tracking-tight">
              Jackson Market
            </span>
          </a>

          {/* CENTER NAV (DESKTOP) */}
          <nav
            className="
              hidden md:flex items-center gap-2
              px-8 py-4
              rounded-full
              border border-white/30
              backdrop-blur
            "
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="
                  px-5 py-3 rounded-full
                  text-base font-semibold
                  text-white/85
                  hover:text-white
                  transition
                "
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* 🛒 CART (ICON + COUNT) */}
            <a
              href="/cart"
              className="
                relative h-14 w-14
                rounded-full
                border border-white/30
                flex items-center justify-center
                hover:border-white/60
                transition
                backdrop-blur
              "
              aria-label="Cart"
            >
              <ShoppingCart className="h-6 w-6 text-white" />

              {cartCount > 0 && (
                <span
                  className="
                    absolute -top-1 -right-1
                    h-6 min-w-[24px]
                    px-1
                    rounded-full
                    bg-[#39d98a]
                    text-[#0b2b1b]
                    text-xs
                    font-extrabold
                    flex items-center justify-center
                  "
                >
                  {cartCount}
                </span>
              )}
            </a>

            {/* SUPPORT + LOGIN (DESKTOP) */}
            <div
              className="
                hidden md:flex items-center gap-5
                px-6 py-4
                rounded-full
                border border-white/30
                backdrop-blur
              "
            >
              <div className="hidden lg:block leading-tight">
                <div className="text-sm text-white/70 font-medium">
                  Call support 24/7
                </div>
                <div className="text-[#39d98a] font-extrabold text-base">
                  +1 (444) 075 8494
                </div>
              </div>

              {user ? (
                <form
                  action={
                    user.role === "ADMIN"
                      ? "/api/auth/admin-logout"
                      : "/api/auth/logout"
                  }
                  method="POST"
                >
                  <button className="text-base font-semibold text-white hover:text-[#39d98a] transition">
                    Logout
                  </button>
                </form>
              ) : (
                <a
                  href="/login"
                  className="text-base font-semibold text-white hover:text-[#39d98a] transition"
                >
                  Login
                </a>
              )}
            </div>

            {/* ✅ MOBILE TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="
                md:hidden
                h-14 w-14
                rounded-full
                border border-white/30
                flex items-center justify-center
                hover:border-white/60
                transition
                backdrop-blur
              "
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* ✅ MOBILE MENU DROPDOWN */}
        {mobileOpen && (
          <div className="mx-auto max-w-7xl mt-4 md:hidden">
            <div
              className="
                rounded-3xl
                border border-white/25
                bg-white/10
                backdrop-blur
                overflow-hidden
              "
            >
              {/* LINKS */}
              <div className="p-3">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="
                      block w-full
                      px-5 py-4
                      rounded-2xl
                      text-white/90
                      font-semibold
                      hover:bg-white/10
                      transition
                    "
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* SUPPORT */}
              <div className="px-6 pb-5">
                <div className="text-sm text-white/70 font-medium">
                  Call support 24/7
                </div>
                <div className="text-[#39d98a] font-extrabold text-base">
                  +1 (444) 075 8494
                </div>
              </div>

              {/* LOGIN/LOGOUT */}
              <div className="px-6 pb-6">
                {user ? (
                  <form
                    action={
                      user.role === "ADMIN"
                        ? "/api/auth/admin-logout"
                        : "/api/auth/logout"
                    }
                    method="POST"
                    onSubmit={() => setMobileOpen(false)}
                  >
                    <button
                      className="
                        w-full
                        px-6 py-4
                        rounded-2xl
                        border border-white/25
                        text-white font-semibold
                        hover:border-white/60
                        hover:text-[#39d98a]
                        transition
                        backdrop-blur
                      "
                    >
                      Logout
                    </button>
                  </form>
                ) : (
                  <a
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="
                      block text-center
                      px-6 py-4
                      rounded-2xl
                      border border-white/25
                      text-white font-semibold
                      hover:border-white/60
                      hover:text-[#39d98a]
                      transition
                      backdrop-blur
                    "
                  >
                    Login
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
