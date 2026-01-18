import { useState, useEffect } from "react";
import { Search, Command, User, FileText, Pill, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SpotlightSearch() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    if (!open) return null;

    const nav = (path) => {
        setOpen(false);
        navigate(path);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-[20vh] animate-in fade-in duration-200" onClick={() => setOpen(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 p-4 border-b border-slate-100">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                        className="flex-1 text-lg font-medium text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
                        placeholder="Type a command or search..."
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border bg-slate-50 px-2 text-[10px] font-medium text-slate-500 font-mono">
                        <span className="text-xs">ESC</span>
                    </kbd>
                </div>

                <div className="p-2 max-h-[400px] overflow-y-auto">
                    <div className="px-2 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Suggestions</div>

                    <CommandItem icon={User} label="Patient Dashboard" shortcut="G P" onClick={() => nav('/patient/dashboard')} />
                    <CommandItem icon={FileText} label="View Documents" shortcut="G D" onClick={() => nav('/patient/documents')} />
                    <CommandItem icon={Pill} label="Pharmacy Inventory" shortcut="G I" onClick={() => nav('/staff/inventory')} />
                    <CommandItem icon={Calendar} label="Staff Schedule" shortcut="G S" onClick={() => nav('/staff/schedule')} />

                    <div className="h-px bg-slate-100 my-2"></div>

                    <div className="px-2 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Actions</div>
                    <CommandItem icon={ArrowRight} label="Log Out" onClick={() => nav('/staff/login')} />
                </div>

                <div className="p-2 bg-slate-50 border-t border-slate-100 flex justify-end gap-2 text-[10px] text-slate-400 font-medium">
                    <span>Search by</span>
                    <span className="font-bold text-slate-500">MediFlow Intelligence</span>
                </div>
            </div>
        </div>
    );
}

function CommandItem({ icon: Icon, label, shortcut, onClick }) {
    return (
        <div
            onClick={onClick}
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer group transition-colors"
        >
            <div className="p-2 bg-white border border-slate-100 rounded-md text-slate-400 group-hover:text-blue-500 group-hover:border-blue-200 transition-colors">
                <Icon className="w-4 h-4" />
            </div>
            <span className="flex-1 font-medium">{label}</span>
            {shortcut && (
                <span className="text-xs text-slate-400 font-mono bg-white px-2 py-1 rounded border border-slate-100">{shortcut}</span>
            )}
        </div>
    );
}
