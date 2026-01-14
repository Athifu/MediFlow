import { Outlet } from "react-router-dom";

export default function PatientLayout() {
    return (
        <div className="h-screen bg-slate-50 flex flex-col">
            {/* Touch-optimized Header */}
            <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
                <h1 className="text-xl font-bold text-slate-800">MediFlow Patient</h1>
                <div className="h-10 w-10 bg-slate-200 rounded-full border-2 border-white shadow-sm"></div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
