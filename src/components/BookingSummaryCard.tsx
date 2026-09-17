'use client';

import { useState } from 'react';
import { CaretDown, CaretUp, Info, Warning, ShieldCheck, Backpack, CheckCircle, Bell } from '@phosphor-icons/react/dist/ssr';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Trip {
    _id: string;
    startDate: string;
    endDate: string;
    capacity: number;
    seatsBooked: number;
    waitlistCount?: number;
    status: 'open' | 'full' | 'completed' | 'cancelled';
    label?: string;
}

interface AddOn {
    name: string;
    price: number;
    description: string;
}

interface FeeDetail {
    name: string;
    amount: number;
    type: 'fixed' | 'percent';
}

interface BookingCardProps {
    price: number;
    originalPrice?: number;
    trips: Trip[];
    feeDetails?: FeeDetail[];
    addOns?: AddOn[];
}

// ── Availability helpers ──────────────────────────────────────────
function getAvailability(trip: Trip): {
    label: string;
    color: string;
    bgColor: string;
    isFull: boolean;
} {
    const seatsLeft = trip.capacity - trip.seatsBooked;
    const wl = trip.waitlistCount ?? 0;

    if (trip.status === 'cancelled' || trip.status === 'completed') {
        return { label: trip.status.toUpperCase(), color: 'text-gray-400', bgColor: 'bg-gray-100', isFull: true };
    }
    if (trip.status === 'full' || seatsLeft <= 0) {
        return { label: 'FULL', color: 'text-gray-400', bgColor: 'bg-gray-100', isFull: true };
    }
    if (wl > 0) {
        return { label: `WL ${wl}`, color: 'text-blue-600', bgColor: 'bg-blue-50', isFull: false };
    }
    if (seatsLeft <= 5) {
        return { label: `LAST ${seatsLeft}`, color: 'text-orange-600', bgColor: 'bg-orange-50', isFull: false };
    }
    return { label: 'AVBL', color: 'text-green-600', bgColor: 'bg-green-50', isFull: false };
}

function formatDateRange(startIso: string, endIso: string): string {
    const s = new Date(startIso);
    const e = new Date(endIso);
    const sDay = s.getDate();
    const eDay = e.getDate();
    const sMonth = s.toLocaleString('default', { month: 'short' });
    const eMonth = e.toLocaleString('default', { month: 'short' });

    if (sMonth === eMonth) {
        return `${sDay}${ordinal(sDay)} ${sMonth} - ${eDay}${ordinal(eDay)} ${eMonth}`;
    }
    return `${sDay}${ordinal(sDay)} ${sMonth} - ${eDay}${ordinal(eDay)} ${eMonth}`;
}

