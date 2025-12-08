"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/admin/products/${id}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh(); // Reload server component
    } else {
      alert("Failed to delete product");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="w-full text-center py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50 text-sm"
    >
      Delete
    </button>
  );
}
