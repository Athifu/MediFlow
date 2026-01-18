import React, { useState } from 'react';
import { Pill, Truck, Check, ChevronLeft, MapPin, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_REFILLS = [
    { id: 1, name: "Amoxicillin", dose: "500mg", quantity: 30, remaining: 5, status: "due" },
    { id: 2, name: "Lipitor", dose: "20mg", quantity: 90, remaining: 45, status: "ok" },
    { id: 3, name: "Metformin", dose: "500mg", quantity: 60, remaining: 2, status: "urgent" },
];

export default function PrescriptionRefill() {
    const [selectedMeds, setSelectedMeds] = useState([]);
    const [step, setStep] = useState(1);
    const [pharmacy, setPharmacy] = useState("CVS Pharmacy - Main St");

    const toggleMed = (id) => {
        if (selectedMeds.includes(id)) {
            setSelectedMeds(selectedMeds.filter(m => m !== id));
        } else {
            setSelectedMeds([...selectedMeds, id]);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans">
            <div className="max-w-xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/patient/dashboard" className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
                        <ChevronLeft />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Refill Prescriptions</h1>
                    <Pill className="text-slate-300" />
                </div>

                {step === 1 && (
                    <div className="animate-slide-in-right">
                        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg shadow-blue-200 mb-8">
                            <h2 className="text-xl font-bold mb-2">Select Medications</h2>
                            <p className="text-blue-100 text-sm">Choose which prescriptions you need to refill today.</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            {MOCK_REFILLS.map(med => (
                                <div
                                    key={med.id}
                                    onClick={() => toggleMed(med.id)}
                                    className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer ${selectedMeds.includes(med.id) ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${med.status === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                                                <Pill className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800">{med.name}</h3>
                                                <p className="text-sm text-slate-400">{med.dose} • {med.quantity} count</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedMeds.includes(med.id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-200'}`}>
                                            {selectedMeds.includes(med.id) && <Check className="w-4 h-4" />}
                                        </div>
                                    </div>
                                    {med.status === 'urgent' && (
                                        <div className="mt-3 inline-block px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded">
                                            Low Supply: {med.remaining} remaining
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            disabled={selectedMeds.length === 0}
                            onClick={() => setStep(2)}
                            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                        >
                            Continue ({selectedMeds.length})
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-slide-in-right">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 mb-6">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Store className="w-5 h-5 text-blue-500" /> Preferred Pharmacy
                            </h3>
                            <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                        <MapPin className="text-red-500 w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-800">CVS Pharmacy</p>
                                        <p className="text-xs text-slate-400">123 Main St, New York</p>
                                    </div>
                                </div>
                                <button className="text-blue-600 font-bold text-sm">Change</button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 mb-8">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Truck className="w-5 h-5 text-emerald-500" /> Delivery Method
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-4 border-2 border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
                                    <div className="font-bold text-slate-700 mb-1">Pickup</div>
                                    <div className="text-xs text-slate-400">Ready in 2h</div>
                                </button>
                                <button className="p-4 border-2 border-blue-500 bg-blue-50 rounded-xl text-center shadow-sm">
                                    <div className="font-bold text-blue-700 mb-1">Delivery</div>
                                    <div className="text-xs text-blue-500">Free • Tomorrow</div>
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setStep(3)}
                            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95"
                        >
                            Confirm Request
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center py-12 animate-fade-in">
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Request Sent!</h2>
                        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                            Your pharmacy has received the request. We will notify you when it's shipped.
                        </p>
                        <Link to="/patient/dashboard" className="inline-block px-8 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-bold text-slate-700 transition-colors">
                            Back to Home
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}
