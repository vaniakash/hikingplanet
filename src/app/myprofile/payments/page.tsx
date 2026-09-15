'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Receipt, Download, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function PaymentsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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

    const StatusBadge = ({ status }: { status: string }) => {
        switch (status) {
            case 'paid':
                return <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold"><CheckCircle2 className="w-3 h-3" /> Paid</span>;
            case 'partially_paid':
                return <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs font-bold"><AlertCircle className="w-3 h-3" /> Partial</span>;
            case 'failed':
                return <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold"><AlertCircle className="w-3 h-3" /> Failed</span>;
            default:
                return <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-bold">Pending</span>;
        }
    };

    const handlePrintInvoice = (bookingId: string) => {
        // In a real app, this would open a PDF or a print view
        alert(`Print invoice feature for booking ${bookingId} will be implemented soon.`);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900">Payments & Invoices</h1>
                <p className="text-slate-500 mt-1">View your transaction history and download receipts.</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
                </div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <Receipt className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-500">No payment history found.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Transaction Details</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{booking.trek?.title}</div>
                                            <div className="text-xs text-slate-400 mt-0.5">Booking ID: {booking._id.substring(booking._id.length - 6).toUpperCase()}</div>
                                            {booking.paymentDetails?.razorpayPaymentId && (
                                                <div className="text-xs text-slate-400 mt-0.5">Txn ID: {booking.paymentDetails.razorpayPaymentId}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">₹{booking.amountPaid}</div>
                                            <div className="text-xs text-slate-400">Total: ₹{booking.totalAmount}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={booking.paymentStatus} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {format(new Date(booking.createdAt), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handlePrintInvoice(booking._id)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 hover:text-[#e30613] hover:bg-red-50 text-xs font-bold rounded-lg transition-colors"
                                            >
                                                <Download className="w-3 h-3" />
                                                Receipt
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
