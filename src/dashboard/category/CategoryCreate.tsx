import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputText from "../../components/ui/InputText";
import Button from "../../components/ui/Button";
import { apiPost } from "../../lib/api";

type FormData = {
  nama: string;
};

const schema = z.object({
  nama: z.string().min(1, "Nama Category harus diisi"),
});

export default function CategoryCreate() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null);
      // BE expect field `name`, form pakai `nama`
      await apiPost("/categories", { name: data.nama });
      navigate("/dashboard/category");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Gagal menyimpan kategori."
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 flex justify-center bg-[#F3F4F6] min-h-full">
      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#7B1D3F] mb-8 border-b border-gray-50 pb-4">New Category</h2>
        {submitError && (
          <p className="text-sm text-red-600 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            {submitError}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputText
            label="Nama Kategori"
            nama="nama"
            register={register}
            error={errors.nama?.message}
          />
          <Button
            type="submit"
            label={isSubmitting ? "Menyimpan..." : "Simpan Kategori"}
            variant="primary"
            className="w-full bg-[#7B1D3F] hover:bg-[#5a152e] text-white py-4 rounded-2xl font-bold shadow-md transition-all"
          />
        </form>
      </div>
    </div>
  );
}