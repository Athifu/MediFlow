import React, { useState } from 'react';
import { Map, Zap, Coffee, Cross, User, Navigation, ChevronRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEPARTMENTS = [
    { id: 1, name: "Cardiology", floor: 2, coords: { x: 30, y: 40 }, type: 'medical' },
    { id: 2, name: "ICU", floor: 2, coords: { x: 70, y: 30 }, type: 'restricted' },
    { id: 3, name: "Pediatrics", floor: 3, coords: { x: 40, y: 60 }, type: 'medical' },
    { id: 4, name: "Cafeteria", floor: 1, coords: { x: 20, y: 80 }, type: 'amenity' },
    { id: 5, name: "Pharmacy", floor: 1, coords: { x: 80, y: 70 }, type: 'amenity' },
    { id: 6, name: "Emergency Room", floor: 1, coords: { x: 50, y: 20 }, type: 'emergency' },
];

export default function HospitalMap() {
    const [selectedFloor, setSelectedFloor] = useState(1);
    const [activeLocation, setActiveLocation] = useState(null);

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/patient/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <Map className="text-blue-600" /> Hospital Navigator
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar Controls */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-slate-400" /> Select Floor
                            </h3>
                            <div className="space-y-2">
                                {[3, 2, 1].map(floor => (
                                    <button
                                        key={floor}
                                        onClick={() => { setSelectedFloor(floor); setActiveLocation(null); }}
                                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-between px-6 ${selectedFloor === floor ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                                    >
                                        <span>Level {floor}</span>
                                        {selectedFloor === floor && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-4">Legend</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                    <div className="w-4 h-4 rounded-full bg-rose-500"></div> Emergency
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                    <div className="w-4 h-4 rounded-full bg-blue-500"></div> Medical Dept
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                    <div className="w-4 h-4 rounded-full bg-emerald-500"></div> Amenities
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Area */}
                    <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg border border-slate-100 p-8 relative overflow-hidden min-h-[600px]">

                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

                        {/* Floor Plan (Abstract) */}
                        <div className="relative w-full h-full bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-9xl font-black text-slate-100 select-none">
                                L{selectedFloor}
                            </div>

                            {/* Departments */}
                            {DEPARTMENTS.filter(d => d.floor === selectedFloor).map(dept => (
                                <div
                                    key={dept.id}
                                    onClick={() => setActiveLocation(dept)}
                                    style={{ left: `${dept.coords.x}%`, top: `${dept.coords.y}%` }}
                                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 group ${activeLocation?.id === dept.id ? 'scale-110 z-20' : 'z-10'}`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center text-white transition-colors ${dept.type === 'emergency' ? 'bg-rose-500' : dept.type === 'amenity' ? 'bg-emerald-500' : 'bg-blue-600'} ${activeLocation?.id === dept.id ? 'ring-4 ring-offset-4 ring-blue-200' : ''}`}>
                                        {dept.type === 'amenity' ? <Coffee className="w-8 h-8" /> : <Cross className="w-8 h-8" />}
                                    </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                        {dept.name}
                                    </div>
                                </div>
                            ))}

                            {/* Navigation Path (Active) */}
                            {activeLocation && (
                                <div className="absolute inset-0 pointer-events-none">
                                    <svg className="w-full h-full">
                                        <line x1="50%" y1="90%" x2={`${activeLocation.coords.x}%`} y2={`${activeLocation.coords.y}%`} stroke="#3b82f6" strokeWidth="4" strokeDasharray="10 10" className="animate-[dash_1s_linear_infinite]" />
                                        <circle cx="50%" cy="90%" r="8" fill="#3b82f6" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Info Card Overlay */}
                        {activeLocation && (
                            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-between animate-slide-up">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{activeLocation.name}</h2>
                                    <p className="text-slate-500 font-bold">Level {activeLocation.floor} • {activeLocation.type.toUpperCase()}</p>
                                </div>
                                <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center gap-2">
                                    <Navigation className="w-5 h-5" /> Start Navigation
                                </button>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}
