import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json({
            status: 'ok',
            message: 'Database connected successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        console.error('Database connection error:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Failed to connect to database',
            error: error.message
        }, { status: 500 });
    }
}
