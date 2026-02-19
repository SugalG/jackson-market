"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageBanner from "@/components/PageBanner";
export default function EditProductForm({ product, categories }) {
  const router = useRouter();

  const [name, setName] = useState(product.name || "");
  const [slug, setSlug] = useState(product.slug || "");
  const [price, setPrice] = useState(product.price ?? 0);
  const [stock, setStock] = useState(product.stock ?? 0);
  const [description, setDescription] = useState(product.description || "");
  const [categoryId, setCategoryId] = useState(product.categoryId ?? "");

  // image
  const [preview, setPreview] = useState(product.images?.[0] || null);
  const [imageFile, setImageFile] = useState(null);

  // UX: stop auto-overwriting slug after manual edit
  const [slugTouched, setSlugTouched] = useState(false);

  // submit state
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // to cleanup object url
  const previewUrlRef = useRef(null);

  function generateSlug(val) {
    return val
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");
  }

  // cleanup blob url when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  // CLOUDINARY IMAGE UPLOAD
  async function uploadToCloudinary(file) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    return data.url;
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImage = product.images?.[0] || "";

      if (imageFile) {
        finalImage = await uploadToCloudinary(imageFile);
      }

      const res = await fetch(`/api/admin/products/${product.id}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          price: Number(price),
          stock: Number(stock),
          description,
          categoryId: Number(categoryId),
          images: [finalImage],
        }),
      });

      if (!res.ok) {
        alert("Error updating product");
        setSaving(false);
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleting(true);

    const res = await fetch(`/api/admin/products/${product.id}/delete`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Error deleting product");
      setDeleting(false);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
     <div>
          {/* ✅ PAGE BANNER */}
          <PageBanner
            title="Edit Products"
            breadcrumbBase="Admin"
            breadcrumbCurrent="Products"
          />
    <form
      onSubmit={handleSave}
      className="
        font-quicksand
        space-y-6
        bg-white
        border border-[#1f5b3f]/10
        p-6 sm:p-8
        rounded-3xl
        shadow-sm
      "
    >
      {/* Title row */}
      <div className="pb-2 border-b border-[#1f5b3f]/10">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1f5b3f]">
          Edit Product
        </h2>
        <p className="mt-1 text-sm text-gray-600 font-medium">
          Update details, pricing, stock and image.
        </p>
      </div>

      {/* Name */}
      <div>
        <label className="font-bold text-[#24443e]">Name</label>
        <input
          className="
            w-full mt-2
            border border-black/10
            bg-[#f8fbf7]
            px-4 py-3
            rounded-2xl
            outline-none
            focus:border-[#1f5b3f]/40
            focus:ring-2 focus:ring-[#1f5b3f]/10
          "
          value={name}
          onChange={(e) => {
            const v = e.target.value;
            setName(v);

            // only auto-generate slug if user hasn't edited it manually
            if (!slugTouched) setSlug(generateSlug(v));
          }}
          placeholder="Product name"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="font-bold text-[#24443e]">Slug</label>
        <input
          className="
            w-full mt-2
            border border-black/10
            bg-[#f8fbf7]
            px-4 py-3
            rounded-2xl
            outline-none
            focus:border-[#1f5b3f]/40
            focus:ring-2 focus:ring-[#1f5b3f]/10
          "
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          placeholder="product-slug"
          required
        />
        <p className="mt-2 text-xs text-gray-500 font-medium">
          Tip: Use lowercase words separated by hyphens.
        </p>
      </div>

      {/* Category */}
      <div>
        <label className="font-bold text-[#24443e]">Category</label>
        <select
          className="
            w-full mt-2
            border border-black/10
            bg-[#f8fbf7]
            px-4 py-3
            rounded-2xl
            outline-none
            focus:border-[#1f5b3f]/40
            focus:ring-2 focus:ring-[#1f5b3f]/10
          "
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          required
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price + Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-bold text-[#24443e]">Price</label>
          <input
            type="number"
            className="
              w-full mt-2
              border border-black/10
              bg-[#f8fbf7]
              px-4 py-3
              rounded-2xl
              outline-none
              focus:border-[#1f5b3f]/40
              focus:ring-2 focus:ring-[#1f5b3f]/10
            "
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="font-bold text-[#24443e]">Stock</label>
          <input
            type="number"
            className="
              w-full mt-2
              border border-black/10
              bg-[#f8fbf7]
              px-4 py-3
              rounded-2xl
              outline-none
              focus:border-[#1f5b3f]/40
              focus:ring-2 focus:ring-[#1f5b3f]/10
            "
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min="0"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="font-bold text-[#24443e]">Description</label>
        <textarea
          className="
            w-full mt-2
            border border-black/10
            bg-[#f8fbf7]
            px-4 py-3
            rounded-2xl
            outline-none
            focus:border-[#1f5b3f]/40
            focus:ring-2 focus:ring-[#1f5b3f]/10
            min-h-[120px]
          "
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description..."
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="font-bold text-[#24443e]">Product Image</label>

        <div className="mt-3 flex flex-col sm:flex-row items-start gap-5">
          {/* Preview box */}
          <div
            className="
              w-40 h-40
              rounded-3xl
              border border-black/10
              bg-[#f8fbf7]
              flex items-center justify-center
              overflow-hidden
              shrink-0
            "
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm text-gray-500 font-semibold">
                No image
              </span>
            )}
          </div>

          {/* File input */}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              className="
                w-full
                file:mr-4 file:py-3 file:px-4
                file:rounded-2xl
                file:border-0
                file:bg-[#1f5b3f]
                file:text-white
                file:font-bold
                hover:file:bg-[#234e35]
                transition
                text-sm
              "
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setImageFile(file);

                // cleanup previous blob url
                if (previewUrlRef.current) {
                  URL.revokeObjectURL(previewUrlRef.current);
                }

                const url = URL.createObjectURL(file);
                previewUrlRef.current = url;
                setPreview(url);
              }}
            />

            <p className="mt-2 text-xs text-gray-500 font-medium">
              Uploading a new image will replace the current one.
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          disabled={saving}
          className="
            inline-flex items-center justify-center
            px-6 py-3
            rounded-2xl
            bg-[#1f5b3f]
            text-white
            font-extrabold
            hover:bg-[#234e35]
            transition
            disabled:opacity-60
          "
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="
            inline-flex items-center justify-center
            px-6 py-3
            rounded-2xl
            border border-red-500/60
            text-red-600
            font-extrabold
            hover:bg-red-50
            transition
            disabled:opacity-60
          "
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </form>
    </div>
  );
}