function ordinal(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

// ── Component ─────────────────────────────────────────────────────
export default function BookingSummaryCard({ price, originalPrice, trips, feeDetails, addOns }: BookingCardProps) {

    // Group trips by Month-Year
    const tripsByMonth: { [key: string]: Trip[] } = {};
    trips.forEach(trip => {
        const date = new Date(trip.startDate);
        const key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!tripsByMonth[key]) tripsByMonth[key] = [];
        tripsByMonth[key].push(trip);
    });

    const months = Object.keys(tripsByMonth);

    // Start with first month open
    const [expandedMonth, setExpandedMonth] = useState<string | null>(months[0] || null);

    const toggleMonth = (month: string) => {
        setExpandedMonth(expandedMonth === month ? null : month);
    };

    // Get the current year from the first trip, or fallback
    const year = trips.length > 0 ? new Date(trips[0].startDate).getFullYear() : new Date().getFullYear();

    return (
        <div className="bg-[#fffdfa] border-[8px] border-[#dc2626] rounded-3xl shadow-xl overflow-hidden sticky top-24 max-w-[400px] mx-auto lg:ml-auto">

            {/* ── Price header ─────────────────────────────────────── */}
            <div className="p-5 md:p-6 border-b border-stone-200">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[22px] font-extrabold text-stone-800">Trek Fee</h3>
                </div>
                
                <div className="flex items-end gap-3 mb-4">
                    <p className="text-[40px] leading-none font-black text-stone-900 tracking-tighter">₹{price.toLocaleString()}</p>
                    <div className="text-[12px] text-stone-600 font-medium pb-1 space-y-0.5">
                        {feeDetails?.map((fee, idx) => (
                            <p key={idx}>+ {fee.type === 'percent' ? `${fee.amount}%` : `₹${fee.amount}`} {fee.name}</p>
                        ))}
                        {!feeDetails?.length && (
                            <p>+ 5% GST</p>
                        )}
                        {originalPrice && (
                            <p className="text-stone-400 line-through">₹{originalPrice.toLocaleString()}</p>
                        )}
                    </div>
                </div>

                {/* Advance Booking Info */}
                <div className="mt-5 p-3 bg-[#fff5f5] border border-[#fecaca] rounded-xl">
                    <div className="flex items-center gap-2 mb-1.5">
                        <Info weight="fill" className="w-[18px] h-[18px] text-[#dc2626] shrink-0" />
                        <h4 className="text-[14px] font-bold text-[#7f1d1d]">30% Advance Booking Fee</h4>
                    </div>
                    <p className="text-[13px] text-[#b91c1c] leading-snug">
                        You only need to pay a 30% advance fee right now to confirm your slot. The remaining amount can be paid later.
                    </p>
                </div>

                {/* Info box */}
                <div className="mt-3 bg-[#f0fdf4] border border-[#bbf7d0] p-3 rounded-xl flex items-center gap-2 text-[13px] text-[#15803d]">
                    <CheckCircle weight="regular" className="w-5 h-5 text-[#16a34a] shrink-0" />
                    <p>Free cancellation up to 7 days before departure.</p>
                </div>
            </div>

            {/* ── Date Selection ────────────────────────────────────── */}
            <div className="p-5 md:p-6 pb-0">
                <h4 className="text-[12px] font-black text-stone-900 uppercase tracking-widest mb-4">
                    Select Date to Register - {year}
                </h4>

                <div className="space-y-3 mb-6">
                    {months.length > 0 ? months.map(month => {
                        const monthTrips = tripsByMonth[month];
                        const isOpen = expandedMonth === month;

                        return (
                            <div key={month} className="border border-stone-200 bg-white rounded-lg shadow-sm overflow-hidden">
                                {/* Month header */}
                                <button
                                    onClick={() => toggleMonth(month)}
                                    className="w-full flex justify-between items-center px-4 py-3 bg-[#f8f9fa] hover:bg-[#f1f3f5] transition-colors text-[14px] font-bold text-stone-800 border-b border-transparent"
                                    style={{ borderColor: isOpen ? '#e5e7eb' : 'transparent' }}
                                >
                                    <span>{month}</span>
                                    {isOpen ? <CaretUp weight="bold" size={14} /> : <CaretDown weight="bold" size={14} />}
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden bg-white"
                                        >
                                            <div className="divide-y divide-stone-100">
                                                {monthTrips.map(trip => {
                                                    const avail = getAvailability(trip);
                                                    return (
                                                        <div
                                                            key={trip._id}
                                                            className={`flex items-center justify-between px-4 py-3 ${avail.isFull ? 'opacity-50' : 'hover:bg-stone-50 transition-colors'}`}
                                                        >
                                                            {/* Date + label */}
                                                            <div className="flex flex-col min-w-0">
                                                                <p className={`text-[13px] font-bold whitespace-nowrap ${avail.isFull ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                                                                    {formatDateRange(trip.startDate, trip.endDate)}
                                                                </p>
                                                                {trip.label && !avail.isFull && (
                                                                    <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-bold rounded bg-amber-50 text-amber-700 whitespace-nowrap w-fit">
                                                                        {trip.label}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Availability + Book button */}
                                                            <div className="flex items-center gap-3 shrink-0 ml-2">
                                                                <span className={`text-[12px] font-bold ${avail.color} whitespace-nowrap`}>
                                                                    {avail.label}
                                                                </span>
                                                                {!avail.isFull && (
                                                                    <Link
                                                                        href={`/book/${trip._id}`}
                                                                        onClick={() => {
                                                                            const pathSegments = window.location.pathname.split('/');
                                                                            const trekSlug = pathSegments[pathSegments.length - 1];
                                                                            fetch('/api/analytics', {
                                                                                method: 'POST',
                                                                                headers: { 'Content-Type': 'application/json' },
                                                                                body: JSON.stringify({
                                                                                    campaignId: 'global',
                                                                                    eventName: 'trek_cta_click',
                                                                                    metadata: {
                                                                                        tripId: trip._id,
                                                                                        trekSlug: trekSlug,
                                                                                    }
                                                                                }),
                                                                            }).catch(console.error);
                                                                        }}
                                                                        className="px-4 py-1.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-[13px] font-bold rounded shadow-sm hover:shadow transition-all whitespace-nowrap"
                                                                    >
                                                                        Book
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    }) : (
                        <p className="text-[14px] text-stone-400 text-center py-4 italic">No batches available yet.</p>
                    )}
                </div>
            </div>

            {/* ── Notify footer ─────────────────────────────────────── */}
            <div className="bg-[#fffbeb] text-[#92400e] text-[13px] font-bold py-4 text-center flex items-center justify-center gap-2 cursor-pointer hover:bg-[#fef3c7] transition border-t border-[#fde68a]">
                <Bell weight="bold" size={16} />
                Notify me of future dates
            </div>
        </div>
    );
}
