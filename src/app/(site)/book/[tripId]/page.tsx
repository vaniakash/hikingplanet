'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage(props: { params: Promise<{ tripId: string }> }) {
    const router = useRouter();
    const [trip, setTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [step, setStep] = useState(1);

    // Form State
    const [guests, setGuests] = useState(1);
    const [additions, setAdditions] = useState({
        insurance: false,
        backpackOffloading: false
    });
    const [traveler, setTraveler] = useState({
        name: '',
        age: '',
        email: '',
        phone: '',
        emergencyContact: ''
    });

    const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

    // Pricing constants
    const INSURANCE_PRICE = 750;
    const BACKPACK_PRICE = 2200;

    useEffect(() => {
        props.params.then((p) => {
            fetchTrip(p.tripId);
            fetchUser();
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

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/consumer/me');
            const json = await res.json();
            if (json.success && json.user) {
                setTraveler(prev => ({
                    ...prev,
                    name: json.user.name || '',
                    email: json.user.email || '',
                    age: json.user.age?.toString() || '',
                    emergencyContact: json.user.emergencyContact
                        ? `${json.user.emergencyContact.name} - ${json.user.emergencyContact.phone}`
                        : ''
                }));
            } else {
                router.push(`/login?callbackUrl=/book/${(await props.params).tripId}`);
            }
        } catch (err) {
            console.error('Failed to pre-fetch user info');
            router.push(`/login?callbackUrl=/book/${(await props.params).tripId}`);
        }
    };

    const getTotals = () => {
        if (!trip) return { trekTotal: 0, insuranceTotal: 0, backpackTotal: 0, subTotal: 0, gst: 0, finalTotal: 0 };
        const basePrice = trip.trek.price;
        const trekTotal = basePrice * guests;
        const insuranceTotal = additions.insurance ? INSURANCE_PRICE * guests : 0;
        const backpackTotal = additions.backpackOffloading ? BACKPACK_PRICE * guests : 0;
        const subTotal = trekTotal + insuranceTotal + backpackTotal;
        const gst = subTotal * 0.05;
        const finalTotal = subTotal + gst;

        return { trekTotal, insuranceTotal, backpackTotal, subTotal, gst, finalTotal };
    };

    // Load Razorpay Script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

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

    const handlePaymentSubmit = async () => {
        setSubmitting(true);
        setError('');

        try {
            // 1. Create Booking
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tripId: trip._id,
                    guestDetails: {
                        name: traveler.name,
                        email: traveler.email,
                        phone: traveler.phone,
                        age: parseInt(traveler.age) || undefined,
                        emergencyContact: traveler.emergencyContact
                    },
                    numberOfGuests: guests,
                    additions: { insurance: false, backpackOffloading: false },
                }),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.error || 'Booking failed');
            }

            // 2. We skip Razorpay and directly confirm the booking
            setConfirmedBooking({
                bookingId: json.data._id,
                traveler: traveler.name,
                age: traveler.age,
                amountPaid: getTotals().finalTotal
            });
            setStep(4);
            
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <Loader2 className="animate-spin w-8 h-8 text-[#e30613]" />
        </div>
    );

    if (!trip) return (
        <div className="flex flex-col min-h-[60vh] items-center justify-center p-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">Trip not found or failed to load</p>
            <Link href="/" className="text-[#e30613] hover:underline flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
        </div>
    );

    const formatDates = (start: string, end: string) => {
        const s = new Date(start);
        const e = new Date(end);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const st = `${s.getDate()}${s.getDate() % 10 === 1 && s.getDate() !== 11 ? 'st' : s.getDate() % 10 === 2 && s.getDate() !== 12 ? 'nd' : s.getDate() % 10 === 3 && s.getDate() !== 13 ? 'rd' : 'th'}`;
        const et = `${e.getDate()}${e.getDate() % 10 === 1 && e.getDate() !== 11 ? 'st' : e.getDate() % 10 === 2 && e.getDate() !== 12 ? 'nd' : e.getDate() % 10 === 3 && e.getDate() !== 13 ? 'rd' : 'th'}`;
        return `${st} ${monthNames[s.getMonth()]} - ${et} ${monthNames[e.getMonth()]}`;
    };

    const { trekTotal, insuranceTotal, backpackTotal, gst, finalTotal } = getTotals();
    const formatDateStr = formatDates(trip.startDate, trip.endDate);

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#e30613]/20 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">Booking</p>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{trip.trek.title}</h1>
                    <p className="text-gray-600 text-sm">
                        {trip.trek.duration} days · {trip.trek.difficulty} · max elevation {trip.trek.maxElevation || '3,950 m'} · min age 12
                    </p>
                </div>

                {/* Stepper Header */}
                <div className="flex items-center gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2">
                    {['1. Trip details', '2. Traveler info', '3. Payment', '4. Confirmed'].map((label, idx) => {
                        const stepNumber = idx + 1;
                        let stateClass = "border-gray-200 text-gray-400";
                        if (step === stepNumber) {
                            if (step === 4) {
                                stateClass = "border-red-100 bg-red-50 text-red-600";
                            } else {
                                stateClass = "border-red-200 bg-red-50 text-red-600";
                            }
                        } else if (step > stepNumber) {
                            stateClass = "border-green-200 text-green-600 bg-green-50";
                        }
                        return (
                            <div key={idx} className={`flex-1 flex items-center justify-center py-3 px-2 border rounded-xl font-medium text-sm transition-colors whitespace-nowrap min-w-[120px] ${stateClass}`}>
                                {label}
                            </div>
                        );
                    })}
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <div>{error}</div>
                    </div>
                )}

                {/* Content area */}
                <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6 md:p-10">

                    {/* STEP 1: Trip Details */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Select batch</label>
                                <div className="w-full bg-white border border-gray-300 rounded-xl py-3.5 px-4 text-gray-900 font-medium opacity-80 cursor-not-allowed flex justify-between items-center">
                                    <span>{formatDateStr}</span>
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Number of Guests</label>
                                <input
                                    type="number"
                                    min="1"
                                    max={Math.min(10, trip.capacity - trip.seatsBooked)}
                                    value={guests}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (!isNaN(val)) {
                                            setGuests(Math.min(Math.max(1, val), Math.min(10, trip.capacity - trip.seatsBooked)));
                                        }
                                    }}
                                    className="w-full max-w-xs py-3.5 px-4 bg-white border border-gray-300 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e30613]/20"
                                />
                            </div>

                                <p className="text-sm text-gray-500 mt-6">Free cancellation up to 7 days before departure. Prices include 5% GST at checkout.</p>
                        </div>
                    )}

                    {/* STEP 2: Traveler Info */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-2 duration-300 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full name</label>
                                <input
                                    type="text"
                                    value={traveler.name}
                                    onChange={(e) => setTraveler({ ...traveler, name: e.target.value })}
                                    className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] outline-none transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={traveler.email}
                                    onChange={(e) => setTraveler({ ...traveler, email: e.target.value })}
                                    className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                                <input
                                    type="number"
                                    value={traveler.age}
                                    onChange={(e) => setTraveler({ ...traveler, age: e.target.value })}
                                    className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] outline-none transition-all"
                                    placeholder="e.g. 28"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone number</label>
                                <input
                                    type="tel"
                                    value={traveler.phone}
                                    onChange={(e) => setTraveler({ ...traveler, phone: e.target.value })}
                                    className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] outline-none transition-all"
                                    placeholder="e.g. 9876543210"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Emergency contact <span className="text-gray-400 font-normal">(optional)</span></label>
                                <input
                                    type="text"
                                    value={traveler.emergencyContact}
                                    onChange={(e) => setTraveler({ ...traveler, emergencyContact: e.target.value })}
                                    className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] outline-none transition-all"
                                    placeholder="Name - Phone Number"
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Payment Summary */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment summary</h2>
                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                                    <span className="text-gray-600">Trek fee (x{guests})</span>
                                    <span className="text-gray-900 font-medium">₹{trekTotal.toLocaleString()}</span>
                                </div>
                                {insuranceTotal > 0 && (
                                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                                        <span className="text-gray-600">Insurance</span>
                                        <span className="text-gray-900 font-medium">₹{insuranceTotal.toLocaleString()}</span>
                                    </div>
                                )}
                                {backpackTotal > 0 && (
                                    <div className="flex justify-between items-center py-4 border-b border-gray-100">
                                        <span className="text-gray-600">Backpack offloading</span>
                                        <span className="text-gray-900 font-medium">₹{backpackTotal.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                                    <span className="text-gray-600">GST (5%)</span>
                                    <span className="text-gray-900 font-medium">₹{gst.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-4">
                                    <span className="text-lg font-semibold text-gray-700">Total</span>
                                    <span className="text-lg font-semibold text-gray-700">₹{finalTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 pb-8">
                                    <span className="text-2xl font-bold text-[#c10510]">Advance (30%)</span>
                                    <span className="text-2xl font-bold text-[#c10510]">₹{Math.round(finalTotal * 0.30).toLocaleString()}</span>
                                </div>
                                
                                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center shadow-inner">
                                    <p className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">Pay via UPI to Secure Slot</p>
                                    <p className="text-gray-600 text-sm mb-6">Send the advance amount to the UPI ID below, then click "I have paid" to generate your ticket.</p>
                                    
                                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm inline-block mb-6">
                                        <p className="font-mono text-lg text-gray-900 font-bold select-all tracking-tight">straw.hatrajan-1@oksbi</p>
                                    </div>
                                    
                                    <a
                                        href={`upi://pay?pa=straw.hatrajan-1@oksbi&pn=HikingPlanet&am=${Math.round(finalTotal * 0.30)}`}
                                        className="w-full bg-[#1f7a4c] hover:bg-[#166534] text-white font-bold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md flex justify-center items-center gap-2 mb-4"
                                    >
                                        Open UPI App to Pay ₹{Math.round(finalTotal * 0.30).toLocaleString()}
                                    </a>

                                    <button
                                        onClick={handlePaymentSubmit}
                                        disabled={submitting}
                                        className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold py-3.5 rounded-xl transition-all shadow-sm flex justify-center items-center"
                                    >
                                        {submitting ? <Loader2 className="animate-spin w-5 h-5" /> : 'I have paid the advance'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Confirmed */}
                    {step === 4 && confirmedBooking && (
                        <div className="animate-in zoom-in-95 duration-500 text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking confirmed</h2>
                            <p className="text-gray-500 mb-8">{trip.trek.title} · {formatDateStr}</p>
                            
                            <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-6 text-left max-w-sm mx-auto space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                    <span className="font-bold text-gray-900 w-32">Booking ID:</span>
                                    <span className="text-gray-700 truncate">HP-{confirmedBooking.bookingId.substring(0, 5).toUpperCase()}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                    <span className="font-bold text-gray-900 w-32">Traveler:</span>
                                    <span className="text-gray-700">{confirmedBooking.traveler} ({confirmedBooking.age} yrs)</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                    <span className="font-bold text-gray-900 w-32">Amount paid:</span>
                                    <span className="text-gray-700">₹{Math.round(confirmedBooking.amountPaid * 0.30).toLocaleString()} <span className="text-sm text-gray-500">(30% advance)</span></span>
                                </div>
                            </div>

                            <Link href="/myprofile" className="inline-flex items-center justify-center mt-8 px-8 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm">
                                Go to My Profile
                            </Link>
                        </div>
                    )}

                </div>

                {/* Footer Navigation */}
                {step < 4 && (
                    <div className="mt-8 flex justify-between items-center">
                        {step > 1 ? (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                            >
                                Back
                            </button>
                        ) : (
                            <div></div>
                        )}
                        {step < 3 && (
                            <button
                                onClick={() => {
                                    if (step === 2) {
                                        if (!traveler.name || !traveler.phone || !traveler.email || !traveler.age) {
                                            setError('Please fill all required traveler details');
                                            return;
                                        }
                                        setError('');
                                    }
                                    setStep(step + 1);
                                }}
                                className="px-10 py-3 bg-[#c10510] hover:bg-[#a0040d] text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
