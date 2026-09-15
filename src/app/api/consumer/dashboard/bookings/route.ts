import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/userAuth';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const payload = await getUserFromRequest(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const userId = new mongoose.Types.ObjectId(payload.id);

        const userDoc = await mongoose.model('User').findById(userId).select('email');
        const userEmail = userDoc?.email || payload.email;

        const bookings = await Booking.find({
            $or: [{ user: userId }, { 'guestDetails.email': userEmail }]
        })
            .populate('trek', 'title location images slug')
            .populate('trip', 'startDate endDate status')
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, bookings });
    } catch (error) {
        console.error('Bookings API Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
