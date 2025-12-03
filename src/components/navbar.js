"use client";

import { usePathname } from "next/navigation";

export default function Navbar({ user }) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/cart", label: "Cart" },
    { href: "/orders", label: "Orders" },
  ];

  return (
    <header className="bg-[#1f5b3f] text-[#f4f1e8] h-16 flex items-center shadow-sm">
      <div className="mx-auto w-full max-w-6xl flex items-center justify-between px-4">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            className="h-16 w-24 object-contain"
            alt="Jackson Market"
          />
        </a>

        {/* Links */}
        <nav className="flex items-center gap-2 text-sm">

          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-full transition ${
                  active
                    ? "bg-[#f4f1e8] text-[#1f5b3f]"
                    : "hover:bg-[#234e35]"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          {/* If ADMIN → show Admin Panel */}
          {user?.role === "ADMIN" && (
            <a
              href="/admin"
              className="px-4 py-1.5 rounded-full bg-[#f4f1e8] text-[#1f5b3f] font-medium hover:bg-white transition"
            >
              Admin
            </a>
          )}

          {/* Login / Logout */}
          {user ? (
            <form
              action={
                user.role === "ADMIN"
                  ? "/api/auth/admin-logout"
                  : "/api/auth/logout"
              }
              method="POST"
            >
              <button className="border border-[#f4f1e8] rounded-full px-4 py-1.5 hover:bg-[#f4f1e8] hover:text-[#1f5b3f]">
                Logout
              </button>
            </form>
          ) : (
            <a
              href="/login"
              className="border border-[#f4f1e8] rounded-full px-4 py-1.5 hover:bg-[#f4f1e8] hover:text-[#1f5b3f]"
            >
              Login
            </a>
          )}

        </nav>

      </div>
    </header>
  );
}
