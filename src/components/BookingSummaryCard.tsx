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
        <div className="bg-white border border-[#dcd6c8] rounded-2xl shadow-xl overflow-hidden sticky top-24">

            {/* ── Price header ─────────────────────────────────────── */}
            <div className="bg-[#fcfbf7] p-6 border-b border-[#eeeadd]">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-[#3d3d3d]">Trek Fee</h3>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-[#1f7a4c]">₹ {price.toLocaleString()}</p>
                        {originalPrice && (
                            <p className="text-sm text-stone-400 line-through">₹ {originalPrice.toLocaleString()}</p>
                        )}
                    </div>
                </div>

                {/* Fee Breakdown */}
                <div className="mt-2 space-y-1">
                    {feeDetails?.map((fee, idx) => (
                        <p key={idx} className="text-xs text-stone-500 flex items-center justify-end gap-1">
                            + {fee.type === 'percent' ? `${fee.amount}%` : `₹${fee.amount}`} {fee.name}
                        </p>
                    ))}
                    {!feeDetails?.length && (
                        <p className="text-xs text-stone-400 text-right">+ 5% GST applicable</p>
                    )}
                </div>

                {/* Add-ons */}
                <div className="mt-6 space-y-3">
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Optional Additions</p>
                    {addOns?.map((addon, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-stone-700">
                            <span className="font-bold font-mono">₹{addon.price.toLocaleString()}</span> {addon.name}
                            <Info weight="duotone" size={16} className="text-stone-400 cursor-pointer" />
                        </div>
                    ))}
                    {!addOns?.length && (
                        <>
                            <div className="flex items-center gap-3 text-sm text-stone-600">
                                <ShieldCheck weight="duotone" size={20} className="text-[#1f7a4c]" />
                                <span className="font-bold text-stone-800">₹750</span> Insurance
                            </div>
                            <div className="flex items-center gap-3 text-sm text-stone-600">
                                <Backpack weight="duotone" size={20} className="text-[#1f7a4c]" />
                                <span className="font-bold text-stone-800">₹2,200</span> Backpack Offloading
                            </div>
                        </>
                    )}
                </div>

                {/* Info box */}
                <div className="mt-6 bg-[#f0fdf4] border border-[#dcfce7] p-3 rounded-lg text-xs text-[#15803d] flex gap-2 items-start leading-relaxed">
                    <CheckCircle weight="duotone" className="w-5 h-5 mt-0.5 shrink-0" />
                    <p>Free cancellation up to 7 days before departure.</p>
                </div>
            </div>

            {/* ── Date Selection ────────────────────────────────────── */}
            <div className="p-4 bg-white">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">
                    Select Date to Register — {year}
                </h4>

                <div className="space-y-2">
                    {months.length > 0 ? months.map(month => {
                        const monthTrips = tripsByMonth[month];
                        const isOpen = expandedMonth === month;

                        return (
                            <div key={month} className="border border-stone-200 rounded-xl overflow-hidden">
                                {/* Month header */}
                                <button
                                    onClick={() => toggleMonth(month)}
                                    className="w-full flex justify-between items-center px-4 py-3 bg-stone-50 hover:bg-stone-100 transition-colors text-sm font-bold text-stone-700"
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
                                            className="overflow-hidden"
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
                                                            <div className="flex items-center gap-2 min-w-0">
                                                                <p className={`text-sm font-semibold whitespace-nowrap ${avail.isFull ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                                                                    {formatDateRange(trip.startDate, trip.endDate)}
                                                                </p>
                                                                {trip.label && !avail.isFull && (
                                                                    <span className="shrink-0 px-2 py-0.5 text-[10px] font-semibold rounded-full border border-amber-300 bg-amber-50 text-amber-700 whitespace-nowrap hidden sm:inline">
                                                                        {trip.label}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Availability + Book button */}
                                                            <div className="flex items-center gap-3 shrink-0 ml-3">
                                                                <span className={`text-xs font-bold ${avail.color} whitespace-nowrap`}>
                                                                    {avail.label}
                                                                </span>
                                                                {!avail.isFull && (
                                                                    <Link
                                                                        href={`/book/${trip._id}`}
                                                                        className="px-3 py-1.5 bg-[#1f7a4c] hover:bg-[#166534] text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap"
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
                        <p className="text-sm text-stone-400 text-center py-4 italic">No batches available yet.</p>
                    )}
                </div>
            </div>

            {/* ── Notify footer ─────────────────────────────────────── */}
            <div className="bg-[#fffbeb] text-[#92400e] text-xs font-bold p-4 text-center flex items-center justify-center gap-2 cursor-pointer hover:bg-[#fef3c7] transition border-t border-[#fde68a]">
                <Bell weight="duotone" size={16} />
                Notify me of future dates
            </div>
        </div>
    );
}
