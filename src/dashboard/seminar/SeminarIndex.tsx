import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiDelete, apiGet, asArray } from "../../lib/api";
import type { SpeakerItem } from "../../types/api";

export default function SeminarIndex() {
  const [speakers, setSpeakers] = useState<SpeakerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadSpeakers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await apiGet<unknown>("/speakers");
      setSpeakers(asArray<SpeakerItem>(raw));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memuat pembicara. Pastikan backend jalan di port 3000."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSpeakers();
  }, [loadSpeakers]);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus pembicara ini?")) return;
    try {
      setDeletingId(id);
      await apiDelete(`/speakers/${id}`);
      setSpeakers((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menghapus pembicara.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#7B1D3F]">Seminar & Pembicara</h1>
          <p className="text-gray-500 text-sm">Kelola narasumber acara</p>
        </div>
        <Link
          to="/dashboard/seminar/speaker"
          className="bg-[#7B1D3F] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#5a152e] transition-all shadow-lg"
        >
          + Add New Speaker
        </Link>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-white">
          <p className="text-gray-400">Memuat data pembicara...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && speakers.length === 0 && (
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-white">
          <p className="text-gray-300 italic">Belum ada data pembicara tersedia.</p>
        </div>
      )}

      {!loading && !error && speakers.length > 0 && (
        <div className="grid gap-4">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex justify-between gap-4"
            >
              <div>
                <h2 className="text-xl font-bold text-[#7B1D3F]">{speaker.name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Role: </span>
                  {speaker.role}
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Link
                  to={`/dashboard/seminar/${speaker.id}/edit`}
                  className="text-sm text-[#7B1D3F] hover:underline font-semibold"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(speaker.id)}
                  disabled={deletingId === speaker.id}
                  className="text-sm text-red-600 hover:text-red-800 font-medium disabled:opacity-50 text-left"
                >
                  {deletingId === speaker.id ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
