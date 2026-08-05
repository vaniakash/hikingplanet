import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import AnalyticsEvent from '@/models/AnalyticsEvent';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { campaignId, eventName, metadata, sessionId } = body;

    if (!campaignId || !eventName) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await AnalyticsEvent.create({
      campaignId,
      eventName,
      metadata: metadata || {},
      sessionId: sessionId || 'anonymous',
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Analytics Event Error:', error);
    // Even if it fails, we return 200 so we don't break the client app
    return NextResponse.json({ success: false, error: error.message });
  }
}
