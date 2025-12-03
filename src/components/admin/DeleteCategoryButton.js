"use client";

export default function DeleteCategoryButton({ id }) {
  async function handleDelete(e) {
    e.preventDefault();

    if (!confirm("Delete this category?")) return;

    const res = await fetch(`/api/admin/categories/${id}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    }
  }

  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete
    </button>
  );
}
