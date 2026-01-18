import React, { useState } from 'react';
import { User, Plus, Edit, Trash2, Shield, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_USERS = [
    { id: 1, name: "Dr. Sarah Wilson", email: "sarah.wilson@mediflow.com", role: "Doctor", department: "Cardiology", status: "Active" },
    { id: 2, name: "James Miller", email: "j.miller@mediflow.com", role: "Nurse", department: "ICU", status: "Active" },
    { id: 3, name: "Emily Chen", email: "e.chen@mediflow.com", role: "Pharmacist", department: "Pharmacy", status: "Active" },
    { id: 4, name: "Robert Fox", email: "r.fox@mediflow.com", role: "Admin", department: "Administration", status: "Active" },
];

export default function UserManagement() {
    const [users, setUsers] = useState(MOCK_USERS);
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to deactivate this user?")) {
            setUsers(users.map(u => u.id === id ? { ...u, status: "Inactive" } : u));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/staff/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back to Dashboard
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                        <Plus className="w-5 h-5" /> Add New User
                    </button>
                </div>

                <div className="flex items-end justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="bg-slate-900 p-2 rounded-xl text-white">
                            <Shield className="w-8 h-8" />
                        </div>
                        User Management
                    </h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 w-80 shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* User Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                                <th className="p-6 font-bold">Name / Email</th>
                                <th className="p-6 font-bold">Role</th>
                                <th className="p-6 font-bold">Department</th>
                                <th className="p-6 font-bold">Status</th>
                                <th className="p-6 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map(user => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{user.name}</div>
                                                <div className="text-xs text-slate-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${user.role === 'Admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className="text-slate-600 font-medium">{user.department}</span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`flex items-center gap-2 font-bold text-sm ${user.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(user.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
