import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Trip from '@/models/Trip';
import { verifyJWT } from '@/lib/auth';

// GET: List trips (Can filter by trekId via query param)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const trekId = searchParams.get('trekID'); // Note: ID case

        await dbConnect();

        let query = {};
        if (trekId) {
            query = { trek: trekId };
        }

        // Populate trek title for display
        const trips = await Trip.find(query).populate('trek', 'title').sort({ startDate: 1 });
        return NextResponse.json({ success: true, data: trips });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Failed to fetch trips' }, { status: 500 });
    }
}

// POST: Create a new trip (Batch)
export async function POST(request: Request) {
    try {
        // Auth Check
        const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
        const payload = token ? await verifyJWT(token) : null;

        if (!payload || payload.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Basic Validation
        if (!body.trek || !body.startDate || !body.endDate) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        await dbConnect();

        const trip = await Trip.create(body);
        return NextResponse.json({ success: true, data: trip }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message || 'Failed to create trip' }, { status: 400 });
    }
}
