import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/userAuth';
import dbConnect from '@/lib/db';
import Review from '@/models/Review';
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

        const reviews = await Review.find({ user: userId })
            .populate('trek', 'title location images slug')
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, reviews });
    } catch (error) {
        console.error('Reviews GET Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const payload = await getUserFromRequest(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { trekId, rating, reviewText } = await request.json();

        if (!trekId || !rating || !reviewText) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        await dbConnect();
        const userId = new mongoose.Types.ObjectId(payload.id);
        const tId = new mongoose.Types.ObjectId(trekId);

        const userDoc = await mongoose.model('User').findById(userId).select('email');
        const userEmail = userDoc?.email || payload.email;

        // Verify the user actually completed this trek
        const completedBooking = await Booking.findOne({
            $or: [{ user: userId }, { 'guestDetails.email': userEmail }],
            trek: trekId,
            status: 'confirmed'
        }).populate('trip');

        if (!completedBooking || !completedBooking.trip || new Date((completedBooking.trip as any).endDate) >= new Date()) {
            return NextResponse.json({ success: false, error: 'You can only review treks you have completed.' }, { status: 403 });
        }

        // Upsert Review
        const review = await Review.findOneAndUpdate(
            { user: userId, trek: tId },
            { 
                $set: { 
                    rating: Number(rating), 
                    reviewText, 
                    status: 'pending' // Re-evaluating upon edit
                } 
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({ success: true, message: 'Review submitted successfully', review });
    } catch (error) {
        console.error('Reviews POST Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const payload = await getUserFromRequest(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(request.url);
        const reviewId = url.searchParams.get('id');

        if (!reviewId) {
            return NextResponse.json({ success: false, error: 'Missing review ID' }, { status: 400 });
        }

        await dbConnect();
        const userId = new mongoose.Types.ObjectId(payload.id);

        const result = await Review.deleteOne({ _id: reviewId, user: userId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, error: 'Review not found or unauthorized' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Reviews DELETE Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
