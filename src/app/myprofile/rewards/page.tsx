'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Award, Target, Zap } from 'lucide-react';

export default function RewardsPage() {
    const [rewards, setRewards] = useState({ points: 0, totalTreksCompleted: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const res = await fetch('/api/consumer/dashboard/rewards');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && data.rewards) {
                        setRewards(data.rewards);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRewards();
    }, []);

    const nextRewardGoal = (Math.floor(rewards.totalTreksCompleted / 3) + 1) * 3;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900">Rewards & Loyalty</h1>
                <p className="text-slate-500 mt-1">Earn points and unlock exclusive perks on your treks.</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-sm text-white flex flex-col justify-between">
                            <div>
                                <h3 className="text-slate-300 font-bold uppercase tracking-wider text-sm mb-1">Available Points</h3>
                                <div className="text-5xl font-black">{rewards.points}</div>
                            </div>
                            <div className="mt-8">
                                <button className="px-6 py-2.5 bg-[#e30613] text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-sm">
                                    Redeem Points
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                            <div>
                                <h3 className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-1 flex items-center gap-2">
                                    <Target className="w-4 h-4" /> Trek Progress
                                </h3>
                                <div className="text-3xl font-black text-slate-900 mt-2">
                                    {rewards.totalTreksCompleted} <span className="text-lg font-medium text-slate-500">Completed</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-2">
                                    Complete {nextRewardGoal - rewards.totalTreksCompleted} more trek(s) to reach the next tier!
                                </p>
                            </div>
                            <div className="mt-6 h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${(rewards.totalTreksCompleted % 3) / 3 * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-amber-500" /> How it works
                        </h2>
                        <ul className="space-y-3 text-slate-600 text-sm list-disc pl-5">
                            <li>Earn 500 points for every trek completed.</li>
                            <li>Earn 200 points for writing a verified review.</li>
                            <li>Redeem 1000 points for a ₹1000 discount on your next booking.</li>
                            <li>Reach Milestone Tiers (3, 6, 9 treks) for free gear rentals.</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
