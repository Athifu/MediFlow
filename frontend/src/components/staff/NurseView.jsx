import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import SmartRanker from "../logic/SmartRanker";
import { Bell, Check, Activity, ClipboardList, BedDouble, AlertTriangle, Stethoscope, MessageSquare, Clock, Syringe } from "lucide-react";

export default function NurseView() {
    // Feature 1: Live Emergency Feed (Mocked Enhanced)
    const [requests, setRequests] = useState([
        { id: 1, type: "emergency", patient_id: "P-093", room: "ICU-02", time: "10s ago" },
        { id: 2, type: "pain", patient_id: "P-092", room: "204-A", time: "5m ago" }
    ]);

    // Feature 2: Task Board State
    const [tasks, setTasks] = useState([
        { id: 1, text: "Administer Insulin - P-094", status: "todo" },
        { id: 2, text: "Wound Dressing - P-093", status: "progress" },
        { id: 3, text: "Vitals Check - Wing A", status: "done" },
    ]);

    const handleTaskMove = (id, newStatus) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            {/* Header with Quick Actions */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Nursing Command Station</h2>
                    <p className="text-slate-500 font-medium">Shift Leader: <span className="font-bold text-slate-800">Nurse Joy</span> • Wing A</p>
                </div>
                {/* Feature 5: Quick Response Actions */}
                <div className="flex gap-3">
                    <ActionButton icon={<Stethoscope className="w-5 h-5" />} label="Page Doctor" color="bg-indigo-500 shadow-indigo-200" />
                    <ActionButton icon={<AlertTriangle className="w-5 h-5" />} label="Code Blue" color="bg-rose-600 shadow-rose-200 animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">

                {/* LEFT COLUMN: Alerts & Vitals (4 Cols) */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    {/* Feature 1: Emergency Feed */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-100 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Bell className="text-rose-500 fill-current animate-bounce" /> Active Alerts
                            </h3>
                            <span className="bg-rose-100 text-rose-600 font-bold px-2 py-1 rounded-lg text-xs">2 Active</span>
                        </div>
                        <div className="space-y-3">
                            {requests.map(req => (
                                <div key={req.id} className={`p-4 rounded-2xl border-l-4 shadow-sm flex flex-col gap-2 ${req.type === 'emergency' ? 'bg-rose-50 border-rose-500' : 'bg-amber-50 border-amber-400'}`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                                {req.type === 'emergency' ? '🚨 EMERGENCY' : '💊 PAIN RELIEF'}
                                            </h4>
                                            <p className="text-sm font-bold text-slate-500">Room {req.room} • {req.patient_id}</p>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400">{req.time}</span>
                                    </div>
                                    <button className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-2 rounded-xl text-sm hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors flex items-center justify-center gap-2">
                                        <Check className="w-4 h-4" /> Mark Resolved
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feature 3: Vitals Monitor Grid */}
                    <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl text-white">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Activity className="text-emerald-400" /> Live Vitals (Examples)
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <VitalsCard patient="Sarah C." bp="120/80" hr="72" status="normal" />
                            <VitalsCard patient="John D." bp="145/90" hr="110" status="critical" />
                            <VitalsCard patient="Jane S." bp="115/75" hr="68" status="normal" />
                            <VitalsCard patient="Mike R." bp="130/85" hr="88" status="warning" />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Tasks & Handoff (8 Cols) */}
                <div className="col-span-12 lg:col-span-8 space-y-6">

                    {/* Feature 2: Smart Task Board (Kanban Lite) */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <ClipboardList className="text-blue-500" /> Shift Tasks
                            </h3>
                            <button className="text-sm font-bold text-blue-500 hover:bg-blue-50 px-3 py-1 rounded-lg transition">+ Add Task</button>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <TaskColumn title="To Do" count={tasks.filter(t => t.status === 'todo').length}>
                                {tasks.filter(t => t.status === 'todo').map(task => (
                                    <TaskCard key={task.id} task={task} onMove={() => handleTaskMove(task.id, 'progress')} />
                                ))}
                            </TaskColumn>
                            <TaskColumn title="In Progress" count={tasks.filter(t => t.status === 'progress').length}>
                                {tasks.filter(t => t.status === 'progress').map(task => (
                                    <TaskCard key={task.id} task={task} onMove={() => handleTaskMove(task.id, 'done')} />
                                ))}
                            </TaskColumn>
                            <TaskColumn title="Done" count={tasks.filter(t => t.status === 'done').length}>
                                {tasks.filter(t => t.status === 'done').map(task => (
                                    <TaskCard key={task.id} task={task} done />
                                ))}
                            </TaskColumn>
                        </div>
                    </div>

                    {/* Feature 4: Shift Handoff Notes */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-yellow-50 p-6 rounded-[2rem] border border-yellow-100 shadow-sm relative">
                            <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" /> Shift Notes
                            </h3>
                            <textarea className="w-full bg-yellow-100/50 rounded-xl p-3 text-yellow-900 font-medium placeholder-yellow-700/50 outline-none resize-none h-32 text-sm" placeholder="Type handoff notes here... e.g. Patient in 204 needs extra fluids."></textarea>
                        </div>

                        {/* Feature 6: Schedule / Next Shift */}
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                            <Clock className="w-10 h-10 text-slate-300 mb-3" />
                            <h3 className="font-bold text-slate-800">Next Shift</h3>
                            <p className="text-sm text-slate-500 font-medium">Starts in 3h 15m</p>
                            <div className="flex -space-x-2 mt-4">
                                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                                <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white"></div>
                                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">+2</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Sub-components

function ActionButton({ icon, label, color }) {
    return (
        <button className={`${color} text-white px-5 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 active:scale-95 transition-transform`}>
            {icon} {label}
        </button>
    );
}

function VitalsCard({ patient, bp, hr, status }) {
    const isCrit = status === 'critical';
    const isWarn = status === 'warning';
    return (
        <div className={`p-3 rounded-xl border ${isCrit ? 'bg-rose-500/20 border-rose-500/50' : isWarn ? 'bg-amber-500/20 border-amber-500/50' : 'bg-white/5 border-white/10'}`}>
            <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm truncate">{patient}</span>
                {isCrit && <AlertTriangle className="w-3 h-3 text-rose-500" />}
            </div>
            <div className="text-xs space-y-0.5 opacity-80">
                <p>BP: {bp}</p>
                <p>HR: {hr}</p>
            </div>
        </div>
    );
}

function TaskColumn({ title, count, children }) {
    return (
        <div className="bg-slate-50 rounded-2xl p-4 flex flex-col h-full min-h-[300px]">
            <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4 flex justify-between">
                {title} <span className="bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">{count}</span>
            </h4>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
}

function TaskCard({ task, onMove, done }) {
    return (
        <div className={`bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-3 group ${done ? 'opacity-60' : ''}`}>
            <p className="font-bold text-slate-800 text-sm leading-tight">{task.text}</p>
            {!done && (
                <button onClick={onMove} className="self-end text-xs font-bold text-blue-500 hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors">
                    Move &rarr;
                </button>
            )}
            {done && <Check className="w-4 h-4 text-emerald-500 self-end" />}
        </div>
    );
}
