import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Package, Truck, Pill, AlertTriangle, CheckCircle, Search, ShoppingCart, Users, ClipboardList, ShieldCheck, Calendar, Zap } from "lucide-react";

export default function PharmacyView() {
    const [orders, setOrders] = useState([]);

    // Feature: Live Inventory (Mock)
    const [inventory] = useState([
        { id: 1, name: "Paracetamol 500mg", stock: 120, status: "Good", expiry: "2026-12" },
        { id: 2, name: "Amoxicillin 250mg", stock: 45, status: "Low", expiry: "2026-06" },
        { id: 3, name: "Ibuprofen 400mg", stock: 200, status: "Good", expiry: "2027-01" },
        { id: 4, name: "Insulin Glargine", stock: 12, status: "Critical", expiry: "2026-03" },
    ]);

    // Feature: Duty Roster (Mock)
    const [staff] = useState([
        { name: "Pepper T.", role: "Manager", status: "On Duty" },
        { name: "Sally P.", role: "Tech", status: "Break" },
        { name: "John D.", role: "Intern", status: "Off" },
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

                {/* COLUMN 1: Dispatch & Queue (5 cols) */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                    {/* Feature 1: Order Dispatch Queue */}
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

                {/* COLUMN 2: Operations & Manual Entry (4 cols) */}
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

                {/* COLUMN 3: Staff & Inventory (3 cols) */}
                <div className="col-span-12 lg:col-span-3 space-y-6">

                    {/* Feature 4: Staff Duty Roster */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Users className="text-indigo-500" /> On Duty
                        </h3>
                        <div className="space-y-3">
                            {staff.map((s, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${s.status === 'On Duty' ? 'bg-emerald-500' : s.status === 'Break' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                                        <span className="font-bold text-slate-700">{s.name}</span>
                                    </div>
                                    <span className="text-xs text-slate-400 font-medium">{s.role}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 text-xs font-bold text-indigo-600 border border-indigo-100 bg-indigo-50 py-2 rounded-lg hover:bg-indigo-100 transition">
                            Manage Roster
                        </button>
                    </div>

                    {/* Feature 5: Inventory & Expiry */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Pill className="text-orange-500" /> Stock Watch
                        </h3>
                        <div className="space-y-2">
                            {inventory.filter(i => i.status !== 'Good').map(item => (
                                <div key={item.id} className="p-3 bg-red-50 rounded-xl border border-red-100">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold text-xs text-red-800">{item.name}</span>
                                        <span className="font-bold text-xs text-red-600">{item.stock} left</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-red-400 font-bold">
                                        <AlertTriangle className="w-3 h-3" /> Reorder Needed
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Early Expiry</span>
                                <span className="bg-slate-100 px-2 py-0.5 rounded">2 Batches</span>
                            </div>
                        </div>
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
