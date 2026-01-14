import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Scan } from "lucide-react";
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

            {renderDashboard()}
        </div>
    );
}
