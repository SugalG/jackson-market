"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "", email: "", password: ""
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) return setError(data.error || "Error");

    window.location.href = "/"; // redirect to home
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Create Account</h1>

      {error && <div className="text-red-500">{error}</div>}

      <form className="flex flex-col gap-3" onSubmit={submit}>
        <input className="border p-2" placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="border p-2" placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input className="border p-2" placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
