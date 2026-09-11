import Link from 'next/link';
import { Mountain, Users, Calendar, Filter, Plus, ReceiptText } from 'lucide-react';
import dbConnect from '@/lib/db';
import Trek from '@/models/Trek';
import Booking from '@/models/Booking';
import Trip from '@/models/Trip';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    await dbConnect();

    // Fetch latest 5 bookings
    const recentBookings = await Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('trek', 'title')
        .populate('trip', 'startDate')
        .lean() as any[];

    // Fetch trek performance (aggregate trips)
    const trekPerformance = await Trip.aggregate([
        {
            $group: {
                _id: "$trek",
                totalCapacity: { $sum: "$capacity" },
                totalBooked: { $sum: "$seatsBooked" }
            }
        },
        {
            $lookup: {
                from: "treks",
                localField: "_id",
                foreignField: "_id",
                as: "trekInfo"
            }
        },
        { $unwind: "$trekInfo" },
        {
            $project: {
                name: "$trekInfo.title",
                totalCapacity: 1,
                totalBooked: 1,
                percentage: { 
                    $cond: [ 
                        { $eq: ["$totalCapacity", 0] }, 
                        0, 
                        { $multiply: [ { $divide: ["$totalBooked", "$totalCapacity"] }, 100 ] } 
                    ] 
                }
            }
        },
        { $sort: { percentage: -1 } },
        { $limit: 4 }
    ]);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Format Date
    const formatDate = (date: Date) => {
        if (!date) return 'N/A';
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).format(new Date(date)).replace(',', ','); // Adjust format if needed
    };

    // Helpers
    const getInitials = (name: string) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Quick Actions Header */}
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Quick Actions</h1>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Instant administrative shortcuts</p>
            </div>

            {/* Quick Actions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Link
                    href="/admin/treks/new"
                    className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all flex items-center gap-4 shadow-sm hover:shadow-md"
                >
                    <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors shrink-0 border border-indigo-100 dark:border-indigo-800">
                        <Plus className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">Add New Trek</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Create an itinerary & dates</p>
                    </div>
                </Link>

                <Link
                    href="/admin/bookings"
                    className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-all flex items-center gap-4 shadow-sm hover:shadow-md"
                >
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors shrink-0 border border-blue-100 dark:border-blue-800">
                        <ReceiptText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">View Bookings</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Filter by expedition or status</p>
                    </div>
                </Link>

                <Link
                    href="/admin/leads"
                    className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all flex items-center gap-4 shadow-sm hover:shadow-md"
                >
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors shrink-0 border border-emerald-100 dark:border-emerald-800">
                        <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">Manage Leads</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Follow up on trekking inquiries</p>
                    </div>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Bookings Table */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm flex flex-col">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Bookings</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Showing latest 5 orders</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
                                <Filter className="w-4 h-4" /> Filter
                            </button>
                            <Link href="/admin/bookings" className="px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
                                View all
                            </Link>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Trek</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Participants</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {recentBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                            No recent bookings found.
                                        </td>
                                    </tr>
                                ) : (
                                    recentBookings.map((booking) => (
                                        <tr key={booking._id.toString()} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                                                        {getInitials(booking.guestDetails.name)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">{booking.guestDetails.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-gray-600 dark:text-gray-300 truncate max-w-[150px]" title={booking.trek?.title || 'Unknown Trek'}>
                                                    {booking.trek?.title || 'Unknown Trek'}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col text-gray-600 dark:text-gray-300 text-xs">
                                                    <span>{booking.trip?.startDate ? new Date(booking.trip.startDate).toLocaleString('default', { month: 'short' }) : 'N/A'} {booking.trip?.startDate ? new Date(booking.trip.startDate).getDate() : ''},</span>
                                                    <span>{booking.trip?.startDate ? new Date(booking.trip.startDate).getFullYear() : ''}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                {booking.numberOfGuests} {booking.numberOfGuests === 1 ? 'trekker' : 'trekkers'}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                {formatCurrency(booking.totalAmount)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {booking.status === 'confirmed' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Confirmed
                                                    </span>
                                                )}
                                                {booking.status === 'pending' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Pending
                                                    </span>
                                                )}
                                                {booking.status === 'cancelled' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Cancelled
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between mt-auto">
                        <span className="text-xs text-gray-500">Page 1 of 3 (Total 15 entries)</span>
                        <div className="flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                            <button className="px-3 py-1 text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 cursor-not-allowed border-r border-gray-200 dark:border-gray-700" disabled>Previous</button>
                            <button className="px-3 py-1 text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Next</button>
                        </div>
                    </div>
                </div>

                {/* Trek Performance */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 flex flex-col">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Trek Performance</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Capacity & Bookings</p>
                    
                    <div className="space-y-6 flex-1">
                        {trekPerformance.length > 0 ? (
                            trekPerformance.map((perf: any, idx: number) => {
                                const colors = ['bg-indigo-600', 'bg-slate-600', 'bg-emerald-500', 'bg-sky-500', 'bg-amber-500'];
                                const color = colors[idx % colors.length];
                                const percentage = Math.min(Math.round(perf.percentage), 100);
                                
                                return (
                                    <div key={perf._id.toString()}>
                                        <div className="flex justify-between text-sm font-medium mb-2">
                                            <span className="text-gray-900 dark:text-white">{perf.name || 'Unknown Trek'}</span>
                                            <span className={`${percentage >= 80 ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>{percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-1.5">
                                            <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                            {perf.totalBooked}/{perf.totalCapacity} slots committed
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            // Fallback dummy data if no treks
                            <>
                                <div>
                                    <div className="flex justify-between text-sm font-medium mb-2">
                                        <span className="text-gray-900 dark:text-white">Kedarkantha Winter Summit</span>
                                        <span className="text-indigo-700 dark:text-indigo-400">90%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-1.5">
                                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">18/20 slots committed</div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-medium mb-2">
                                        <span className="text-gray-900 dark:text-white">Roopkund Alpine Trail</span>
                                        <span className="text-gray-700 dark:text-gray-400">75%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-1.5">
                                        <div className="bg-slate-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">15/20 slots committed</div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-medium mb-2">
                                        <span className="text-gray-900 dark:text-white">Valley of Flowers</span>
                                        <span className="text-emerald-700 dark:text-emerald-400">50%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-1.5">
                                        <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">10/20 slots committed</div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-medium mb-2">
                                        <span className="text-gray-900 dark:text-white">Hampta Pass Crossing</span>
                                        <span className="text-gray-700 dark:text-gray-400">30%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-1.5">
                                        <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">6/20 slots committed</div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mt-8 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50 rounded-xl p-4 flex gap-3">
                        <div className="shrink-0 mt-0.5">
                            <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 flex items-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Quarterly Fleet Metric</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">Overall Fleet Capacity: 68% filled for upcoming quarter.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
