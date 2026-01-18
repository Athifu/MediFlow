import React, { useState, useEffect } from 'react';
import { AlertCircle, Phone, MapPin, Ambulance, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmergencySOS() {
    const [step, setStep] = useState(0);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        let interval;
        if (step === 1 && countdown > 0) {
            interval = setInterval(() => setCountdown(c => c - 1), 1000);
        } else if (step === 1 && countdown === 0) {
            setStep(2);
        }
        return () => clearInterval(interval);
    }, [step, countdown]);

    const handleSOS = () => {
        setStep(1);
        setCountdown(5);
    };

    const cancel = () => {
        setStep(0);
        setCountdown(5);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Pulse Effect */}
            {step === 1 && (
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-red-600/20 animate-pulse"></div>
                </div>
            )}

            {/* Main Container */}
            <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl z-10 border border-slate-700">

                {step === 0 && (
                    <>
                        <div className="w-24 h-24 bg-red-500/10 rounded-full mx-auto mb-8 flex items-center justify-center animate-pulse">
                            <AlertCircle className="w-12 h-12 text-red-500" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Emergency Assistance</h1>
                        <p className="text-slate-400 mb-8">
                            If you are experiencing a medical emergency, press the button below. Vital data and location will be sent to responders.
                        </p>
                        <button
                            onClick={handleSOS}
                            className="w-48 h-48 rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-2xl shadow-xl shadow-red-900/50 flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all border-4 border-red-500/30"
                        >
                            <Phone className="w-10 h-10 animate-bounce" />
                            SOS
                        </button>
                        <div className="mt-8">
                            <Link to="/patient/dashboard" className="text-slate-500 hover:text-slate-300 font-bold text-sm">Cancel & Return</Link>
                        </div>
                    </>
                )}

                {step === 1 && (
                    <>
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold text-red-500 mb-2">Sending Alert</h2>
                            <p className="text-slate-300">Dispatching in...</p>
                        </div>
                        <div className="text-8xl font-bold text-white mb-8 font-mono">{countdown}</div>
                        <button
                            onClick={cancel}
                            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold text-white mb-4 w-full"
                        >
                            Cancel Alert
                        </button>
                    </>
                )}

                {step === 2 && (
                    <div className="animate-fade-in">
                        <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-ping">
                            <Ambulance className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-emerald-400 mb-2">Help is on the way!</h2>
                        <div className="bg-slate-700/50 rounded-xl p-4 mb-6 text-left">
                            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Status</p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Check className="text-emerald-500 w-4 h-4" />
                                    <span className="text-sm">Location Shared (43.65, -79.38)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="text-emerald-500 w-4 h-4" />
                                    <span className="text-sm">Vitals Transmitted (HR: 120)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Check className="text-emerald-500 w-4 h-4" />
                                    <span className="text-sm">Emergency Contacts Notified</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setStep(0)}
                            className="w-full py-3 border border-slate-600 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        >
                            Reset Demo
                        </button>
                    </div>
                )}

            </div>

            {/* Geolocation Mock */}
            <div className="absolute bottom-6 left-0 right-0 text-center text-slate-600 text-xs font-mono">
                <MapPin className="inline w-3 h-3 mr-1" /> Precision Location Service Active
            </div>

        </div>
    );
}

function Check({ className }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    )
}
