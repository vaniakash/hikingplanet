import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Trek from '@/models/Trek';
import { verifyJWT } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await dbConnect();
        const trek = await Trek.findById(params.id);
        if (!trek) {
            return NextResponse.json({ success: false, error: 'Trek not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: trek });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        // Auth Check
        const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
        const payload = token ? await verifyJWT(token) : null;

        if (!payload || payload.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        await dbConnect();

        const trek = await Trek.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });

        if (!trek) {
            return NextResponse.json({ success: false, error: 'Trek not found' }, { status: 404 });
        }

        // Revalidate Cache
        revalidatePath('/treks');
        revalidatePath(`/treks/${trek.slug}`);

        return NextResponse.json({ success: true, data: trek });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        // Auth Check
        const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
        const payload = token ? await verifyJWT(token) : null;

        if (!payload || payload.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const trek = await Trek.findByIdAndDelete(params.id);

        if (!trek) {
            return NextResponse.json({ success: false, error: 'Trek not found' }, { status: 404 });
        }

        // Revalidate Cache
        revalidatePath('/treks');
        revalidatePath(`/treks/${trek.slug}`);

        return NextResponse.json({ success: true, message: 'Trek deleted' });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
