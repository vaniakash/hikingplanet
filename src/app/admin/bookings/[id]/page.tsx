'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function BookingDetail(props: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        props.params.then(p => fetchBooking(p.id));
    }, []);

    const fetchBooking = async (id: string) => {
        try {
            const res = await fetch(`/api/bookings/${id}`);
            const json = await res.json();
            if (json.success) setBooking(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (status: string, paymentStatus?: string) => {
        if (!confirm(`Update status to ${status}?`)) return;
        setUpdating(true);

        try {
            const res = await fetch(`/api/bookings/${booking._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, paymentStatus }),
            });
            const json = await res.json();
            if (json.success) {
                setBooking(json.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!booking) return <div>Not found</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Booking Details</h1>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase">Guest Info</h3>
                        <p className="text-lg font-semibold">{booking.guestDetails.name}</p>
                        <p className="text-gray-600">{booking.guestDetails.email}</p>
                        <p className="text-gray-600">{booking.guestDetails.phone}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <h3 className="text-sm font-bold text-gray-500 uppercase">Status</h3>
                        <span className={`px-4 py-1 rounded-full text-base font-bold mb-2
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'}`}>
                            {booking.status.toUpperCase()}
                        </span>
                        <p className="text-sm text-gray-500">Payment: {booking.paymentStatus}</p>
                    </div>
                </div>

                <div className="border-t pt-6 grid grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase">Trek</h3>
                        <p>{booking.trek?.title}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase">Guests</h3>
                        <p>{booking.numberOfGuests}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase">Amount</h3>
                        <p className="text-xl font-bold">₹{booking.totalAmount}</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={() => updateStatus('confirmed', 'paid')}
                    disabled={updating || booking.status === 'confirmed'}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {updating ? <Loader2 className="animate-spin w-4 h-4" /> : 'Confirm & Mark Paid'}
                </button>
                <button
                    onClick={() => updateStatus('cancelled')}
                    disabled={updating || booking.status === 'cancelled'}
                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                    Cancel Booking
                </button>
            </div>

        </div>
    );
}
