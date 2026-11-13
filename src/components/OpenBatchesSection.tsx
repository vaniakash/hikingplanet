'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    CalendarBlank,
    MapPin,
    Users,
    ArrowRight,
    WhatsappLogo,
    Clock,
    Sparkle,
    CheckCircle,
    SlidersHorizontal,
    Compass
} from '@phosphor-icons/react/dist/ssr';

export interface OpenBatchItem {
    _id: string;
    startDate: string;
    endDate: string;
    capacity: number;
    seatsBooked: number;
    waitlistCount?: number;
    status: 'open' | 'full' | 'completed' | 'cancelled';
    priceOverride?: number;
    label?: string;
    trek: {
        _id: string;
        title: string;
        slug: string;
        location?: string;
        difficulty?: string;
        duration?: number;
        price?: number;
        originalPrice?: number;
        images?: string[];
        elevation?: string;
    };
}

interface OpenBatchesSectionProps {
    initialTrips?: OpenBatchItem[];
}

function formatBatchDates(startStr: string, endStr: string) {
    const start = new Date(startStr);
    const end = new Date(endStr);

    const startDay = start.toLocaleDateString('en-IN', { day: 'numeric' });
    const startMonth = start.toLocaleDateString('en-IN', { month: 'short' });
    const startYear = start.toLocaleDateString('en-IN', { year: 'numeric' });
    const startWeekday = start.toLocaleDateString('en-IN', { weekday: 'short' });

    const endDay = end.toLocaleDateString('en-IN', { day: 'numeric' });
    const endMonth = end.toLocaleDateString('en-IN', { month: 'short' });
    const endYear = end.toLocaleDateString('en-IN', { year: 'numeric' });
    const endWeekday = end.toLocaleDateString('en-IN', { weekday: 'short' });

    let range = `${startDay} – ${endDay} ${startMonth} ${startYear}`;
    if (startMonth !== endMonth) {
        range = `${startDay} ${startMonth} – ${endDay} ${endMonth} ${startYear}`;
    }
    if (startYear !== endYear) {
        range = `${startDay} ${startMonth} ${startYear} – ${endDay} ${endMonth} ${endYear}`;
    }

    return {
        range,
        days: `${startWeekday} to ${endWeekday}`,
        monthKey: `${startMonth} ${startYear}`,
    };
}

