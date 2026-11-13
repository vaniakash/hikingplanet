'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    CalendarBlank,
    MapPin,
    Clock,
    Mountains,
    ArrowRight,
    WhatsappLogo,
    MagnifyingGlass,
    SlidersHorizontal,
    X,
    Compass,
    CheckCircle,
    ShieldCheck,
    Sparkle
} from '@phosphor-icons/react/dist/ssr';

export interface TrekBatch {
    _id: string;
    startDate: string;
    endDate: string;
    capacity: number;
    seatsBooked: number;
    waitlistCount?: number;
    status: 'open' | 'full' | 'completed' | 'cancelled';
    priceOverride?: number;
    label?: string;
}

export interface UniqueTrekItem {
    _id: string;
    title: string;
    slug: string;
    location?: string;
    description?: string;
    shortDescription?: string;
    difficulty: string;
    duration: number;
    price: number;
    originalPrice?: number;
    elevation?: string;
    images?: string[];
    isFeatured?: boolean;
    isActive?: boolean;
    batches: TrekBatch[];
    batchesCount: number;
    availableSeats: number;
    nextBatch: TrekBatch | null;
    months: string[]; // e.g. ['November 2026', 'December 2026']
}

interface UpcomingTreksListingProps {
    treks: UniqueTrekItem[];
}

function formatDateRange(startIso: string, endIso: string): string {
    const s = new Date(startIso);
    const e = new Date(endIso);
    const sDay = s.getDate();
    const eDay = e.getDate();
    const sMonth = s.toLocaleString('en-IN', { month: 'short' });
    const eMonth = e.toLocaleString('en-IN', { month: 'short' });
    const sYear = s.getFullYear();
    const eYear = e.getFullYear();

    if (sMonth === eMonth && sYear === eYear) {
        return `${sDay} – ${eDay} ${sMonth} ${sYear}`;
    }
    if (sYear === eYear) {
        return `${sDay} ${sMonth} – ${eDay} ${eMonth} ${sYear}`;
    }
    return `${sDay} ${sMonth} ${sYear} – ${eDay} ${eMonth} ${eYear}`;
}

