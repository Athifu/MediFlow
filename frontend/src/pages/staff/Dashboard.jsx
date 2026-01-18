import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Scan, Shield, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminView from "../../components/staff/AdminView";
import DoctorView from "../../components/staff/DoctorView";
import NurseView from "../../components/staff/NurseView";
import PharmacyView from "../../components/staff/PharmacyView";

export default function StaffDashboard() {
    const [userRole, setUserRole] = useState("doctor");
    const [userName, setUserName] = useState("Staff");
    const navigate = useNavigate();

    useEffect(() => {
        const r = localStorage.getItem("user_role");
        const n = localStorage.getItem("user_name");
        if (r) setUserRole(r);
        if (n) setUserName(n);
    }, []);

    const scanPatientTag = () => {
        // Mock Scan for Demo
        const mockSim = window.prompt("Simulate NFC Scan (Enter Patient ID):", "PATIENT_001");
        if (mockSim) navigate(`/staff/patient/${mockSim}`);
    };

    const renderDashboard = () => {
        // Handle variations in role naming if any
        const role = userRole.toLowerCase();
        if (role === 'admin') return <AdminView />;
        if (role === 'doctor') return <DoctorView />;
        if (role === 'nurse') return <NurseView />;
        if (role === 'pharmacy' || role === 'pharmacist') return <PharmacyView />;
        return <div className="p-10 text-center text-slate-500">Unknown Role: {userRole}</div>;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        {userName} <span className="text-slate-400 font-normal">({userRole})</span>
                    </h2>
                    <p className="text-slate-500 text-sm">Welcome to MediFlow AI Command Center</p>
                </div>
                <Button onClick={scanPatientTag} className="bg-slate-900 hover:bg-slate-800">
                    <Scan className="w-4 h-4 mr-2" /> Scan NFC Tag
                </Button>
            </div>

            {/* Quick Tools Toolbar */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <a href="/staff/heatmap" className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Scan className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700">Heatmap</span>
                </a>
                <a href="/staff/scribe" className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-purple-200 transition-all group">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Scan className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700">AI Scribe</span>
                </a>
                <a href="/staff/inventory" className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Scan className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700">Inventory</span>
                </a>
                <a href="/staff/smart-beds" className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Scan className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700">Smart Beds</span>
                </a>
                <a href="/staff/schedule-manager" className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Scan className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700">Schedule</span>
                </a>
                <a href="/staff/users" className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-slate-800 transition-all group">
                    <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-slate-800 group-hover:text-white transition-colors">
                        <Shield className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700">Users</span>
                </a>
                <a href="/staff/onboarding" className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-purple-200 transition-all group">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700">Training</span>
                </a>
            </div>

            {renderDashboard()}
        </div>
    );
}