export default function OpenBatchesSection({ initialTrips = [] }: OpenBatchesSectionProps) {
    const [selectedTrek, setSelectedTrek] = useState<string>('all');
    const [selectedMonth, setSelectedMonth] = useState<string>('all');

    // Extract unique treks
    const uniqueTreks = useMemo(() => {
        const map = new Map<string, string>();
        initialTrips.forEach(t => {
            if (t.trek?.slug && t.trek?.title) {
                map.set(t.trek.slug, t.trek.title);
            }
        });
        return Array.from(map.entries()).map(([slug, title]) => ({ slug, title }));
    }, [initialTrips]);

    // Extract unique months
    const uniqueMonths = useMemo(() => {
        const set = new Set<string>();
        initialTrips.forEach(t => {
            const { monthKey } = formatBatchDates(t.startDate, t.endDate);
            set.add(monthKey);
        });
        return Array.from(set);
    }, [initialTrips]);

    // Filtered batches
    const filteredTrips = useMemo(() => {
        return initialTrips.filter(t => {
            if (selectedTrek !== 'all' && t.trek?.slug !== selectedTrek) {
                return false;
            }
            if (selectedMonth !== 'all') {
                const { monthKey } = formatBatchDates(t.startDate, t.endDate);
                if (monthKey !== selectedMonth) {
                    return false;
                }
            }
            return true;
        });
    }, [initialTrips, selectedTrek, selectedMonth]);

    if (initialTrips.length === 0) {
        return null; // Don't render empty section if no upcoming open batches exist
    }

    return (
        <section id="open-batches" className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200/80 select-none overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* ── Section Header ── */}
                <div className="flex flex-col items-center justify-center text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live Departures · Confirmed Dates
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Upcoming Open Batches
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-medium mt-3 max-w-2xl text-center leading-relaxed">
                        Explore confirmed departures with open availability. Pick your dates and lock in your trek with our certified local Himalayan leaders.
                    </p>
                    <div className="w-12 h-1 bg-[#e30613] mt-4 rounded-full" />
                </div>

                {/* ── Interactive Filters ── */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* Trek selector pills */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 flex-shrink-0 mr-1">
                            <SlidersHorizontal size={14} weight="bold" />
                            Trek:
                        </span>
                        <button
                            type="button"
                            onClick={() => setSelectedTrek('all')}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                                selectedTrek === 'all'
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            All ({initialTrips.length})
                        </button>
                        {uniqueTreks.map(t => (
                            <button
                                key={t.slug}
                                type="button"
                                onClick={() => setSelectedTrek(t.slug)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                                    selectedTrek === t.slug
                                        ? 'bg-[#e30613] text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                {t.title}
                            </button>
                        ))}
                    </div>

                    {/* Month selector pills */}
                    {uniqueMonths.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0 self-start md:self-auto">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 flex-shrink-0 mr-1">
                                <CalendarBlank size={14} weight="bold" />
                                Month:
                            </span>
                            <button
                                type="button"
                                onClick={() => setSelectedMonth('all')}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                                    selectedMonth === 'all'
                                        ? 'bg-slate-900 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                All Months
                            </button>
                            {uniqueMonths.map(m => (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => setSelectedMonth(m)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                                        selectedMonth === m
                                            ? 'bg-slate-900 text-white shadow-sm'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Open Batches Cards Grid ── */}
                {filteredTrips.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 p-8">
                        <Compass size={40} className="text-slate-300 mx-auto mb-3" weight="duotone" />
                        <h4 className="text-lg font-bold text-slate-800">No open batches match this filter</h4>
                        <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                            Try resetting your filters or message our team to request custom departure dates.
                        </p>
                        <button
                            type="button"
                            onClick={() => { setSelectedTrek('all'); setSelectedMonth('all'); }}
                            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTrips.map(trip => {
                            const { range, days } = formatBatchDates(trip.startDate, trip.endDate);
                            const trek = trip.trek;
                            const capacity = trip.capacity || 15;
                            const seatsBooked = trip.seatsBooked || 0;
                            const spotsLeft = Math.max(0, capacity - seatsBooked);
                            const fillPercent = Math.min(100, Math.round((seatsBooked / capacity) * 100));
                            const finalPrice = trip.priceOverride || trek.price || 9500;
                            const durationDays = trek.duration || 6;
                            const durationNights = Math.max(1, durationDays - 1);
                            const imageSrc = trek.images?.[0] || 'https://images.unsplash.com/photo-1518098268026-4e1877a1c7d0?w=800&q=80';

                            // WhatsApp prefilled link
                            const waText = `Hi HikingPlanet! I am interested in booking the *${trek.title}* batch (*${range}*). Could you please share the batch details?`;
                            const waLink = `https://wa.me/918556043708?text=${encodeURIComponent(waText)}`;

                            return (
                                <div
                                    key={trip._id}
                                    className="bg-white rounded-2xl border border-gray-200 hover:border-red-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                                >
                                    {/* ── Image Header ── */}
                                    <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                                        <Image
                                            src={imageSrc}
                                            alt={trek.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        {/* Top Left: Duration Badge */}
                                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                                            <Clock size={12} weight="bold" />
                                            <span>{durationDays}D / {durationNights}N</span>
                                        </div>

                                        {/* Top Right: Status / Label Badge */}
                                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                                            {trip.label ? (
                                                <span className="bg-[#e30613] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                                                    {trip.label}
                                                </span>
                                            ) : (
                                                <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                                    Open
                                                </span>
                                            )}
                                        </div>

                                        {/* Bottom Left of Image: Difficulty & Location */}
                                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                                            <span className="text-[11px] font-bold bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20 uppercase tracking-wider">
                                                {trek.difficulty || 'Easy - Moderate'}
                                            </span>
                                            {trek.elevation && (
                                                <span className="text-[11px] font-extrabold text-white/90">
                                                    {trek.elevation}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* ── Body Content ── */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        
                                        {/* Trek Title */}
                                        <div className="mb-3">
                                            <Link href={`/treks/${trek.slug}`} className="hover:text-[#e30613] transition-colors">
                                                <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                                                    {trek.title}
                                                </h3>
                                            </Link>
                                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                                                <MapPin size={13} weight="fill" className="text-[#e30613] flex-shrink-0" />
                                                <span className="truncate">{trek.location || 'Uttarkashi, Uttarakhand'}</span>
                                            </p>
                                        </div>

                                        {/* ── Highlighted Batch Date Card ── */}
                                        <div className="bg-red-50/60 border border-red-100 rounded-xl p-3 mb-4">
                                            <div className="flex items-center gap-2 text-[#e30613] text-[11px] font-bold uppercase tracking-wider mb-1">
                                                <CalendarBlank size={14} weight="bold" />
                                                <span>Confirmed Batch Dates</span>
                                            </div>
                                            <p className="text-sm font-extrabold text-slate-900">
                                                {range}
                                            </p>
                                            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                                {days} · Round trip from Dehradun
                                            </p>
                                        </div>

                                        {/* ── Seat Availability & Progress ── */}
                                        <div className="mb-5 space-y-1.5">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-slate-500 font-semibold flex items-center gap-1">
                                                    <Users size={13} weight="bold" />
                                                    Availability
                                                </span>
                                                <span className={`font-black ${spotsLeft <= 4 ? 'text-amber-600' : 'text-emerald-700'}`}>
                                                    {spotsLeft} of {capacity} seats open
                                                </span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${
                                                        spotsLeft <= 4 ? 'bg-amber-500' : 'bg-emerald-500'
                                                    }`}
                                                    style={{ width: `${Math.max(12, 100 - fillPercent)}%` }}
                                                />
                                            </div>
                                            {spotsLeft <= 4 && (
                                                <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider flex items-center gap-1 pt-0.5">
                                                    🔥 Filling fast — Reserve your spot soon
                                                </p>
                                            )}
                                        </div>

                                        {/* ── Price & Action Footer ── */}
                                        <div className="mt-auto pt-4 border-t border-slate-100">
                                            <div className="flex items-baseline justify-between mb-3">
                                                <div>
                                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mr-1">Trek Fee</span>
                                                    <span className="text-xl font-black text-slate-900">
                                                        ₹{finalPrice.toLocaleString('en-IN')}
                                                    </span>
                                                    {trek.originalPrice && trek.originalPrice > finalPrice && (
                                                        <span className="text-xs text-slate-400 line-through ml-1.5 font-bold">
                                                            ₹{trek.originalPrice.toLocaleString('en-IN')}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                                    Inclusive of Meals & Guides
                                                </span>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-stretch gap-2">
                                                {/* Direct Book Button */}
                                                <Link
                                                    href={`/book/${trip._id}`}
                                                    className="flex-1 bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 text-center cursor-pointer"
                                                >
                                                    <span>Book Batch</span>
                                                    <ArrowRight size={13} weight="bold" />
                                                </Link>

                                                {/* Trek Detail Button */}
                                                <Link
                                                    href={`/treks/${trek.slug}`}
                                                    className="px-3 py-3 border border-gray-200 hover:border-gray-300 text-slate-700 hover:text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors text-center flex items-center justify-center cursor-pointer"
                                                    title="View Full Itinerary"
                                                >
                                                    Details
                                                </Link>

                                                {/* WhatsApp Quick Link */}
                                                <a
                                                    href={waLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-11 flex items-center justify-center bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl transition-colors shadow-sm flex-shrink-0 cursor-pointer"
                                                    title="Inquire on WhatsApp"
                                                    aria-label="Inquire about this batch on WhatsApp"
                                                >
                                                    <WhatsappLogo size={20} weight="fill" />
                                                </a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ── Custom Dates / Private Batch Banner ── */}
                <div className="mt-14 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative z-10 max-w-xl text-center md:text-left">
                        <div className="inline-flex items-center gap-1.5 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Sparkle size={14} weight="fill" />
                            Custom & Private Expeditions
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Need Custom Dates for Your Group?
                        </h3>
                        <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                            Planning for a family group, trekking club, or corporate retreat? We organize customized Himalayan batches on your dates with personalized gear support and verified local guides.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
                        <a
                            href="https://wa.me/918556043708?text=Hi%20HikingPlanet%2C%20I%20am%20looking%20for%20custom%20batch%20dates%20for%20my%20group.%20Can%20you%20help%3F"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors shadow-md cursor-pointer"
                        >
                            <WhatsappLogo size={18} weight="fill" />
                            <span>Plan Custom Dates</span>
                        </a>
                        <Link
                            href="/contact#contact-form"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors text-center cursor-pointer"
                        >
                            <span>Send Enquiry</span>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}

