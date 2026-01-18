import React from 'react';
import { ChevronLeft, Activity, TrendingUp, TrendingDown, AlertCircle, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_LABS = [
    { id: 1, name: "Total Cholesterol", value: 180, unit: "mg/dL", range: "125-200", status: "normal", history: [190, 185, 182, 180] },
    { id: 2, name: "Hemoglobin A1c", value: 5.4, unit: "%", range: "< 5.7", status: "normal", history: [5.6, 5.5, 5.5, 5.4] },
    { id: 3, name: "Vitamin D", value: 25, unit: "ng/mL", range: "30-100", status: "low", history: [22, 24, 25] },
    { id: 4, name: "WBC Count", value: 11.5, unit: "K/uL", range: "4.5-11.0", status: "high", history: [8.5, 9.0, 11.5] },
];

export default function LabResults() {
    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/patient/dashboard" className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
                        <ChevronLeft />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Lab Results</h1>
                    <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                        <Download className="w-5 h-5" />
                    </button>
                </div>

                {/* Banner */}
                <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 mb-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Latest Blood Panel</h2>
                        <p className="text-blue-100 mb-4 opacity-80">Performed on Oct 12, 2026</p>
                        <div className="flex gap-2">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">2 Abnormal Values</span>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">Dr. Wilson Reviewed</span>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <Activity className="absolute bottom-4 right-4 text-white/10 w-24 h-24" />
                </div>

                <div className="space-y-6">
                    {MOCK_LABS.map(lab => (
                        <div key={lab.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{lab.name}</h3>
                                    <p className="text-slate-400 text-sm">Target: {lab.range} {lab.unit}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${lab.status === 'normal' ? 'bg-emerald-100 text-emerald-600' :
                                        lab.status === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                                    }`}>
                                    {lab.status}
                                </div>
                            </div>

                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-4xl font-bold text-slate-900">{lab.value}</span>
                                <span className="text-slate-400 font-medium mb-1">{lab.unit}</span>
                            </div>

                            {/* Visual Range Bar */}
                            <div className="h-4 bg-slate-100 rounded-full relative mb-4 overflow-hidden">
                                {/* Safe Zone Marker (Generic Center) */}
                                <div className="absolute top-0 bottom-0 left-1/4 right-1/4 bg-emerald-100/50 border-x border-emerald-200"></div>

                                {/* Value Marker */}
                                <div
                                    className={`absolute top-0 bottom-0 w-2 rounded-full transition-all duration-1000 ${lab.status === 'normal' ? 'bg-emerald-500 left-1/2' :
                                            lab.status === 'high' ? 'bg-red-500 left-[80%]' : 'bg-amber-500 left-[20%]'
                                        }`}
                                ></div>
                            </div>

                            {/* Footer Info */}
                            <div className="flex justify-between items-center text-xs text-slate-400 font-medium border-t border-slate-50 pt-4">
                                <div className="flex items-center gap-1">
                                    {/* Mock Trend Logic */}
                                    {lab.history[lab.history.length - 1] > lab.history[0] ? (
                                        <><TrendingUp className="w-4 h-4 text-red-400" /> Trending Up</>
                                    ) : (
                                        <><TrendingDown className="w-4 h-4 text-emerald-400" /> Trending Down</>
                                    )}
                                </div>
                                <button className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1">
                                    History <ChevronLeft className="rotate-180 w-3 h-3" />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
