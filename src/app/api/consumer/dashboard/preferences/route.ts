import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/userAuth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const payload = await getUserFromRequest(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const user = await User.findById(payload.id).select('preferences');

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            preferences: user.preferences || { difficulty: [], regions: [], duration: [], seasons: [] }
        });
    } catch (error) {
        console.error('Preferences GET Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const payload = await getUserFromRequest(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { preferences } = await request.json();

        await dbConnect();
        const user = await User.findById(payload.id);

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        user.preferences = preferences;
        await user.save();

        return NextResponse.json({ success: true, message: 'Preferences updated successfully', preferences: user.preferences });
    } catch (error) {
        console.error('Preferences PUT Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
