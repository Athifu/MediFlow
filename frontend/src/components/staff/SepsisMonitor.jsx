import React, { useState, useEffect } from 'react';
import { AlertCircle, Activity, Heart, Thermometer, Droplets, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_PATIENTS = [
    { id: 1, name: "John Doe", room: "ICU-01", hr: 110, temp: 102.5, bp: "90/60", wbc: 15, sepsisScore: 85, status: "critical" },
    { id: 2, name: "Jane Smith", room: "ICU-02", hr: 88, temp: 99.1, bp: "115/75", wbc: 11, sepsisScore: 40, status: "warning" },
    { id: 3, name: "Bob Johnson", room: "ICU-03", hr: 72, temp: 98.6, bp: "120/80", wbc: 6, sepsisScore: 10, status: "normal" },
];

export default function SepsisMonitor() {
    const [patients, setPatients] = useState(MOCK_PATIENTS);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setPatients(prev => prev.map(p => ({
                ...p,
                hr: p.hr + (Math.random() > 0.5 ? 1 : -1),
                sepsisScore: Math.min(100, Math.max(0, p.sepsisScore + (Math.random() > 0.7 ? 1 : -1)))
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/staff/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
                            <div className="w-2 h-2 bg-red-600 rounded-full"></div> Live Monitoring
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Sepsis Watch</h1>
                    </div>
                </div>

                {/* High Risk Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {patients.map(patient => (
                        <div key={patient.id} className={`bg-white rounded-3xl p-6 border-2 transition-all ${patient.status === 'critical' ? 'border-red-500 shadow-xl shadow-red-200 animate-pulse-slow' : patient.status === 'warning' ? 'border-amber-400 shadow-lg' : 'border-slate-100 shadow-sm'}`}>

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">{patient.name}</h3>
                                    <p className="text-slate-400 text-sm font-medium">Room: {patient.room}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-lg ${patient.status === 'critical' ? 'bg-red-500' : patient.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                                    {patient.sepsisScore}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <VitalItem icon={<Heart className="w-4 h-4 text-rose-500" />} label="Heart Rate" value={`${patient.hr} bpm`} isCritical={patient.hr > 100} />
                                <VitalItem icon={<Thermometer className="w-4 h-4 text-orange-500" />} label="Temperature" value={`${patient.temp}°F`} isCritical={patient.temp > 100.4} />
                                <VitalItem icon={<Activity className="w-4 h-4 text-blue-500" />} label="BP" value={patient.bp} isCritical={false} />
                                <VitalItem icon={<Droplets className="w-4 h-4 text-purple-500" />} label="WBC" value={`${patient.wbc}k`} isCritical={patient.wbc > 12} />
                            </div>

                            {patient.status === 'critical' && (
                                <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex gap-3 mb-4">
                                    <AlertCircle className="text-red-600 w-5 h-5 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-red-700 text-sm">Sepsis Protocol Triggered</h4>
                                        <p className="text-red-600/80 text-xs">Start Antibiotics Bundle within 1hr.</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <button className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 text-sm">
                                    View Details
                                </button>
                                <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 text-sm">
                                    Alert Team
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

function VitalItem({ icon, label, value, isCritical }) {
    return (
        <div className={`p-3 rounded-xl border ${isCritical ? 'bg-red-50 border-red-100 animate-pulse' : 'bg-slate-50 border-slate-100'}`}>
            <div className="flex items-center gap-2 mb-1 opacity-70">
                {icon}
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
            </div>
            <p className={`text-lg font-bold ${isCritical ? 'text-red-600' : 'text-slate-800'}`}>{value}</p>
        </div>
    )
}
