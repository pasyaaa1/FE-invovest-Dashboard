import { Outlet } from "react-router-dom";

export default function AuthLayouts() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center px-8 bg-white">
        <img
          src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
          alt="Invofest"
          className="w-full max-w-md object-contain"
        />
      </div>
      <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] px-4 py-10">
        <Outlet />
      </div>
    </div>
  );
}
