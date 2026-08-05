'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Mountain, Settings, Calendar, Sun, Moon, ChevronLeft, ChevronRight, BarChart, Users } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    };

    const navItems = [
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart },
        { name: 'Lead Management', href: '/admin/leads', icon: Users },
        { name: 'Manage Treks', href: '/admin/treks', icon: Mountain },
        { name: 'All Bookings', href: '/admin/bookings', icon: Calendar },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 z-50 ${isSidebarOpen ? 'w-64' : 'w-20'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 h-20">
                    <Link href="/admin" className={`flex items-center gap-3 group ${!isSidebarOpen && 'justify-center mx-auto'}`}>
                        <div className="bg-[#4b2e83] p-2 rounded-lg group-hover:scale-105 transition-transform shrink-0">
                            <Mountain className="w-6 h-6 text-white" />
                        </div>
                        {isSidebarOpen && (
                            <div className="overflow-hidden whitespace-nowrap">
                                <h2 className="font-bold text-gray-900 dark:text-white">BoundlessPath</h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
                            </div>
                        )}
                    </Link>
                </div>

                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 hover:scale-110 transition-transform shadow-md z-50"
                >
                    {isSidebarOpen ? (
                        <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    )}
                </button>

                <nav className="p-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative ${isActive
                                    ? 'bg-[#4b2e83] text-white shadow-md'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                                    } ${!isSidebarOpen && 'justify-center'}`}
                                title={!isSidebarOpen ? item.name : ''}
                            >
                                <Icon className={`w-6 h-6 shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#4b2e83] dark:text-gray-400 dark:group-hover:text-white'}`} />
                                {isSidebarOpen && <span className="font-medium whitespace-nowrap overflow-hidden transition-all duration-300 transform translate-x-0 opacity-100">{item.name}</span>}

                                {/* Tooltip for collapsed state */}
                                {!isSidebarOpen && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                        {item.name}
                                    </div>
                                )}
                            </Link>
                        );
                    })}

                    <button
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 dark:text-gray-600 cursor-not-allowed ${!isSidebarOpen && 'justify-center'}`}
                        disabled
                    >
                        <Settings className="w-6 h-6 shrink-0" />
                        {isSidebarOpen && (
                            <>
                                <span className="font-medium">Settings</span>
                                <span className="ml-auto text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Soon</span>
                            </>
                        )}
                    </button>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium ${!isSidebarOpen && 'justify-center'}`}
                        title={!isSidebarOpen ? 'Logout' : ''}
                    >
                        <LogOut className="w-6 h-6 shrink-0" />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div
                className={`transition-all duration-300 p-8 ${isSidebarOpen ? 'ml-64' : 'ml-20'
                    }`}
            >
                {/* Header with Theme Toggle */}
                <header className="flex justify-end items-center mb-8">
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:scale-110 transition-all shadow-md group"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <Moon className="w-5 h-5 text-gray-700 group-hover:text-[#4b2e83]" />
                        ) : (
                            <Sun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400" />
                        )}
                    </button>
                </header>

                <main className="animate-fadeIn">
                    {children}
                </main>
            </div>
        </div>
    );
}
