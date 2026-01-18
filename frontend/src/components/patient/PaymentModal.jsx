import React, { useState } from 'react';
import { CreditCard, Banknote, Smartphone, ShieldCheck, CheckCircle, X, Loader2, Printer, QrCode } from 'lucide-react';
import { cn } from "../../lib/utils";

export default function PaymentModal({ amount, onClose, onSuccess }) {
    const [method, setMethod] = useState('card');
    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handlePayment = () => {
        setProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setProcessing(false);
            setCompleted(true);
            setTimeout(() => {
                onSuccess();
            }, 2000);
        }, 2000);
    };

    if (completed) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center transform scale-100 animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-600 animate-bounce" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Payment Successful!</h2>
                    <p className="text-slate-500 mb-6 font-medium">Your transaction for ₹{amount.toLocaleString()} has been processed secureley.</p>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6">
                        <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-slate-400 font-bold uppercase">Ref ID</span>
                            <span className="font-mono font-bold text-slate-700">TXN-{Math.floor(Math.random() * 1000000)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold uppercase">Method</span>
                            <span className="font-bold text-slate-700 uppercase">{method}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] max-w-4xl w-full shadow-2xl flex overflow-hidden h-[600px] border border-white/20">

                {/* Left Panel: Summary & Methods */}
                <div className="w-1/3 bg-slate-50 p-8 border-r border-slate-100 flex flex-col">
                    <h2 className="text-xl font-black text-slate-800 mb-1">Select Payment</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-8">Secure Gateway</p>

                    <div className="space-y-3 flex-1">
                        <PaymentMethod
                            active={method === 'card'}
                            onClick={() => setMethod('card')}
                            icon={CreditCard}
                            label="Card"
                            sublabel="Credit / Debit"
                        />
                        <PaymentMethod
                            active={method === 'upi'}
                            onClick={() => setMethod('upi')}
                            icon={Smartphone}
                            label="UPI / QR"
                            sublabel="GPay, PhonePe"
                        />
                        <PaymentMethod
                            active={method === 'insurance'}
                            onClick={() => setMethod('insurance')}
                            icon={ShieldCheck}
                            label="Insurance"
                            sublabel="Direct Claim"
                        />
                        <PaymentMethod
                            active={method === 'cash'}
                            onClick={() => setMethod('cash')}
                            icon={Banknote}
                            label="Pay at Counter"
                            sublabel="Generate Slip"
                        />
                    </div>

                    <div className="pt-6 border-t border-slate-200">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-slate-500 font-bold text-sm">Total Payable</span>
                            <span className="text-2xl font-black text-slate-900">₹{amount.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-slate-400 text-right font-medium">+ Taxes Included</p>
                    </div>
                </div>

                {/* Right Panel: Dynamic Content */}
                <div className="w-2/3 p-10 relative flex flex-col">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex-1 flex flex-col justify-center">
                        {method === 'card' && <CardForm />}
                        {method === 'upi' && <UPIForm amount={amount} />}
                        {method === 'insurance' && <InsuranceForm />}
                        {method === 'cash' && <CashSlip amount={amount} />}
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={processing}
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-lg shadow-xl shadow-slate-200 active:scale-[0.99] transition-all flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-8"
                    >
                        {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            method === 'cash' ? 'Generate Slip' : `Pay ₹${amount.toLocaleString()}`
                        )}
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-4 opacity-40">
                        <ShieldCheck className="w-3 h-3 text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">256-Bit SSL Encrypted Payment</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PaymentMethod({ active, onClick, icon: Icon, label, sublabel }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full p-4 rounded-xl flex items-center gap-4 transition-all duration-200 border-2 text-left group",
                active
                    ? "bg-white border-blue-500 shadow-lg shadow-blue-100"
                    : "bg-white border-transparent hover:border-slate-200 hover:shadow-md"
            )}
        >
            <div className={cn(
                "p-3 rounded-lg transition-colors",
                active ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400 group-hover:text-slate-600"
            )}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className={cn("font-bold text-sm", active ? "text-blue-700" : "text-slate-700")}>{label}</h3>
                <p className="text-xs text-slate-400 font-medium">{sublabel}</p>
            </div>
            {active && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
        </button>
    );
}

function CardForm() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-12 bg-slate-100 rounded border border-slate-200"></div>
                <div className="h-8 w-12 bg-slate-100 rounded border border-slate-200"></div>
                <div className="h-8 w-12 bg-slate-100 rounded border border-slate-200"></div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Expiry</label>
                        <input type="text" placeholder="MM / YY" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">CVV</label>
                        <input type="text" placeholder="•••" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Cardholder Name</label>
                    <input type="text" placeholder="JOHN DOE" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
            </div>
        </div>
    );
}

function UPIForm({ amount }) {
    return (
        <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100">
                <QrCode className="w-40 h-40 text-slate-800" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-800">Scan to Pay</h3>
                <p className="text-slate-400 text-sm">Use any UPI app to complete payment</p>
            </div>
            <div className="w-full flex items-center gap-4">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-xs font-bold text-slate-400 uppercase">OR</span>
                <div className="h-px bg-slate-200 flex-1"></div>
            </div>
            <div className="w-full">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block text-left">Enter UPI ID</label>
                <div className="relative">
                    <input type="text" placeholder="user@upi" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                    <button className="absolute right-2 top-2 bottom-2 px-4 bg-blue-100 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-200 transition-colors">VERIFY</button>
                </div>
            </div>
        </div>
    );
}

function CashSlip({ amount }) {
    return (
        <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center">
                <Printer className="w-10 h-10 text-amber-500" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-800">Pay at Counter</h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">Generate a digital slip. Show this at the hospital billing counter to pay via Cash or Cheque.</p>
            </div>
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-xl w-full">
                <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Slip ID</span>
                    <span className="text-xs font-mono font-bold text-slate-800">#SLIP-8829</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">Amount</span>
                    <span className="text-xs font-mono font-bold text-slate-800">₹{amount.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}

function InsuranceForm() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-sm text-blue-700 font-medium">Your primary insurance <span className="font-bold">Aetna Health</span> is linked.</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Policy Number</label>
                    <input type="text" value="POL-8829-3992" disabled className="w-full p-4 bg-slate-100 border border-slate-200 rounded-xl font-mono font-bold text-slate-500" />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Claim Reason</label>
                    <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                        <option>Hospitalization</option>
                        <option>Diagnostic Tests</option>
                        <option>Consultation</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
