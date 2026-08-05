import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Trek from '@/models/Trek';
import { verifyJWT } from '@/lib/auth';

// GET: List all treks
export async function GET(request: Request) {
    try {
        await dbConnect();
        const treks = await Trek.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: treks });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Failed to fetch treks' }, { status: 500 });
    }
}

// POST: Create a new trek (Admin only)
export async function POST(request: Request) {
    try {
        // Auth Check
        const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
        const payload = token ? await verifyJWT(token) : null;

        if (!payload || payload.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Auto-generate slug if not provided? Or separate? 
        // Ideally slug is provided or generated from title
        // Simple slugify for now if missing
        if (!body.slug && body.title) {
            body.slug = body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        await dbConnect();

        const trek = await Trek.create(body);
        return NextResponse.json({ success: true, data: trek }, { status: 201 });

    } catch (error: any) {
        console.error("Create Trek Error", error);
        // Duplicate key error for slug
        if (error.code === 11000) {
            return NextResponse.json({ success: false, error: 'Trek with this slug already exists' }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: error.message || 'Failed to create trek' }, { status: 400 });
    }
}
