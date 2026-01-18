import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Search, ChevronLeft, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VoiceAssistant() {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("Say 'Help' or 'Check Vitals'");
    const [waves, setWaves] = useState(false);

    useEffect(() => {
        if (listening) {
            setWaves(true);
            setTranscript("Listening...");
            const timer = setTimeout(() => {
                setListening(false);
                setWaves(false);
                setTranscript("I didn't catch that. Tap to try again.");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [listening]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-white font-sans flex flex-col items-center justify-between p-6">

            {/* Header */}
            <div className="w-full flex justify-between items-center opacity-70">
                <Link to="/patient/dashboard">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-sm font-bold uppercase tracking-widest">MediFlow Voice</h1>
                <Volume2 className="w-6 h-6" />
            </div>

            {/* Visualizer */}
            <div className="flex-1 flex flex-col items-center justify-center w-full">

                {/* Animated Globe/Orb */}
                <div className="relative mb-12">
                    <div className={`w-64 h-64 rounded-full bg-indigo-500/20 shadow-2xl shadow-indigo-500/50 backdrop-blur-3xl flex items-center justify-center transition-all duration-500 ${waves ? 'scale-110' : 'scale-100'}`}>
                        <div className={`w-48 h-48 rounded-full bg-indigo-400/30 animate-pulse-slow flex items-center justify-center`}>
                            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 shadow-lg animate-spin-slow opacity-80 blur-xl"></div>
                        </div>
                    </div>

                    {/* Wave Animation */}
                    {waves && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-72 h-72 border border-indigo-500/30 rounded-full animate-ping"></div>
                            <div className="w-80 h-80 border border-indigo-500/20 rounded-full animate-ping delay-100"></div>
                        </div>
                    )}
                </div>

                {/* Transcript */}
                <div className="text-center max-w-sm">
                    <h2 className="text-3xl font-bold mb-4 font-serif italic transition-all">{transcript}</h2>

                    {!listening && (
                        <div className="flex flex-wrap gap-2 justify-center mt-8">
                            <SuggestionChip text="Check my heart rate" />
                            <SuggestionChip text="Call Dr. Wilson" />
                            <SuggestionChip text="Show diet plan" />
                        </div>
                    )}
                </div>

            </div>

            {/* Controls */}
            <div className="mb-8">
                <button
                    onClick={() => setListening(!listening)}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${listening ? 'bg-red-500 shadow-red-500/50 scale-110' : 'bg-white text-indigo-900 shadow-indigo-500/50 hover:scale-105'}`}
                >
                    {listening ? <MicOff className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8" />}
                </button>
            </div>

        </div>
    );
}

function SuggestionChip({ text }) {
    return (
        <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold transition-all">
            {text}
        </button>
    )
}
