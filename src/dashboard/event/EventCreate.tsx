import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputText from "../../components/ui/InputText";
import InputSelectEvent from "../../components/ui/Select";
import InputDate from "../../components/ui/InputDate";
import Textarea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import { apiPost } from "../../lib/api";

type FormData = {
  nama: string;
  category: string;
  date: string;
  location: string;
  bio: string;
};

const schema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  category: z.string().min(1, "Category harus dipilih"),
  date: z.string().min(1, "Tanggal harus diisi"),
  location: z.string().min(1, "Lokasi harus diisi"),
  bio: z.string().max(100, "Bio maksimal 100 karakter"),
});

export default function EventCreate() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: { location: "Universitas Harkat Negeri" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null);
      // BE (`backend-web2`) expect: name, tanggal, category, description
      await apiPost("/events", {
        name: data.nama,
        tanggal: data.date,
        category: data.category,
        location: data.location,
        description: data.bio,
      });
      navigate("/dashboard/event");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Gagal menyimpan event."
      );
    }
  };

  return (
    <div className="p-8 bg-[#F3F4F6] min-h-full flex justify-center ">
      <div className="w-full max-w-3xl bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-[#7B1D3F] mb-8 border-b border-gray-50 pb-4">New Event</h2>
        {submitError && (
          <p className="mb-4 text-sm text-red-600 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            {submitError}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputText
            label="Nama Event"
            nama="nama"
            register={register}
            error={errors.nama?.message}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputSelectEvent
              label="Kategori"
              nama="category"
              register={register}
              setValue={setValue}
              error={errors.category?.message}
            />
            <InputDate
              label="Tanggal"
              nama="date"
              register={register}
              setValue={setValue}
              error={errors.date?.message}
            />
          </div>
          <InputText
            label="Lokasi"
            nama="location"
            register={register}
            error={errors.location?.message}
          />
          <Textarea
            label="Deskripsi"
            nama="bio"
            register={register}
            error={errors.bio?.message}
          />
          <div className="pt-4">
            <Button
              type="submit"
              label={isSubmitting ? "Menyimpan..." : "Add Event"}
              variant="primary"
              className="w-full md:w-auto bg-[#7B1D3F] hover:bg-[#5a152e] text-white px-12 py-4 rounded-2xl font-bold shadow-lg transition-all"
            />
          </div>
        </form>
      </div>
    </div>
  );
}