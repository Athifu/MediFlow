import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { AlertCircle, Car, Clock } from "lucide-react";

export default function SmartRanker() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Poll every 5 seconds for real-time simulation
        const fetchPatients = () => {
            api.get("/patients").then(setPatients).catch(console.error);
        };
        fetchPatients();
        const interval = setInterval(fetchPatients, 5000);
        return () => clearInterval(interval);
    }, []);

    // Logic: Urgency Score Calculation
    // If (Status == "Discharge Approved" AND Ride_Waiting == True) -> Score = 100
    // Else -> Score = 0 (or strictly based on other rules if needed)

    // First, map patients to include a score
    const scoredPatients = patients.map(p => {
        let score = 0;
        if (p.status === "Discharge Approved" && p.ride_waiting) {
            score = 100;
        }
        return { ...p, urgencyScore: score };
    });

    // Then sort by score descending
    const sortedPatients = scoredPatients.sort((a, b) => b.urgencyScore - a.urgencyScore);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border h-full">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Priority Queue
            </h3>
            <div className="space-y-3">
                {sortedPatients.map((patient) => {
                    const isCritical = patient.status === "Discharge Pending" && patient.ride_waiting;
                    return (
                        <div key={patient.id} className={`p-4 rounded-lg border flex items-center justify-between ${isCritical ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
                            <div>
                                <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                                <p className="text-xs text-gray-500">Bed: {patient.bed_number} • {patient.status}</p>
                            </div>
                            {patient.urgencyScore >= 100 && (
                                <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">
                                    <Car className="w-3 h-3" />
                                    PRIORITY PICKUP
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
