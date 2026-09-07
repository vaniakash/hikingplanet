'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function MyProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/consumer/me', { cache: 'no-store' });
                const json = await res.json();
                if (json.success && json.user) {
                    setUser(json.user);
                } else {
                    router.replace('/login?callbackUrl=/myprofile');
                }
            } catch (err) {
                console.error(err);
                router.replace('/login?callbackUrl=/myprofile');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/consumer/logout', { method: 'POST' });
            router.push('/login');
        } catch (err) {
            console.error('Logout error', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">My Profile</h1>
                        <p className="text-slate-500 mt-1">{user.email}</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        Logout
                    </button>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Personal Details</h2>
                    {user.name ? (
                        <div className="space-y-3">
                            <p><span className="font-semibold text-slate-600">Name:</span> {user.name}</p>
                            <p><span className="font-semibold text-slate-600">Age:</span> {user.age || 'Not provided'}</p>
                            <p><span className="font-semibold text-slate-600">Gender:</span> {user.gender || 'Not provided'}</p>
                        </div>
                    ) : (
                        <p className="text-slate-500">Your profile is incomplete. Please update your details.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
