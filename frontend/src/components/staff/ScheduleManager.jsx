import React, { useState } from 'react';
import { Calendar, Clock, User, ChevronRight, ChevronLeft, Briefcase, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const SHIFTS = [
    { id: 1, day: "Mon", date: "12", time: "08:00 - 16:00", type: "Day Shift", area: "ICU", status: "confirmed" },
    { id: 2, day: "Tue", date: "13", time: "08:00 - 16:00", type: "Day Shift", area: "ICU", status: "confirmed" },
    { id: 3, day: "Wed", date: "14", time: "OFF", type: "Rest Day", area: "-", status: "off" },
    { id: 4, day: "Thu", date: "15", time: "20:00 - 08:00", type: "Night Shift", area: "ER", status: "pending" },
    { id: 5, day: "Fri", date: "16", time: "20:00 - 08:00", type: "Night Shift", area: "ER", status: "confirmed" },
];

export default function ScheduleManager() {
    const [currentWeek, setCurrentWeek] = useState("Oct 12 - Oct 18");

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/staff/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                            <Plus className="w-5 h-5" /> Request Swap
                        </button>
                    </div>
                </div>

                <div className="flex items-end justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white">
                            <Calendar className="w-8 h-8" />
                        </div>
                        My Roster
                    </h1>
                    <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                        <button className="p-2 hover:bg-slate-50 rounded-lg"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
                        <span className="font-bold text-slate-700">{currentWeek}</span>
                        <button className="p-2 hover:bg-slate-50 rounded-lg"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
                    </div>
                </div>

                {/* Schedule Grid */}
                <div className="grid grid-cols-5 gap-4">
                    {SHIFTS.map(shift => (
                        <div key={shift.id} className={`group relative p-6 rounded-3xl border-2 transition-all ${shift.status === 'off' ? 'bg-slate-100 border-slate-200 opacity-70' : 'bg-white border-slate-100 hover:border-indigo-400 hover:shadow-lg'}`}>

                            <div className="text-center mb-6">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{shift.day}</p>
                                <h3 className="text-3xl font-black text-slate-800">{shift.date}</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Clock className={`w-5 h-5 ${shift.status === 'off' ? 'text-slate-400' : 'text-indigo-500'}`} />
                                    <span className="font-bold text-slate-700 text-sm">{shift.time}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Briefcase className={`w-5 h-5 ${shift.status === 'off' ? 'text-slate-400' : 'text-indigo-500'}`} />
                                    <span className="font-bold text-slate-700 text-sm">{shift.type}</span>
                                </div>
                                {shift.area !== '-' && (
                                    <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">
                                        Area: {shift.area}
                                    </div>
                                )}
                            </div>

                            {shift.status === 'pending' && (
                                <div className="absolute top-4 right-4 w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                            )}

                            <button className="mt-6 w-full py-2 rounded-xl border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 font-bold text-sm transition-colors opacity-0 group-hover:opacity-100">
                                Details
                            </button>

                        </div>
                    ))}
                </div>

                {/* Summary Stats */}
                <div className="mt-8 bg-slate-900 rounded-3xl p-8 text-white grid grid-cols-3 divide-x divide-slate-700">
                    <div className="px-8 text-center">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Hours</p>
                        <h3 className="text-4xl font-bold">36h</h3>
                    </div>
                    <div className="px-8 text-center">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Next Shift</p>
                        <h3 className="text-4xl font-bold text-emerald-400">Tue 08:00</h3>
                    </div>
                    <div className="px-8 text-center">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Team</p>
                        <div className="flex justify-center -space-x-2 mt-2">
                            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center font-bold">JD</div>
                            <div className="w-10 h-10 rounded-full bg-slate-600 border-2 border-slate-900 flex items-center justify-center font-bold">AS</div>
                            <div className="w-10 h-10 rounded-full bg-slate-500 border-2 border-slate-900 flex items-center justify-center font-bold">+3</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
