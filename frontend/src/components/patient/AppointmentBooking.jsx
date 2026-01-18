import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, User, Star, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_DOCTORS = [
    { id: 1, name: "Dr. Sarah Wilson", specialty: "Cardiologist", rating: 4.9, image: "https://images.unsplash.com/photo-1559839734-2b71ea86b48e?q=80&w=200&auto=format&fit=crop" },
    { id: 2, name: "Dr. James Liu", specialty: "Neurologist", rating: 4.8, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop" },
    { id: 3, name: "Dr. Emily Chen", specialty: "General Checkup", rating: 5.0, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&auto=format&fit=crop" },
];

const TIME_SLOTS = ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:30 PM", "04:00 PM"];

export default function AppointmentBooking() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [step, setStep] = useState(1);

    const handleBook = () => {
        setStep(3);
        // Simulate booking API call
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 pb-24 md:p-8 font-sans">

            {/* Header */}
            <div className="max-w-4xl mx-auto flex items-center justify-between mb-8">
                <div>
                    <Link to="/patient/dashboard" className="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center gap-1 mb-2">
                        <ChevronLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">Book <span className="text-blue-600">Appointment</span></h1>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <CalendarIcon className="w-5 h-5" />
                </div>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Step 1: Doctor Selection */}
                {step === 1 && (
                    <div className="col-span-12 space-y-4 animate-slide-in-right">
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input type="text" placeholder="Search doctors, specialty..." className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-100 shadow-sm focus:ring-2 focus:ring-blue-100 outline-none" />
                        </div>

                        <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm mb-4">Top Specialists</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {MOCK_DOCTORS.map(doc => (
                                <div key={doc.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-50 group-hover:border-blue-50 transition-colors">
                                        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900">{doc.name}</h3>
                                    <p className="text-blue-600 font-medium text-sm mb-2">{doc.specialty}</p>
                                    <div className="flex items-center gap-1 text-amber-400 text-sm font-bold mb-6">
                                        <Star className="w-4 h-4 fill-current" /> {doc.rating}
                                    </div>
                                    <button
                                        onClick={() => { setSelectedDoc(doc); setStep(2); }}
                                        className="w-full py-2 bg-slate-50 hover:bg-slate-900 text-slate-600 hover:text-white rounded-lg font-bold transition-all"
                                    >
                                        Select Doctor
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                    <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-in-right">

                        {/* Selected Doctor Summary */}
                        <div className="md:col-span-2 bg-blue-600 text-white p-6 rounded-2xl flex items-center gap-4 shadow-xl shadow-blue-200">
                            <img src={selectedDoc.image} alt={selectedDoc.name} className="w-16 h-16 rounded-full border-2 border-white/30" />
                            <div>
                                <p className="text-blue-200 text-sm font-bold uppercase">Booking with</p>
                                <h2 className="text-2xl font-bold">{selectedDoc.name}</h2>
                                <p className="text-white/80">{selectedDoc.specialty}</p>
                            </div>
                            <button onClick={() => setStep(1)} className="ml-auto px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-colors">Change</button>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-blue-500" /> Select Date
                            </h3>
                            <div className="bg-slate-50 rounded-xl p-4 text-center text-slate-400">
                                {/* Mock Calendar UI Placeholder */}
                                <div className="grid grid-cols-7 gap-2 text-sm font-bold mb-2">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i}>{d}</span>)}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {[...Array(30)].map((_, i) => (
                                        <button
                                            key={i}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${i === 18 ? 'bg-blue-600 text-white shadow-lg shadow-blue-300' : 'hover:bg-slate-200'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-500" /> Select Time
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {TIME_SLOTS.map((time, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-3 px-4 rounded-xl font-bold text-sm transition-all text-center border ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <button
                                disabled={!selectedTime}
                                onClick={handleBook}
                                className="w-full py-4 bg-slate-900 text-white font-bold text-lg rounded-2xl shadow-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <div className="col-span-12 flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                            <CheckCircle className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
                        <p className="text-slate-500 max-w-md mb-8">
                            Your appointment with <span className="font-bold text-slate-800">{selectedDoc.name}</span> is set for <span className="font-bold text-slate-800">Oct 19th at {selectedTime}</span>.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">Add to Calendar</button>
                            <Link to="/patient/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700"> Back to Home</Link>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

function CheckCircle({ className }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
    )
}
