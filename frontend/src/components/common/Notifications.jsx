import React, { useState, useEffect } from 'react';
import { Bell, X, Check, Info, AlertTriangle } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
    { id: 1, title: 'New Lab Result', message: 'Your blood panel results are ready.', type: 'info', time: '2m ago' },
    { id: 2, title: 'Appointment Reminder', message: 'Call with Dr. Wilson in 1 hour.', type: 'warning', time: '5m ago' },
    { id: 3, title: 'Medication Due', message: 'Time to take Amoxicillin (500mg)', type: 'alert', time: '10m ago' },
];

export default function Notifications() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const [unreadCount, setUnreadCount] = useState(3);

    const markAllRead = () => {
        setUnreadCount(0);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="fixed top-6 right-6 z-50">

            {/* Bell Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 hover:bg-slate-50 transition-all relative"
            >
                <Bell className="w-6 h-6 text-slate-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute top-14 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-fade-in origin-top-right">

                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-700 text-sm">Notifications</h3>
                        {unreadCount > 0 && (
                            <button onClick={markAllRead} className="text-xs text-blue-600 font-bold hover:underline">
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 text-sm">
                                No new notifications
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 relative group">
                                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notif.type === 'alert' ? 'bg-red-500' : notif.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">{notif.title}</h4>
                                        <p className="text-xs text-slate-500 mb-1">{notif.message}</p>
                                        <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">{notif.time}</span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeNotification(notif.id); }}
                                        className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 text-center">
                        <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider">View All Activity</a>
                    </div>

                </div>
            )}

        </div>
    );
}
