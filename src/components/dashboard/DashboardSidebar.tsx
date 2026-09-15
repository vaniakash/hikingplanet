'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    LayoutDashboard, 
    CalendarCheck, 
    History, 
    Heart, 
    Star, 
    Bell, 
    CreditCard, 
    Settings,
    LogOut,
    Award,
    Users,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';

interface SidebarProps {
    user: any;
    pathname: string;
}

const navItems = [
    { name: 'Dashboard', href: '/myprofile', icon: LayoutDashboard },
    { name: 'My Bookings', href: '/myprofile/bookings', icon: CalendarCheck, badgeKey: 'upcomingTreks' },
    { name: 'Trek History', href: '/myprofile/history', icon: History, badgeKey: 'completedTreks', badgeText: ' treks' },
    { name: 'Wishlist', href: '/myprofile/wishlist', icon: Heart, badgeKey: 'savedTreks' },
    { name: 'My Reviews', href: '/myprofile/reviews', icon: Star },
    { name: 'Payments & Invoices', href: '/myprofile/payments', icon: CreditCard },
    { name: 'Notifications', href: '/myprofile/notifications', icon: Bell, badgeKey: 'unreadNotifications', badgeColor: 'bg-red-500 text-white' },
    { name: 'Preferences', href: '/myprofile/preferences', icon: Settings },
    { name: 'Rewards', href: '/myprofile/rewards', icon: Award, badgeKey: 'rewards', badgeText: ' pts', badgeColor: 'bg-emerald-50 text-emerald-600' },
    { name: 'Refer & Earn', href: '/myprofile/referral', icon: Users, badgeKey: 'referralEarnings', badgePrefix: '₹', badgeColor: 'bg-amber-50 text-amber-600' },
    { name: 'Account & Security', href: '/myprofile/settings', icon: Settings },
];

export default function DashboardSidebar({ user, pathname }: SidebarProps) {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/consumer/dashboard/stats');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setStats(data.stats);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/consumer/logout', { method: 'POST' });
            router.push('/login');
        } catch (err) {
            console.error('Logout error', err);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Main Profile Nav Card */}
            <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden flex-1 pb-4">
                {/* Profile Header */}
                <div className="p-6 text-center border-b border-gray-50 relative">
                    <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4 border border-slate-200 relative">
                        {user.profilePicture ? (
                            <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <span className="text-2xl font-bold text-slate-700">
                                {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                            </span>
                        )}
                        {/* Verified Badge */}
                        <div className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 truncate">{user.name || 'Trekker'}</h2>
                    <p className="text-sm text-slate-500 truncate mb-4">{user.email}</p>
                    <Link 
                        href="/myprofile/edit"
                        className="inline-block px-4 py-2.5 bg-red-50 text-[#e30613] text-sm font-semibold rounded-xl hover:bg-red-100 transition-colors w-full border border-red-100"
                    >
                        Edit Profile
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {navItems.map((item, idx) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        
                        // Separator above Account & Security
                        const showSeparator = item.name === 'Account & Security';
                        
                        let badgeValue = null;
                        if (stats && item.badgeKey && stats[item.badgeKey] > 0) {
                            badgeValue = `${item.badgePrefix || ''}${stats[item.badgeKey].toLocaleString()}${item.badgeText || ''}`;
                        }

                        return (
                            <React.Fragment key={item.name}>
                                {showSeparator && <div className="my-4 border-t border-gray-100"></div>}
                                <Link 
                                    href={item.href}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all group ${
                                        isActive 
                                        ? 'bg-red-50 text-[#e30613] font-bold' 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#e30613]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                        {item.name}
                                    </div>
                                    
                                    {badgeValue && (
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-100 text-slate-500'}`}>
                                            {badgeValue}
                                        </span>
                                    )}
                                </Link>
                            </React.Fragment>
                        );
                    })}
                    
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-[#e30613] transition-colors mt-2"
                    >
                        <div className="flex items-center gap-3">
                            <LogOut className="w-5 h-5 text-slate-400" />
                            Logout
                        </div>
                    </button>
                </nav>
            </div>

            {/* Basecamp Support Block */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden group cursor-pointer hover:bg-slate-800 transition-colors">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#e30613] animate-pulse"></div>
                        </div>
                        <h3 className="text-sm font-bold">24/7 Basecamp Support</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4 pr-4">
                        Trek leaders on active standby for all ongoing Himalayan batches.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                        Contact Ops Team <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
}
