import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Bed, Activity, ThermometerSun, AlertTriangle } from "lucide-react";

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

    // Simulated Heatmap Zones
    const zones = [
        { id: "ICU", label: "Intensive Care", capacity: 10, occupied: 9, status: "Critical" },
        { id: "ER", label: "Emergency Room", capacity: 20, occupied: 18, status: "High" },
        { id: "WA", label: "Wing A (Gen)", capacity: 30, occupied: 12, status: "Stable" },
        { id: "WB", label: "Wing B (Gen)", capacity: 30, occupied: 28, status: "High" },
    ];

    const getIntensityColor = (status) => {
        switch (status) {
            case "Critical": return "bg-rose-500 shadow-rose-500/50";
            case "High": return "bg-orange-500 shadow-orange-500/50";
            case "Stable": return "bg-emerald-500 shadow-emerald-500/50";
            default: return "bg-slate-300";
        }
    };

    return (
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-700">
                <ThermometerSun className="w-6 h-6 text-rose-500" />
                Resource Density Heatmap
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {zones.map(zone => (
                    <div key={zone.id} className="relative group cursor-pointer">
                        <div className={`absolute inset-0 rounded-2xl opacity-20 blur-xl ${getIntensityColor(zone.status)} transition-all group-hover:opacity-30`}></div>
                        <div className="relative bg-white border border-slate-100 p-4 rounded-2xl hover:scale-[1.02] transition-transform">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-slate-800">{zone.label}</h4>
                                {zone.status === 'Critical' && <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />}
                            </div>

                            <div className="flex items-end gap-1 mb-2">
                                <span className="text-3xl font-black text-slate-800">{Math.round((zone.occupied / zone.capacity) * 100)}%</span>
                                <span className="text-xs font-bold text-slate-400 mb-1">Load</span>
                            </div>

                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${getIntensityColor(zone.status).split(' ')[0]}`}
                                    style={{ width: `${(zone.occupied / zone.capacity) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-[10px] text-center font-bold text-slate-400 mt-2 uppercase tracking-wider">
                                {zone.occupied} / {zone.capacity} Beds
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-center gap-4 text-xs font-bold text-slate-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Stable</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div> High</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Critical</div>
            </div>
        </div>
    );
}
