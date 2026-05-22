import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputText from "../../components/ui/InputText";
import Button from "../../components/ui/Button";

type FormData = {
  nama: string;
};

const schema = z.object({
  nama: z.string().min(1, "Nama Category harus diisi"),
});

export default function CategoryCreate() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="p-8 flex justify-center bg-[#F3F4F6] min-h-full">
      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-[#7B1D3F] mb-8 border-b border-gray-50 pb-4">New Category</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputText
            label="Nama Kategori"
            nama="nama"
            register={register}
            error={errors.nama?.message}
          />
          <Button
            label="Simpan Kategori"
            variant="primary"
            className="w-full bg-[#7B1D3F] hover:bg-[#5a152e] text-white py-4 rounded-2xl font-bold shadow-md transition-all"
          />
        </form>
      </div>
    </div>
  );
}