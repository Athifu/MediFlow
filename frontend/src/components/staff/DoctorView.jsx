import { useState } from "react";
import { Calendar, User, Activity, FileText, FlaskConical, Brain, CheckCircle, ClipboardList, Stethoscope, ChevronRight } from "lucide-react";
import DoctorPrescription from "../logic/DoctorPrescription";

export default function DoctorView() {
    // Mock Data for Patients
    const [patients] = useState([
        { id: "P-092", name: "Sarah Connor", age: 45, condition: "Hypertension", status: "Stable", img: "👩" },
        { id: "P-093", name: "John Doe", age: 32, condition: "Post-Op", status: "Critical", img: "👨" },
        { id: "P-094", name: "Jane Smith", age: 28, condition: "Viral Fever", status: "Recovering", img: "👩‍🦱" },
    ]);

    const [selectedPatient, setSelectedPatient] = useState(patients[0]);

    return (
        <div className="flex bg-slate-50 h-[calc(100vh-140px)] gap-6 rounded-[2rem] overflow-hidden animate-in fade-in duration-500">
            {/* LEFT COLUMN: Patient List Queue */}
            <div className="w-80 bg-white border-r border-slate-100 flex flex-col">
                <div className="p-6 border-b border-slate-50">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-blue-500" /> Patient Limit
                    </h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Assigned Cases</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {patients.map((p) => (
                        <div
                            key={p.id}
                            onClick={() => setSelectedPatient(p)}
                            className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedPatient.id === p.id ? 'bg-blue-50 border-blue-200 shadow-md scale-[1.02]' : 'bg-white border-slate-100 hover:bg-slate-50'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg shadow-sm">{p.img}</div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-sm">{p.name}</h3>
                                    <p className="text-xs text-slate-500 font-medium">{p.condition}</p>
                                </div>
                                <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${selectedPatient.id === p.id ? 'text-blue-500 rotate-90' : 'text-slate-300'}`} />
                            </div>
                            <div className="mt-3 flex gap-2">
                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${p.status === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    {p.status}
                                </span>
                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-slate-100 text-slate-500">
                                    ID: {p.id}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT COLUMN: Clinical Workspace */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* 1. Feature: Patient Snapshot Header */}
                <div className="bg-white p-6 border-b border-slate-100 flex justify-between items-center z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                            {selectedPatient.img}
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-800 tracking-tight">{selectedPatient.name}</h1>
                            <div className="flex gap-4 text-sm font-bold text-slate-500">
                                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {selectedPatient.age} yo</span>
                                <span className="flex items-center gap-1"><Activity className="w-4 h-4 text-rose-500" /> Vitals: Stable</span>
                                <span className="flex items-center gap-1 text-red-500"><FlaskConical className="w-4 h-4" /> Allergy: Penicillin</span>
                            </div>
                        </div>
                    </div>

                    {/* 6. Feature: AI Consult Button */}
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center gap-2 active:scale-95 transition-transform">
                        <Brain className="w-5 h-5 animate-pulse" /> Dr. AI Consult
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">

                    {/* 2. Feature: Lab Results Viewer (New) */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <FlaskConical className="w-5 h-5 text-purple-500" /> Recent Lab Results
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <LabCard name="Hemoglobin" value="13.2 g/dL" status="Normal" />
                            <LabCard name="WBC Count" value="11.5 K" status="High" warning />
                            <LabCard name="Platelets" value="250 K" status="Normal" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {/* 3. Feature: Clinical Notes & Prescription (Existing but polished) */}
                        <div className="space-y-6">
                            <DoctorPrescription patientName={selectedPatient.name} />
                        </div>

                        {/* 4. Feature: Discharge Authority */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 h-full flex flex-col">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-500" /> Discharge Checklist
                                </h3>
                                <div className="space-y-3 flex-1">
                                    <CheckItem label="Vitals Stable for 24h" checked />
                                    <CheckItem label="Medication Reconciliation" checked />
                                    <CheckItem label="Patient Education Complete" />
                                    <CheckItem label="Follow-up Appointment Set" />
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <h4 className="font-bold text-sm text-slate-400 uppercase mb-2">Target Date</h4>
                                    <div className="flex gap-2">
                                        <input type="date" className="p-3 bg-slate-50 rounded-xl border-none outline-none font-bold text-slate-600 w-full" />
                                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 rounded-xl font-bold shadow-lg shadow-emerald-200">
                                            Authorize
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function LabCard({ name, value, status, warning }) {
    return (
        <div className={`p-4 rounded-2xl border ${warning ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'}`}>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{name}</p>
            <p className={`text-xl font-black ${warning ? 'text-amber-600' : 'text-slate-700'}`}>{value}</p>
            <p className={`text-xs font-bold mt-1 ${warning ? 'text-amber-500' : 'text-emerald-500'}`}>{status}</p>
        </div>
    );
}

function CheckItem({ label, checked }) {
    return (
        <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 group-hover:border-blue-400'}`}>
                {checked && <CheckCircle className="w-4 h-4 text-white" />}
            </div>
            <span className={`font-bold ${checked ? 'text-slate-800' : 'text-slate-500'}`}>{label}</span>
        </label>
    );
}
