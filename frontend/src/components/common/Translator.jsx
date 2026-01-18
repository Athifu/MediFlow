import React, { useState } from 'react';
import { Mic, Globe, RefreshCcw, Volume2, ChevronRight, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';

const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'zh', name: 'Mandarin', flag: '🇨🇳' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
];

export default function Translator() {
    const [sourceLang, setSourceLang] = useState(LANGUAGES[0]);
    const [targetLang, setTargetLang] = useState(LANGUAGES[1]);
    const [inputText, setInputText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [isListening, setIsListening] = useState(false);

    const handleTranslate = () => {
        // Simulate translation
        setTranslatedText(inputText ? `[Translated to ${targetLang.name}]: ${inputText}` : "");
    };

    const handleMic = () => {
        setIsListening(true);
        setTimeout(() => {
            setIsListening(false);
            setInputText("Hello doctor, I have a pain in my chest.");
            handleTranslate();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/patient/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <Globe className="text-blue-600" /> Live Translator
                    </h1>
                </div>

                {/* Language Selection */}
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center justify-between mb-6">
                    <LangSelector selected={sourceLang} onChange={setSourceLang} />
                    <button className="p-3 bg-slate-100 rounded-full hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors">
                        <RefreshCcw className="w-5 h-5" />
                    </button>
                    <LangSelector selected={targetLang} onChange={setTargetLang} />
                </div>

                {/* Translation Area */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 relative overflow-hidden">

                    {/* Source Input */}
                    <div className="mb-8 relative">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{sourceLang.name}</label>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type or speak..."
                            className="w-full h-32 text-2xl font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none resize-none bg-transparent"
                        ></textarea>
                        <div className="absolute bottom-0 right-0 flex gap-2">
                            <button
                                onClick={handleMic}
                                className={`p-3 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-500 hover:bg-blue-500 hover:text-white'}`}
                            >
                                <Mic className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 mb-8"></div>

                    {/* Target Output */}
                    <div>
                        <label className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 block">{targetLang.name}</label>
                        <div className="min-h-[128px]">
                            {translatedText ? (
                                <p className="text-2xl font-bold text-blue-600 animate-fade-in">{translatedText}</p>
                            ) : (
                                <p className="text-2xl font-medium text-slate-200">Translation will appear here...</p>
                            )}
                        </div>
                        {translatedText && (
                            <button className="mt-2 text-blue-500 hover:text-blue-700 flex items-center gap-2 font-bold text-sm">
                                <Volume2 className="w-4 h-4" /> Play Audio
                            </button>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}

function LangSelector({ selected, onChange }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors group relative">
            <span className="text-2xl">{selected.flag}</span>
            <span className="font-bold text-slate-700">{selected.name}</span>
            {/* Simple Mock Dropdown (Visual Only) */}
        </div>
    )
}
