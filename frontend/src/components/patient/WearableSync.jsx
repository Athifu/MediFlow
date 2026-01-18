import React, { useState } from 'react';
import { Watch, Heart, Smartphone, Moon, Footprints, RefreshCw, Check, Link as LinkIcon, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WearableSync() {
    const [synced, setSynced] = useState(false);
    const [device, setDevice] = useState(null);

    const connectDevice = (dev) => {
        setDevice(dev);
        // Simulate loading
        setTimeout(() => {
            setSynced(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/patient/dashboard" className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
                        <ChevronLeft />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Wearable Devices</h1>
                    <div className="w-10"></div>
                </div>

                {!synced ? (
                    <div className="bg-white rounded-3xl p-8 shadow-xl text-center animate-fade-in">
                        <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <Watch className="w-12 h-12 text-slate-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Connect Your Device</h2>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto">Sync your health data automatically to help Dr. Wilson monitor your recovery progress.</p>

                        <div className="space-y-4">
                            <button
                                onClick={() => connectDevice('apple')}
                                className="w-full py-4 border border-slate-200 hover:border-black rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-700 hover:bg-slate-50 transition-all"
                            >
                                <Smartphone className="w-5 h-5" /> Connect Apple Health
                            </button>
                            <button
                                onClick={() => connectDevice('fitbit')}
                                className="w-full py-4 border border-slate-200 hover:border-teal-500 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-700 hover:bg-teal-50 transition-all"
                            >
                                <Watch className="w-5 h-5" /> Connect Fitbit
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 animate-fade-in">

                        {/* Sync Status Card */}
                        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                                    <Check className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Connected to {device === 'apple' ? 'Apple Health' : 'Fitbit'}</h3>
                                    <p className="text-slate-400 text-sm flex items-center gap-1">
                                        <RefreshCw className="w-3 h-3" /> Last synced: Just now
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setSynced(false)} className="text-slate-400 hover:text-white text-sm font-bold">
                                Unlink
                            </button>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <MetricCard
                                icon={<Heart className="text-rose-500" />}
                                label="Avg Heart Rate"
                                value="72 bpm"
                                color="bg-rose-50 border-rose-100"
                            />
                            <MetricCard
                                icon={<Footprints className="text-emerald-500" />}
                                label="Steps Today"
                                value="8,432"
                                color="bg-emerald-50 border-emerald-100"
                            />
                            <MetricCard
                                icon={<Moon className="text-indigo-500" />}
                                label="Sleep Quality"
                                value="85%"
                                sub="7h 12m"
                                color="bg-indigo-50 border-indigo-100"
                            />
                            <MetricCard
                                icon={<Activity className="text-amber-500" />}
                                label="Active Energy"
                                value="450 cal"
                                color="bg-amber-50 border-amber-100"
                            />
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                            <p className="text-blue-800 font-medium text-sm">
                                "Your activity levels have increased by 15% this week. Great job on your recovery!"
                            </p>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

function MetricCard({ icon, label, value, sub, color }) {
    return (
        <div className={`p-6 rounded-2xl border ${color} flex flex-col justify-between h-32`}>
            <div className="flex justify-between items-start">
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
                    {sub && <span className="text-slate-400 text-xs font-bold">{sub}</span>}
                </div>
            </div>
        </div>
    )
}

function Activity({ className }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
    )
}
