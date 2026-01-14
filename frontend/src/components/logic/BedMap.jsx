import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Bed } from "lucide-react";

export default function BedMap() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = () => {
            api.get("/patients").then(setPatients).catch(console.error);
        };
        fetchPatients();
        const interval = setInterval(fetchPatients, 5000);
        return () => clearInterval(interval);
    }, []);

    // Mock layout of beds
    const bedLayout = [
        "101-A", "101-B", "204-A", "204-B",
        "305-C", "404-F", "501-A", "501-B"
    ];

    const getBedStatus = (bedNum) => {
        const patient = patients.find(p => p.bed_number === bedNum);
        if (!patient) return "empty";
        if (patient.discharge_approved) return "clearing";
        return "occupied";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "empty": return "bg-emerald-500 border-emerald-600 text-white";
            case "clearing": return "bg-yellow-400 border-yellow-500 text-yellow-900"; // Likely Empty
            case "occupied": return "bg-rose-500 border-rose-600 text-white";
            default: return "bg-gray-200";
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "empty": return "Available";
            case "clearing": return "Available in 30m";
            case "occupied": return "Occupied";
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-700">
                <Bed className="w-6 h-6" />
                Live Bed Map
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bedLayout.map(bed => {
                    const status = getBedStatus(bed);
                    return (
                        <div key={bed} className={`p-4 rounded-xl border-b-4 flex flex-col items-center justify-center text-center transition-all ${getStatusColor(status)}`}>
                            <span className="text-2xl font-bold mb-1">{bed}</span>
                            <span className="text-xs uppercase font-bold tracking-wider opacity-90">{getStatusLabel(status)}</span>
                        </div>
                    )
                })}
            </div>

            <div className="mt-6 flex gap-4 text-sm text-gray-600 justify-center">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div> Available</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-full"></div> Occupied</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-full"></div> Clearing Soon</div>
            </div>
        </div>
    );
}
