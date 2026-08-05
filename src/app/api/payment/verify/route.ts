import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function POST(request: Request) {
    try {
        const { orderCreationId, razorpayPaymentId, razorpaySignature, bookingId } = await request.json();

        const MODE = process.env.NEXT_PUBLIC_PAYMENT_MODE || 'test';
        const KEY_SECRET = MODE === 'live' ? process.env.RAZORPAY_LIVE_KEY_SECRET : process.env.RAZORPAY_TEST_KEY_SECRET;

        if (!KEY_SECRET) {
            return NextResponse.json({ success: false, error: 'Server limitation: Key Secret not found' }, { status: 500 });
        }

        const shasum = crypto.createHmac('sha256', KEY_SECRET);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest('hex');

        if (digest !== razorpaySignature) {
            return NextResponse.json({ success: false, error: 'Transaction not legit!' }, { status: 400 });
        }

        // Payment Verified - Update Booking
        await dbConnect();
        const booking = await Booking.findById(bookingId);
        if (booking) {
            booking.status = 'confirmed';
            booking.paymentStatus = 'paid';
            booking.paymentDetails = {
                razorpayOrderId: orderCreationId,
                razorpayPaymentId: razorpayPaymentId,
            };
            await booking.save();
        }

        return NextResponse.json({ success: true, message: 'Payment verified successfully', bookingId });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
