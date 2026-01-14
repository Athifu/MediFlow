import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { Lock, User, ArrowRight, ShieldCheck, Activity } from "lucide-react";

export default function StaffLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const data = await api.post("/auth/login", { email, password });
            localStorage.setItem("staff_token", data.access_token);
            const responseRole = data.role || "doctor";
            localStorage.setItem("user_role", responseRole);
            if (data.name) localStorage.setItem("user_name", data.name);
            navigate("/staff/dashboard");
        } catch (err) {
            setError("Invalid credentials. Please verify your ID.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* LEFT SIDE: Visual Brand */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-20 text-white">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -mr-40 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] -ml-20 -mb-20"></div>

                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-black text-2xl shadow-lg shadow-blue-500/20">M</div>
                        <h1 className="text-4xl font-black tracking-tight">MediFlow AI</h1>
                    </div>
                    <h2 className="text-5xl font-bold leading-tight mb-6">
                        The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Clinical Operations</span>
                    </h2>
                    <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                        Streamline patient care, manage shifts, and secure critical data with our next-gen hospital operating system.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <FeatureItem icon={<ShieldCheck />} title="Enterprise Security" desc="HIPAA Compliant" />
                        <FeatureItem icon={<Activity />} title="Real-time Monitoring" desc="Live Vitals & IOT" />
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
                <div className="absolute top-10 right-10 flex gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Status</p>
                        <p className="text-sm font-bold text-emerald-600 flex items-center justify-end gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Operational</p>
                    </div>
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h2>
                        <p className="text-slate-500 font-medium">Please authenticate to access the staff portal.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl flex items-center gap-3 animate-in shake">
                                <Activity className="w-5 h-5 text-rose-500" />
                                <p className="text-sm font-bold text-rose-700">{error}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Employee ID</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder:text-slate-300 shadow-sm group-hover:border-blue-200"
                                        placeholder="e.g. admin, nurse, or pharma"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="password"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder:text-slate-300 shadow-sm group-hover:border-blue-200"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>

                    <div className="pt-6 text-center">
                        <p className="text-xs text-slate-400 font-medium">By logging in, you agree to the <a href="#" className="underline hover:text-slate-600">Privacy Policy</a> and <a href="#" className="underline hover:text-slate-600">Terms of Service</a>.</p>
                        <p className="text-xs text-slate-300 mt-2">© 2026 MediFlow Inc. Restricted Access.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ icon, title, desc }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <div className="p-2 bg-slate-800 rounded-lg text-blue-400">{icon}</div>
            <div>
                <h3 className="font-bold text-white text-sm">{title}</h3>
                <p className="text-xs text-slate-400">{desc}</p>
            </div>
        </div>
    );
}
