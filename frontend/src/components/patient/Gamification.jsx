import React, { useState } from 'react';
import { Trophy, Star, Award, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BADGES = [
    { id: 1, name: "Early Riser", desc: "Completed morning meds for 7 days", icon: "🌅", color: "bg-orange-100 text-orange-600", unlocked: true },
    { id: 2, name: "Step Master", desc: "Walked 10k steps in a day", icon: "👟", color: "bg-blue-100 text-blue-600", unlocked: true },
    { id: 3, name: "Hydration Hero", desc: "Drank 8 glasses of water", icon: "💧", color: "bg-cyan-100 text-cyan-600", unlocked: false },
    { id: 4, name: "Perfect Week", desc: "100% adherence for 7 days", icon: "⭐", color: "bg-purple-100 text-purple-600", unlocked: false },
];

export default function Gamification() {
    const [points, setPoints] = useState(1250);

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/patient/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back to Dashboard
                    </Link>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 mb-8 relative overflow-hidden">

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                                <Trophy className="w-8 h-8 text-yellow-300" /> My Achievements
                            </h1>
                            <p className="text-indigo-100">Keep up the great work! You're on a streak.</p>
                        </div>
                        <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                            <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Total Points</p>
                            <h2 className="text-5xl font-black text-white">{points.toLocaleString()}</h2>
                        </div>
                    </div>

                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3"></div>
                </div>

                {/* Progress */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Current Streak</p>
                            <h3 className="text-2xl font-black text-slate-800">5 Days</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                            <Star className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Level 12</p>
                            <h3 className="text-2xl font-black text-slate-800">Health Pro</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Badges</p>
                            <h3 className="text-2xl font-black text-slate-800">8 / 20</h3>
                        </div>
                    </div>
                </div>

                {/* Badges Grid */}
                <h3 className="font-bold text-slate-900 text-xl mb-6">Badge Collection</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {BADGES.map((badge) => (
                        <div key={badge.id} className={`group relative bg-white p-6 rounded-3xl border-2 text-center transition-all ${badge.unlocked ? 'border-slate-100 hover:border-indigo-200 hover:shadow-lg' : 'border-slate-100 opacity-60 grayscale'}`}>

                            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${badge.unlocked ? badge.color : 'bg-slate-100 text-slate-400'}`}>
                                {badge.icon}
                            </div>

                            <h4 className="font-bold text-slate-800 mb-1">{badge.name}</h4>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">{badge.desc}</p>

                            {!badge.unlocked && (
                                <div className="absolute inset-0 bg-slate-50/50 flex items-center justify-center rounded-3xl backdrop-blur-[1px]">
                                    <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Locked</div>
                                </div>
                            )}

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
