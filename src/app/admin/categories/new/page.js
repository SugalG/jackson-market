"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();

  function generateSlug(val) {
    setSlug(val.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, ""));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/admin/categories/create", {
      method: "POST",
      body: JSON.stringify({ name, slug }),
    });

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Add Category</h1>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="font-medium">Name</label>
          <input
            className="w-full mt-1 border p-2 rounded"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              generateSlug(e.target.value);
            }}
          />
        </div>

        <div>
          <label className="font-medium">Slug</label>
          <input
            className="w-full mt-1 border p-2 rounded"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <button className="px-6 py-2 bg-[#1f5b3f] text-white rounded-lg">
          Save Category
        </button>
      </form>
    </div>
  );
}
