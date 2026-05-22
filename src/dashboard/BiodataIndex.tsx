import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputText from "../components/ui/InputText";
import Textarea from "../components/ui/TextArea";
import Button from "../components/ui/Button";
import { useBiodataStore } from "../store/useBiodataStore";

const schema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  nim: z.string().min(1, "NIM wajib diisi"),
  email: z.string().email("Email tidak valid"),
  prodi: z.string().min(1, "Prodi wajib diisi"),
  universitas: z.string().min(1, "Universitas wajib diisi"),
  telepon: z.string().min(1, "Telepon wajib diisi"),
  alamat: z.string().min(1, "Alamat wajib diisi"),
  foto: z.string().url("URL foto tidak valid"),
  tentang: z.string().min(1, "Tentang saya wajib diisi"),
});

type FormData = z.infer<typeof schema>;

const infoRows: { label: string; key: keyof FormData }[] = [
  { label: "NIM", key: "nim" },
  { label: "Email", key: "email" },
  { label: "Program Studi", key: "prodi" },
  { label: "Universitas", key: "universitas" },
  { label: "Telepon", key: "telepon" },
  { label: "Alamat", key: "alamat" },
];

export default function BiodataIndex() {
  const biodata = useBiodataStore((s) => s.biodata);
  const updateBiodata = useBiodataStore((s) => s.updateBiodata);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: biodata,
  });

  const onSubmit = (data: FormData) => {
    updateBiodata(data);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    reset(biodata);
    setIsEditing(false);
  };

  return (
    <div className="p-8 bg-[#F3F4F6] min-h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#7B1D3F]">Biodata</h1>
          <p className="text-gray-500 mt-2">
            Data diri mahasiswa pembuat website INVOFEST
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-[#7B1D3F] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#5a152e] transition-all shadow-lg shrink-0"
          >
            Edit Biodata
          </button>
        )}
      </div>

      {saved && (
        <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          Biodata berhasil disimpan.
        </p>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#7B1D3F] px-8 py-10 text-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={biodata.foto}
              alt={biodata.nama}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/30 shadow-lg bg-white/10"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png";
              }}
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold">{biodata.nama}</h2>
              <p className="text-white/80 mt-1">{biodata.prodi}</p>
              <p className="text-white/70 text-sm mt-1">{biodata.universitas}</p>
            </div>
          </div>
        </div>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 md:p-10 space-y-6"
          >
            <h3 className="text-lg font-bold text-[#7B1D3F] border-b border-gray-100 pb-2">
              Ubah Biodata
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputText label="Nama Lengkap" nama="nama" register={register} error={errors.nama?.message} />
              <InputText label="NIM" nama="nim" register={register} error={errors.nim?.message} />
              <InputText label="Email" nama="email" register={register} error={errors.email?.message} />
              <InputText label="Telepon" nama="telepon" register={register} error={errors.telepon?.message} />
              <InputText label="Program Studi" nama="prodi" register={register} error={errors.prodi?.message} />
              <InputText label="Universitas" nama="universitas" register={register} error={errors.universitas?.message} />
            </div>
            <InputText label="URL Foto" nama="foto" register={register} error={errors.foto?.message} />
            <InputText label="Alamat" nama="alamat" register={register} error={errors.alamat?.message} />
            <Textarea label="Tentang Saya" nama="tentang" register={register} error={errors.tentang?.message} />
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                type="submit"
                label={isSubmitting ? "Menyimpan..." : "Simpan Biodata"}
                variant="primary"
                className="bg-[#7B1D3F] hover:bg-[#5a152e] text-white px-8 py-3 rounded-2xl font-bold"
              />
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
              >
                Batal
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-bold text-[#7B1D3F] mb-4 border-b border-gray-100 pb-2">
                Informasi Pribadi
              </h3>
              <dl className="space-y-4">
                {infoRows.map((row) => (
                  <div key={row.key}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {row.label}
                    </dt>
                    <dd className="text-gray-800 font-medium mt-0.5">
                      {biodata[row.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#7B1D3F] mb-4 border-b border-gray-100 pb-2">
                Tentang Saya
              </h3>
              <p className="text-gray-600 leading-relaxed">{biodata.tentang}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