export default function UpcomingTreksListing({ treks }: UpcomingTreksListingProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedDuration, setSelectedDuration] = useState('all');

    // Extract all unique months that have batches across all treks
    const availableMonths = useMemo(() => {
        const monthMap = new Map<string, number>();
        treks.forEach(trek => {
            trek.batches.forEach(batch => {
                const date = new Date(batch.startDate);
                const key = date.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
                monthMap.set(key, (monthMap.get(key) || 0) + 1);
            });
        });
        return Array.from(monthMap.entries()).map(([month, count]) => ({ month, count }));
    }, [treks]);

    // Filter unique treks
    const filteredTreks = useMemo(() => {
        return treks.filter(trek => {
            // 1. Text Search (title, location, description)
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                const matchTitle = trek.title.toLowerCase().includes(q);
                const matchLoc = (trek.location || '').toLowerCase().includes(q);
                const matchDesc = (trek.description || '').toLowerCase().includes(q);
                if (!matchTitle && !matchLoc && !matchDesc) {
                    return false;
                }
            }

            // 2. Month Filter: trek must have at least one batch in the selected month
            if (selectedMonth !== 'all') {
                const hasBatchInMonth = trek.batches.some(batch => {
                    const date = new Date(batch.startDate);
                    const key = date.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
                    return key === selectedMonth;
                });
                if (!hasBatchInMonth) {
                    return false;
                }
            }

            // 3. Difficulty Filter
            if (selectedDifficulty !== 'all') {
                if (trek.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
                    return false;
                }
            }

            // 4. Duration Filter
            if (selectedDuration !== 'all') {
                if (selectedDuration === 'short' && trek.duration > 4) return false;
                if (selectedDuration === 'medium' && (trek.duration < 5 || trek.duration > 7)) return false;
                if (selectedDuration === 'long' && trek.duration < 8) return false;
            }

            return true;
        });
    }, [treks, searchQuery, selectedMonth, selectedDifficulty, selectedDuration]);

    const isFiltered = searchQuery.trim() !== '' || selectedMonth !== 'all' || selectedDifficulty !== 'all' || selectedDuration !== 'all';

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedMonth('all');
        setSelectedDifficulty('all');
        setSelectedDuration('all');
    };

    // Calculate total confirmed batches across filtered treks
    const totalFilteredBatches = useMemo(() => {
        return filteredTreks.reduce((acc, t) => acc + t.batchesCount, 0);
    }, [filteredTreks]);

    return (
        <div className="bg-[#fcfaf8] min-h-screen text-slate-900 font-sans pb-24">
            
            {/* ── 1. Hero Header ── */}
            <section className="relative bg-slate-950 text-white pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background mountain overlay */}
                <div className="absolute inset-0 z-0 opacity-25">
                    <Image
                        src="https://images.unsplash.com/photo-1518098268026-4e1877a1c7d0?w=1600&q=80"
                        alt="Himalayan mountain trails"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    {/* Top Pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkle size={14} weight="fill" />
                        <span>Curated Himalayan Expeditions · 2026</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 font-serif">
                        Explore Upcoming Treks
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                        Choose your trek from our verified Himalayan itineraries. Each trek features live batch schedules, real-time availability, and direct booking support.
                    </p>

                    {/* Trust Signals Bar */}
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300 font-bold uppercase tracking-wider pt-4 border-t border-white/10 max-w-3xl mx-auto">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={18} weight="fill" className="text-emerald-400" />
                            <span>{treks.length} Unique Himalayan Treks</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarBlank size={18} weight="fill" className="text-red-400" />
                            <span>Confirmed Batch Dates</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={18} weight="fill" className="text-blue-400" />
                            <span>Certified Mountain Guides</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. Sticky / Prominent Filter Bar ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200/80 p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
                        
                        {/* Search Input */}
                        <div className="relative">
                            <MagnifyingGlass size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" weight="bold" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by trek name or region..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Month Filter */}
                        <div className="relative">
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all cursor-pointer"
                            >
                                <option value="all">📅 All Departure Months</option>
                                {availableMonths.map(({ month, count }) => (
                                    <option key={month} value={month}>
                                        {month} ({count} batches)
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Difficulty Filter */}
                        <div className="relative">
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all cursor-pointer"
                            >
                                <option value="all">⛰️ All Difficulties</option>
                                <option value="Easy">Easy (Beginner Friendly)</option>
                                <option value="Moderate">Moderate (First Himalayan Trail)</option>
                                <option value="Difficult">Difficult (High Altitude Summit)</option>
                            </select>
                        </div>

                        {/* Duration Filter */}
                        <div className="relative">
                            <select
                                value={selectedDuration}
                                onChange={(e) => setSelectedDuration(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all cursor-pointer"
                            >
                                <option value="all">⏱️ All Durations</option>
                                <option value="short">Short (1 – 4 Days)</option>
                                <option value="medium">Classic (5 – 7 Days)</option>
                                <option value="long">Expedition (8+ Days)</option>
                            </select>
                        </div>

                    </div>

                    {/* Active Filters Info Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100 text-xs">
                        <div className="text-slate-600 font-medium flex items-center gap-2">
                            <span>Showing <strong className="text-slate-900 font-bold">{filteredTreks.length}</strong> unique treks</span>
                            {totalFilteredBatches > 0 && (
                                <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                                    {totalFilteredBatches} upcoming batches open
                                </span>
                            )}
                        </div>

                        {isFiltered && (
                            <button
                                onClick={handleClearFilters}
                                className="inline-flex items-center gap-1.5 text-[#e30613] hover:text-red-800 font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                                <X size={14} weight="bold" />
                                Clear All Filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── 3. Treks Grid (Strictly One Card Per Unique Trek) ── */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                {filteredTreks.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-xl mx-auto shadow-sm">
                        <div className="w-16 h-16 rounded-full bg-red-50 text-[#e30613] flex items-center justify-center mx-auto mb-4">
                            <Compass size={32} weight="duotone" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No Treks Match Your Selection</h3>
                        <p className="text-sm text-slate-500 mb-6">
                            We couldn&apos;t find any treks matching your current filters. Try resetting the filters or message us directly on WhatsApp to check upcoming schedules.
                        </p>
                        <button
                            onClick={handleClearFilters}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors cursor-pointer"
                        >
                            Reset All Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTreks.map(trek => {
                            const durationDays = trek.duration || 6;
                            const durationNights = Math.max(1, durationDays - 1);
                            const imageSrc = trek.images?.[0] || 'https://images.unsplash.com/photo-1518098268026-4e1877a1c7d0?w=800&q=80';
                            
                            // Batch status computation
                            const hasBatches = trek.batchesCount > 0 && trek.nextBatch !== null;
                            const nextBatchRange = hasBatches
                                ? formatDateRange(trek.nextBatch!.startDate, trek.nextBatch!.endDate)
                                : null;

                            return (
                                <article
                                    key={trek._id}
                                    className="bg-white rounded-2xl border border-gray-200/90 hover:border-red-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                                >
                                    {/* ── Top Cover Image ── */}
                                    <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                                        <Image
                                            src={imageSrc}
                                            alt={trek.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                        {/* Top Left: Journey Length */}
                                        <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                                            <Clock size={12} weight="bold" />
                                            <span>{durationDays} Days · {durationNights} Nights</span>
                                        </div>

                                        {/* Top Right: Batches Status Badge */}
                                        <div className="absolute top-3.5 right-3.5">
                                            {hasBatches ? (
                                                <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                                    {trek.batchesCount} {trek.batchesCount === 1 ? 'Batch' : 'Batches'} Available
                                                </span>
                                            ) : (
                                                <span className="bg-slate-900/80 backdrop-blur-sm text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10">
                                                    Custom Dates
                                                </span>
                                            )}
                                        </div>

                                        {/* Bottom on Image: Difficulty & Max Altitude */}
                                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                                            <span className="font-bold bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded border border-white/20 uppercase tracking-wider">
                                                {trek.difficulty}
                                            </span>
                                            {trek.elevation && (
                                                <span className="font-bold flex items-center gap-1 drop-shadow-md text-white/90">
                                                    <Mountains size={14} weight="fill" className="text-amber-400" />
                                                    {trek.elevation}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* ── Content Body ── */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        
                                        {/* Title & Location */}
                                        <div className="mb-4">
                                            <Link href={`/treks/${trek.slug}`} className="hover:text-[#e30613] transition-colors">
                                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                                                    {trek.title}
                                                </h2>
                                            </Link>
                                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1.5">
                                                <MapPin size={14} weight="fill" className="text-[#e30613] flex-shrink-0" />
                                                <span className="truncate">{trek.location || 'Garhwal Himalayas, Uttarakhand'}</span>
                                            </p>
                                        </div>

                                        {/* Short description */}
                                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-5">
                                            {trek.shortDescription || trek.description || 'Experience high alpine meadows, pristine mountain streams, and majestic summit views on this authentic Himalayan journey.'}
                                        </p>

                                        {/* ── Batch Information Summary Box ── */}
                                        <div className="mt-auto mb-6">
                                            {hasBatches ? (
                                                <div className="bg-red-50/70 border border-red-100 rounded-xl p-3.5">
                                                    <div className="flex items-center justify-between text-[11px] font-bold text-[#e30613] mb-1">
                                                        <span className="flex items-center gap-1.5 uppercase tracking-wider">
                                                            <CalendarBlank size={13} weight="bold" />
                                                            Upcoming Schedule
                                                        </span>
                                                        <span className="text-[10px] bg-white px-2 py-0.5 rounded font-extrabold text-slate-800 border border-red-200">
                                                            {trek.batchesCount} Batches Open
                                                        </span>
                                                    </div>
                                                    <p className="text-sm font-black text-slate-900">
                                                        Next: {nextBatchRange}
                                                    </p>
                                                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-1">
                                                        <span>{trek.availableSeats} total spots open</span>
                                                        <span className="text-emerald-700 font-bold">Booking Open</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-600">
                                                    <div className="flex items-center gap-1.5 text-slate-800 font-bold mb-0.5">
                                                        <CalendarBlank size={13} weight="bold" className="text-slate-500" />
                                                        <span>Dates on Request</span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-500">
                                                        We arrange flexible batch dates for private groups of 2+ trekkers.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* ── Price & Actions ── */}
                                        <div className="pt-4 border-t border-slate-100">
                                            <div className="flex items-baseline justify-between mb-3.5">
                                                <div>
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Starting At</span>
                                                    <div className="flex items-baseline gap-1.5">
                                                        <span className="text-2xl font-black text-slate-900">
                                                            ₹{trek.price?.toLocaleString('en-IN') || '9,500'}
                                                        </span>
                                                        {trek.originalPrice && trek.originalPrice > trek.price && (
                                                            <span className="text-xs text-slate-400 line-through font-semibold">
                                                                ₹{trek.originalPrice.toLocaleString('en-IN')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                                                    All Inclusions Covered
                                                </span>
                                            </div>

                                            {/* Button Grid */}
                                            <div className="flex items-center gap-2">
                                                {/* Main Button: View Available Batches */}
                                                <Link
                                                    href={`/treks/${trek.slug}#batches`}
                                                    className="flex-1 bg-[#e30613] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 text-center cursor-pointer"
                                                >
                                                    <span>View Available Batches</span>
                                                    <ArrowRight size={13} weight="bold" />
                                                </Link>

                                                {/* WhatsApp Inquiry Icon */}
                                                <a
                                                    href={`https://wa.me/918556043708?text=${encodeURIComponent(`Hi! I am interested in the ${trek.title} trek. Could you please share the available upcoming batch dates?`)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-11 h-11 flex items-center justify-center bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl transition-colors shadow-sm flex-shrink-0 cursor-pointer"
                                                    title={`Ask about ${trek.title} on WhatsApp`}
                                                    aria-label="WhatsApp inquiry"
                                                >
                                                    <WhatsappLogo size={22} weight="fill" />
                                                </a>
                                            </div>
                                        </div>

                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* ── 4. Bottom Support Callout ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="relative z-10 max-w-xl text-center md:text-left">
                        <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest block mb-2">
                            Personalized Group Expeditions
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Looking for a Custom Batch or Private Departure?
                        </h3>
                        <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                            If your preferred dates aren&apos;t listed above, our Uttarkashi operations team can organize customized departures for families, photography groups, and corporate retreats.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
                        <a
                            href="https://wa.me/918556043708?text=Hi%20HikingPlanet%2C%20I%20would%20like%20to%20plan%20a%20custom%20Himalayan%20trek%20for%20my%20group."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-7 py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors shadow-lg cursor-pointer"
                        >
                            <WhatsappLogo size={20} weight="fill" />
                            <span>WhatsApp Our Team</span>
                        </a>
                        <Link
                            href="/contact#contact-form"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors text-center cursor-pointer"
                        >
                            <span>Send Custom Request</span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

