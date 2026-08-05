import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

// Determine Mode
const MODE = process.env.NEXT_PUBLIC_PAYMENT_MODE || 'test';
const KEY_ID = MODE === 'live' ? process.env.RAZORPAY_LIVE_KEY_ID : process.env.RAZORPAY_TEST_KEY_ID;
const KEY_SECRET = MODE === 'live' ? process.env.RAZORPAY_LIVE_KEY_SECRET : process.env.RAZORPAY_TEST_KEY_SECRET;

if (!KEY_ID || !KEY_SECRET) {
    console.warn(`WARNING: Razorpay keys missing for ${MODE} mode.`);
}

const razorpay = new Razorpay({
    key_id: KEY_ID!,
    key_secret: KEY_SECRET!,
});

export async function POST(request: Request) {
    try {
        const { bookingId } = await request.json();
        await dbConnect();

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
        }

        // Create Order
        const options = {
            amount: booking.totalAmount * 100, // Amount in paise
            currency: 'INR',
            receipt: booking._id.toString(),
            notes: {
                booking_id: booking._id.toString(),
            },
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({ success: true, order });
    } catch (error: any) {
        console.error('Razorpay Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
