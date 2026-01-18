import React, { useState, useEffect } from 'react';
import { Clock, Users, Activity, AlertTriangle, ChevronRight, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WaitTimePredictor() {
    const [waitTime, setWaitTime] = useState(25);
    const [occupancy, setOccupancy] = useState(65);
    const [trend, setTrend] = useState("stable"); // stable, rising, falling

    // Simulate live data updates
    useEffect(() => {
        const interval = setInterval(() => {
            const change = Math.random() > 0.5 ? 2 : -2;
            setWaitTime(prev => Math.max(5, prev + change));
            setOccupancy(prev => Math.min(100, Math.max(20, prev + (Math.random() > 0.5 ? 3 : -3))));
            setTrend(change > 0 ? "rising" : "falling");
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/patient/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back to Dashboard
                    </Link>
                </div>

                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
                        <div className="p-3 bg-rose-500 text-white rounded-2xl shadow-lg shadow-rose-200">
                            <Activity className="w-8 h-8" />
                        </div>
                        ER Wait Time Live
                    </h1>
                    <p className="text-slate-500 font-medium">Real-time prediction based on current triage capacity</p>
                </div>

                {/* Main Stat Card */}
                <div className="bg-white rounded-[3rem] p-12 shadow-xl shadow-slate-200 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left relative overflow-hidden mb-8">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex-1">
                        <p className="text-rose-500 font-bold uppercase tracking-widest mb-2">Current Estimated Wait</p>
                        <div className="text-[8rem] font-black text-slate-900 leading-none tracking-tighter">
                            {waitTime}<span className="text-4xl text-slate-400 ml-2">min</span>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm mt-4 ${trend === 'rising' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            <BarChart2 className="w-4 h-4" />
                            Trend: {trend === 'rising' ? 'Wait times increasing' : 'Wait times decreasing'}
                        </div>
                    </div>

                    <div className="relative z-10 bg-slate-50 p-8 rounded-3xl border border-slate-100 w-full md:w-80">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-700">Occupancy</h3>
                            <Users className="text-slate-400 w-5 h-5" />
                        </div>
                        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden mb-2">
                            <div
                                className={`h-full transition-all duration-1000 ${occupancy > 80 ? 'bg-red-500' : occupancy > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                style={{ width: `${occupancy}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                            <span>Low</span>
                            <span>High</span>
                        </div>
                        <p className="text-center mt-6 font-bold text-slate-500">
                            {occupancy > 80 ? "High Patient Volume" : "Normal Patient Volume"}
                        </p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-blue-900 mb-2">When to visit ER?</h3>
                            <p className="text-blue-700/80 text-sm leading-relaxed">
                                Visit immediately for chest pain, difficulty breathing, severe bleeding, or stroke symptoms. For minor issues, consider Urgent Care.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-4">
                            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Book Urgent Care</h3>
                                <p className="text-slate-500 text-sm">Skip the ER wait for non-emergencies</p>
                            </div>
                        </div>
                        <ChevronRight className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
                    </div>
                </div>

            </div>
        </div>
    );
}
