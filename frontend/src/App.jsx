import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StaffLayout from "./pages/staff/Layout";
import StaffLogin from "./pages/staff/Login";
import StaffDashboard from "./pages/staff/Dashboard";
import AdminDashboard from "./pages/staff/AdminDashboard";
import StaffSchedule from "./pages/staff/Schedule";
import StaffMessages from "./pages/staff/Messages";
import StaffPatients from "./pages/staff/Patients";
import StaffPatientDetail from "./pages/staff/PatientDetail";
import PatientLayout from "./pages/patient/Layout";
import NfcLogin from "./pages/patient/NfcLogin";
import PatientDashboard from "./pages/patient/Dashboard";
import FamilyTracker from "./components/patient/FamilyTracker";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeSelection />} />

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route path="login" element={<StaffLogin />} />
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="schedule" element={<StaffSchedule />} />
          <Route path="messages" element={<StaffMessages />} />
          <Route path="patients" element={<StaffPatients />} />
          <Route path="patient/:id" element={<StaffPatientDetail />} />
          {/* Redirect root of /staff to login or dashboard */}
          <Route index element={<Navigate to="/staff/login" replace />} />
        </Route>

        {/* Patient Routes */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="login" element={<NfcLogin />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route index element={<Navigate to="/patient/login" replace />} />
        </Route>

        {/* Public Routes */}
        <Route path="/track/:id" element={<FamilyTracker />} />
      </Routes>
    </BrowserRouter>
  )
}

function HomeSelection() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">
          MediFlow <span className="text-teal-600">AI</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-lg mx-auto">
          The Next-Generation Hospital Management System powered by Intelligent Logic and Empathy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Staff Portal Card */}
        <a
          href="/staff"
          className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">👨‍⚕️</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">Staff Portal</h2>
            <p className="text-slate-500 mb-6">
              Advanced clinical dashboard for Doctors, Nurses, and Admins. Features <strong>Smart Task Ranking</strong>, <strong>Billing Agent</strong>, and <strong>Live Bed Map</strong>.
            </p>
            <span className="inline-flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
              Access Dashboard &rarr;
            </span>
          </div>
        </a>

        {/* Patient Portal Card */}
        <a
          href="/patient"
          className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl hover:border-teal-100 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500 transition-colors duration-300">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🏥</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors">Patient Portal</h2>
            <p className="text-slate-500 mb-6">
              Tablet-optimized experience for patients. Features <strong>WebNFC Login</strong>, <strong>Voice Empathy Engine</strong>, and <strong>Recovery Quests</strong>.
            </p>
            <span className="inline-flex items-center text-teal-600 font-bold group-hover:translate-x-2 transition-transform">
              Enter Patient View &rarr;
            </span>
          </div>
        </a>
      </div>

      <div className="mt-12 text-slate-400 text-sm">
        &copy; 2026 MediFlow AI Systems. Secure. Smart. Compassionate.
      </div>
    </div>
  )
}
