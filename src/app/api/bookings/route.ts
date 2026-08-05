import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import Trip from '@/models/Trip';
import Trek from '@/models/Trek'; // Ensure Trek model is registered
import { verifyJWT } from '@/lib/auth';

// GET: Admin list bookings
export async function GET(request: Request) {
    try {
        // Auth Check
        const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
        const payload = token ? await verifyJWT(token) : null;

        if (!payload || payload.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const bookings = await Booking.find({})
            .populate('trek', 'title')
            .populate('trip', 'startDate endDate')
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: bookings });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

// POST: Create Booking (User)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { tripId, guestDetails, numberOfGuests, totalAmount } = body;

        if (!tripId || !guestDetails || !numberOfGuests || !totalAmount) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        await dbConnect();

        // Start Transaction (or mimic with optimistic locking if no replica set - assuming standalone for dev)
        // For Production properly with Atlas, transaction is best.
        // Here we will do simple check-then-act for MVP simplicity, but concurrent requests could race (Phase 9 polish).

        // 1. Fetch Trip
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return NextResponse.json({ success: false, error: 'Trip not found' }, { status: 404 });
        }

        // 2. Check Capacity
        if (trip.seatsBooked + numberOfGuests > trip.capacity) {
            return NextResponse.json({ success: false, error: 'Not enough seats available' }, { status: 400 });
        }

        // 3. Create Booking
        const booking = await Booking.create({
            trip: tripId,
            trek: trip.trek, // Link trek for easier queries
            guestDetails,
            numberOfGuests,
            totalAmount,
            status: 'pending',
            paymentStatus: 'pending'
        });

        // 4. Update Trip Seats
        trip.seatsBooked += numberOfGuests;
        if (trip.seatsBooked >= trip.capacity) {
            trip.status = 'full';
        }
        await trip.save();

        return NextResponse.json({ success: true, data: booking }, { status: 201 });

    } catch (error: any) {
        console.error('Booking Creation Error:', error);
        return NextResponse.json({ success: false, error: error.message || 'Booking failed' }, { status: 500 });
    }
}
