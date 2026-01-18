import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Package, Truck, Pill, AlertTriangle, CheckCircle, Search, ShoppingCart, Users, ClipboardList, ShieldCheck, Calendar, Zap, TrendingUp } from "lucide-react";

export default function PharmacyView() {
    const [orders, setOrders] = useState([]);

    // Feature: Live Inventory (Mock)
    const [inventory] = useState([
        { id: 1, name: "Paracetamol 500mg", stock: 120, status: "Good", expiry: "2026-12" },
        { id: 2, name: "Amoxicillin 250mg", stock: 45, status: "Low", expiry: "2026-06" },
        { id: 3, name: "Ibuprofen 400mg", stock: 200, status: "Good", expiry: "2027-01" },
        { id: 4, name: "Insulin Glargine", stock: 12, status: "Critical", expiry: "2026-03" },
    ]);

    const fetchOrders = async () => {
        try {
            const data = await api.get("/staff/prescriptions");
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    const markReady = async (id) => {
        try {
            await api.post(`/staff/prescriptions/${id}/ready`);
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header Stats */}
            <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Pharmacy Command</h2>
                    <p className="text-slate-500 font-bold">Shift A • <span className="text-emerald-600">Operations Normal</span></p>
                </div>
                <div className="flex gap-4">
                    <StatBadge icon={<Zap className="w-5 h-5" />} label="Fast Track" value="5" color="bg-amber-100 text-amber-700" />
                    <StatBadge icon={<Truck className="w-5 h-5" />} label="Pending" value={orders.length} color="bg-blue-100 text-blue-700" />
                    <StatBadge icon={<CheckCircle className="w-5 h-5" />} label="Completed" value="142" color="bg-emerald-100 text-emerald-700" />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">

                {/* LEFT COLUMN: Dispatch & Queue (4 cols) */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 min-h-[600px] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Package className="text-blue-500" /> Live Queue
                            </h3>
                            <span className="text-xs font-bold text-slate-400 uppercase">Updating...</span>
                        </div>

                        <div className="space-y-3 flex-1 overflow-y-auto">
                            {orders.length === 0 && (
                                <div className="text-center py-20 text-slate-400">
                                    <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p className="font-bold">Queue Empty</p>
                                </div>
                            )}
                            {orders.map(order => (
                                <div key={order.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-slate-800">{order.medication}</h4>
                                        <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Prep</span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-bold mb-3">{order.patient_id} • {order.dosage}</p>
                                    <button
                                        onClick={() => markReady(order.id)}
                                        className="w-full bg-white border-2 border-slate-200 text-slate-600 font-bold py-2 rounded-xl text-xs hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-3 h-3" /> Mark Ready
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* MIDDLE COLUMN: Operations (4 cols) */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    {/* Feature 2: Manual Dispense Mode */}
                    <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                            <ClipboardList className="text-teal-400" /> Manual Dispense
                        </h3>
                        <div className="space-y-4 relative z-10">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient ID</label>
                                <input type="text" placeholder="e.g. P-093" className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-sm font-bold text-white placeholder-white/30 outline-none focus:bg-white/20 transition-colors" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Medication / Item</label>
                                <input type="text" placeholder="Search Inventory..." className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-sm font-bold text-white placeholder-white/30 outline-none focus:bg-white/20 transition-colors" />
                            </div>
                            <button className="w-full bg-teal-500 hover:bg-teal-400 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-teal-500/20 active:scale-95">
                                Add to Record
                            </button>
                        </div>
                    </div>

                    {/* Feature 3: Safety Interaction Checker */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck className="text-purple-500" /> Safety Check
                        </h3>
                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
                            <p className="text-xs text-purple-800 font-bold mb-2">Check Drug Interactions</p>
                            <div className="flex items-center gap-2 justify-center mb-3">
                                <span className="bg-white px-3 py-1 rounded text-xs font-bold shadow-sm">Aspirin</span>
                                <span className="text-purple-300 font-bold">+</span>
                                <span className="bg-white px-3 py-1 rounded text-xs font-bold shadow-sm">Warfarin</span>
                            </div>
                            <button className="text-xs bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition">Run Analysis</button>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Inventory & Predictive Graph (4 cols) */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div className="bg-slate-900 text-slate-200 p-6 rounded-[2rem] shadow-xl">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                            <Pill className="text-teal-400" /> Live Inventory
                        </h3>
                        <div className="space-y-4">
                            {inventory.map(item => (
                                <div key={item.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-sm text-white">{item.name}</p>
                                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${item.status === 'Critical' ? 'bg-rose-500/20 text-rose-300' : item.status === 'Low' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                                            {item.status} Stock
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono text-xl font-bold">{item.stock}</p>
                                        <p className="text-[10px] opacity-60">Units</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2">
                            <ShoppingCart className="w-4 h-4" /> Order Restock
                        </button>
                    </div>

                    {/* Feature 7: Predictive Forecast Graph (New) */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
                        <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2 capitalize">
                            <TrendingUp className="w-5 h-5 text-purple-500" /> Usage Forecast
                        </h3>
                        <div className="h-32 flex items-end justify-between px-2 gap-2 relative">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                                <div key={d} className="flex flex-col items-center gap-1 group w-full">
                                    <div className={`w-full max-w-[12px] rounded-t-sm transition-all duration-1000 group-hover:bg-purple-400 ${i === 6 ? 'bg-purple-500 h-24' : 'bg-purple-200 h-10'}`} style={{ height: `${[40, 60, 45, 80, 55, 30, 90][i]}%` }}></div>
                                    <span className="text-[9px] font-bold text-slate-400">{d}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-center text-slate-400 font-bold mt-4">Predicted Peak: <span className="text-purple-600">Sunday (+12%)</span></p>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100 shadow-sm relative overflow-hidden">
                        <AlertTriangle className="absolute -right-4 -top-4 w-24 h-24 text-orange-200/50 rotate-12" />
                        <h3 className="font-bold text-orange-800 text-lg mb-2 relative z-10">Low Stock Alert</h3>
                        <p className="text-orange-700/80 text-sm font-medium relative z-10 mb-4">Insulin Glargine is running critically low (12 units). Auto-reorder scheduled for 14:00.</p>
                        <button className="bg-white text-orange-600 border border-orange-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-orange-100 transition relative z-10">
                            Dismiss Alert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatBadge({ icon, label, value, color }) {
    return (
        <div className={`px-4 py-2 rounded-xl flex items-center gap-3 ${color}`}>
            <div className="bg-white/40 p-1.5 rounded-full">{icon}</div>
            <div>
                <p className="text-xl font-black leading-none">{value}</p>
                <p className="text-[9px] font-bold uppercase opacity-80">{label}</p>
            </div>
        </div>
    );
}
