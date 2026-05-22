export default function DashboardIndex() {
  return (
    <div className="p-8 bg-[#F3F4F6] min-h-full">
      {/* Kartu Sambutan Bersih */}
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-[#7B1D3F]">Dashboard</h1>
        <p className="text-gray-500 mt-2 text-lg">
          Selamat datang, berikut ringkasan data hari ini.
        </p>
      </div>
    </div>
  );
}