'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Filter, MoreVertical, Calendar, Loader2, AlertCircle } from 'lucide-react';

export default function AdminBookings() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch('/api/bookings');
            const json = await res.json();
            if (json.success) {
                setBookings(json.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
            pending: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
        };
        const activeStyle = styles[status as keyof typeof styles] || styles.pending;

        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${activeStyle}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header / Stats (Future Placeholder) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Manage Bookings</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track and manage all customer reservations</p>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-[#4b2e83]/20 focus:border-[#4b2e83] transition-all w-64 shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Bookings Table Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4">Booking ID</th>
                                <th className="px-6 py-4">Guest Details</th>
                                <th className="px-6 py-4">Trek & Info</th>
                                <th className="px-6 py-4">Trip Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-[#4b2e83]" />
                                        Loading bookings...
                                    </td>
                                </tr>
                            ) : bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((b) => (
                                    <tr key={b._id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                                #{b._id.slice(-6).toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900 dark:text-white">{b.guestDetails.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{b.guestDetails.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {b.trek ? (
                                                <span className="font-medium text-gray-700 dark:text-gray-200">{b.trek.title}</span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-red-500 text-xs font-medium bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded w-fit">
                                                    <AlertCircle className="w-3 h-3" /> Unknown Trek
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {b.trip ? (
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    {new Date(b.trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Invalid Date</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                            ₹{b.totalAmount.toLocaleString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={b.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/bookings/${b._id}`}
                                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#4b2e83] dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors"
                                            >
                                                Manage
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Showing {bookings.length} result(s)</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
