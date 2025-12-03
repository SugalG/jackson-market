"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductForm({ product, categories }) {
    const router = useRouter();

    const [name, setName] = useState(product.name);
    const [slug, setSlug] = useState(product.slug);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [description, setDescription] = useState(product.description);
    const [categoryId, setCategoryId] = useState(product.categoryId);
    const [preview, setPreview] = useState(product.images[0]);
    const [imageFile, setImageFile] = useState(null);

    function generateSlug(val) {
        const s = val.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "");
        setSlug(s);
    }

    async function handleSave(e) {
        e.preventDefault();

        let imageURL = preview;

        // Upload file if changed
        if (imageFile) {
            const fd = new FormData();
            fd.append("file", imageFile);

            const upRes = await fetch("/api/upload", {
                method: "POST",
                body: fd,
            });

            const up = await upRes.json();
            imageURL = up.url;
        }

        // PUT request to update
        await fetch(`/api/admin/products/${product.id}/update`, {
            method: "PUT",
            body: JSON.stringify({
                name,
                slug,
                price: Number(price),
                stock: Number(stock),
                description,
                categoryId: Number(categoryId),
                images: [imageURL],
            }),
        });

        router.push("/admin/products");
        router.refresh();
    }

    async function handleDelete() {
        if (!confirm("Delete this product?")) return;

        await fetch(`/api/admin/products/${product.id}/delete`, {
            method: "DELETE",
        });

        router.push("/admin/products");
        router.refresh();
    }

    return (
        <form onSubmit={handleSave} className="space-y-5 bg-white p-6 rounded-xl shadow">
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

            {/* Category */}
            <div>
                <label className="font-medium">Category</label>
                <select
                    className="w-full mt-1 border p-2 rounded"
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                >
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* Price + Stock */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="font-medium">Price</label>
                    <input
                        type="number"
                        className="w-full mt-1 border p-2 rounded"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="flex-1">
                    <label className="font-medium">Stock</label>
                    <input
                        type="number"
                        className="w-full mt-1 border p-2 rounded"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="font-medium">Description</label>
                <textarea
                    className="w-full mt-1 border p-2 rounded"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Image */}
            <div>
                <label className="font-medium">Product Image</label>
                <input
                    type="file"
                    accept="image/*"
                    className="mt-2"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        setImageFile(file);
                        setPreview(URL.createObjectURL(file));
                    }}
                />

                {preview && (
                    <img src={preview} className="h-32 w-32 mt-3 object-cover rounded" />
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <button className="px-6 py-2 bg-[#1f5b3f] text-white rounded-lg hover:bg-[#234e35]">
                    Save Changes
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
                >
                    Delete
                </button>
            </div>
        </form>
    );
}
