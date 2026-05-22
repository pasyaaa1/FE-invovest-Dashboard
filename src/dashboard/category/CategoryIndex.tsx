import { Link } from "react-router-dom";

export default function CategoryIndex() {
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

      {/* Area Kosong */}
      <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 p-20 text-center">
        <p className="text-gray-300 italic font-medium">Belum ada data kategori tersedia.</p>
      </div>
    </div>
  );
}