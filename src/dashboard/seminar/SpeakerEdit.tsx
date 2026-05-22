import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputText from "../../components/ui/InputText";
import Button from "../../components/ui/Button";
import { apiGet, apiPut } from "../../lib/api";
import type { SpeakerItem } from "../../types/api";

type FormData = { nama: string; role: string };

const schema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  role: z.string().min(1, "Role harus diisi"),
});

export default function SpeakerEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const speaker = await apiGet<SpeakerItem>(`/speakers/${id}`);
        reset({ nama: speaker.name, role: speaker.role });
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Gagal memuat pembicara.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    if (!id) return;
    try {
      setSubmitError(null);
      await apiPut(`/speakers/${id}`, { nama: data.nama, role: data.role });
      navigate("/dashboard/seminar");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Gagal mengubah pembicara.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <p className="text-gray-400">Memuat pembicara...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 text-sm mb-4">
          {loadError}
        </div>
        <Link to="/dashboard/seminar" className="text-[#7B1D3F] font-semibold hover:underline">
          ← Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 flex justify-center bg-[#F3F4F6] min-h-full">
      <div className="w-full max-w-lg bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#7B1D3F] mb-8 border-b border-gray-50 pb-4">
          Edit Pembicara
        </h2>
        {submitError && (
          <p className="mb-4 text-sm text-red-600 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            {submitError}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputText label="Nama Lengkap" nama="nama" register={register} error={errors.nama?.message} />
          <InputText label="Jabatan / Role" nama="role" register={register} error={errors.role?.message} />
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              type="submit"
              label={isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              variant="primary"
              className="bg-[#7B1D3F] hover:bg-[#5a152e] text-white py-4 px-8 rounded-2xl font-bold"
            />
            <Link
              to="/dashboard/seminar"
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
