import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enquiry } from '@/models/Enquiry';

export async function GET() {
  try {
    await dbConnect();
    // Fetch all leads, sorted by newest
    const leads = await Enquiry.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: leads });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
