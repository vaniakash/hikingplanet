import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import AnalyticsEvent from '@/models/AnalyticsEvent';
import Enquiry from '@/models/Enquiry';

// Basic auth check can be added here if session management exists
// For now, we'll assume the admin dashboard is protected via middleware or layout.

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get('campaignId') || 'butter-festival-2026';

    // 1. Fetch Events
    const events = await AnalyticsEvent.find({ campaignId }).lean();
    
    // Process KPIs
    const bannerViews = events.filter((e) => e.eventName === 'announcement_view').length;
    const bannerClicks = events.filter((e) => e.eventName === 'announcement_click').length;
    const popupViews = events.filter((e) => e.eventName === 'popup_view').length;
    const popupStarted = events.filter((e) => e.eventName === 'popup_form_started').length;
    const popupSubmitted = events.filter((e) => e.eventName === 'popup_form_submitted').length;
    const pageViews = events.filter((e) => e.eventName === 'page_view').length;
    const formStarted = events.filter((e) => e.eventName === 'form_started').length;
    const formSubmitted = events.filter((e) => e.eventName === 'form_submitted').length;

    // Daily Graph Data (last 7 days for page views and banner views)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentEvents = await AnalyticsEvent.find({
      campaignId,
      createdAt: { $gte: sevenDaysAgo }
    }).sort({ createdAt: 1 }).lean();

    const dailyDataMap = new Map();
    // Initialize map
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      dailyDataMap.set(dateStr, { name: dateStr, views: 0, clicks: 0 });
    }

    recentEvents.forEach((e) => {
      const dateStr = new Date(e.createdAt).toISOString().split('T')[0];
      if (dailyDataMap.has(dateStr)) {
        const data = dailyDataMap.get(dateStr);
        if (e.eventName === 'announcement_view' || e.eventName === 'page_view') data.views++;
        if (e.eventName === 'announcement_click') data.clicks++;
      }
    });

    const dailyData = Array.from(dailyDataMap.values());

    // 2. Fetch Leads summary
    const totalLeads = await Enquiry.countDocuments({});
    const newLeads = await Enquiry.countDocuments({ status: 'New' });
    const contactedLeads = await Enquiry.countDocuments({ status: 'Contacted' });
    const confirmedLeads = await Enquiry.countDocuments({ status: 'Confirmed' });

    return NextResponse.json({
      success: true,
      data: {
        kpis: {
          bannerViews,
          bannerClicks,
          popupViews,
          popupStarted,
          popupSubmitted,
          pageViews,
          formStarted,
          formSubmitted,
        },
        dailyData,
        leadsSummary: {
          total: totalLeads,
          new: newLeads,
          contacted: contactedLeads,
          confirmed: confirmedLeads,
        }
      },
    });
  } catch (error: any) {
    console.error('Admin Analytics Error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
