import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Heart, Activity, Thermometer, CheckCircle, Clock, Droplets, Footprints, Phone, Zap, Wind, Smile, Pill, Brain, ChevronRight, Users, Video, FileText } from "lucide-react";
import confetti from "canvas-confetti";
import PaymentModal from "../../components/patient/PaymentModal";

export default function PatientDashboard() {
    const [patientName, setPatientName] = useState("John Doe");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [billTotal, setBillTotal] = useState(12450);
    const [expenses, setExpenses] = useState([
        { name: "3 Days ICU Room", cost: 9000 },
        { name: "MRI Scan (Brain)", cost: 2500 },
        { name: "Pharmacy (Antibiotics)", cost: 450 },
        { name: "Physiotherapy", cost: 500 },
    ]);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem("patient_name");
        if (storedName) setPatientName(storedName);

        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleGoalClick = () => {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    };

    return (
        <div className="grid grid-cols-12 h-screen w-screen overflow-hidden bg-slate-50 font-nunito text-slate-800">

            {/* LEFT PANEL: Health Zone (Scrollable) */}
            <div className="col-span-9 h-full overflow-y-auto p-8 flex flex-col gap-8 scrollbar-hide">

                {/* Header Section */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-wider text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{currentTime.toLocaleDateString()}</span>
                        </div>
                        <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight">
                            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </h1>
                        <p className="text-2xl font-light text-slate-500">Good Morning, {patientName.split(' ')[0]}</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => alert("🔗 Family Link Copied!\n\nShare this secure URL with loved ones to let them track your discharge progress in real-time.\n\nhttps://mediflow.ai/track/P-90210")}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 flex items-center gap-2 active:scale-95 transition-transform"
                        >
                            <Users className="w-5 h-5" /> Family Bridge
                        </button>
                        <div className="bg-white/80 backdrop-blur px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="font-bold text-emerald-700">Discharge Approved</span>
                        </div>
                        <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-rose-200 flex items-center gap-2 animate-pulse active:scale-95 transition-transform">
                            <Phone className="w-5 h-5" /> SOS Help
                        </button>
                    </div>
                </div>

                {/* Enhanced Discharge Journey */}
                {/* Enhanced Discharge Journey - Path to Home */}
                <div className="shrink-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-teal-900/10 relative overflow-hidden group">
                    {/* Dynamic Background Pattern */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-teal-100 font-bold uppercase tracking-widest text-sm mb-1">Current Status</h3>
                                <h2 className="text-4xl font-black text-white tracking-tight">Path to Home</h2>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg">
                                <span className="text-4xl font-black text-white">75%</span>
                            </div>
                        </div>

                        <div className="flex justify-between relative px-4">
                            {/* Dynamic Progress Line */}
                            <div className="absolute top-[2.25rem] left-12 right-12 h-2 bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white/90 w-[66%] shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
                            </div>

                            <TimelineStep
                                label="Clinical Review"
                                sublabel="Dr. House"
                                status="completed"
                                icon={<Activity className="w-6 h-6" />}
                            />
                            <TimelineStep
                                label="Pharmacy"
                                sublabel="Meds Packed"
                                status="completed"
                                icon={<Zap className="w-6 h-6" />}
                            />
                            <TimelineStep
                                label="Insurance"
                                sublabel="Processing..."
                                status="active"
                                icon={<CheckCircle className="w-6 h-6" />}
                            />
                            <TimelineStep
                                label="Gate Pass"
                                sublabel="Security Check"
                                status="pending"
                                icon={<Footprints className="w-6 h-6" />}
                            />
                        </div>
                    </div>
                </div>

                {/* Vitals Grid */}
                <div className="shrink-0 grid grid-cols-3 gap-6">
                    <VitalCard icon={<Heart className="text-rose-500 w-8 h-8" />} label="Heart Rate" value="72 bpm" color="rose" trend="+2%" />
                    <VitalCard icon={<Activity className="text-blue-500 w-8 h-8" />} label="SpO2 Level" value="98%" color="blue" trend="Stable" />
                    <VitalCard icon={<Thermometer className="text-orange-500 w-8 h-8" />} label="Temperature" value="98.6°F" color="orange" trend="Normal" />
                </div>

                {/* Quick Actions Grid */}
                <div className="shrink-0 grid grid-cols-4 gap-6">
                    <a href="/patient/voice" className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-lg shadow-indigo-900/20 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:bg-white/20 transition-colors"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight mb-1">Voice<br />Assistant</h3>
                                <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Active</p>
                            </div>
                        </div>
                    </a>

                    <a href="/patient/wearables" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-8">
                            <div className="bg-purple-50 w-12 h-12 rounded-2xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <Footprints className="w-6 h-6" />
                            </div>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        </div>
                        <h3 className="font-bold text-slate-700 leading-tight">Sync<br />Wearables</h3>
                    </a>

                    <a href="/patient/documents" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-8">
                            <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="font-bold text-slate-700 leading-tight">Secure<br />Vault</h3>
                    </a>


                    <a href="/patient/sos" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-8">
                            <div className="bg-red-50 w-12 h-12 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                <Phone className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="font-bold text-slate-700 leading-tight">Emergency<br />SOS</h3>
                    </a>

                    <a href="/patient/appointments" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-8">
                            <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="font-bold text-slate-700 leading-tight">Book<br />Visit</h3>
                    </a>
                </div>

                <div className="shrink-0 grid grid-cols-12 gap-6">
                    {/* Left Col: Recovery Goals (Expanded) */}
                    <div className="col-span-8 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-slate-400 font-bold uppercase tracking-widest">Daily Goals</h3>
                            <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">2/4 Completed</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <GoalToggle icon={<Droplets className="text-blue-500 w-5 h-5" />} title="Hydration" desc="2000ml Target" onClick={handleGoalClick} />
                            <GoalToggle icon={<Footprints className="text-emerald-500 w-5 h-5" />} title="Walk" desc="15 mins" onClick={handleGoalClick} />
                            <GoalToggle icon={<Wind className="text-cyan-500 w-5 h-5" />} title="Breathing" desc="5 mins deeply" onClick={handleGoalClick} />
                            <GoalToggle icon={<Smile className="text-amber-500 w-5 h-5" />} title="Mood" desc="Log feeling" onClick={handleGoalClick} />

                            {/* Extra links in the Goals grid for quick access */}
                            <a href="/patient/labs" className="col-span-2 mt-2 p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between group hover:border-blue-300 hover:shadow-md transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-700">New Lab Results</h4>
                                        <p className="text-xs text-slate-400">2 Abnormal Values Detected</p>
                                    </div>
                                </div>
                                <div className="text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">View &rarr;</div>
                            </a>

                            <a href="/patient/wait-times" className="col-span-2 mt-2 p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between group hover:border-rose-300 hover:shadow-md transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="bg-rose-50 p-2 rounded-lg text-rose-600">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-700">ER Wait Times</h4>
                                        <p className="text-xs text-slate-400">Live Status</p>
                                    </div>
                                </div>
                                <div className="text-rose-600 font-bold text-sm group-hover:translate-x-1 transition-transform">Check &rarr;</div>
                            </a>

                        </div>
                    </div>

                    {/* Right Col: Next Medication */}
                    <div className="col-span-4 bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4 opacity-80">
                                <Pill className="w-5 h-5 text-teal-400" />
                                <span className="uppercase tracking-wider font-bold text-xs">Up Next</span>
                            </div>

                            <div className="mb-4">
                                <a href="/patient/telemedicine" className="block p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-1 text-teal-300 text-xs font-bold uppercase">
                                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                                        Live Now
                                    </div>
                                    <div className="text-sm font-bold flex items-center gap-2">
                                        <Video className="w-4 h-4" /> Join Video Call
                                    </div>
                                </a>
                            </div>

                            <h3 className="text-xl font-bold mb-1">Amoxicillin</h3>
                            <p className="text-slate-400 text-sm">500mg • After Lunch</p>

                            <a href="/patient/medications" className="mt-3 block text-center py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                                View Full Schedule
                            </a>
                        </div>

                        <div className="mt-6 relative z-10">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-4xl font-mono font-light">14:00</p>
                                    <p className="text-teal-400 text-xs font-bold mt-1">ON TIME</p>
                                </div>
                                <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl backdrop-blur-md transition-colors">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    </div>
                </div>

                {/* AI Health Insight -> Link to Symptom Checker */}
                <a href="/patient/symptom-checker" className="shrink-0 group bg-indigo-50 border border-indigo-100 rounded-[2rem] p-6 flex gap-6 items-center hover:bg-indigo-100 transition-colors cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-300/50 transition-colors"></div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm hidden sm:block relative z-10 group-hover:scale-110 transition-transform">
                        <Brain className="w-8 h-8 text-indigo-500" />
                    </div>
                    <div className="relative z-10">
                        <h4 className="font-bold text-indigo-900 text-lg mb-1 flex items-center gap-2">
                            Talk to Dr. AI
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                        </h4>
                        <p className="text-indigo-700/80 leading-relaxed">
                            "I can help check your symptoms or answer health questions. Click here to start a chat with Dr. Ava."
                        </p>
                    </div>
                </a>

                {/* Bottom Spacer */}
                <div className="h-10"></div>
            </div>

            {/* RIGHT SIDEBAR: Billing (Fixed Sidebar) */}
            <div className="col-span-3 bg-white h-screen shadow-2xl z-20 flex flex-col border-l border-slate-100 relative">
                {/* Sidebar Header */}
                <div className="p-8 pb-4">
                    <h2 className="text-2xl font-extrabold text-slate-800">Billing</h2>
                    <p className="text-slate-400 font-medium">Live Expense Tracker</p>
                </div>

                {/* Scrollable Item List */}
                <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
                    {expenses.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center group">
                            <span className="text-slate-600 font-semibold group-hover:text-teal-600 transition-colors">{item.name}</span>
                            <span className="font-mono font-bold text-slate-800">₹{item.cost.toLocaleString()}</span>
                        </div>
                    ))}
                    <div className="h-px bg-slate-100 my-4"></div>
                    <div className="flex justify-between items-center text-slate-400 italic">
                        <span>Est. Taxes (10%)</span>
                        <span>₹1,200</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 italic">
                        <span>Service Charge</span>
                        <span>₹500</span>
                    </div>
                </div>

                {/* Sticky Bottom Payment Card */}
                <div className="p-8 bg-slate-50 border-t border-slate-100 mt-auto">
                    <div className="flex justify-between items-end mb-6">
                        <span className="text-slate-500 font-bold uppercase tracking-wider text-sm">Total Due</span>
                        <span className="text-4xl font-mono font-black text-slate-900">₹{(billTotal + 1700).toLocaleString()}</span>
                    </div>

                    <button
                        onClick={() => setShowPayment(true)}
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-lg shadow-xl shadow-slate-200 active:scale-95 transition-all flex justify-center items-center gap-3"
                    >
                        Proceed to Pay
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
                        <div className="w-8 h-5 bg-slate-300 rounded"></div>
                        <div className="w-8 h-5 bg-slate-300 rounded"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Secure SSL</span>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPayment && (
                <PaymentModal
                    amount={billTotal + 1700}
                    onClose={() => setShowPayment(false)}
                    onSuccess={() => {
                        setShowPayment(false);
                        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                    }}
                />
            )}
        </div>
    );
}

