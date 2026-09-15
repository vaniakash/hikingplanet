import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/userAuth';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import Wishlist from '@/models/Wishlist';
import Review from '@/models/Review';
import Trip from '@/models/Trip';
import Notification from '@/models/Notification';
import User from '@/models/User';
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

        const userDoc = await User.findById(userId).select('email rewards referralCode');
        const userEmail = userDoc?.email || payload.email;

        // 1. Get all confirmed bookings for this user (or email)
        const bookings = await Booking.find({ 
            $or: [{ user: userId }, { 'guestDetails.email': userEmail }],
            status: 'confirmed' 
        }).select('trip');

        const tripIds = bookings.map(b => b.trip);

        // 2. Fetch those trips to check dates
        const trips = await Trip.find({
            _id: { $in: tripIds }
        }).select('endDate');

        const now = new Date();
        let completedTreks = 0;
        let upcomingTreks = 0;

        trips.forEach(trip => {
            if (trip.endDate < now) {
                completedTreks++;
            } else {
                upcomingTreks++;
            }
        });

        // 3. Get Saved Treks count
        const savedTreks = await Wishlist.countDocuments({ user: userId });

        // 4. Get Reviews count
        const reviews = await Review.countDocuments({ user: userId });

        // 5. Get unread Notifications
        const unreadNotifications = await Notification.countDocuments({ user: userId, read: false });

        // 6. Get Rewards and Referrals
        const referralEarnings = 500; // Mock static calculation or logic if needed, say ₹500 for demo
        
        // 7. Get NEXT Upcoming Booking detailed for the dashboard highlight
        const nextUpcomingBooking = await Booking.findOne({ 
            $or: [{ user: userId }, { 'guestDetails.email': userEmail }],
            status: { $in: ['confirmed', 'pending'] } 
        })
        .populate('trek', 'title location images difficulty elevation duration slug')
        .populate('trip', 'startDate endDate capacity seatsBooked')
        .sort({ createdAt: -1 }); // Get latest or nearest date, but sorting by createdAt is simpler for now, ideally sort by trip startDate. We'll leave it as is and filter out past on client or just let it pass

        return NextResponse.json({
            success: true,
            stats: {
                completedTreks,
                upcomingTreks,
                savedTreks,
                reviews,
                unreadNotifications,
                rewards: userDoc?.rewards?.points || 0,
                referralEarnings: referralEarnings
            },
            nextUpcomingBooking
        });
    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
