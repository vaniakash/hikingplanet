import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import Trip from '@/models/Trip'; // For population if needed
import { verifyJWT } from '@/lib/auth';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await dbConnect();
        const booking = await Booking.findById(params.id)
            .populate('trek')
            .populate('trip');

        if (!booking) {
            return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: booking });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT: Admin update status (Confirm/Cancel)
export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        // Auth Check
        const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
        const payload = token ? await verifyJWT(token) : null;

        if (!payload || payload.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { status, paymentStatus } = await request.json();
        await dbConnect();

        // If cancelling, should we free up seats?
        // Logic: If transitioning TO cancelled FROM (pending/confirmed), decrease seats.
        const booking = await Booking.findById(params.id);
        if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const oldStatus = booking.status;

        // Update fields
        if (status) booking.status = status;
        if (paymentStatus) booking.paymentStatus = paymentStatus;

        await booking.save();

        // Seat Logic (Basic)
        if (status === 'cancelled' && oldStatus !== 'cancelled') {
            const trip = await Trip.findById(booking.trip);
            if (trip) {
                trip.seatsBooked = Math.max(0, trip.seatsBooked - booking.numberOfGuests);
                trip.status = 'open'; // Re-open
                await trip.save();
            }
        }

        return NextResponse.json({ success: true, data: booking });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
