import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Plus, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Telemedicine() {
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);
    const [joined, setJoined] = useState(false);
    const [callTime, setCallTime] = useState(0);

    useEffect(() => {
        let interval;
        if (joined) {
            interval = setInterval(() => setCallTime(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [joined]);

    const formatTime = (s) => {
        const mins = Math.floor(s / 60).toString().padStart(2, '0');
        const secs = (s % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    if (!joined) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-fade-in">
                    <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Video className="w-10 h-10 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Join Video Consultation</h1>
                    <p className="text-slate-500 mb-8">Dr. Sarah Wilson is waiting for you.</p>

                    <div className="space-y-4">
                        <button
                            onClick={() => setJoined(true)}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                        >
                            Join Now
                        </button>
                        <Link to="/patient/dashboard" className="block py-3 text-slate-400 hover:text-slate-600 font-bold">
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-slate-900 overflow-hidden relative flex flex-col">

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white font-mono text-sm border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    {formatTime(callTime)}
                </div>
                <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold border border-white/10">
                    Dr. Sarah Wilson
                </div>
            </div>

            {/* Main Grid */}
            <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Doctor View (Main) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-slate-800 rounded-3xl overflow-hidden relative shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1559839734-2b71ea86b48e?q=80&w=2670&auto=format&fit=crop"
                        alt="Doctor"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-lg text-white font-bold text-sm">
                        Dr. Sarah Wilson
                    </div>
                </div>

                {/* Self View & Chat */}
                <div className="hidden lg:flex flex-col gap-4">
                    {/* Self View */}
                    <div className="h-64 bg-slate-800 rounded-3xl overflow-hidden relative shadow-xl border border-white/10">
                        {camOn ? (
                            <img
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop"
                                alt="You"
                                className="w-full h-full object-cover transform scale-x-[-1]"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center">
                                    <VideoOff className="text-slate-500" />
                                </div>
                            </div>
                        )}
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-lg text-white font-bold text-sm">
                            You
                        </div>
                    </div>

                    {/* Quick Actions / Chat Placeholder */}
                    <div className="flex-1 bg-slate-800/50 rounded-3xl border border-white/5 p-4 relative">
                        <div className="flex items-center gap-2 text-slate-400 mb-4">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-xs uppercase font-bold tracking-wider">Chat</span>
                        </div>
                        <div className="text-slate-500 text-sm text-center mt-10">
                            Chat messages will appear here.
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Controls */}
            <div className="p-6 pb-8 flex justify-center items-center gap-4 z-20">

                <ControlBtn
                    icon={micOn ? <Mic /> : <MicOff />}
                    active={micOn}
                    onClick={() => setMicOn(!micOn)}
                />

                <ControlBtn
                    icon={camOn ? <Video /> : <VideoOff />}
                    active={camOn}
                    onClick={() => setCamOn(!camOn)}
                />

                <Link to="/patient/dashboard">
                    <div className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-red-900/50 active:scale-95">
                        <PhoneOff className="fill-current" />
                    </div>
                </Link>

                <ControlBtn icon={<Plus />} active={false} secondary />
                <ControlBtn icon={<Settings />} active={false} secondary />

            </div>
        </div>
    );
}

function ControlBtn({ icon, active, onClick, secondary }) {
    if (secondary) {
        return (
            <button
                onClick={onClick}
                className="w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-full flex items-center justify-center transition-all active:scale-95"
            >
                {React.cloneElement(icon, { size: 20 })}
            </button>
        );
    }
    return (
        <button
            onClick={onClick}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg ${active ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white text-slate-900'}`}
        >
            {React.cloneElement(icon, { size: 24 })}
        </button>
    );
}
