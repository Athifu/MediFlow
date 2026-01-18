import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle, PlayCircle, ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const MODULES = [
    { id: 1, title: "HIPAA Compliance 2024", duration: "45 min", progress: 100, status: "completed", type: "Required" },
    { id: 2, title: "New EHR System Training", duration: "1.5 hrs", progress: 60, status: "in_progress", type: "Required" },
    { id: 3, title: "Patient Safety Protocols", duration: "30 min", progress: 0, status: "pending", type: "Required" },
    { id: 4, title: "Advanced Cardiac Life Support", duration: "4 hrs", progress: 0, status: "locked", type: "Optional" },
];

export default function Onboarding() {
    const [activeTab, setActiveTab] = useState('training');

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/staff/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back to Dashboard
                    </Link>
                </div>

                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-2">
                            <div className="bg-purple-600 p-2 rounded-xl text-white">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            Learning Center
                        </h1>
                        <p className="text-slate-500 font-medium ml-14">Track your certifications and mandatory training.</p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-xs font-bold uppercase text-slate-400">Completed</p>
                            <h3 className="text-2xl font-black text-emerald-600">1/4</h3>
                        </div>
                        <div className="text-center border-l border-slate-100 pl-6">
                            <p className="text-xs font-bold uppercase text-slate-400">Hours Due</p>
                            <h3 className="text-2xl font-black text-slate-800">2.5h</h3>
                        </div>
                    </div>
                </div>

                {/* Module List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MODULES.map(module => (
                        <div key={module.id} className={`group bg-white p-6 rounded-3xl border-2 transition-all ${module.status === 'in_progress' ? 'border-purple-200 shadow-lg shadow-purple-50' : 'border-slate-100 opacity-90 hover:opacity-100 hover:shadow-md'}`}>

                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${module.type === 'Required' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {module.type}
                                </span>
                                {module.status === 'completed' ? (
                                    <CheckCircle className="text-emerald-500 w-6 h-6" />
                                ) : module.status === 'locked' ? (
                                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-xs">🔒</div>
                                ) : (
                                    <PlayCircle className="text-purple-500 w-6 h-6" />
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-2">{module.title}</h3>
                            <p className="text-slate-500 text-sm font-bold flex items-center gap-2 mb-6">
                                <ClockIcon className="w-4 h-4" /> {module.duration}
                            </p>

                            {/* Progress Bar */}
                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${module.status === 'completed' ? 'bg-emerald-500' : 'bg-purple-600'}`}
                                    style={{ width: `${module.progress}%` }}
                                ></div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400 uppercase">{module.progress}% Complete</span>
                                <button
                                    disabled={module.status === 'locked'}
                                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${module.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : module.status === 'locked' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                                >
                                    {module.status === 'completed' ? 'Review' : module.status === 'in_progress' ? 'Resume' : 'Start'}
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

function ClockIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    )
}
