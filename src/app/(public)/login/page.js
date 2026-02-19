"use client";

import PageBanner from "../../../components/PageBanner";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) return setError(data.error || "Error");

    window.location.href = "/";
  };

  return (
    <div className="font-quicksand">
      {/* ✅ PAGE BANNER */}
      <PageBanner
        title="Login"
        breadcrumbBase="Home"
        breadcrumbCurrent="Login"
      />

      {/* ✅ LOGIN FORM */}
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow mt-10">
        <h1 className="text-2xl mb-4 font-extrabold text-[#1f5b3f]">
          Login
        </h1>

        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}

        <form className="flex flex-col gap-3" onSubmit={submit}>
          <input
            className="border p-2 rounded font-quicksand"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="border p-2 rounded font-quicksand"
            placeholder="Password"
            type="password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="bg-[#1f5b3f] text-white p-2 rounded font-bold hover:bg-[#234e35] transition">
            Login
          </button>
        </form>

        {/* 🔹 Register link */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-[#1f5b3f] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
