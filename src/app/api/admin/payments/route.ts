import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import { Enquiry } from '@/models/Enquiry';
import { verifyJWT } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        // Auth Check
        const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0];
        const payload = token ? await verifyJWT(token) : null;

        if (!payload || payload.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Fetch Bookings
        const bookings = await Booking.find({})
            .populate('trek', 'title')
            .lean();

        // Fetch Enquiries
        const enquiries = await Enquiry.find({}).lean();

        // Format and combine
        const payments = [];

        // Process Bookings
        for (const b of bookings) {
            payments.push({
                id: b._id.toString(),
                type: 'Booking',
                name: b.guestDetails?.name || 'Unknown',
                email: b.guestDetails?.email || 'Unknown',
                amount: b.totalAmount || 0,
                status: b.paymentStatus?.toLowerCase() || 'pending',
                date: b.createdAt,
                transactionId: b.paymentDetails?.payuTransactionId || 'N/A',
                item: (b.trek as any)?.title || 'Unknown Trek'
            });
        }

        // Process Enquiries
        for (const e of enquiries) {
            payments.push({
                id: e._id.toString(),
                type: 'Enquiry',
                name: e.name || 'Unknown',
                email: e.email || 'Unknown',
                amount: e.amountPaid || 0, // Enquiries have advance fee
                status: e.paymentStatus?.toLowerCase() || 'pending',
                date: e.createdAt,
                transactionId: e.payuTransactionId || 'N/A',
                item: e.trek || 'Unknown Campaign'
            });
        }

        // Sort by date (newest first)
        payments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json({ success: true, data: payments });
    } catch (error: any) {
        console.error('Error fetching payments:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch payments' }, { status: 500 });
    }
}
