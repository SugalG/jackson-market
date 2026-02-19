"use client";

import PageBanner from "@/components/PageBanner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/auth/admin-login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <div>
      {/* ✅ PAGE BANNER */}
      <PageBanner
        title="Admin Login"
        breadcrumbBase="Home"
        breadcrumbCurrent="Admin"
      />

      {/* ✅ EXISTING FORM (UNCHANGED) */}
      <div className="max-w-sm mx-auto mt-16 bg-white border border-gray-200 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center text-[#1f5b3f] mb-6">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            required
            className="w-full border px-3 py-2 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border px-3 py-2 rounded-lg"
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#1f5b3f] text-white py-2 rounded-lg hover:bg-[#184731] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
