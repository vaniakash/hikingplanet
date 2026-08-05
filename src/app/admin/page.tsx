'use client';

import Link from 'next/link';
import { Mountain, TrendingUp, Users, Calendar, Settings } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Treks', value: '5', icon: Mountain, color: 'violet' },
        { label: 'Active Bookings', value: '12', icon: Calendar, color: 'blue' },
        { label: 'Total Revenue', value: '₹1.2L', icon: TrendingUp, color: 'green' },
        { label: 'Customers', value: '48', icon: Users, color: 'orange' },
    ];

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back, Admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    const colorMap: Record<string, string> = {
                        violet: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
                        blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                        green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
                        orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
                    };

                    return (
                        <div
                            key={idx}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${colorMap[stat.color]}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/admin/treks/new"
                        className="group p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-[#4b2e83] dark:hover:border-[#6b4ea3] hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-all text-center"
                    >
                        <Mountain className="w-8 h-8 mx-auto mb-3 text-gray-400 group-hover:text-[#4b2e83] dark:group-hover:text-[#6b4ea3]" />
                        <p className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#4b2e83] dark:group-hover:text-[#6b4ea3]">
                            Add New Trek
                        </p>
                    </Link>

                    <Link
                        href="/admin/bookings"
                        className="group p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-center"
                    >
                        <Calendar className="w-8 h-8 mx-auto mb-3 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                        <p className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400">
                            View Bookings
                        </p>
                    </Link>

                    <div className="p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 text-center cursor-not-allowed opacity-60">
                        <Settings className="w-8 h-8 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                        <p className="font-semibold text-gray-400 dark:text-gray-600">
                            Settings
                        </p>
                        <span className="text-xs text-gray-400 dark:text-gray-600">Coming Soon</span>
                    </div>
                </div>
            </div>
        </>
    );
}
