import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputText from "../../components/ui/InputText";
import Button from "../../components/ui/Button";
import { apiPost } from "../../lib/api";

type FormData = {
  nama: string;
  role: string;
};

const schema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  role: z.string().min(1, "Role harus diisi"),
});

export default function SpeakerCreate() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null);
      await apiPost("/speakers", { nama: data.nama, role: data.role });
      navigate("/dashboard/seminar");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Gagal menyimpan speaker."
      );
    }
  };

  return (
    <div className="p-8 flex justify-center bg-[#F3F4F6] min-h-full">
      <div className="w-full max-w-lg bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#7B1D3F]">Tambah Speaker</h2>
          <p className="text-gray-400 text-sm mt-1">Lengkapi informasi narasumber baru</p>
        </div>

        {submitError && (
          <p className="mb-4 text-sm text-red-600 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            {submitError}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputText
            label="Nama Lengkap Speaker"
            nama="nama"
            register={register}
            error={errors.nama?.message}
          />
          <InputText
            label="Jabatan / Role"
            nama="role"
            register={register}
            error={errors.role?.message}
          />
          <div className="pt-4">
            <Button
              type="submit"
              label={isSubmitting ? "Menyimpan..." : "Simpan Speaker"}
              variant="primary"
              className="w-full bg-[#7B1D3F] hover:bg-[#5a152e] text-white py-4 rounded-2xl font-bold shadow-md transition-all"
            />
          </div>
        </form>
      </div>
    </div>
  );
}