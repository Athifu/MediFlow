import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import DailyQuests from "../../components/patient/DailyQuests";
import EmpathyVoice from "../../components/patient/EmpathyVoice";
import DischargeTracker from "../../components/patient/DischargeTracker";

export default function PatientDashboard() {
    const [tasks, setTasks] = useState([]);
    const [patientName, setPatientName] = useState("Patient");

    useEffect(() => {
        // Fetch tasks
        api.get("/tasks")
            .then(data => setTasks(data))
            .catch(console.error);

        // Fetch patient info (mock)
        const storedName = localStorage.getItem("patient_name");
        if (storedName) setPatientName(storedName);
    }, []);

    const pendingTasks = tasks.filter(t => t.status === "pending");

    return (
        <div className="space-y-6 max-w-5xl mx-auto px-4 pb-20">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl mt-4">
                <h2 className="text-3xl md:text-4xl font-bold">Good Morning</h2>
                <p className="text-teal-50 mt-2 text-xl font-medium">Your recovery is on track.</p>
            </div>

            {/* Live Tracker */}
            <DischargeTracker status="Discharge Approved" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Gamification */}
                <div className="space-y-6">
                    <DailyQuests />
                </div>

                {/* Right Column: Voice & Assistance */}
                <div className="space-y-6">
                    <EmpathyVoice />

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold mb-4 text-slate-800">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="w-full bg-rose-50 text-rose-600 py-4 rounded-xl font-bold text-lg border-2 border-rose-100 active:bg-rose-100 transition hover:scale-105 transform duration-200">
                                Call Nurse
                            </button>
                            <button className="w-full bg-blue-50 text-blue-600 py-4 rounded-xl font-bold text-lg border-2 border-blue-100 active:bg-blue-100 transition hover:scale-105 transform duration-200">
                                Water
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Care Plan List */}
            <div>
                <h3 className="text-xl font-bold text-slate-700 mt-8 mb-4 ml-2">Your Care Plan</h3>
                <div className="grid gap-4">
                    {pendingTasks.map(task => (
                        <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-teal-500 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-lg text-slate-800">{task.title}</h4>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{task.priority} Priority</span>
                            </div>
                            <button className="bg-teal-50 text-teal-700 px-6 py-2 rounded-lg font-bold hover:bg-teal-100 transition">
                                Start
                            </button>
                        </div>
                    ))}
                    {pendingTasks.length === 0 && (
                        <div className="text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500 font-medium">No pending tasks. Relax and recover!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
