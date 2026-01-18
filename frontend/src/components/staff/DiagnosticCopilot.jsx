import React, { useState } from 'react';
import { Brain, Search, Lightbulb, AlertTriangle, FileText, ChevronRight, Activity, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DiagnosticCopilot() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = () => {
        setLoading(true);
        // Simulate AI analysis
        setTimeout(() => {
            setResult({
                differentials: [
                    { name: "Pneumonia", probability: 85, color: "bg-red-500", evidence: ["Fever", "Cough", "Chest Pain"] },
                    { name: "Bronchitis", probability: 60, color: "bg-amber-500", evidence: ["Cough", "Fatigue"] },
                    { name: "COVID-19", probability: 45, color: "bg-blue-500", evidence: ["Fever", "Fatigue"] }
                ],
                recommendations: [
                    "Order Chest X-Ray",
                    "Complete Blood Coun (CBC)",
                    "Sputum Culture"
                ]
            });
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/staff/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <Brain className="text-purple-600 w-8 h-8" />
                        Diagnostic <span className="text-purple-600">Copilot</span>
                    </h1>
                </div>

                {/* Input Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8">
                    <h2 className="text-lg font-bold text-slate-700 mb-4">Patient Case Input</h2>
                    <div className="relative mb-4">
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter patient symptoms, history, and vitals here for AI analysis..."
                            className="w-full h-32 p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none"
                        ></textarea>
                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <button className="text-slate-400 hover:text-purple-600 cursor-pointer">
                                <FileText className="w-5 h-5" />
                            </button>
                            <button className="text-slate-400 hover:text-purple-600 cursor-pointer">
                                <Database className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={!query || loading}
                        className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>Analyzing Clinical Data...</>
                        ) : (
                            <><Lightbulb className="w-5 h-5" /> Generate Differentials</>
                        )}
                    </button>
                </div>

                {/* Results Section */}
                {result && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">

                        {/* Differential Diagnosis */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="font-bold text-slate-400 uppercase tracking-widest text-sm">Top Differentials</h3>
                            {result.differentials.map((diff, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center font-bold text-lg relative">
                                        <span className="z-10 text-slate-700">{diff.probability}%</span>
                                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-200" />
                                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className={diff.color.replace('bg-', 'text-')} strokeDasharray={`${diff.probability * 1.75} 175`} />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-slate-800">{diff.name}</h4>
                                        <div className="flex gap-2 mt-2">
                                            {diff.evidence.map((ev, i) => (
                                                <span key={i} className="px-2 py-1 bg-slate-50 text-slate-500 text-xs font-bold rounded">{ev}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <ChevronRight className="text-slate-300" />
                                </div>
                            ))}
                        </div>

                        {/* Recommendations */}
                        <div>
                            <h3 className="font-bold text-slate-400 uppercase tracking-widest text-sm mb-4">Suggested Actions</h3>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <ul className="space-y-4">
                                    {result.recommendations.map((rec, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                                                <span className="text-xs font-bold">{idx + 1}</span>
                                            </div>
                                            <span className="font-bold text-slate-700 text-sm">{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full mt-6 py-3 border border-purple-200 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors">
                                    Add to Care Plan
                                </button>
                            </div>

                            <div className="mt-6 bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3">
                                <AlertTriangle className="text-amber-500 w-5 h-5 shrink-0" />
                                <p className="text-amber-800 text-xs font-medium">
                                    <strong>Note:</strong> AI suggestions are for decision support only. Clinical judgment required.
                                </p>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
