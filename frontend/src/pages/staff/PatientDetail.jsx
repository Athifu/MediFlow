import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { ArrowLeft, Activity, FileText, Pill, CreditCard } from "lucide-react";

export default function StaffPatientDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        // In a real app, fetch specific patient by ID. 
        // Here we'll fetch all and find one, or use the mock logic.
        api.get("/patients").then(data => {
            // Mock finding by ID or NFC Tag ID
            const found = data.find(p => p.id === id || p.nfc_tag_id === id);
            setPatient(found || data[0]); // Fallback to first for demo if not found
        }).catch(console.error);
    }, [id]);

    if (!patient) return <div className="p-8">Loading Patient Chart...</div>;

    return (
        <div className="space-y-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-sm border p-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">{patient.name}</h1>
                        <p className="text-slate-500 text-lg">ID: {patient.id} • Bed: {patient.bed_number}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-bold uppercase tracking-wider ${patient.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                        {patient.status}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 bg-slate-50 rounded-xl border">
                        <h3 className="flex items-center gap-2 font-bold mb-4 text-slate-700">
                            <Activity className="w-5 h-5 text-blue-500" /> Vitals
                        </h3>
                        <div className="space-y-2">
                            <p className="flex justify-between"><span>BP:</span> <span className="font-bold">120/80</span></p>
                            <p className="flex justify-between"><span>HR:</span> <span className="font-bold mb-0">72 bpm</span></p>
                            <p className="flex justify-between"><span>Temp:</span> <span className="font-bold">98.6°F</span></p>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-xl border">
                        <h3 className="flex items-center gap-2 font-bold mb-4 text-slate-700">
                            <Pill className="w-5 h-5 text-purple-500" /> Medications
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Paracetamol 500mg (Morning)</li>
                            <li>Amoxicillin 250mg (Evening)</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-xl border">
                        <h3 className="flex items-center gap-2 font-bold mb-4 text-slate-700">
                            <FileText className="w-5 h-5 text-orange-500" /> Documents
                        </h3>
                        <div className="space-y-2 text-sm">
                            <p className={patient.missing_docs > 0 ? "text-red-600 font-bold" : "text-green-600"}>
                                {patient.missing_docs > 0 ? `⚠️ ${patient.missing_docs} Missing Forms` : "✅ All Cleared"}
                            </p>
                            <p className="text-slate-500">Admission Form: Signed</p>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-xl border">
                        <h3 className="flex items-center gap-2 font-bold mb-4 text-slate-700">
                            <CreditCard className="w-5 h-5 text-green-600" /> Billing
                        </h3>
                        <div className="space-y-2">
                            <p className="flex justify-between items-end">
                                <span className="text-sm text-slate-500">Total Due:</span>
                                <span className="text-2xl font-bold text-slate-800">${patient.bill_amount?.toFixed(2)}</span>
                            </p>
                            <div className="flex gap-2">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${patient.discharge_approved ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                                    {patient.discharge_approved ? 'Ready for Payment' : 'Pending Discharge'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
