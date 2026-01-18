import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Heart, Brain, Wind, Activity, Info, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ORGANS = [
    { id: 'heart', name: 'Heart', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-100', metrics: { bpm: 72, condition: 'Healthy' }, desc: 'Pumping blood efficiently. No irregularities detected.' },
    { id: 'brain', name: 'Brain', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-100', metrics: { stress: 'Low', sleep: '8h' }, desc: 'Cognitive functions normal. Good sleep patterns.' },
    { id: 'lungs', name: 'Lungs', icon: Wind, color: 'text-cyan-500', bg: 'bg-cyan-100', metrics: { capacity: '98%', rr: '16/min' }, desc: 'Clear reading. SpO2 levels optimal.' },
];

export default function OrganViewer() {
    const [selectedOrgan, setSelectedOrgan] = useState(ORGANS[0]);
    const [rotation, setRotation] = useState(0);

    const nextOrgan = () => {
        const currentIndex = ORGANS.findIndex(o => o.id === selectedOrgan.id);
        const nextIndex = (currentIndex + 1) % ORGANS.length;
        setSelectedOrgan(ORGANS[nextIndex]);
        setRotation(0);
    };

    const prevOrgan = () => {
        const currentIndex = ORGANS.findIndex(o => o.id === selectedOrgan.id);
        const prevIndex = (currentIndex - 1 + ORGANS.length) % ORGANS.length;
        setSelectedOrgan(ORGANS[prevIndex]);
        setRotation(0);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
            </div>

            {/* Header */}
            <div className="absolute top-8 left-8 z-10">
                <Link to="/patient/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold">
                    <ChevronLeft className="w-5 h-5" /> Back
                </Link>
            </div>

            <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* 3D Representation Area */}
                <div className="flex flex-col items-center">
                    <div className="relative w-80 h-80 flex items-center justify-center">
                        {/* Rotating Rings */}
                        <div className="absolute inset-0 border border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute inset-4 border border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                        {/* Organ Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${selectedOrgan.id === 'heart' ? 'from-rose-500/20' : selectedOrgan.id === 'brain' ? 'from-purple-500/20' : 'from-cyan-500/20'} to-transparent blur-3xl rounded-full`}></div>

                        {/* The Organ Icon (Scaled up) */}
                        <div className="transform transition-all duration-500 hover:scale-110 cursor-pointer">
                            {React.createElement(selectedOrgan.icon, {
                                size: 120,
                                className: `drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] ${selectedOrgan.color} animate-fade-in`
                            })}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-8 mt-8">
                        <button onClick={prevOrgan} className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold">{selectedOrgan.name}</h2>
                            <p className="text-blue-400 text-sm font-bold uppercase tracking-widest">Model 3D-v2</p>
                        </div>
                        <button onClick={nextOrgan} className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Info Panel */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`p-3 rounded-xl ${selectedOrgan.bg} ${selectedOrgan.color}`}>
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Health Status</h3>
                    </div>

                    <div className="space-y-6 mb-8">
                        {Object.entries(selectedOrgan.metrics).map(([key, val]) => (
                            <div key={key} className="flex justify-between items-end border-b border-white/10 pb-2">
                                <span className="text-slate-400 capitalize">{key}</span>
                                <span className="text-2xl font-bold">{val}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-500/10 rounded-xl p-4 mb-6 border border-blue-500/20">
                        <div className="flex gap-2 mb-2 text-blue-400">
                            <Info className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Analysis</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-300">
                            {selectedOrgan.desc}
                        </p>
                    </div>

                    <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl font-bold shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 transition-all active:scale-95">
                        <Eye className="w-5 h-5" /> View Detailed Scan
                    </button>
                </div>

            </div>
        </div>
    );
}
