import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputText from "../../components/ui/InputText";
import InputSelectEvent from "../../components/ui/Select";
import type { SelectOption } from "../../components/ui/Select";
import InputDate from "../../components/ui/InputDate";
import Textarea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import { apiGet, apiPut } from "../../lib/api";
import {
  loadCategoryOptions,
  loadSpeakerOptions,
} from "../../lib/eventFormOptions";
import { toInputDate } from "../../lib/date";
import type { EventItem } from "../../types/api";

type FormData = {
  nama: string;
  category: string;
  pembicara: string;
  date: string;
  location: string;
  bio: string;
};

const schema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  category: z.string().min(1, "Kategori harus dipilih"),
  pembicara: z.string().min(1, "Pembicara harus dipilih"),
  date: z.string().min(1, "Tanggal harus diisi"),
  location: z.string().min(1, "Lokasi harus diisi"),
  bio: z.string().max(100, "Bio maksimal 100 karakter"),
});

export default function EventEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [defaults, setDefaults] = useState<FormData | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  const [speakerOptions, setSpeakerOptions] = useState<SelectOption[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        setOptionsLoading(true);
        const [event, categories, speakers] = await Promise.all([
          apiGet<EventItem>(`/events/${id}`),
          loadCategoryOptions(),
          loadSpeakerOptions(),
        ]);
        setCategoryOptions(categories);
        setSpeakerOptions(speakers);

        const formData: FormData = {
          nama: event.name,
          category: event.categoryId,
          pembicara: event.speakerId ?? "",
          date: toInputDate(event.dateEvent),
          location: event.location,
          bio: event.description,
        };
        setDefaults(formData);
        reset(formData);
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Gagal memuat event.");
      } finally {
        setLoading(false);
        setOptionsLoading(false);
      }
    })();
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    if (!id) return;
    try {
      setSubmitError(null);
      await apiPut(`/events/${id}`, {
        name: data.nama,
        tanggal: data.date,
        category: data.category,
        pembicara: data.pembicara,
        location: data.location,
        description: data.bio,
      });
      navigate("/dashboard/event");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Gagal mengubah event.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <p className="text-gray-400">Memuat data event...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 text-sm mb-4">
          {loadError}
        </div>
        <Link to="/dashboard/event" className="text-[#7B1D3F] font-semibold hover:underline">
          ← Kembali ke daftar event
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#F3F4F6] min-h-full flex justify-center">
      <div className="w-full max-w-3xl bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-[#7B1D3F] mb-8 border-b border-gray-50 pb-4">
          Edit Event
        </h2>
        {submitError && (
          <p className="mb-4 text-sm text-red-600 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            {submitError}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputText label="Nama Event" nama="nama" register={register} error={errors.nama?.message} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputSelectEvent
              label="Kategori"
              nama="category"
              register={register}
              setValue={setValue}
              error={errors.category?.message}
              options={categoryOptions}
              loading={optionsLoading}
              placeholder="-- Pilih Kategori --"
              emptyMessage="Belum ada kategori"
              defaultValue={defaults?.category}
            />
            <InputSelectEvent
              label="Pembicara"
              nama="pembicara"
              register={register}
              setValue={setValue}
              error={errors.pembicara?.message}
              options={speakerOptions}
              loading={optionsLoading}
              placeholder="-- Pilih Pembicara --"
              emptyMessage="Belum ada pembicara"
              defaultValue={defaults?.pembicara}
            />
          </div>
          <InputDate
            label="Tanggal"
            nama="date"
            register={register}
            setValue={setValue}
            error={errors.date?.message}
            defaultValue={defaults?.date}
          />
          <InputText label="Lokasi" nama="location" register={register} error={errors.location?.message} />
          <Textarea label="Deskripsi" nama="bio" register={register} error={errors.bio?.message} />
          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              type="submit"
              label={isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              variant="primary"
              className="bg-[#7B1D3F] hover:bg-[#5a152e] text-white px-12 py-4 rounded-2xl font-bold shadow-lg"
            />
            <Link
              to="/dashboard/event"
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
