'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Mountain, Settings, Calendar, Sun, Moon, BarChart, Users, Search, Bell, Command, User, ArrowRightFromLine, LayoutDashboard } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    };

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, isComingSoon: false },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart, isComingSoon: false },
        { name: 'Lead Management', href: '/admin/leads', icon: Users, badge: 12, isComingSoon: false },
        { name: 'Manage Treks', href: '/admin/treks', icon: Mountain, isComingSoon: false },
        { name: 'All Bookings', href: '/admin/bookings', icon: Calendar, isComingSoon: false },
        { name: 'Settings', href: '#', icon: Settings, isComingSoon: true },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 z-50 flex flex-col">
                <div className="flex items-center p-6 pb-4 h-20">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-lg shrink-0">
                            <Mountain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">BoundlessPath</h2>
                            <p className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase">Admin Panel</p>
                        </div>
                    </Link>
                </div>

                <nav className="p-4 space-y-1 mt-2 flex-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = (item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)) && !item.isComingSoon;
                        return item.isComingSoon ? (
                            <button
                                key={item.name}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 cursor-not-allowed"
                                disabled
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span className="font-medium text-sm">{item.name}</span>
                            </button>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
                                <span className={`font-medium text-sm ${isActive ? 'font-semibold' : ''}`}>{item.name}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 py-0.5 px-2 rounded-full text-xs font-semibold">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-2">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 flex items-center justify-center font-bold">
                            RR
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Rajan Rawat</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Admin - HikingPlanet</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all font-medium"
                    >
                        <ArrowRightFromLine className="w-5 h-5 shrink-0 text-gray-400" />
                        <span className="text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                {/* Header */}
                <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-40">
                    {/* Search */}
                    <div className="relative w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search bookings, treks, leads..."
                            className="block w-full pl-10 pr-12 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <kbd className="inline-flex items-center px-1.5 py-0.5 border border-gray-200 dark:border-gray-700 rounded text-xs font-sans font-medium text-gray-400 dark:text-gray-500">
                                <Command className="w-3 h-3 mr-0.5" /> K
                            </kbd>
                        </div>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 relative text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <Moon className="w-5 h-5" />
                            ) : (
                                <Sun className="w-5 h-5" />
                            )}
                        </button>
                        
                        <button className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center border border-indigo-200">
                            <User className="w-4 h-4" />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 animate-fadeIn">
                    {children}
                </main>
            </div>
        </div>
    );
}
