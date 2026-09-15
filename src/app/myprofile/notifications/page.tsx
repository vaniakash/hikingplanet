'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Bell, CheckCircle2, AlertCircle, Info, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [marking, setMarking] = useState<string | null>(null);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/consumer/dashboard/notifications');
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setNotifications(data.notifications);
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleMarkAsRead = async (id?: string) => {
        setMarking(id || 'all');
        try {
            const res = await fetch('/api/consumer/dashboard/notifications', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            
            if (res.ok) {
                if (id) {
                    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
                } else {
                    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setMarking(null);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const getIcon = (type: string) => {
        switch (type) {
            case 'booking': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
            case 'payment': return <span className="text-blue-500 font-bold text-lg">₹</span>;
            case 'reminder': return <AlertCircle className="w-5 h-5 text-amber-500" />;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="bg-[#e30613] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                {unreadCount} New
                            </span>
                        )}
                    </h1>
                    <p className="text-slate-500 mt-1">Updates about your bookings and account.</p>
                </div>
                {unreadCount > 0 && (
                    <button 
                        onClick={() => handleMarkAsRead()}
                        disabled={marking === 'all'}
                        className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
                    >
                        {marking === 'all' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        Mark all as read
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
                </div>
            ) : notifications.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <Bell className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-500">You're all caught up!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notif) => (
                        <div 
                            key={notif._id} 
                            className={`p-4 rounded-xl border flex gap-4 transition-colors ${notif.read ? 'bg-white border-gray-100' : 'bg-red-50/30 border-red-100'}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.read ? 'bg-slate-50' : 'bg-white shadow-sm'}`}>
                                {getIcon(notif.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start gap-4">
                                    <h3 className={`font-bold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>
                                        {notif.title}
                                    </h3>
                                    <span className="text-xs text-slate-400 whitespace-nowrap">
                                        {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className={`mt-1 text-sm ${notif.read ? 'text-slate-500' : 'text-slate-700'}`}>
                                    {notif.message}
                                </p>
                            </div>
                            {!notif.read && (
                                <button 
                                    onClick={() => handleMarkAsRead(notif._id)}
                                    disabled={marking === notif._id}
                                    className="shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all"
                                    title="Mark as read"
                                >
                                    {marking === notif._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
