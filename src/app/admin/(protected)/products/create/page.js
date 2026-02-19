"use client";

import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useState, useEffect } from "react";

export default function AddProductPage() {

  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");


  // Load categories correctly
  const { data: categories, isLoading, isError } = useFetchCategories();

  if (isLoading) {
    return <div>Loading.....</div>
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let imageURL = "";

    // Upload image if selected
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploaded = await uploadRes.json();
      imageURL = uploaded.url;
    }

    const formData = {
      name: e.target.name.value,
      slug: e.target.slug.value,
      price: e.target.price.value,
      stock: e.target.stock.value,
      description: e.target.description.value,
      categoryId: subCategoryId || parentCategoryId, // use subcategory if exists
      images: imageURL ? [imageURL] : [],
    };


    const res = await fetch("/api/admin/products/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // REQUIRED
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (result.success) {
      window.location.href = "/admin/products";
    } else {
      alert(result.error || "Error adding product");
    }
  }

  function generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow">

        {/* NAME */}
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => {
              const slugField = document.querySelector("input[name='slug']");
              if (slugField) slugField.value = generateSlug(e.target.value);
            }}
            className="w-full mt-1 border p-2 rounded"
            required
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            className="w-full mt-1 border p-2 rounded"
            required
          />
        </div>

        {/* CATEGORY */}
        {/* PARENT CATEGORY */}
        <div>
          <label className="font-medium">Category</label>
          <select
            value={parentCategoryId}
            onChange={(e) => {
              setParentCategoryId(e.target.value);
              setSubCategoryId(""); // reset subcategory
            }}
            className="w-full mt-1 border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* SUBCATEGORY */}
        {parentCategoryId && categories.find(c => c.id == parentCategoryId)?.children?.length > 0 && (
          <div>
            <label className="font-medium">Subcategory (Optional)</label>
            <select
              value={subCategoryId}
              onChange={(e) => setSubCategoryId(e.target.value)}
              className="w-full mt-1 border p-2 rounded"
              required
            >
              <option value="">Select Subcategory</option>
              {categories
                .find((c) => c.id == parentCategoryId)
                .children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
            </select>
          </div>
        )}


        {/* PRICE + STOCK */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="font-medium">Price</label>
            <input
              type="number"
              name="price"
              step="0.01"
              className="w-full mt-1 border p-2 rounded"
              required
            />
          </div>

          <div className="flex-1">
            <label className="font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              className="w-full mt-1 border p-2 rounded"
              required
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            rows="3"
            className="w-full mt-1 border p-2 rounded"
            required
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="font-medium">Product Image</label>
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
              className="mt-3 h-40 w-40 object-cover rounded"
            />
          )}
        </div>

        <button className="px-6 py-2 bg-[#1f5b3f] text-white rounded-lg hover:bg-[#234e35]">
          Save Product
        </button>
      </form>
    </div>
  );
}
