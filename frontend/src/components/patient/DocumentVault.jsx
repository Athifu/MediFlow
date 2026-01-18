import React, { useState } from 'react';
import { FileText, Download, Eye, Shield, Lock, ChevronRight, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_DOCS = [
    { id: 1, name: "Discharge Summary - Oct 2024", date: "Oct 25, 2024", type: "PDF", size: "2.4 MB" },
    { id: 2, name: "Lab Results - Blood Work", date: "Oct 24, 2024", type: "PDF", size: "1.1 MB" },
    { id: 3, name: "Insurance Claim #4992", date: "Oct 20, 2024", type: "PDF", size: "0.8 MB" },
    { id: 4, name: "MRI Scan Report", date: "Aug 15, 2024", type: "PDF", size: "4.5 MB" },
];

export default function DocumentVault() {
    const [docs, setDocs] = useState(MOCK_DOCS);

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/patient/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back to Dashboard
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                        <Upload className="w-5 h-5" /> Upload Document
                    </button>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden mb-8 shadow-xl shadow-slate-200">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                            <Shield className="w-8 h-8 text-emerald-400" />
                            Secure Vault
                        </h1>
                        <p className="text-slate-400 max-w-lg">Your medical records are encrypted and securely stored. Only you and your authorized providers have access.</p>

                        <div className="mt-6 flex gap-4">
                            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                <Lock className="w-4 h-4" /> End-to-End Encrypted
                            </div>
                            <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                                HIPAA Compliant
                            </div>
                        </div>
                    </div>

                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>

                {/* Documents List */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">Recent Documents</h3>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">4 Files • 8.8 MB Used</div>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {docs.map(doc => (
                            <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{doc.name}</h4>
                                        <p className="text-xs text-slate-400 font-bold">{doc.date} • {doc.size}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
