import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import DischargeTracker from "./DischargeTracker";
import { Copy, CheckCircle } from "lucide-react";

export default function FamilyTracker() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would be a specialized public endpoint
        // For MVP, we reuse getPatient but frontend ensures we only render safe data
        api.get(`/patients/${id}`)
            .then(data => {
                setPatient(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen text-teal-600">Loading update...</div>;
    if (!patient) return <div className="flex justify-center items-center h-screen text-slate-500">Patient info not available.</div>;

    // Derived simplified status for family
    const getFriendlyStatus = (s) => {
        if (s === "Discharge Approved") return "Ready for Pickup! 🚗";
        if (s === "Discharge Pending") return "Final Checks 📋";
        return "Recovering ❤️‍🩹";
    }

    return (
        <div className="min-h-screen bg-slate-50 from-teal-50 to-slate-100 bg-gradient-to-br p-6 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100/50 rounded-full mb-4">
                        <span className="text-4xl">🏥</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Family Update Bridge</h1>
                    <p className="text-slate-500 mt-2">Real-time status for your loved one.</p>
                </div>

                <div className="bg-white/60 rounded-2xl p-6 mb-8 border border-slate-100">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Current Status</h2>
                    <p className="text-3xl font-bold text-teal-700">{getFriendlyStatus(patient.status)}</p>
                </div>

                <div className="mb-10">
                    <h3 className="font-bold text-slate-700 mb-4">Discharge Journey</h3>
                    <DischargeTracker status={patient.status} />
                </div>

                <div className="text-center text-sm text-slate-400">
                    <p>Updates automatically. No sensitive medical data is shown.</p>
                    <p className="mt-2">&copy; MediFlow AI Secure Link</p>
                </div>
            </div>
        </div>
    );
}
