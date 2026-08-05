import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function POST(req: Request) {
    try {
        const text = await req.text();
        const signature = req.headers.get('x-razorpay-signature');
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        // 1. Verify Signature
        if (!signature || !secret) {
            return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
        }

        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(text);
        const digest = shasum.digest('hex');

        if (digest !== signature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // 2. Process Event
        const event = JSON.parse(text);
        console.log('Webhook Event:', event.event);

        if (event.event === 'payment.captured' || event.event === 'order.paid') {
            const payment = event.payload.payment.entity;
            const orderId = payment.order_id;

            // Check if booking exists with this orderId (we need to store order_id in booking first or search by it)
            // Ideally, we stored bookingId in notes, or we search by paymentDetails.razorpayOrderId if we saved it pending.
            // Let's assume we saved it. 
            // Better strategy: We can put booking_id in the "notes" of the order during creation.

            const bookingId = payment.notes?.booking_id || event.payload.order?.entity?.notes?.booking_id;

            if (bookingId) {
                await dbConnect();
                const booking = await Booking.findById(bookingId);

                if (booking) {
                    booking.status = 'confirmed';
                    booking.paymentStatus = 'paid';
                    booking.paymentDetails = {
                        razorpayOrderId: orderId,
                        razorpayPaymentId: payment.id,
                        razorpaySignature: signature, // Validated via webhook
                    };
                    await booking.save();
                    console.log(`✅ Booking ${bookingId} confirmed via Webhook`);
                }
            } else {
                console.warn('⚠️ No booking_id found in notes');
            }
        }

        return NextResponse.json({ status: 'ok' });

    } catch (error: any) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
