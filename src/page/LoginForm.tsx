import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

// Import komponen UI sesuai jalur proyek kamu
import InputText from "../components/ui/InputText";
import InputPassword from "../components/ui/InputPassword";
import Button from "../components/ui/Button";
import { useAuthStore } from "../store/useAuthStore";

// Schema validasi
const schema = z.object({
  email: z.string().trim().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    if (loading) return;
    setLoading(true);
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPassword = data.password.trim();

    // Logika pengecekan kredensial
    if (cleanEmail === "admin@gmail.com" && cleanPassword === "password123") {
      localStorage.setItem("token", "dummy_token");
      login(cleanEmail); 
      alert("Login berhasil!");
      navigate("/dashboard");
    } else {
      alert("Email atau password salah!");
      setLoading(false);
    }
  };

  return (
    // Container utama untuk membuat konten ke tengah (sama seperti gambar)
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] px-4">
      
      {/* Kartu Login (White Card) */}
      <div className="w-full max-w-112.5 bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center">
        
        {/* Header Teks sesuai Gambar */}
        <h1 className="text-4xl font-bold text-[#7B1D3F] mb-3">
          Selamat Datang!
        </h1>
        <p className="text-gray-500 mb-10">
          Silakan login untuk melanjutkan
        </p>

        {/* Form menggunakan Komponen UI asli kamu */}
        <form onSubmit={handleSubmit(onSubmit)} className="text-left space-y-6">
          
          <InputText 
            label="Email" 
            nama="email" 
            register={register} 
            error={errors.email?.message} 
          />
          
          <InputPassword 
            label="Password" 
            nama="password" 
            register={register} 
            error={errors.password?.message} 
          />

          {/* Spacer sedikit sebelum tombol */}
          <div className="pt-4">
            <Button 
              label={loading ? "Loading..." : "Login"} 
              variant="primary" 
              // Menggunakan warna maroon khas Invofest sesuai gambar
              className="w-full bg-[#7B1D3F] hover:bg-[#631732] text-white py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-md disabled:opacity-50"
            />
          </div>
        </form>

        {/* Tombol Daftar sesuai permintaan */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm">
            Belum punya akun?{" "}
            <Link to="/register" className="text-[#7B1D3F] font-bold hover:underline">
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}