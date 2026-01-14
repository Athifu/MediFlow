import { CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function DischargeTracker({ status }) {
    const steps = [
        { label: "Clinical Clearance", done: true }, // Assumed done for demo
        { label: "Pharmacy", done: status === "Discharge Approved" || status === "Discharge Pending" },
        { label: "Billing", done: status === "Discharge Approved" },
        { label: "Gate Pass", done: false }
    ];

    return (
        <Card className="mb-6 border-teal-100 bg-white">
            <CardContent className="p-6">
                <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Live Discharge Tracker</h3>
                <div className="relative flex justify-between items-center">
                    {/* Progress Bar Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2 rounded-full" />

                    {/* Active Progress (Simplified for demo: fill based on last done index) */}
                    <div className="absolute top-1/2 left-0 h-1 bg-teal-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-1000" style={{ width: '66%' }} />

                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 bg-white px-2">
                            {step.done ? (
                                <CheckCircle2 className="w-8 h-8 text-teal-500 fill-white bg-white rounded-full" />
                            ) : (
                                <Circle className="w-8 h-8 text-slate-300 fill-white bg-white rounded-full" />
                            )}
                            <span className={`text-xs font-bold ${step.done ? 'text-teal-700' : 'text-slate-400'}`}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
