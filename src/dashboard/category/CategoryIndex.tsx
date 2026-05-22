import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiDelete, apiGet, asArray } from "../../lib/api";
import type { CategoryItem } from "../../types/api";

export default function CategoryIndex() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await apiGet<unknown>("/categories");
      setCategories(asArray<CategoryItem>(raw));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memuat kategori. Pastikan backend jalan di port 3000."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus kategori ini?")) return;
    try {
      setDeletingId(id);
      await apiDelete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menghapus kategori.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8 bg-[#F3F4F6] min-h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-8 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#7B1D3F]">Kategori Event</h2>
          <p className="text-gray-500">Kelola jenis kegiatan festival di sini</p>
        </div>
        <Link
          to="/dashboard/category/create"
          className="bg-[#7B1D3F] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#5a152e] transition-all shadow-lg text-center"
        >
          + Add New Category
        </Link>
      </div>

      {loading && (
        <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 p-20 text-center">
          <p className="text-gray-400">Memuat kategori...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && categories.length === 0 && (
        <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 p-20 text-center">
          <p className="text-gray-300 italic font-medium">
            Belum ada data kategori tersedia.
          </p>
        </div>
      )}

      {!loading && !error && categories.length > 0 && (
        <ul className="grid gap-3">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="bg-white rounded-2xl border border-gray-100 px-6 py-4 shadow-sm font-medium text-[#7B1D3F] flex justify-between items-center"
            >
              <span>{cat.name}</span>
              <div className="flex gap-4">
              <Link
                to={`/dashboard/category/${cat.id}/edit`}
                className="text-sm text-[#7B1D3F] hover:underline font-semibold"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(cat.id)}
                disabled={deletingId === cat.id}
                className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
              >
                {deletingId === cat.id ? "Menghapus..." : "Hapus"}
              </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
