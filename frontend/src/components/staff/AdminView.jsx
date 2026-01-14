import { useState } from "react";
import BedMap from "../../components/logic/BedMap";
import { api } from "../../lib/api";
import { Users, Activity, ShieldAlert, Radio, DollarSign, FileText, Lock, Plus, UserPlus, LayoutDashboard, Stethoscope, Settings, LogOut, Server } from "lucide-react";

export default function AdminView() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="flex h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500">
            {/* LEFT SIDEBAR: Navigation & System Health */}
            <div className="w-64 shrink-0 flex flex-col gap-6">

                {/* Navigation Menu */}
                <div className="bg-white rounded-[2rem] p-4 shadow-lg border border-slate-100 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                        <NavButton
                            active={activeTab === "overview"}
                            onClick={() => setActiveTab("overview")}
                            icon={<LayoutDashboard className="w-5 h-5" />}
                            label="Overview"
                        />
                        <NavButton
                            active={activeTab === "staff"}
                            onClick={() => setActiveTab("staff")}
                            icon={<Users className="w-5 h-5" />}
                            label="Staff Mgmt"
                        />
                        <NavButton
                            active={activeTab === "logs"}
                            onClick={() => setActiveTab("logs")}
                            icon={<ShieldAlert className="w-5 h-5" />}
                            label="Audit Logs"
                        />
                        <NavButton
                            active={activeTab === "settings"}
                            onClick={() => setActiveTab("settings")}
                            icon={<Settings className="w-5 h-5" />}
                            label="Sys Settings"
                        />
                    </div>

                    <div className="space-y-4">
                        {/* System Health Widget */}
                        <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full blur-xl -mr-6 -mt-6"></div>
                            <div className="flex items-center gap-2 mb-3">
                                <Server className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Server Load</span>
                            </div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-2xl font-mono font-bold">12%</span>
                                <span className="text-xs text-emerald-400 font-bold">Optimal</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[12%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            </div>
                        </div>

                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors font-bold text-sm">
                            <LogOut className="w-5 h-5" /> Logout Admin
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA (Scrollable) */}
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-none">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                            {activeTab === "overview" && "Command Center"}
                            {activeTab === "staff" && "Staff Directory"}
                            {activeTab === "logs" && "Security Audit"}
                            {activeTab === "settings" && "System Config"}
                        </h2>
                        <p className="text-slate-500 font-medium">Welcome back, Admin.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-rose-200 flex items-center gap-2 active:scale-95 transition-transform">
                            <Radio className="w-5 h-5 animate-pulse" /> Global Broadcast
                        </button>
                    </div>
                </div>

                {/* DYNAMIC CONTENT based on Active Tab */}
                {activeTab === "overview" && <DashboardOverview />}
                {activeTab === "staff" && <StaffManagement />}
                {activeTab === "logs" && <AuditLogs />}
                {activeTab === "settings" && <div className="p-10 text-center text-slate-400 font-bold text-xl bg-white border-2 border-dashed border-slate-200 rounded-[2rem]">Settings Module Coming Soon</div>}
            </div>
        </div>
    );
}

function NavButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${active ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}

// Sub-components for Cleaner Code

