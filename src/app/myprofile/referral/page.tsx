'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Copy, Users, Check, Gift } from 'lucide-react';

export default function ReferralPage() {
    const [referralData, setReferralData] = useState({ referralCode: '', referralCount: 0 });
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchReferral = async () => {
            try {
                const res = await fetch('/api/consumer/dashboard/referral');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setReferralData(data);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReferral();
    }, []);

    const referralLink = typeof window !== 'undefined' ? `${window.location.origin}/signup?ref=${referralData.referralCode}` : '';

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900">Refer & Earn</h1>
                <p className="text-slate-500 mt-1">Invite friends and earn rewards for your next trek.</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                            <Gift className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Give ₹500, Get ₹500</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Share your unique referral link with friends. They'll get ₹500 off their first trek, and you'll get 500 Reward Points (worth ₹500) once they complete their booking.
                        </p>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Your Referral Link</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text"
                                    readOnly
                                    value={referralLink}
                                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 focus:outline-none"
                                />
                                <button 
                                    onClick={handleCopy}
                                    className="px-6 py-3 bg-[#e30613] text-white font-bold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 shrink-0"
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 bg-gradient-to-b from-slate-900 to-slate-800 p-8 rounded-2xl shadow-sm text-white flex flex-col items-center justify-center text-center">
                        <Users className="w-12 h-12 text-slate-400 mb-4" />
                        <div className="text-5xl font-black mb-2">{referralData.referralCount}</div>
                        <h3 className="text-slate-300 font-bold uppercase tracking-wider text-sm mb-4">Friends Referred</h3>
                        <p className="text-sm text-slate-400">Keep sharing to unlock more rewards!</p>
                    </div>
                </div>
            )}
        </div>
    );
}
