import React, { useState, useEffect } from 'react';
import { Mic, StopCircle, Save, FileText, Check, Loader2, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClinicalScribe() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [notes, setNotes] = useState(null);

    const toggleRecording = () => {
        if (isRecording) {
            setIsRecording(false);
            setIsProcessing(true);
            // Simulate processing time
            setTimeout(() => {
                setIsProcessing(false);
                setTranscript("Patient presents with severe migraine headaches lasting 3 days. Reports sensitivity to light and nausea. No history of concussions. BP 120/80. Recommend MRI and prescription of Sumatriptan.");
            }, 2000);
        } else {
            setIsRecording(true);
            setTranscript("");
            setNotes(null);
        }
    };

    const generateNotes = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setNotes({
                chiefComplaint: "Severe Migraine (3 days)",
                vitals: "BP 120/80, HR 72",
                assessment: "Likely acute migraine episode with photophobia.",
                plan: "1. MRI Head to rule out secondary causes.\n2. Start Sumatriptan 50mg.\n3. Follow up in 1 week.",
                codes: "ICD-10: G43.909"
            });
            setIsProcessing(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                            <Wand2 className="text-purple-600" />
                            AI Clinical <span className="text-purple-600">Scribe</span>
                        </h1>
                        <p className="text-slate-500">Automated Voice-to-EHR Documentation</p>
                    </div>
                    <Link to="/staff/dashboard" className="text-slate-500 hover:text-slate-800 font-medium">
                        &larr; Back to Dashboard
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Recording Panel */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className={`absolute inset-0 bg-purple-50 transition-opacity duration-500 ${isRecording ? 'opacity-100' : 'opacity-0'}`}></div>

                        <div className="relative z-10 w-full flex flex-col items-center">
                            <div className="mb-8 relative">
                                {isRecording && (
                                    <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20"></div>
                                )}
                                <button
                                    onClick={toggleRecording}
                                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${isRecording ? 'bg-red-500 hover:bg-red-600 scale-110' : 'bg-purple-600 hover:bg-purple-700'}`}
                                >
                                    {isRecording ? <StopCircle className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
                                </button>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                {isRecording ? "Listening..." : "Tap to Speak"}
                            </h2>
                            <p className="text-slate-400 max-w-xs">
                                {isRecording ? "Dictate your clinical notes naturally. I'm capturing everything." : "Start recording during or after patient consultation."}
                            </p>

                            {isRecording && (
                                <div className="mt-8 flex gap-1 h-6 items-end">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-2 bg-purple-400 rounded-full animate-pulse-slow" style={{ height: Math.random() * 20 + 10 + 'px', animationDuration: '0.5s', animationDelay: i * 0.1 + 's' }}></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Transcript & AI Process */}
                    <div className="space-y-6">

                        {/* Transcript Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 min-h-[200px] relative">
                            <h3 className="text-sm font-bold uppercase text-slate-400 mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Live Transcript
                            </h3>

                            {transcript ? (
                                <p className="text-slate-700 leading-relaxed text-lg animate-fade-in">"{transcript}"</p>
                            ) : (
                                <p className="text-slate-300 italic">No notes recorded yet...</p>
                            )}

                            {transcript && !notes && !isProcessing && (
                                <div className="mt-6 flex justify-end">
                                    <button onClick={generateNotes} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-2">
                                        <SparklesIcon className="w-4 h-4" /> Generate Structured Note
                                    </button>
                                </div>
                            )}

                            {isProcessing && (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                                        <span className="text-purple-600 font-bold animate-pulse">Analyzing Medical Context...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Structured Result */}
                        {notes && (
                            <div className="bg-slate-900 rounded-3xl p-6 text-slate-100 shadow-2xl animate-fade-in slide-in-from-bottom-4">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg text-purple-300">AI Structured Data</h3>
                                    <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors">Copy to EHR</button>
                                </div>

                                <div className="space-y-4 text-sm font-mono">
                                    <div>
                                        <span className="text-slate-500 block mb-1">Chief Complaint</span>
                                        <span className="text-white">{notes.chiefComplaint}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block mb-1">Assessment</span>
                                        <span className="text-emerald-400">{notes.assessment}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block mb-1">Generated Codes</span>
                                        <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded inline-block">{notes.codes}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider">
                                        <Check className="w-4 h-4" /> Validated
                                    </div>
                                    <button className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                                        <Save className="w-4 h-4" /> Save to Patient
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

function SparklesIcon({ className }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M9 3v4" /><path d="M3 5h4" /><path d="M3 9h4" /></svg>
    )
}
