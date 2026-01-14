import { useEffect, useState } from "react";
import BedMap from "../../components/logic/BedMap";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Admin Command Center</h2>
            <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold">Emergency Dept Status</h1>
                <p className="text-slate-300 mt-2">Real-time bed availability tracking.</p>
            </div>
            <BedMap />
        </div>
    );
}
