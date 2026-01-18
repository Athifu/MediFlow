import React, { useState } from 'react';
import { Send, User, Paperclip, MoreVertical, Phone, Video, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_MESSAGES = [
    { id: 1, sender: "doctor", text: "Hello! How have you been feeling since the surgery?", time: "09:00 AM" },
    { id: 2, sender: "me", text: "Much better, thank you doctor. The pain is manageable now.", time: "09:05 AM" },
    { id: 3, sender: "doctor", text: "That's great to hear. Make sure to keep up with the physical therapy exercises.", time: "09:10 AM" },
];

export default function ChatSystem() {
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState("");

    const handleSend = () => {
        if (!inputText.trim()) return;
        setMessages([...messages, { id: messages.length + 1, sender: "me", text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        setInputText("");

        // Simulate reply
        setTimeout(() => {
            setMessages(prev => [...prev, { id: prev.length + 1, sender: "doctor", text: "I'll make a note of that. Let me know if anything changes.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans flex flex-col">
            <div className="max-w-4xl mx-auto w-full h-[85vh] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-slate-100">

                {/* Chat Header */}
                <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/patient/dashboard" className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                            <ChevronRight className="rotate-180 w-5 h-5" />
                        </Link>
                        <div className="relative">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">DR</div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Dr. Sarah Wilson</h3>
                            <p className="text-xs text-emerald-500 font-bold flex items-center gap-1">Online</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                            <Phone className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                            <Video className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-200' : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-sm'}`}>
                                {msg.text}
                                <div className={`text-[10px] mt-2 font-bold opacity-70 ${msg.sender === 'me' ? 'text-blue-100 text-right' : 'text-slate-300'}`}>
                                    {msg.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100">
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                        />
                        <button
                            onClick={handleSend}
                            className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
