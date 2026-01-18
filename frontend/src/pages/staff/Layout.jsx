import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, LogOut, FileText, Map, Users, Calendar, MessageSquare, Bell } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState, useEffect } from "react";
import SpotlightSearch from "../../components/common/SpotlightSearch";

export default function StaffLayout() {
    const location = useLocation();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const isLoginPage = location.pathname === "/staff/login";

    // If on login page, render only the content (Login Form) without sidebar/header
    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-slate-50 font-nunito">
                <Outlet />
            </div>
        );
    }

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/staff/dashboard" },
        { icon: Users, label: "Patients", path: "/staff/patients" },
        { icon: Map, label: "Hospital Map", path: "/staff/admin-dashboard" },
        { icon: Calendar, label: "Schedule", path: "/staff/schedule" },
        { icon: MessageSquare, label: "Messages", path: "/staff/messages", badge: 3 },
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-nunito text-slate-900 selection:bg-blue-100 overflow-hidden">
            <SpotlightSearch />

            {/* Sidebar */}
            <aside className="w-72 bg-white m-4 rounded-[2rem] shadow-xl border border-slate-100 hidden md:flex flex-col relative overflow-hidden animate-in slide-in-from-left duration-500">
                {/* Decor */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                {/* Header & Profile */}
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
                            M
                        </div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">MediFlow</h1>
                    </div>

                    {/* Mini Profile Card */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4 mb-2">
                        <div className="relative">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-sm border border-slate-100">
                                👨‍⚕️
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-800">Dr. House</p>
                            <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                ● Online
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-100">
                    <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 mt-2">Menu</p>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                    isActive
                                        ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                                )}
                            >
                                <Icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-600")} />
                                <span className={cn("font-bold text-sm z-10", isActive ? "text-white" : "")}>{item.label}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm animate-pulse">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Widget: Mini Calendar */}
                <div className="p-6 pt-2">
                    <div className="bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/20 rounded-full blur-2xl -mr-6 -mt-6"></div>

                        <div className="relative z-10 flex justify-between items-end mb-4">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{currentTime.toLocaleString('default', { month: 'long' })}</p>
                                <p className="text-3xl font-black">{currentTime.getDate()}</p>
                            </div>
                            <Calendar className="w-8 h-8 text-rose-500 opacity-80" />
                        </div>

                        <div className="relative z-10 space-y-2">
                            <div className="flex bg-white/10 p-2 rounded-lg items-center gap-3 backdrop-blur-md">
                                <span className="w-1 h-8 bg-emerald-400 rounded-full"></span>
                                <div>
                                    <p className="text-xs font-bold text-white">Shift Ends</p>
                                    <p className="text-[10px] text-slate-400 font-mono">18:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seamless Logout */}
                <div className="p-6 pt-0">
                    <button
                        onClick={() => window.location.href = '/staff/login'}
                        className="flex items-center justify-center gap-2 text-sm font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600 p-4 rounded-xl w-full transition-colors border border-dashed border-rose-200 group"
                    >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-4 md:p-8">
                <Outlet />
            </main>
        </div>
    );
}
