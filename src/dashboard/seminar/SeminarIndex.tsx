import { Link } from "react-router-dom";

export default function SeminarIndex() {
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

      {/* State Kosong */}
      <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-white">
        <p className="text-gray-300 italic">Belum ada data pembicara tersedia.</p>
      </div>
    </div>
  );
}