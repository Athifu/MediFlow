import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, AlertCircle, ChevronRight } from 'lucide-react';

const MOCK_AI_RESPONSES = {
    default: "I understand. Could you tell me more about how long you've been experiencing this?",
    "headache": "I see you have a headache. Is it a sharp pain, or more of a dull throb? Also, is it sensitive to light?",
    "fever": "A fever can be concerning. do you have a thermometer nearby to measure your temperature exactly?",
    "chest pain": "Chest pain is serious. If it feels like heavy pressure or radiates to your arm, please call emergency services immediately. Otherwise, describe the pain location.",
    "tired": "Fatigue can be caused by many things including stress, poor sleep, or diet. Have you been sleeping well lately?",
};

export default function SymptomChecker() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Hello! I'm Dr. Ava, your AI Health Assistant. I can help triage your symptoms. How are you feeling today?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            const lowerInput = userMsg.text.toLowerCase();
            let responseText = MOCK_AI_RESPONSES.default;

            for (const [key, value] of Object.entries(MOCK_AI_RESPONSES)) {
                if (lowerInput.includes(key)) {
                    responseText = value;
                    break;
                }
            }

            if (lowerInput.includes("emergency") || lowerInput.includes("dying")) {
                responseText = "I detected an emergency keyword. Please stop using this app and call 911 or go to the nearest ER immediately.";
            }

            const botMsg = { id: Date.now() + 1, sender: 'bot', text: responseText };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 animate-fade-in">
            {/* Header */}
            <div className="mb-6 text-center space-y-2">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl shadow-lg mb-2">
                    <Sparkles className="w-8 h-8 text-white animate-pulse-slow" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Symptom Checker</span>
                </h1>
                <p className="text-slate-500 max-w-md mx-auto">
                    Describe your symptoms to Dr. Ava. She analyzes your input against millions of medical records to suggest potential causes.
                </p>
            </div>

            {/* Chat Container */}
            <div className="flex-1 bg-white/50 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden flex flex-col relative glass-panel">

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${msg.sender === 'bot'
                                    ? 'bg-gradient-to-br from-teal-400 to-blue-500 text-white'
                                    : 'bg-slate-200 text-slate-600'
                                }`}>
                                {msg.sender === 'bot' ? <Bot size={20} /> : <User size={20} />}
                            </div>

                            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm leading-relaxed ${msg.sender === 'bot'
                                    ? 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex items-start gap-3 animate-fade-in">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 text-white flex items-center justify-center shadow-md">
                                <Bot size={20} />
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-2 items-center">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white/80 backdrop-blur-md border-t border-slate-100">
                    <div className="relative flex items-center gap-2 max-w-3xl mx-auto">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Describe your symptoms (e.g., 'I have a headache and fever')..."
                            className="w-full pl-6 pr-14 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-inner text-slate-700 placeholder:text-slate-400"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                    <div className="text-center mt-3 flex items-center justify-center gap-1 text-xs text-slate-400">
                        <AlertCircle size={12} />
                        <span>AI can make mistakes. In emergencies, call 911.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
