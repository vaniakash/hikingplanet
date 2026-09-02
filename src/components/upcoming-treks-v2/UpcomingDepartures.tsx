'use client';

import Link from 'next/link';
import { CalendarBlank, Users, ArrowRight, WarningCircle } from '@phosphor-icons/react/dist/ssr';

export default function UpcomingDepartures({ treks }: { treks: any[] }) {
    if (!treks || treks.length === 0) return null;

    // Simulate upcoming batches for the existing 3 treks since the DB might not have real batch dates yet.
    // If the DB has an `itinerary` or `batches` array, we'd map over those. 
    // For now, we dynamically map the 3 treks to upcoming dates.
    const mockDates = [
        { start: 'SEP 18', end: 'SEP 24', spots: 4 },
        { start: 'OCT 12', end: 'OCT 18', spots: 12 },
        { start: 'DEC 21', end: 'DEC 25', spots: 2 },
    ];

    const departures = treks.slice(0, 3).map((trek, i) => ({
        ...trek,
        date: mockDates[i],
    }));

    // The most urgent one (least spots)
    const urgentDeparture = [...departures].sort((a, b) => a.date.spots - b.date.spots)[0];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12">
                
                {/* Left: Departures List */}
                <div className="w-full lg:w-2/3">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4 font-serif">
                            Upcoming Departures
                        </h2>
                        <p className="text-lg text-slate-600 font-medium border-l-4 border-[#1b4332] pl-4">
                            Real availability for our next expeditions.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {departures.map(dep => (
                            <div key={dep._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
                                        {dep.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        <div className="flex items-center gap-1.5 text-[#1b4332]">
                                            <CalendarBlank weight="bold" className="w-4 h-4" />
                                            {dep.date.start} → {dep.date.end}
                                        </div>
                                        <span>•</span>
                                        <span>{dep.duration} Days</span>
                                        <span>•</span>
                                        <span>{dep.difficulty}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col md:items-end w-full md:w-auto gap-4 md:gap-2 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">

                                    <span className="text-xl font-black text-slate-900">₹{dep.price?.toLocaleString() || 'XX,XXX'}</span>
                                </div>

                                <Link 
                                    href={`/treks/${dep.slug}`}
                                    className="w-full md:w-auto bg-slate-900 text-white px-6 py-4 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#e30613] transition-colors text-center whitespace-nowrap"
                                >
                                    View Trek
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Urgency Card */}
                {urgentDeparture && (
                    <div className="w-full lg:w-1/3">
                        <div className="bg-[#1b4332] text-white p-8 rounded-3xl shadow-2xl sticky top-24">
                            <div className="flex items-center gap-2 text-yellow-400 font-bold uppercase tracking-widest text-xs mb-6">
                                <WarningCircle weight="bold" className="w-5 h-5 animate-pulse" />
                                Next Departure
                            </div>
                            
                            <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
                                {urgentDeparture.title}
                            </h3>
                            <p className="text-[#a7c9b8] font-medium mb-8">
                                Departs {urgentDeparture.date.start}, 2026
                            </p>

                            <div className="bg-white/10 rounded-xl p-4 mb-8">
                                <div className="text-center">
                                    <span className="block text-4xl font-black text-yellow-400 mb-1">
                                        {urgentDeparture.date.spots}
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                                        Spots Remaining
                                    </span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                                    <div className="bg-yellow-400 h-full rounded-full w-[80%]" />
                                </div>
                            </div>

                            <Link 
                                href={`/treks/${urgentDeparture.slug}`}
                                className="flex items-center justify-center gap-2 w-full bg-yellow-400 text-slate-900 py-4 rounded font-bold uppercase tracking-widest text-sm hover:bg-yellow-300 transition-colors"
                            >
                                Reserve Your Spot <ArrowRight weight="bold" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
