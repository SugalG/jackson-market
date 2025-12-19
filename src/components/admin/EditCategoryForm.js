"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCategoryForm({ category }) {
  const router = useRouter();

  const [name, setName] = useState(category.name);
  const [slug, setSlug] = useState(category.slug);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(category.image || null);

  function generateSlug(val) {
    setSlug(
      val
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-z0-9-]/g, "")
    );
  }

  async function handleSave(e) {
    e.preventDefault();

    let imageURL = category.image || null;

    // Upload new image if changed
    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const uploaded = await uploadRes.json();
      imageURL = uploaded.url;
    }

    await fetch(`/api/admin/categories/${category.id}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        image: imageURL, // ✅ important
      }),
    });

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSave}
      className="space-y-5 bg-white p-6 rounded-xl shadow"
    >
      {/* Name */}
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

      {/* Slug */}
      <div>
        <label className="font-medium">Slug</label>
        <input
          className="w-full mt-1 border p-2 rounded"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>

      {/* Image */}
      <div>
        <label className="font-medium">Category Image</label>

        <input
          type="file"
          accept="image/*"
          className="mt-2"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            setImageFile(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

        {preview && (
          <img
            src={preview}
            className="mt-3 h-24 w-24 object-cover rounded-lg border"
            alt="Category preview"
          />
        )}
      </div>

      <button className="px-6 py-2 bg-[#1f5b3f] text-white rounded-lg hover:bg-[#234e35]">
        Save Changes
      </button>
    </form>
  );
}
