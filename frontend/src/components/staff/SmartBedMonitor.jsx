import React, { useState, useEffect } from 'react';
import { Bed, User, Scale, ArrowUpCircle, AlertTriangle, RefreshCw, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_BEDS = [
    { id: 1, room: "101", occupancy: "Occupied", patient: "John Doe", weight: "75 kg", angle: "30°", status: "normal", rails: "Up" },
    { id: 2, room: "102", occupancy: "Empty", patient: "--", weight: "0 kg", angle: "0°", status: "ready", rails: "Down" },
    { id: 3, room: "103", occupancy: "Occupied", patient: "Alice Smith", weight: "62 kg", angle: "45°", status: "fall_risk", rails: "Down" },
    { id: 4, room: "104", occupancy: "Occupied", patient: "Bob Brown", weight: "88 kg", angle: "15°", status: "normal", rails: "Up" },
];

export default function SmartBedMonitor() {
    const [beds, setBeds] = useState(MOCK_BEDS);

    // Simulate updates
    const refreshBeds = () => {
        setBeds(prev => prev.map(bed => ({
            ...bed,
            angle: bed.occupancy === "Occupied" ? `${Math.floor(Math.random() * 60)}°` : "0°"
        })));
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/staff/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-4">
                        <button onClick={refreshBeds} className="p-2 bg-white rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <div className="bg-blue-600 p-2 rounded-xl text-white">
                                <Bed className="w-8 h-8" />
                            </div>
                            Smart Bed IoT
                        </h1>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex gap-6 mb-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Normal
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div> Fall Risk / Alert
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <div className="w-3 h-3 rounded-full bg-slate-300"></div> Empty / Ready
                    </div>
                </div>

                {/* Bed Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {beds.map(bed => (
                        <div key={bed.id} className={`bg-white rounded-3xl p-6 border-2 relative overflow-hidden transition-all ${bed.status === 'fall_risk' ? 'border-amber-400 shadow-xl shadow-amber-100' : 'border-slate-100 shadow-sm'}`}>

                            {bed.status === 'fall_risk' && (
                                <div className="absolute top-0 right-0 bg-amber-400 text-white px-4 py-1 rounded-bl-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> Fall Risk Alert
                                </div>
                            )}

                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${bed.occupancy === 'Occupied' ? 'bg-blue-600' : 'bg-slate-200 text-slate-400'}`}>
                                        <h2 className="text-2xl font-black">{bed.room}</h2>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Patient</p>
                                        <h3 className="font-bold text-slate-800 text-lg">{bed.patient}</h3>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${bed.occupancy === 'Occupied' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                                    {bed.occupancy}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 bg-slate-50 rounded-2xl p-4">
                                <div className="text-center border-r border-slate-200 last:border-0">
                                    <div className="flex justify-center mb-1 text-slate-400"><Scale className="w-5 h-5" /></div>
                                    <p className="font-bold text-slate-800">{bed.weight}</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Weight</p>
                                </div>
                                <div className="text-center border-r border-slate-200 last:border-0">
                                    <div className="flex justify-center mb-1 text-slate-400"><ArrowUpCircle className="w-5 h-5" /></div>
                                    <p className="font-bold text-slate-800">{bed.angle}</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Incline</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex justify-center mb-1 text-slate-400"><div className="w-5 h-5 border-2 border-current rounded-md"></div></div>
                                    <p className={`font-bold ${bed.rails === 'Down' && bed.occupancy === 'Occupied' ? 'text-red-500' : 'text-slate-800'}`}>{bed.rails}</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Rails</p>
                                </div>
                            </div>

                            {bed.status === 'fall_risk' && (
                                <div className="mt-4 flex gap-2">
                                    <button className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition-colors">
                                        Dispatch Nurse
                                    </button>
                                    <button className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-colors">
                                        Reset Alarm
                                    </button>
                                </div>
                            )}

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
