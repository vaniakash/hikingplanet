'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Calendar, Mountain, Users, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage(props: { params: Promise<{ tripId: string }> }) {
    const router = useRouter();
    const [trip, setTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        props.params.then((p) => {
            fetchTrip(p.tripId);
        });
    }, []);

    const fetchTrip = async (id: string) => {
        try {
            const res = await fetch(`/api/trips/${id}`);
            const json = await res.json();
            if (json.success) {
                setTrip(json.data);
            } else {
                setError(json.error);
            }
        } catch (err) {
            setError('Failed to load trip details');
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        if (!trip) return 0;
        return trip.trek.price * guests;
    };

    // Load Razorpay Script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    // Helper to robustly load Razorpay
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if ((window as any).Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            // 0. Ensure Razorpay is loaded
            const isLoaded = await loadRazorpay();
            if (!isLoaded) {
                throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
            }

            // 1. Create Booking (Pending)
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tripId: trip._id,
                    guestDetails: { name, email, phone },
                    numberOfGuests: guests,
                    totalAmount: calculateTotal(),
                }),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.error || 'Booking failed');
            }

            // 2. Create Razorpay Order
            const paymentRes = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId: json.data._id }),
            });
            const paymentJson = await paymentRes.json();

            if (!paymentJson.success) {
                // Determine if it was a key error
                const errorMsg = paymentJson.error || 'Payment initiation failed';
                alert(`${errorMsg}. Booking saved as pending.`);
                router.push(`/book/success/${json.data._id}`);
                return;
            }

            // 3. Open Razorpay
            const MODE = process.env.NEXT_PUBLIC_PAYMENT_MODE || 'test';
            const KEY_ID = MODE === 'live'
                ? process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY_ID
                : process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID;

            if (!KEY_ID) {
                throw new Error(`Razorpay Public Key for ${MODE} mode is missing in .env.local`);
            }

            const options = {
                key: KEY_ID,
                amount: paymentJson.order.amount,
                currency: paymentJson.order.currency,
                name: 'BoundlessPath',
                description: `Booking for ${trip.trek.title}`,
                order_id: paymentJson.order.id,
                handler: async function (response: any) {
                    // 4. Verify Payment
                    const verifyRes = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            orderCreationId: paymentJson.order.id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            bookingId: json.data._id,
                        }),
                    });
                    const verifyJson = await verifyRes.json();

                    if (verifyJson.success) {
                        router.push(`/book/success/${json.data._id}`);
                    } else {
                        alert('Payment verification failed');
                        router.push(`/book/success/${json.data._id}`);
                    }
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: phone,
                },
                theme: {
                    color: '#2563EB',
                },
                modal: {
                    ondismiss: function () {
                        setSubmitting(false);
                    }
                }
            };

            const rzp1 = new (window as any).Razorpay(options);
            rzp1.on('payment.failed', function (response: any) {
                alert(response.error.description);
                setSubmitting(false);
            });
            rzp1.open();

        } catch (err: any) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
        </div>
    );

    if (error || !trip) return (
        <div className="flex flex-col min-h-screen items-center justify-center p-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">{error || 'Trip not found'}</p>
            <Link href="/upcoming-treks" className="text-blue-600 hover:underline flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Treks
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href={`/treks/${trip.trek.slug}`} className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-6">
                    <ArrowLeft className="w-4 h-4" /> Back to Trek Details
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Booking Form */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

                        {/* Payment Mode Indicator */}
                        {process.env.NEXT_PUBLIC_PAYMENT_MODE === 'test' && (
                            <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm font-medium">
                                <AlertCircle className="w-5 h-5" />
                                <span>TEST MODE ACTIVE: No real money will be deducted.</span>
                            </div>
                        )}

                        <h1 className="text-2xl font-bold mb-6">Enter Your Details</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="1"
                                        max={Math.min(10, trip.capacity - trip.seatsBooked)}
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="font-bold text-lg w-8 text-center">{guests}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Max available: {trip.capacity - trip.seatsBooked}</p>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition disabled:opacity-70 flex justify-center items-center"
                            >
                                {submitting ? <Loader2 className="animate-spin w-5 h-5" /> : `Proceed to Pay ₹${calculateTotal().toLocaleString()}`}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-2">No payment is taken yet. This just creates a pending booking.</p>
                        </form>
                    </div>

                    {/* Summary Card */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl sticky top-24">
                            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Order Summary</h3>

                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase mb-1">Trek</p>
                                    <p className="font-semibold flex items-center gap-2">
                                        <Mountain className="w-4 h-4 text-blue-400" /> {trip.trek.title}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-xs uppercase mb-1">Dates</p>
                                    <p className="font-semibold flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-green-400" />
                                        {new Date(trip.startDate).toLocaleDateString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-xs uppercase mb-1">Guests</p>
                                    <p className="font-semibold flex items-center gap-2">
                                        <Users className="w-4 h-4 text-yellow-400" /> {guests} Person(s)
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-gray-700">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total</span>
                                    <span>₹{calculateTotal().toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
