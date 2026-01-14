import { Outlet, Link } from "react-router-dom";
import { LayoutDashboard, LogOut, FileText, Map, Users } from "lucide-react";
import { cn } from "../../lib/utils";

export default function StaffLayout() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600">MediFlow Staff</h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <Link to="/staff/dashboard" className={cn("flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-50 text-blue-700")}>
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link to="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Users className="w-5 h-5" />
                        Patients
                    </Link>
                    <Link to="/staff/admin-dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Map className="w-5 h-5" />
                        Map
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <button className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 p-2 rounded w-full">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
