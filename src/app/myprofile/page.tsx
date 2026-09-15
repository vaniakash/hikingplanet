'use client';

import React, { useEffect, useState } from 'react';
import { useDashboard } from './layout';
import { 
    CheckCircle2, 
    Calendar, 
    Heart, 
    Star, 
    Loader2, 
    BookOpen, 
    Search,
    MapPin,
    Clock,
    UserCircle,
    CheckCircle,
    CircleDashed,
    FileText,
    MessageCircle,
    CloudSnow,
    Thermometer,
    ShoppingBag
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function DashboardHome() {
    const { user } = useDashboard();
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/consumer/dashboard/stats');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setDashboardData(data);
                    }
                }
            } catch (err) {
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
            </div>
        );
    }

    const stats = dashboardData?.stats || {};
    const nextTrek = dashboardData?.nextUpcomingBooking;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Welcome back, {user.name || 'Trekker'}!</h1>
                    <p className="text-slate-500 mt-2 text-base">Here is an overview of your trekking journey.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white border border-gray-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
                        <BookOpen className="w-5 h-5 text-slate-400" /> Trek Logbook
                    </button>
                    <Link href="/upcoming-treks" className="px-5 py-2.5 bg-[#e30613] text-white font-bold rounded-2xl hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm">
                        <Search className="w-5 h-5" /> Explore Treks
                    </Link>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Completed */}
                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex items-start gap-5">
                    <div className="w-14 h-14 bg-[#f0fdf4] rounded-[16px] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-7 h-7 text-[#10b981]" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 leading-tight">TREKS<br/>COMPLETED</p>
                        <p className="text-4xl font-bold text-slate-900 leading-none mb-3">{stats.completedTreks || 0}</p>
                        <p className="text-xs font-bold text-[#10b981]">+2 this year</p>
                    </div>
                </div>

                {/* Upcoming */}
                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex items-start gap-5">
                    <div className="w-14 h-14 bg-[#eff6ff] rounded-[16px] flex items-center justify-center shrink-0">
                        <Calendar className="w-7 h-7 text-[#3b82f6]" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 leading-tight">UPCOMING<br/>TREKS</p>
                        <p className="text-4xl font-bold text-slate-900 leading-none mb-3">{stats.upcomingTreks || 0}</p>
                        <p className="text-xs font-bold text-[#3b82f6]">Departing in<br/>12 days</p>
                    </div>
                </div>

                {/* Saved */}
                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex items-start gap-5">
                    <div className="w-14 h-14 bg-[#fdf2f8] rounded-[16px] flex items-center justify-center shrink-0">
                        <Heart className="w-7 h-7 text-[#ec4899]" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 leading-tight">SAVED<br/>TREKS</p>
                        <p className="text-4xl font-bold text-slate-900 leading-none mb-3">{stats.savedTreks || 0}</p>
                        <p className="text-xs font-bold text-[#e30613]">3 on promo</p>
                    </div>
                </div>

                {/* Reviews */}
                <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 flex items-start gap-5">
                    <div className="w-14 h-14 bg-[#fffbeb] rounded-[16px] flex items-center justify-center shrink-0">
                        <Star className="w-7 h-7 text-[#f59e0b]" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 leading-tight">REVIEWS</p>
                        <p className="text-4xl font-bold text-slate-900 leading-none mb-3">{stats.reviews || 0}</p>
                        <p className="text-xs font-bold text-[#f59e0b]">4.9 ★ Rating</p>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider shrink-0">QUICK LINKS</h2>
                <div className="flex gap-3 flex-wrap w-full">
                    <Link href="/upcoming-treks" className="px-6 py-2.5 bg-[#e30613] text-white text-sm font-bold rounded-2xl hover:bg-red-700 transition-colors shadow-sm">
                        Explore Treks
                    </Link>
                    <Link href="/myprofile/bookings" className="px-6 py-2.5 bg-white border border-gray-200 text-slate-700 text-sm font-bold rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
                        View Bookings
                    </Link>
                    <Link href="/myprofile/medical" className="px-6 py-2.5 bg-white border border-gray-200 text-slate-700 text-sm font-bold rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
                        Medical & Fitness Info
                    </Link>
                </div>
            </div>

            {/* Upcoming Expedition Card */}
            {nextTrek && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="inline-block px-2.5 py-1 bg-red-50 text-[#e30613] text-xs font-bold rounded-md mb-2">
                                • Upcoming Expedition
                            </span>
                            <h2 className="text-2xl font-black text-slate-900">{nextTrek.trek?.title || 'Kedarkantha Winter Summit Trek'}</h2>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-sm font-medium text-slate-500 mb-1">Booking ID: #HKP-{nextTrek._id?.slice(-5).toUpperCase()}</p>
                            <p className="text-sm font-bold text-emerald-600">Slot Confirmed • {nextTrek.participants?.length || 2} Trekkers</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                        {/* Left Side: Image & Details */}
                        <div className="lg:col-span-2 p-6 border-r border-gray-100">
                            <div className="relative h-64 rounded-xl overflow-hidden mb-6 bg-slate-900 group">
                                {nextTrek.trek?.images?.[0] ? (
                                    <img 
                                        src={nextTrek.trek.images[0]} 
                                        alt={nextTrek.trek.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                                        {/* Mockup shapes */}
                                        <div className="flex items-end gap-2 text-white/10 pb-10">
                                            <div className="w-32 h-32 bg-white/20" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                                            <div className="w-48 h-48 bg-white/20" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                                        </div>
                                        <div className="absolute top-8 right-8 w-16 h-16 bg-slate-300 rounded-full opacity-80 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>
                                    </div>
                                )}
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                
                                <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                    <div>
                                        <p className="text-red-400 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {nextTrek.trek?.location || 'SANKRI, UTTARAKHAND'}
                                        </p>
                                        <h3 className="text-white font-bold text-lg">
                                            Altitude: {nextTrek.trek?.elevation || '12,500 ft'} • {nextTrek.trek?.duration || 6} Days
                                        </h3>
                                    </div>
                                    <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg">
                                        <p className="text-white font-bold text-sm">
                                            {nextTrek.trip?.startDate ? format(new Date(nextTrek.trip.startDate), 'MMM dd') : 'Dec 22'} – {nextTrek.trip?.endDate ? format(new Date(nextTrek.trip.endDate), 'MMM dd, yyyy') : 'Dec 27, 2025'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 3 Pills */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Difficulty</p>
                                    <p className="text-sm font-black text-slate-900">{nextTrek.trek?.difficulty || 'Moderate'}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Assembly Point</p>
                                    <p className="text-sm font-black text-slate-900">Dehradun Rly Stn</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Trek Leader</p>
                                    <p className="text-sm font-black text-slate-900">Tenzing N. (Certified)</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Readiness & Actions */}
                        <div className="p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-slate-900">Pre-Trek Readiness</h3>
                                    <span className="text-sm font-bold text-[#e30613]">75% Complete</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                                    <div className="w-3/4 h-full bg-[#e30613] rounded-full"></div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex gap-3 items-start">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium text-slate-700">Medical Disclaimer Signed</p>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium text-slate-700">Government ID Verification Approved</p>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <CircleDashed className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium text-slate-700">Rental Gear: Crampons & Poles (Pending Pickup)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full py-3 bg-[#e30613] text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm shadow-red-200">
                                    View Complete Itinerary & Voucher
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-2.5 bg-white border border-gray-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                        <FileText className="w-4 h-4" /> Packing Checklist
                                    </button>
                                    <button className="py-2.5 bg-white border border-gray-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                        <MessageCircle className="w-4 h-4" /> WhatsApp Group
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Row Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Trek Activity */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900 text-lg">Recent Trek Activity</h3>
                        <button className="text-sm font-bold text-[#e30613] hover:underline">View all</button>
                    </div>

                    <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                        
                        {/* Timeline Item 1 */}
                        <div className="relative flex items-start group">
                            <div className="absolute left-[-28px] w-3 h-3 bg-[#e30613] rounded-full border-4 border-white shadow-sm mt-1.5 z-10"></div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Voucher Issued for Kedarkantha Winter Trek</h4>
                                <p className="text-slate-500 text-sm mt-1">Booking confirmed with pickup at Dehradun 06:30 AM.</p>
                                <span className="text-xs text-slate-400 font-medium block mt-2">Yesterday at 4:32 PM</span>
                            </div>
                        </div>

                        {/* Timeline Item 2 */}
                        <div className="relative flex items-start group">
                            <div className="absolute left-[-28px] w-3 h-3 bg-emerald-500 rounded-full border-4 border-white shadow-sm mt-1.5 z-10"></div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Earned 500 Summit Points for Hampta Pass Review</h4>
                                <p className="text-slate-500 text-sm mt-1">Your review was upvoted by 14 fellow mountaineers.</p>
                                <span className="text-xs text-slate-400 font-medium block mt-2">Oct 14, 2025</span>
                            </div>
                        </div>

                        {/* Timeline Item 3 */}
                        <div className="relative flex items-start group">
                            <div className="absolute left-[-28px] w-3 h-3 bg-slate-300 rounded-full border-4 border-white shadow-sm mt-1.5 z-10"></div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Added Rupin Pass to Wishlist</h4>
                                <p className="text-slate-500 text-sm mt-1">Set price drop alert for May 2026 batches.</p>
                                <span className="text-xs text-slate-400 font-medium block mt-2">Sep 28, 2025</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Column: Weather & Ad */}
                <div className="space-y-6">
                    {/* Live Weather Widget */}
                    <div className="bg-[#1e2330] p-6 rounded-2xl shadow-sm text-white overflow-hidden relative">
                        {/* Background subtle elements */}
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <CloudSnow className="w-32 h-32 text-white" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Trail Live Weather</span>
                                </div>
                                <span className="text-sm font-medium text-slate-400">Sankri Basecamp</span>
                            </div>

                            <div className="flex items-end justify-between mb-4">
                                <div>
                                    <h2 className="text-5xl font-black mb-1">4°C</h2>
                                    <p className="text-sm text-slate-300">Clear skies • Night low -3°C</p>
                                </div>
                                <div className="w-12 h-12 bg-amber-400 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)]"></div>
                            </div>

                            <div className="pt-4 border-t border-slate-700/50">
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Snow condition: Fresh powdery snow above 10,000 ft. Microspikes recommended for final ascent.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Gear Store Banner */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                            <ShoppingBag className="w-6 h-6 text-[#e30613]" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-sm">HikingPlanet Gear Store</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Rent high-altitude jackets, shoes & poles</p>
                        </div>
                        <button className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors shrink-0">
                            Rentals
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
