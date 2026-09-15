import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/userAuth';
import dbConnect from '@/lib/db';
import Wishlist from '@/models/Wishlist';
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

        const wishlist = await Wishlist.find({ user: userId })
            .populate('trek', 'title location difficulty duration price originalPrice images slug')
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, wishlist });
    } catch (error) {
        console.error('Wishlist GET Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const payload = await getUserFromRequest(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { trekId, action } = await request.json();

        if (!trekId || !['add', 'remove'].includes(action)) {
            return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
        }

        await dbConnect();
        const userId = new mongoose.Types.ObjectId(payload.id);
        const tId = new mongoose.Types.ObjectId(trekId);

        if (action === 'add') {
            await Wishlist.updateOne(
                { user: userId, trek: tId },
                { $setOnInsert: { user: userId, trek: tId } },
                { upsert: true }
            );
        } else {
            await Wishlist.deleteOne({ user: userId, trek: tId });
        }

        return NextResponse.json({ success: true, message: `Trek ${action}ed successfully` });
    } catch (error) {
        console.error('Wishlist POST Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
