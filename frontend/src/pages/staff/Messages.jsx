import { Search, Star, MoreVertical } from "lucide-react";

export default function StaffMessages() {
    const messages = [
        { sender: "Dr. Gregory House", subject: "Patient 092 Consult", preview: "I need you to run a full toxicity screen...", time: "10:42 AM", unread: true },
        { sender: "Nurse Joy", subject: "Shift Swap Request", preview: "Hey, can you cover my shift on Friday? I have...", time: "09:15 AM", unread: true },
        { sender: "Admin System", subject: "Payroll Update", preview: "Your monthly payslip has been generated...", time: "Yesterday", unread: false },
        { sender: "Pharmacy", subject: "Stock Alert: Amoxicillin", preview: "Low stock warning for Amoxicillin 500mg...", time: "Yesterday", unread: false },
    ];

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-6">Messages</h1>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex-1 flex flex-col">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-100 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
                        <input type="text" placeholder="Search inbox..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                    </div>
                </div>

                {/* Message List */}
                <div className="overflow-y-auto flex-1">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`p-6 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors flex gap-4 ${msg.unread ? 'bg-blue-50/30' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${idx % 2 === 0 ? 'bg-indigo-500' : 'bg-teal-500'}`}>
                                {msg.sender[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm truncate ${msg.unread ? 'font-black text-slate-900' : 'font-semibold text-slate-700'}`}>{msg.sender}</h4>
                                    <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{msg.time}</span>
                                </div>
                                <p className={`text-sm mb-1 ${msg.unread ? 'font-bold text-slate-800' : 'text-slate-600'}`}>{msg.subject}</p>
                                <p className="text-xs text-slate-500 truncate">{msg.preview}</p>
                            </div>
                            <button className="text-slate-300 hover:text-amber-400 transition-colors">
                                <Star className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
