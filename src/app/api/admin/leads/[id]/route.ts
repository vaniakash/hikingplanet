import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const body = await req.json();
    const { status } = body;
    const resolvedParams = await params;

    if (!status) {
      return NextResponse.json({ success: false, message: 'Status is required' }, { status: 400 });
    }

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      resolvedParams.id,
      { status },
      { new: true }
    );

    if (!updatedEnquiry) {
      return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedEnquiry });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
