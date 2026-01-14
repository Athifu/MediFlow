import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { ArrowLeft, Activity, FileText, Pill, CreditCard, Stethoscope, Lock } from "lucide-react";
import DischargeProgress from "../../components/shared/DischargeProgress";

export default function StaffPatientDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [dischargeStatus, setDischargeStatus] = useState('admitted'); // admitted, clinical, pharmacy, billing, discharged

    useEffect(() => {
        // Mock Data Fetch with persisted status if available
        api.get("/patients").then(data => {
            const found = data.find(p => p.id === id || p.nfc_tag_id === id) || data[0];
            setPatient(found);

            // Simulating backend status persistance for demo
            const savedStatus = localStorage.getItem(`discharge_status_${found.id}`);
            if (savedStatus) setDischargeStatus(savedStatus);
        }).catch(console.error);
    }, [id]);

    const handleDischargeAuth = () => {
        if (confirm("Authorize discharge for this patient? This will trigger Pharmacy & Billing.")) {
            const newStatus = 'clinical';
            setDischargeStatus(newStatus);
            localStorage.setItem(`discharge_status_${patient.id}`, newStatus);

            // Optional: simulate auto-progression for demo
            setTimeout(() => {
                localStorage.setItem(`discharge_status_${patient.id}`, 'pharmacy'); // Simulate Pharm done
            }, 10000);
        }
    };

    if (!patient) return <div className="p-8">Loading Patient Chart...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <div className="flex justify-between items-center">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Back to Dashboard
                </button>
                <div className="flex gap-3">
                    {dischargeStatus === 'admitted' ? (
                        <button
                            onClick={handleDischargeAuth}
                            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
                        >
                            <Stethoscope className="w-5 h-5" /> Authorize Discharge
                        </button>
                    ) : (
                        <div className="bg-emerald-100 text-emerald-800 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                            <Lock className="w-4 h-4" /> Discharge Protocol Active
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">{patient.name}</h1>
                        <p className="text-slate-500 text-lg font-medium flex items-center gap-3">
                            <span className="bg-slate-100 px-2 py-1 rounded text-sm font-bold text-slate-600">ID: {patient.id}</span>
                            <span>•</span>
                            <span>Bed: {patient.bed_number}</span>
                        </p>
                    </div>
                    <div className={`px-5 py-2 rounded-xl font-bold uppercase tracking-wider text-sm ${patient.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                        {patient.status}
                    </div>
                </div>

                {/* HACKATHON FEATURE: UNIFIED DISCHARGE TRACKER */}
                <div className="mb-10">
                    <DischargeProgress status={dischargeStatus} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DetailCard
                        icon={<Activity className="text-blue-500" />}
                        title="Vitals Snapshot"
                        color="bg-blue-50 border-blue-100"
                    >
                        <div className="space-y-3 mt-2">
                            <Row label="BP" value="120/80" />
                            <Row label="Heart" value="72 bpm" />
                            <Row label="Temp" value="98.6°F" />
                        </div>
                    </DetailCard>

                    <DetailCard
                        icon={<Pill className="text-purple-500" />}
                        title="Active Meds"
                        color="bg-purple-50 border-purple-100"
                    >
                        <ul className="space-y-2 mt-2 text-sm font-semibold text-slate-700">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div> Paracetamol 500mg</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div> Amoxicillin 250mg</li>
                        </ul>
                    </DetailCard>

                    <DetailCard
                        icon={<CreditCard className="text-emerald-500" />}
                        title="Billing Status"
                        color="bg-emerald-50 border-emerald-100"
                    >
                        <div className="space-y-1 mt-2">
                            <p className="text-slate-500 text-xs font-bold uppercase">Total Due</p>
                            <p className="text-3xl font-black text-slate-800">${patient.bill_amount?.toFixed(2)}</p>
                            <div className="mt-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${dischargeStatus === 'billing' || dischargeStatus === 'discharged' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                                    {dischargeStatus === 'billing' || dischargeStatus === 'discharged' ? 'Settled' : 'Pending Settlement'}
                                </span>
                            </div>
                        </div>
                    </DetailCard>
                </div>
            </div>
        </div>
    );
}

function DetailCard({ icon, title, color, children }) {
    return (
        <div className={`p-6 rounded-2xl border ${color} relative overflow-hidden`}>
            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="bg-white p-2 rounded-xl shadow-sm">{icon}</div>
                <h3 className="font-bold text-slate-800">{title}</h3>
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

function Row({ label, value }) {
    return (
        <div className="flex justify-between items-center text-sm border-b border-black/5 pb-2 last:border-0 last:pb-0">
            <span className="text-slate-500 font-bold">{label}</span>
            <span className="font-black text-slate-700">{value}</span>
        </div>
    );
}
