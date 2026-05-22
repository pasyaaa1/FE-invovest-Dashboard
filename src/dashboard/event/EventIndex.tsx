import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiDelete, apiGet, asArray } from "../../lib/api";
import { formatDateId } from "../../lib/date";
import type { EventItem } from "../../types/api";

export default function EventIndex() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await apiGet<unknown>("/events");
      setEvents(asArray<EventItem>(raw));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memuat data event. Pastikan backend jalan di port 3000."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus event ini?")) return;
    try {
      setDeletingId(id);
      await apiDelete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menghapus event.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#7B1D3F]">Event</h1>
          <p className="text-gray-500 text-sm">Daftar semua kegiatan festival</p>
        </div>
        <Link
          to="/dashboard/event/new"
          className="bg-[#7B1D3F] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#5a152e] transition-all shadow-lg"
        >
          + Add New Event
        </Link>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-white">
          <p className="text-gray-400">Memuat data event...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-white">
          <p className="text-gray-300 italic">Belum ada data event tersedia.</p>
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="grid gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex justify-between gap-4"
            >
              <div>
                <h2 className="text-xl font-bold text-[#7B1D3F]">{event.name}</h2>
                <dl className="mt-3 grid gap-1 text-sm text-gray-600">
                  <div>
                    <span className="font-medium text-gray-500">Kategori: </span>
                    {event.categoryId}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Lokasi: </span>
                    {event.location}
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Tanggal: </span>
                    {formatDateId(event.dateEvent)}
                  </div>
                  {event.description && (
                    <div>
                      <span className="font-medium text-gray-500">Deskripsi: </span>
                      {event.description}
                    </div>
                  )}
                </dl>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Link
                  to={`/dashboard/event/${event.id}/edit`}
                  className="text-sm text-[#7B1D3F] hover:underline font-semibold"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(event.id)}
                  disabled={deletingId === event.id}
                  className="text-sm text-red-600 hover:text-red-800 font-medium disabled:opacity-50 text-left"
                >
                  {deletingId === event.id ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
