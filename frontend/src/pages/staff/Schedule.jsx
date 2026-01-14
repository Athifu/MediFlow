import { Calendar, Clock, MapPin, User } from "lucide-react";

export default function StaffSchedule() {
    const shifts = [
        { day: "Today", date: "Jan 14", time: "08:00 - 18:00", unit: "ICU Wing A", role: "Head Nurse" },
        { day: "Tomorrow", date: "Jan 15", time: "08:00 - 16:00", unit: "General Ward", role: "Supervisor" },
        { day: "Friday", date: "Jan 17", time: "20:00 - 08:00", unit: "Emergency", role: "Night Shift" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Schedule</h1>

            <div className="grid gap-4">
                {shifts.map((shift, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-colors group">
                        <div className="flex items-center gap-6">
                            <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl font-bold ${idx === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-500'}`}>
                                <span className="text-xs uppercase">{shift.day.substring(0, 3)}</span>
                                <span className="text-2xl">{shift.date.split(' ')[1]}</span>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                    {shift.unit}
                                    {idx === 0 && <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>}
                                </h3>
                                <div className="flex items-center gap-4 text-slate-500 text-sm mt-1">
                                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {shift.time}</span>
                                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {shift.role}</span>
                                </div>
                            </div>
                        </div>

                        <button className="text-slate-300 group-hover:text-blue-600 transition-colors">
                            <MapPin className="w-6 h-6" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