function DashboardOverview() {
    return (
        <div className="grid grid-cols-12 gap-8">
            {/* LEFT COLUMN: Analytics & Maps (8 Cols) */}
            <div className="col-span-8 space-y-8">
                {/* Key Metrics Row */}
                <div className="grid grid-cols-3 gap-6">
                    <MetricCard
                        icon={<Users className="w-6 h-6 text-blue-500" />}
                        label="Total Staff"
                        value="142"
                        trend="+4 this week"
                        color="bg-blue-50 border-blue-100"
                    />
                    <MetricCard
                        icon={<Activity className="w-6 h-6 text-emerald-500" />}
                        label="Bed Occupancy"
                        value="87%"
                        trend="High Capacity"
                        color="bg-emerald-50 border-emerald-100"
                    />
                    <MetricCard
                        icon={<DollarSign className="w-6 h-6 text-amber-500" />}
                        label="Est. Revenue"
                        value="$42k"
                        trend="Daily Avg"
                        color="bg-amber-50 border-amber-100"
                    />
                </div>

                {/* Live Bed Map */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-slate-400" /> Live Hospital Map
                        </h3>
                        <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">ICU Wing A</span>
                    </div>
                    <BedMap />
                </div>
            </div>

            {/* RIGHT COLUMN: Quick Status */}
            <div className="col-span-4 space-y-8">
                {/* Department Resource Monitor */}
                <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-100">
                    <h3 className="text-xl font-bold mb-6">Resource Load</h3>
                    <div className="space-y-6">
                        <ResourceCard dept="Emergency" load={92} staff={12} status="Critical" />
                        <ResourceCard dept="Pediatrics" load={45} staff={8} status="Stable" />
                        <ResourceCard dept="Surgery" load={78} staff={20} status="Busy" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StaffManagement() {
    return (
        <div className="grid grid-cols-1 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 relative overflow-hidden max-w-2xl mx-auto w-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-10 -mt-10 blur-3xl"></div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                    <UserPlus className="w-5 h-5 text-blue-500" /> Create New Staff Account
                </h3>
                <UserCreationForm />
            </div>
        </div>
    );
}

function AuditLogs() {
    return (
        <div className="bg-slate-900 text-slate-300 p-8 rounded-[2rem] shadow-xl h-[600px] overflow-y-auto">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
                <ShieldAlert className="w-6 h-6 text-teal-400" />
                <h3 className="text-white font-bold text-xl">Security Audit Trail / Live Feed</h3>
            </div>
            <div className="space-y-6">
                <LogItem user="Dr. House" action="Accessed Patient #092" time="10:42 AM" />
                <LogItem user="Nurse Joy" action="Resolved Emergency Alert" time="10:38 AM" />
                <LogItem user="System" action="Backup Completed" time="10:00 AM" />
                <LogItem user="Admin" action="Created User 'Pharma-02'" time="09:15 AM" />
                <LogItem user="Reception" action="Gate Pass Issued" time="08:50 AM" />
                <LogItem user="Security" action="Locked Door A4" time="08:45 AM" />
                <LogItem user="System" action="Morning Sync" time="08:00 AM" />
            </div>
        </div>
    );
}

function MetricCard({ icon, label, value, trend, color }) {
    return (
        <div className={`p-6 rounded-[2rem] border ${color} flex flex-col justify-between h-36 relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
            <div className="flex justify-between items-start z-10">
                <div className="bg-white p-2 rounded-xl shadow-sm">{icon}</div>
                <span className="text-xs font-bold opacity-60 bg-white/50 px-2 py-1 rounded-lg">{trend}</span>
            </div>
            <div className="z-10">
                <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">{label}</p>
                <p className="text-3xl font-black text-slate-800">{value}</p>
            </div>
        </div>
    );
}

function ResourceCard({ dept, load, staff, status }) {
    const isCritical = load > 80;
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">{dept}</h4>
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${isCritical ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>{status}</span>
            </div>
            <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>Load ({load}%)</span>
                    <span>{staff} Staff</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${isCritical ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${load}%` }}></div>
                </div>
            </div>
        </div>
    );
}

function UserCreationForm() {
    const [name, setName] = useState("");
    const [role, setRole] = useState("nurse");
    const [customId, setCustomId] = useState("");
    const [password, setPassword] = useState("");
    const [lastCreated, setLastCreated] = useState(null);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            // Include new fields in the API call (mock logic adjusted for demo)
            const user = await api.post(`/staff/users?name=${name}&role=${role}&employee_id=${customId}&password=${password}`);
            setLastCreated(user);
            setName("");
            setCustomId("");
            setPassword("");
        } catch (err) {
            console.error(err);
            alert("Failed to create user");
        }
    };

    return (
        <form onSubmit={handleCreateUser} className="space-y-6 relative z-10">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold text-slate-700"
                        placeholder="e.g. Sarah Connor"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Employee ID</label>
                    <div className="relative">
                        <UserPlus className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={customId}
                            onChange={(e) => setCustomId(e.target.value)}
                            className="w-full pl-9 p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none font-mono font-bold text-slate-700"
                            placeholder="e.g. EMP-001"
                            required
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Secure Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold text-slate-700"
                        placeholder="Set user's dashboard password"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Role & Permissions</label>
                <div className="grid grid-cols-3 gap-2">
                    {['doctor', 'nurse', 'pharmacy'].map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`p-3 rounded-xl text-sm font-bold capitalize border-2 transition-all ${role === r ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-md' : 'border-slate-100 bg-white text-slate-400 hover:bg-slate-50'}`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <button type="submit" className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold hover:bg-slate-900 transition shadow-lg shadow-slate-200 flex justify-center items-center gap-2 group active:scale-[0.98]">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> Create Account
            </button>

            {lastCreated && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl animate-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                        <CheckCircle className="w-4 h-4" /> Account Created
                    </div>
                    <p className="text-emerald-900 text-sm">
                        Staff <span className="font-bold">{lastCreated.name}</span> is active.
                        Credential: <span className="font-mono bg-emerald-100 px-1 rounded">{lastCreated.employee_id}</span>
                    </p>
                </div>
            )}
        </form>
    );
}

function LogItem({ user, action, time }) {
    return (
        <div className="flex gap-3 text-sm group">
            <span className="font-mono text-slate-500 text-xs mt-1">{time}</span>
            <div>
                <span className="font-bold text-teal-400 group-hover:text-teal-300 transition-colors">{user}</span>
                <span className="text-slate-400"> {action}</span>
            </div>
        </div>
    );
}

// Icon helper
import { CheckCircle } from "lucide-react";
