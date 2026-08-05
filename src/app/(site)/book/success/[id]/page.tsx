import Link from 'next/link';
import { CheckCircle2, Home } from 'lucide-react';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export default async function SuccessPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params; // Ensure to destructure params before using it
    await dbConnect();
    const booking = await Booking.findById(params.id).populate('trek');

    if (!booking) {
        return <div>Booking not found</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Reserved!</h1>
                <p className="text-gray-500 mb-6">
                    Your spot for <span className="font-semibold text-gray-900">{(booking.trek as any).title}</span> has been held.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg text-left text-sm space-y-2 mb-8 border border-gray-100">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Booking ID</span>
                        <span className="font-mono text-gray-900">{booking._id.toString().slice(-6).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Amount Due</span>
                        <span className="font-bold text-gray-900">₹{booking.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending Payment</span>
                    </div>
                </div>

                <Link href="/" className="w-full block bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2">
                    <Home className="w-4 h-4" /> Go Home
                </Link>
            </div>
        </div>
    );
}
