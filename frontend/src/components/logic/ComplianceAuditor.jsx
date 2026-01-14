import { useState } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function ComplianceAuditor({ selectedPatient }) {
    const [alert, setAlert] = useState(null);

    const handleDischarge = () => {
        if (!selectedPatient) return;

        if (selectedPatient.missing_docs > 0) {
            setAlert(`⚠️ Compliance Error: Missing Surgical Consent (${selectedPatient.missing_docs} forms pending)`);
        } else {
            setAlert(null);
            // In a real app, this would call an API to update status
            // api.put(`/patients/${selectedPatient.id}`, { status: "Discharge Approved" });
            window.alert(`Success: ${selectedPatient.name} marked for Discharge.`);
        }
    };

    if (!selectedPatient) return <div className="p-4 text-gray-400 text-sm">Select a patient to audit.</div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border h-full">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                Compliance Auditor
            </h3>

            <div className="bg-slate-50 p-4 rounded-lg mb-4">
                <p className="font-medium text-gray-700">Auditing: <span className="text-black font-bold">{selectedPatient.name}</span></p>
                <p className="text-sm text-gray-500 mt-1">Current Status: {selectedPatient.status}</p>
            </div>

            {alert && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-start gap-2 text-sm font-bold animate-pulse border border-red-200">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    {alert}
                </div>
            )}

            <Button
                onClick={handleDischarge}
                className="w-full bg-green-600 hover:bg-green-700 font-bold"
                size="lg"
            >
                Authorize Discharge
            </Button>
        </div>
    );
}
