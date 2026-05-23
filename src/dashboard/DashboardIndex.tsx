import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, asArray } from "../lib/api";
import { formatDateId } from "../lib/date";
import { useAuthStore } from "../store/useAuthStore";
import type { CategoryItem, EventItem, SpeakerItem } from "../types/api";

export default function DashboardIndex() {
  const user = useAuthStore((s) => s.user);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [speakers, setSpeakers] = useState<SpeakerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [eventsRaw, categoriesRaw, speakersRaw] = await Promise.all([
          apiGet<unknown>("/events"),
          apiGet<unknown>("/categories"),
          apiGet<unknown>("/speakers"),
        ]);
        setEvents(asArray<EventItem>(eventsRaw));
        setCategories(asArray<CategoryItem>(categoriesRaw));
        setSpeakers(asArray<SpeakerItem>(speakersRaw));
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Gagal memuat ringkasan dashboard."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const recentEvents = events.slice(0, 5);

  const stats = [
    { label: "Total Event", value: events.length, path: "/dashboard/event" },
    { label: "Kategori", value: categories.length, path: "/dashboard/category" },
    { label: "Pembicara", value: speakers.length, path: "/dashboard/seminar" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#F3F4F6] min-h-full space-y-6 md:space-y-8">
      <div className="bg-white rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm border border-gray-100">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#7B1D3F]">Dashboard</h1>
        <p className="text-gray-500 mt-2 text-base sm:text-lg break-words">
          Selamat datang{user ? `, ${user}` : ""}! Berikut ringkasan data INVOFEST.
        </p>
      </div>

      {loading && (
        <p className="text-gray-400 text-center py-12">Memuat ringkasan...</p>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <Link
                key={stat.label}
                to={stat.path}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#7B1D3F]/30 transition-all"
              >
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <p className="text-4xl font-bold text-[#7B1D3F] mt-2">{stat.value}</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#7B1D3F]">Event Terbaru</h2>
                <Link
                  to="/dashboard/event/new"
                  className="text-sm font-semibold text-[#7B1D3F] hover:underline"
                >
                  + Tambah
                </Link>
              </div>
              {recentEvents.length === 0 ? (
                <p className="text-gray-400 text-sm italic">Belum ada event.</p>
              ) : (
                <ul className="space-y-3">
                  {recentEvents.map((event) => (
                    <li
                      key={event.id}
                      className="flex justify-between items-start gap-3 border-b border-gray-50 pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{event.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {event.categoryId} · {formatDateId(event.dateEvent)}
                        </p>
                      </div>
                      <Link
                        to={`/dashboard/event/${event.id}/edit`}
                        className="text-xs text-[#7B1D3F] font-semibold hover:underline shrink-0"
                      >
                        Edit
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                to="/dashboard/event"
                className="inline-block mt-4 text-sm text-gray-500 hover:text-[#7B1D3F]"
              >
                Lihat semua event →
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#7B1D3F] mb-4">Aksi Cepat</h2>
              <div className="grid gap-3">
                <Link
                  to="/dashboard/event/new"
                  className="px-4 py-3 rounded-xl bg-[#7B1D3F] text-white font-medium text-sm hover:bg-[#5a152e] transition-colors"
                >
                  + Tambah Event Baru
                </Link>
                <Link
                  to="/dashboard/category/create"
                  className="px-4 py-3 rounded-xl border border-[#7B1D3F] text-[#7B1D3F] font-medium text-sm hover:bg-[#7B1D3F]/5 transition-colors"
                >
                  + Tambah Kategori
                </Link>
                <Link
                  to="/dashboard/seminar/speaker"
                  className="px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:border-[#7B1D3F] hover:text-[#7B1D3F] transition-colors"
                >
                  + Tambah Pembicara
                </Link>
              </div>

              {categories.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Kategori</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 6).map((cat) => (
                      <span
                        key={cat.id}
                        className="px-3 py-1 rounded-full bg-[#7B1D3F]/10 text-[#7B1D3F] text-xs font-medium"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
