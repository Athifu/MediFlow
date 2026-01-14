import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Bed, Clock } from "lucide-react";

export default function BedStatusWidget() {
    const [incomingBeds, setIncomingBeds] = useState([]);

    useEffect(() => {
        const fetchBeds = () => {
            api.get("/patients").then(data => {
                // Filter patients where discharge is APPROVED -> Bed becoming available
                const availableSoon = data.filter(p => p.discharge_approved);
                setIncomingBeds(availableSoon);
            }).catch(console.error);
        };
        fetchBeds();
        const interval = setInterval(fetchBeds, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg border-indigo-800">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Bed className="w-5 h-5 text-yellow-400" />
                Emergency Room Status
            </h3>
            <div className="space-y-3">
                {incomingBeds.length === 0 ? (
                    <p className="text-sm text-indigo-200">No beds becoming available soon.</p>
                ) : (
                    incomingBeds.map(p => (
                        <div key={p.id} className="bg-indigo-800 p-3 rounded-lg flex items-center justify-between">
                            <div>
                                <span className="block text-xs text-indigo-300 uppercase font-bold">Bed {p.bed_number}</span>
                                <span className="block text-sm font-medium">Available in 30 mins</span>
                            </div>
                            <Clock className="w-4 h-4 text-yellow-400" />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
