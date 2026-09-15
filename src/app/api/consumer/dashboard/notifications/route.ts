import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/userAuth';
import dbConnect from '@/lib/db';
import Notification from '@/models/Notification';
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

        const notifications = await Notification.find({ user: userId })
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, notifications });
    } catch (error) {
        console.error('Notifications GET Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const payload = await getUserFromRequest(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await request.json(); // if id is provided, mark one. else mark all.

        await dbConnect();
        const userId = new mongoose.Types.ObjectId(payload.id);

        if (id) {
            await Notification.updateOne({ _id: id, user: userId }, { read: true });
        } else {
            await Notification.updateMany({ user: userId, read: false }, { read: true });
        }

        return NextResponse.json({ success: true, message: 'Marked as read' });
    } catch (error) {
        console.error('Notifications PUT Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
