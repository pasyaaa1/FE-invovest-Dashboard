import { Link } from "react-router-dom";

export default function EventIndex() {
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

      {/* State Kosong */}
      <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-white">
        <p className="text-gray-300 italic">Belum ada data event tersedia.</p>
      </div>
    </div>
  );
}