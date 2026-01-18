import React, { useState } from 'react';
import { LayoutDashboard, Users, Activity, AlertTriangle, Battery, Thermometer, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_ZONES = [
    { id: 1, name: 'Emergency Room', capacity: 40, occupied: 38, status: 'critical', trend: '+5%' },
    { id: 2, name: 'ICU Wing A', capacity: 12, occupied: 10, status: 'warning', trend: '+12%' },
    { id: 3, name: 'ICU Wing B', capacity: 12, occupied: 5, status: 'stable', trend: '-2%' },
    { id: 4, name: 'Pediatrics', capacity: 25, occupied: 18, status: 'stable', trend: '0%' },
    { id: 5, name: 'General Ward North', capacity: 50, occupied: 45, status: 'warning', trend: '+8%' },
    { id: 6, name: 'General Ward South', capacity: 50, occupied: 20, status: 'stable', trend: '-5%' },
    { id: 7, name: 'Surgery Prep', capacity: 10, occupied: 2, status: 'stable', trend: '-10%' },
    { id: 8, name: 'Recovery Room', capacity: 15, occupied: 12, status: 'warning', trend: '+15%' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'critical': return 'bg-red-500 text-white animate-pulse-slow';
        case 'warning': return 'bg-amber-400 text-amber-900';
        default: return 'bg-emerald-400 text-emerald-900';
    }
};

const getOccupancyColor = (percentage) => {
    if (percentage >= 90) return 'text-red-600 bg-red-50';
    if (percentage >= 75) return 'text-amber-600 bg-amber-50';
    return 'text-emerald-600 bg-emerald-50';
};

export default function ResourceHeatmap() {
    const [selectedZone, setSelectedZone] = useState(null);

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Hospital Resource <span className="text-blue-600">Heatmap</span></h1>
                    <p className="text-slate-500 mt-1">Real-time occupancy and operational status</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/staff/dashboard" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                        Back to Dashboard
                    </Link>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Live Feed
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Main Heatmap Grid */}
                <div className="col-span-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                    {MOCK_ZONES.map((zone) => {
                        const occupancyPct = Math.round((zone.occupied / zone.capacity) * 100);

                        return (
                            <div
                                key={zone.id}
                                onClick={() => setSelectedZone(zone)}
                                className={`group relative overflow-hidden bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${selectedZone?.id === zone.id ? 'ring-2 ring-blue-500' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-3 h-3 rounded-full ${getStatusColor(zone.status)}`}></div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${getOccupancyColor(occupancyPct)}`}>
                                        {occupancyPct}% Full
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-800 mb-1">{zone.name}</h3>
                                <p className="text-slate-400 text-sm mb-6">{zone.occupied} / {zone.capacity} patients</p>

                                {/* Visual Bar */}
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${occupancyPct > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
                                        style={{ width: `${occupancyPct}%` }}
                                    ></div>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        )
                    })}
                </div>

                {/* Sidebar Info Panel */}
                <div className="col-span-4 space-y-6">

                    {/* Context Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Activity className="text-blue-500" />
                            {selectedZone ? selectedZone.name : "System Overview"}
                        </h2>

                        {selectedZone ? (
                            <div className="space-y-4 animate-fade-in">
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                    <span className="text-slate-500 text-sm font-medium">Occupancy</span>
                                    <span className="text-slate-900 font-bold">{Math.round((selectedZone.occupied / selectedZone.capacity) * 100)}%</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                    <span className="text-slate-500 text-sm font-medium">Net Trend (1h)</span>
                                    <span className={`font-bold ${selectedZone.trend.includes('+') ? 'text-red-500' : 'text-emerald-500'}`}>{selectedZone.trend}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                    <span className="text-slate-500 text-sm font-medium">Head Nurse</span>
                                    <span className="text-slate-900 font-bold">Sarah C.</span>
                                </div>

                                <div className="pt-4">
                                    <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                                        Manage Capacity
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-400">
                                <LayoutDashboard className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>Select a zone to view detailed analytics and staffing predictions.</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Predictive Alert</h3>
                            <p className="text-blue-100 text-sm mb-4">AI forecasts a surge in ER capacity within 2 hours based on local weather and traffic data.</p>
                            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
                                View Details
                            </button>
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}