function TimelineStep({ label, sublabel, status, icon }) {
    const isCompleted = status === 'completed';
    const isActive = status === 'active';

    return (
        <div className="flex flex-col items-center gap-5 z-10 w-32 group cursor-pointer relative">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 border-[6px] ${isCompleted ? 'bg-white text-emerald-600 border-white shadow-xl scale-100' : isActive ? 'bg-emerald-500 border-white/30 text-white shadow-2xl shadow-emerald-900/40 scale-125 animate-pulse-slow' : 'bg-emerald-800/40 border-transparent text-emerald-200/50 backdrop-blur-md'}`}>
                {isCompleted ? <CheckCircle className="w-8 h-8" /> : icon}
            </div>

            <div className="text-center transition-all duration-300">
                <p className={`font-bold text-base tracking-tight leading-none mb-1 ${isActive ? 'text-white' : 'text-emerald-100/80'}`}>{label}</p>
                <p className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-emerald-200' : 'text-emerald-300/50'}`}>{sublabel}</p>
            </div>
        </div>
    );
}

function VitalCard({ icon, label, value, color, trend }) {
    const bgColors = {
        rose: "bg-rose-50 border-rose-100 text-rose-600",
        blue: "bg-blue-50 border-blue-100 text-blue-600",
        orange: "bg-orange-50 border-orange-100 text-orange-600"
    };

    return (
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl ${bgColors[color]}`}>
                    {icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${color === 'rose' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>{trend}</span>
            </div>
            <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                <p className="text-3xl font-black text-slate-800">{value}</p>
            </div>
        </div>
    );
}

function GoalToggle({ icon, title, desc, onClick }) {
    const [done, setDone] = useState(false);
    return (
        <button
            onClick={() => { if (!done) { setDone(true); onClick(); } }}
            className={`flex items-center p-5 rounded-2xl border-2 transition-all w-full text-left group ${done ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 hover:shadow-md'}`}
        >
            <div className={`p-4 rounded-xl mr-5 transition-colors ${done ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-400 group-hover:text-teal-500'}`}>
                {done ? <CheckCircle className="w-6 h-6" /> : icon}
            </div>
            <div>
                <h4 className={`font-bold text-lg ${done ? 'text-emerald-800 line-through' : 'text-slate-700'}`}>{title}</h4>
                <p className="text-sm text-slate-400 font-medium">{done ? 'Completed!' : desc}</p>
            </div>
        </button>
    );
}
