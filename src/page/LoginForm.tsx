import { useForm } from "react-hook-form";
import InputText from "../components/ui/InputText";
import InputPassword from "../components/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().min(1, "Email harus diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "24090057";

export default function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const registeredUsers = useAuthStore((state) => state.registeredUsers);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const email = data.email.trim().toLowerCase();
    const isAdmin =
      email === ADMIN_EMAIL && data.password === ADMIN_PASSWORD;
    const registered = registeredUsers.find(
      (u) => u.email === email && u.password === data.password
    );

    if (isAdmin || registered) {
      alert("Login berhasil!");
      login(email);
      navigate("/dashboard");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="w-full max-w-lg bg-white p-8 md:p-25 rounded-[2.5rem] shadow-sm border border-gray-100">
      <div className="text-left md:text-center mb-8 md:mb-10">
        <h1 className="text-4xl font-bold text-[#7B1D3F] mb-3">Login</h1>
        <p className="text-gray-400 text-lg md:text-l">
          Yuk Masuk Dulu, jangan diluar
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="pt-6">
          <Button
            type="submit"
            label="Login"
            variant="primary"
            className="w-full bg-[#7B1D3F] hover:bg-[#5a152e] text-white py-3 rounded-2xl font-bold shadow-md"
          />
        </div>
      </form>

      <p className="text-center text-sm mt-8 text-gray-500">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="text-[#7B1D3F] font-bold hover:underline"
        >
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}
