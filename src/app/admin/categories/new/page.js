"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const router = useRouter();

  function generateSlug(val) {
    setSlug(
      val
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "")
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let imageURL = null;

    // ✅ 1. Upload image if selected
    if (image) {
      const fd = new FormData();
      fd.append("file", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const uploaded = await uploadRes.json();
      imageURL = uploaded.url;
    }

    // ✅ 2. Send image URL to API
    const res = await fetch("/api/admin/categories/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        image: imageURL, // 🔥 THIS WAS MISSING
      }),
    });

    if (!res.ok) {
      alert("Failed to create category");
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Add Category</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-xl shadow"
      >
        {/* NAME */}
        <div>
          <label className="font-medium">Name</label>
          <input
            className="w-full mt-1 border p-2 rounded"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              generateSlug(e.target.value);
            }}
            required
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="font-medium">Slug</label>
          <input
            className="w-full mt-1 border p-2 rounded"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        {/* IMAGE */}
        <div>
          <label className="font-medium">Category Image</label>
          <input
            type="file"
            accept="image/*"
            className="mt-2"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />

          {preview && (
            <img
              src={preview}
              className="mt-3 h-24 w-24 object-cover rounded-lg"
            />
          )}
        </div>

        <button className="px-6 py-2 bg-[#1f5b3f] text-white rounded-lg">
          Save Category
        </button>
      </form>
    </div>
  );
}
