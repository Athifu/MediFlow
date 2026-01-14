import { Search, Filter, MoreHorizontal, User, Activity, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function StaffPatients() {
    const patients = [
        { id: "P-092", name: "Sarah Connor", age: 45, diagnosis: "Hypertension", status: "Stable", room: "204-A", admission: "Jan 10, 2026" },
        { id: "P-093", name: "John Doe", age: 32, diagnosis: "Post-Op Recovery", status: "Critical", room: "ICU-02", admission: "Jan 12, 2026" },
        { id: "P-094", name: "Jane Smith", age: 28, diagnosis: "Viral Fever", status: "Recovering", room: "102-B", admission: "Jan 13, 2026" },
        { id: "P-095", name: "Michael Scott", age: 50, diagnosis: "Burn Injury", status: "Stable", room: "305-C", admission: "Jan 08, 2026" },
        { id: "P-096", name: "Dwight Schrute", age: 40, diagnosis: "Beet Poisoning", status: "Discharged", room: "-", admission: "Jan 05, 2026" },
    ];

    const getStatusColor = (status) => {
        if (status === "Critical") return "bg-rose-100 text-rose-700 border-rose-200";
        if (status === "Stable") return "bg-emerald-100 text-emerald-700 border-emerald-200";
        if (status === "Recovering") return "bg-blue-100 text-blue-700 border-blue-200";
        return "bg-slate-100 text-slate-600 border-slate-200";
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Patient Directory</h1>
                    <p className="text-slate-500 font-medium">All admitted patients and their real-time status.</p>
                </div>
                <button className="bg-slate-900 text-white px-5 py-3 rounded-xl font-bold hover:bg-slate-800 transition active:scale-95">
                    + Admit New Patient
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 flex gap-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-3.5 text-slate-400" />
                    <input type="text" placeholder="Search by Name, ID, or Diagnosis..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium" />
                </div>
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition">
                    <Filter className="w-4 h-4" /> Filters
                </button>
            </div>

            {/* Patient Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.map((patient) => (
                    <Link to={`/staff/patient/${patient.id}`} key={patient.id} className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-5 h-5 text-slate-400 hover:text-blue-600" />
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shadow-inner">
                                {patient.status === 'Critical' ? '🚨' : '👤'}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">{patient.name}</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{patient.id}</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 flex items-center gap-2"><Activity className="w-4 h-4 text-slate-300" /> Diagnosis</span>
                                <span className="font-bold text-slate-700">{patient.diagnosis}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 flex items-center gap-2"><User className="w-4 h-4 text-slate-300" /> Age</span>
                                <span className="font-bold text-slate-700">{patient.age} yrs</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-slate-300" /> Room</span>
                                <span className="font-bold text-slate-700">{patient.room}</span>
                            </div>
                        </div>

                        <div className={`py-2 px-4 rounded-xl text-xs font-bold uppercase text-center border ${getStatusColor(patient.status)}`}>
                            {patient.status}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
