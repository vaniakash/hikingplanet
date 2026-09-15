import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/userAuth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import mongoose from 'mongoose';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const payload = await getUserFromRequest(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const userId = new mongoose.Types.ObjectId(payload.id);

        let user = await User.findById(userId).select('referralCode');

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        // Generate a referral code if the user doesn't have one
        if (!user.referralCode) {
            // Generate a random 6 char alphanumeric string
            user.referralCode = crypto.randomBytes(4).toString('hex').slice(0, 6).toUpperCase();
            await user.save();
        }

        // Count successful referrals (users who signed up using this code)
        const referralCount = await User.countDocuments({ referredBy: userId });

        return NextResponse.json({
            success: true,
            referralCode: user.referralCode,
            referralCount
        });
    } catch (error) {
        console.error('Referral GET Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
