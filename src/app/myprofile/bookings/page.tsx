'use client';

import React, { useState, useEffect } from 'react';
import { useDashboard } from '../layout';
import { Loader2, Calendar, MapPin, Users, IndianRupee, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default function MyBookingsPage() {
    const { user } = useDashboard();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
    const [selectedBooking, setSelectedBooking] = useState<any>(null); // For Details Modal

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/consumer/dashboard/bookings');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setBookings(data.bookings);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const now = new Date();

    const upcomingBookings = bookings.filter(b => b.status !== 'cancelled' && new Date(b.trip?.endDate) >= now);
    const completedBookings = bookings.filter(b => b.status === 'confirmed' && new Date(b.trip?.endDate) < now);
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

    const getActiveList = () => {
        if (activeTab === 'upcoming') return upcomingBookings;
        if (activeTab === 'completed') return completedBookings;
        return cancelledBookings;
    };

    const activeList = getActiveList();

    const StatusBadge = ({ status }: { status: string }) => {
        if (status === 'confirmed') return <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded">Confirmed</span>;
        if (status === 'cancelled') return <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">Cancelled</span>;
        return <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">Pending</span>;
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900">My Bookings</h1>
                <p className="text-slate-500 mt-1">Manage your upcoming and past treks.</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    className={`pb-4 px-4 font-semibold text-sm transition-colors relative ${activeTab === 'upcoming' ? 'text-[#e30613]' : 'text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('upcoming')}
                >
                    Upcoming
                    {activeTab === 'upcoming' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e30613]" />}
                </button>
                <button
                    className={`pb-4 px-4 font-semibold text-sm transition-colors relative ${activeTab === 'completed' ? 'text-[#e30613]' : 'text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('completed')}
                >
                    Completed
                    {activeTab === 'completed' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e30613]" />}
                </button>
                <button
                    className={`pb-4 px-4 font-semibold text-sm transition-colors relative ${activeTab === 'cancelled' ? 'text-[#e30613]' : 'text-slate-500 hover:text-slate-800'}`}
                    onClick={() => setActiveTab('cancelled')}
                >
                    Cancelled
                    {activeTab === 'cancelled' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e30613]" />}
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
                </div>
            ) : (
                <div className="space-y-4">
                    {activeList.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                            <p className="text-slate-500">No {activeTab} bookings found.</p>
                            {activeTab === 'upcoming' && (
                                <Link href="/treks" className="mt-4 inline-block px-6 py-2 bg-[#e30613] text-white font-bold rounded-lg hover:bg-red-700">
                                    Explore Treks
                                </Link>
                            )}
                        </div>
                    ) : (
                        activeList.map(booking => (
                            <div key={booking._id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
                                <div className="w-full sm:w-48 h-32 relative rounded-xl overflow-hidden shrink-0 bg-slate-100">
                                    {booking.trek?.images?.[0] && (
                                        <Image src={booking.trek.images[0]} alt={booking.trek.title} fill className="object-cover" />
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900">{booking.trek?.title}</h3>
                                            <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                                                <MapPin className="w-4 h-4" /> {booking.trek?.location}
                                            </div>
                                        </div>
                                        <StatusBadge status={booking.status} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-2 mt-4 text-sm text-slate-700">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            {booking.trip ? format(new Date(booking.trip.startDate), 'MMM d, yyyy') : 'TBD'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-slate-400" />
                                            {booking.numberOfGuests} Guests
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <IndianRupee className="w-4 h-4 text-slate-400" />
                                            Amount Paid: ₹{booking.amountPaid}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-slate-400" />
                                            ID: {booking._id.substring(booking._id.length - 6).toUpperCase()}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 flex justify-end">
                                        <button 
                                            onClick={() => setSelectedBooking(booking)}
                                            className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur z-10">
                            <h2 className="text-xl font-black text-slate-900">Booking Details</h2>
                            <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-slate-600 font-bold p-2">✕</button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex gap-4 items-center">
                                <div className="w-20 h-20 relative rounded-lg overflow-hidden shrink-0 bg-slate-100">
                                    {selectedBooking.trek?.images?.[0] && (
                                        <Image src={selectedBooking.trek.images[0]} alt="Trek" fill className="object-cover" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{selectedBooking.trek?.title}</h3>
                                    <p className="text-sm text-slate-500">Booking ID: {selectedBooking._id}</p>
                                </div>
                                <div className="ml-auto">
                                    <StatusBadge status={selectedBooking.status} />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Trip Dates</p>
                                    <p className="text-sm font-medium text-slate-900">
                                        {selectedBooking.trip ? `${format(new Date(selectedBooking.trip.startDate), 'MMM d, yyyy')} - ${format(new Date(selectedBooking.trip.endDate), 'MMM d, yyyy')}` : 'TBD'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Participants</p>
                                    <p className="text-sm font-medium text-slate-900">{selectedBooking.numberOfGuests} Person(s)</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Customer Details</p>
                                    <p className="text-sm font-medium text-slate-900">{selectedBooking.guestDetails.name}</p>
                                    <p className="text-sm text-slate-600">{selectedBooking.guestDetails.email}</p>
                                    <p className="text-sm text-slate-600">{selectedBooking.guestDetails.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Payment</p>
                                    <p className="text-sm font-medium text-slate-900">Total: ₹{selectedBooking.totalAmount}</p>
                                    <p className="text-sm text-slate-600">Paid: ₹{selectedBooking.amountPaid}</p>
                                    <p className="text-sm text-slate-600 capitalize">Status: {selectedBooking.paymentStatus.replace('_', ' ')}</p>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <Link 
                                    href={`/myprofile/payments`}
                                    className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-200 transition-colors"
                                >
                                    Download Invoice
                                </Link>
                                {selectedBooking.status === 'confirmed' && new Date(selectedBooking.trip?.startDate) > new Date() && (
                                    <button className="px-6 py-2.5 bg-red-50 text-[#e30613] font-bold text-sm rounded-lg hover:bg-red-100 transition-colors ml-auto">
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
