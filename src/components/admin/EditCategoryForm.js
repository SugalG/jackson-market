"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCategoryForm({ category }) {
  const router = useRouter();

  const [name, setName] = useState(category.name);
  const [slug, setSlug] = useState(category.slug);

  function generateSlug(val) {
    setSlug(val.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, ""));
  }

  async function handleSave(e) {
    e.preventDefault();

    await fetch(`/api/admin/categories/${category.id}/update`, {
      method: "PUT",
      body: JSON.stringify({ name, slug }),
    });

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="space-y-5 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold">Edit Category</h1>

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
        Save Changes
      </button>
    </form>
  );
}
