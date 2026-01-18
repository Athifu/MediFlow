import React, { useState } from 'react';
import { Pill, AlertTriangle, Truck, Package, Search, Plus, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_INVENTORY = [
    { id: 1, name: "Amoxicillin 500mg", stock: 1200, min: 500, category: "Antibiotics", expiry: "2024-12-01", status: "ok" },
    { id: 2, name: "Lipitor 20mg", stock: 45, min: 100, category: "Cardiovascular", expiry: "2024-08-15", status: "low" },
    { id: 3, name: "Metformin 500mg", stock: 800, min: 200, category: "Diabetes", expiry: "2025-01-20", status: "ok" },
    { id: 4, name: "Ibuprofen 400mg", stock: 1500, min: 300, category: "Pain Relief", expiry: "2024-06-10", status: "expiring" },
];

export default function PharmacyInventory() {
    const [inventory, setInventory] = useState(MOCK_INVENTORY);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/staff/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                            <Plus className="w-5 h-5" /> Add Stock
                        </button>
                    </div>
                </div>

                <div className="flex items-end justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="bg-emerald-600 p-2 rounded-xl text-white">
                            <Pill className="w-8 h-8" />
                        </div>
                        Pharmacy Inventory
                    </h1>
                    <div className="flex gap-3">
                        <div className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-sm flex items-center gap-2 border border-red-100">
                            <AlertTriangle className="w-4 h-4" /> 3 Alerts
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search medications..."
                                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <StatCard icon={<Package className="text-blue-500" />} label="Total SKUs" value="1,245" color="blue" />
                    <StatCard icon={<AlertTriangle className="text-red-500" />} label="Low Stock" value="12" color="red" />
                    <StatCard icon={<Truck className="text-indigo-500" />} label="Incoming" value="5 Orders" color="indigo" />
                    <StatCard icon={<Pill className="text-emerald-500" />} label="Dispensed Today" value="342" color="emerald" />
                </div>

                {/* Inventory Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                                <th className="p-6 font-bold">Medication Name</th>
                                <th className="p-6 font-bold">Category</th>
                                <th className="p-6 font-bold text-center">Stock Level</th>
                                <th className="p-6 font-bold">Expiry Date</th>
                                <th className="p-6 font-bold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {inventory.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-6">
                                        <div className="font-bold text-slate-800 text-lg">{item.name}</div>
                                        <div className="text-xs text-slate-400 font-mono">ID: #{item.id.toString().padStart(4, '0')}</div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{item.category}</span>
                                    </td>
                                    <td className="p-6 text-center">
                                        <div className="inline-flex flex-col items-center">
                                            <span className={`text-xl font-bold ${item.status === 'low' ? 'text-red-600' : 'text-slate-700'}`}>{item.stock}</span>
                                            <span className="text-[10px] text-slate-400 uppercase font-bold">Min: {item.min}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className={`flex items-center gap-2 ${item.status === 'expiring' ? 'text-amber-600 font-bold' : 'text-slate-600'}`}>
                                            {item.status === 'expiring' && <AlertTriangle className="w-4 h-4" />}
                                            {item.expiry}
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button className="px-4 py-2 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 rounded-xl font-bold text-sm transition-all">
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${color}-50`}>
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{label}</p>
                <h3 className="text-2xl font-black text-slate-900">{value}</h3>
            </div>
        </div>
    )
}
