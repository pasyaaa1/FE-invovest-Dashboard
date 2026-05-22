import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex justify-between flex-col ">
            <Header />
            <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>

            <footer className="text-center text-gray-500 text-sm mt-4">
                <p>&copy; 2023 My App. All rights reserved.</p>
            </footer>
        </div>
    )
}