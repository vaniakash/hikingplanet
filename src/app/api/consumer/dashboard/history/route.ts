import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/userAuth';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import Review from '@/models/Review';
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

        // Fetch all confirmed bookings
        const bookings = await Booking.find({ 
            $or: [{ user: userId }, { 'guestDetails.email': userEmail }],
            status: 'confirmed' 
        })
            .populate('trek', 'title location difficulty images slug')
            .populate('trip', 'endDate')
            .sort({ 'trip.endDate': -1 });

        const now = new Date();
        
        // Filter for completed trips
        const completedBookings = bookings.filter(b => b.trip && new Date((b.trip as any).endDate) < now);

        // Fetch user's reviews to see which treks have been reviewed
        const trekIds = completedBookings.map(b => b.trek._id);
        const reviews = await Review.find({ user: userId, trek: { $in: trekIds } });

        const history = completedBookings.map(b => {
            const review = reviews.find(r => r.trek.toString() === b.trek._id.toString());
            return {
                bookingId: b._id,
                trek: b.trek,
                dateCompleted: (b.trip as any).endDate,
                review: review || null
            };
        });

        // Deduplicate history by Trek ID, taking the latest completion date
        const uniqueHistoryMap = new Map();
        history.forEach(item => {
            const trekIdStr = item.trek._id.toString();
            if (!uniqueHistoryMap.has(trekIdStr) || uniqueHistoryMap.get(trekIdStr).dateCompleted < item.dateCompleted) {
                uniqueHistoryMap.set(trekIdStr, item);
            }
        });

        const uniqueHistory = Array.from(uniqueHistoryMap.values());
        
        // Sort descending by date
        uniqueHistory.sort((a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime());

        return NextResponse.json({ success: true, history: uniqueHistory });
    } catch (error) {
        console.error('History API Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
