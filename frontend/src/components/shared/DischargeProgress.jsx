import { CheckCircle, Activity, Zap, FileText, Ban } from "lucide-react";

const STEPS = [
    { id: 'clinical', label: 'Clinical Clearance', icon: Activity, desc: 'Doctor Authorization' },
    { id: 'pharmacy', label: 'Meds Dispatched', icon: Zap, desc: 'Pharmacy Prep' },
    { id: 'billing', label: 'Bill Settled', icon: FileText, desc: 'Financial Clearance' },
    { id: 'discharged', label: 'Gate Pass', icon: CheckCircle, desc: 'Ready to Leave' }
];

const STATUS_ORDER = ['admitted', 'clinical', 'pharmacy', 'billing', 'discharged'];

export default function DischargeProgress({ status = 'admitted' }) {
    const currentIdx = STATUS_ORDER.indexOf(status);

    return (
        <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Discharge Timeline
            </h3>

            <div className="relative flex justify-between">
                {/* Connecting Line */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-slate-200 -z-0 rounded-full">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        style={{ width: `${Math.max(0, (currentIdx - 1) / (STEPS.length - 1) * 100)}%` }}
                    ></div>
                </div>

                {STEPS.map((step, idx) => {
                    // Logic: 
                    // - Completed if current status index > step index
                    // - Active if current status index == step index (meaning we are working on this step, 
                    //   BUT 'clinical' status means clinical is DONE. So let's adjust logic:
                    //   If status is 'admitted', nothing is done.
                    //   If status is 'clinical', Clinical is DONE.

                    // Actually, let's simplify: 
                    // Status passed in is the "Current Completed State".

                    const stepIdx = idx + 1; // 1-based index compared to STATUS_ORDER
                    const isCompleted = currentIdx >= stepIdx;
                    const isNext = currentIdx === stepIdx - 1;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-3 w-32 text-center group">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-4 transition-all duration-500 ${isCompleted
                                    ? 'bg-emerald-500 border-white text-white shadow-lg scale-110'
                                    : isNext
                                        ? 'bg-white border-emerald-500 text-emerald-600 shadow-xl animate-pulse ring-4 ring-emerald-100'
                                        : 'bg-slate-100 border-white text-slate-300'
                                }`}>
                                <step.icon className="w-5 h-5" />
                            </div>

                            <div className={`transition-all duration-300 ${isCompleted || isNext ? 'opacity-100' : 'opacity-50'}`}>
                                <p className={`font-bold text-sm ${isCompleted ? 'text-emerald-700' : isNext ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {step.label}
                                </p>
                                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">
                                    {isCompleted ? 'Completed' : isNext ? 'In Progress' : step.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
