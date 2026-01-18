import React, { useState } from 'react';
import { Pill, Check, Clock, AlertTriangle, ChevronLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_MEDS = [
    { id: 1, name: "Amoxicillin", dose: "500mg", time: "08:00 AM", taken: true, instructions: "Take with food" },
    { id: 2, name: "Ibuprofen", dose: "400mg", time: "02:00 PM", taken: false, instructions: "For pain as needed" },
    { id: 3, name: "Vitamin D", dose: "1000IU", time: "09:00 PM", taken: false, instructions: "Before bed" },
];

export default function MedicationTracker() {
    const [meds, setMeds] = useState(MOCK_MEDS);

    const toggleTaken = (id) => {
        setMeds(meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
    };

    const adherence = Math.round((meds.filter(m => m.taken).length / meds.length) * 100);

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans">

            <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/patient/dashboard" className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
                        <ChevronLeft />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800">My Medications</h1>
                    <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                        <Plus />
                    </button>
                </div>

                {/* Adherence Card */}
                <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-teal-900/10 mb-8 relative overflow-hidden">
                    <div className="relative z-10 flex justify-between items-end">
                        <div>
                            <p className="text-teal-100 text-sm font-bold uppercase mb-1">Daily Progress</p>
                            <h2 className="text-4xl font-bold">{adherence}%</h2>
                            <p className="text-teal-50/80 text-sm mt-1">You're doing great! Keep it up.</p>
                        </div>
                        <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center">
                            <span className="font-bold text-lg">{meds.filter(m => m.taken).length}/{meds.length}</span>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-slate-400 text-sm uppercase tracking-wider ml-1">Today's Schedule</h3>

                    {meds.map(med => (
                        <div key={med.id} className={`bg-white p-5 rounded-2xl shadow-sm border transition-all ${med.taken ? 'border-emerald-100 opacity-60' : 'border-slate-100 hover:shadow-md'}`}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${med.taken ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                        <Pill className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-lg ${med.taken ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{med.name}</h4>
                                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                            <span className="bg-slate-100 px-2 py-0.5 rounded">{med.dose}</span>
                                            <span>•</span>
                                            <Clock className="w-3 h-3" /> {med.time}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => toggleTaken(med.id)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${med.taken ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-100 text-slate-300 hover:bg-slate-200'}`}
                                >
                                    <Check className="w-6 h-6" />
                                </button>
                            </div>
                            {!med.taken && (
                                <div className="mt-3 pt-3 border-t border-slate-50 flex items-center gap-2 text-xs text-amber-500 font-bold">
                                    <AlertTriangle className="w-3 h-3" />
                                    {med.instructions}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
