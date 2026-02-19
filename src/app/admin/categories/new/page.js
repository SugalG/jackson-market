"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageBanner from "@/app/(public)/PageBanner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchParentCategories } from "@/actions/fetchParentCategory";


export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [parentSlug, setParentSlug] = useState("");

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["parentCategory"],
    queryFn: async () => {
      const res = await fetchParentCategories();
      if (res.success) return res.result;
      throw new Error("Couldn't fetch listing");
    },
    staleTime: 2 * 60 * 1000,
  });

  if (isLoading) return <div>Loading..............</div>;
  if (isError) return <div>Error Happened</div>;

  // Generate slug with parent slug if exists
  function generateSlug(categoryName, parentSlugValue = "") {
    const slugPart = categoryName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setSlug(parentSlugValue ? `${parentSlugValue}/${slugPart}` : slugPart);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let imageURL = null;

    if (image) {
      const fd = new FormData();
      fd.append("file", image);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      const uploaded = await uploadRes.json();
      imageURL = uploaded.url;
    }

    const res = await fetch("/api/admin/categories/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        image: imageURL,
        parentId,
      }),
    });

    if (!res.ok) {
      alert("Failed to create category");
      return;
    }
    queryClient.invalidateQueries({
      queryKey:["parentCategory"]
    })
    

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <div>
      {/* PAGE BANNER */}
      <PageBanner title="Add Category" breadcrumbBase="Admin" breadcrumbCurrent="Add Category" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-10">
        <h1 className="font-quicksand text-2xl md:text-3xl font-extrabold text-[#24443e] mb-6">
          Add New Category
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white rounded-3xl border border-black/5 shadow-sm p-6"
        >
          {/* NAME */}
          <div>
            <label className="font-quicksand font-semibold text-sm text-[#24443e]">
              Category Name
            </label>
            <input
              className="w-full mt-2 border rounded-xl p-3 font-quicksand"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                generateSlug(e.target.value, parentSlug);
              }}
              required
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="font-quicksand font-semibold text-sm text-[#24443e]">
              Slug
            </label>
            <input
              className="w-full mt-2 border rounded-xl p-3 font-quicksand"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="font-quicksand font-semibold text-sm text-[#24443e]">Category Image</label>
            <input
              type="file"
              accept="image/*"
              className="block mt-3 font-quicksand text-sm"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImage(file);
                setPreview(file ? URL.createObjectURL(file) : null);
              }}
            />
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="h-24 w-24 object-cover rounded-xl border" />
              </div>
            )}
          </div>

          {/* PARENT CATEGORY */}
          <div>
            <label className="font-quicksand font-semibold text-sm text-[#24443e]">
              Parent Category (Optional)
            </label>
            <select
              className="w-full mt-2 border rounded-xl p-3 font-quicksand"
              value={parentId ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                const selectedParent = data.find((c) => c.id === Number(value));
                setParentId(value ? Number(value) : null);
                setParentSlug(selectedParent ? selectedParent.slug : "");
                generateSlug(name, selectedParent ? selectedParent.slug : "");
              }}
            >
              <option value="">-- None (Top Level Category) --</option>
              {data?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#1f5b3f] text-white font-quicksand font-bold hover:bg-[#234e35] transition"
            >
              Save Category
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/categories")}
              className="px-8 py-3 rounded-full border font-quicksand font-semibold text-[#24443e] hover:bg-[#eff5ee] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
