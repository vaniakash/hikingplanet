'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading analytics...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Failed to load analytics</div>;

  const { kpis, dailyData, leadsSummary } = data;

  const bannerCTR = kpis.bannerViews > 0 ? ((kpis.bannerClicks / kpis.bannerViews) * 100).toFixed(1) : 0;
  const pageConversion = kpis.pageViews > 0 ? ((kpis.formSubmitted / kpis.pageViews) * 100).toFixed(1) : 0;
  const popupConversion = kpis.popupViews > 0 ? ((kpis.popupSubmitted / kpis.popupViews) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Overview</h1>
        <p className="text-gray-500 mt-2">Track campaign performance and lead conversion.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500">Total Leads</p>
          <p className="text-3xl font-bold mt-2">{leadsSummary.total}</p>
          <p className="text-xs text-green-500 mt-2">{leadsSummary.new} New Leads</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500">Banner CTR</p>
          <p className="text-3xl font-bold mt-2">{bannerCTR}%</p>
          <p className="text-xs text-gray-400 mt-2">{kpis.bannerClicks} clicks / {kpis.bannerViews} views</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500">Festival Page Conv.</p>
          <p className="text-3xl font-bold mt-2">{pageConversion}%</p>
          <p className="text-xs text-gray-400 mt-2">{kpis.formSubmitted} forms / {kpis.pageViews} visits</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500">Popup Conv.</p>
          <p className="text-3xl font-bold mt-2">{popupConversion}%</p>
          <p className="text-xs text-gray-400 mt-2">{kpis.popupSubmitted} forms / {kpis.popupViews} views</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-6">Interaction Trends (Last 7 Days)</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
              <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={3} name="Total Views" />
              <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={3} name="Interactions" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
           <h3 className="text-lg font-bold mb-4">Butter Festival Funnel</h3>
           <div className="space-y-4">
             <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
               <span>Page Views</span>
               <span className="font-bold">{kpis.pageViews}</span>
             </div>
             <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
               <span>Form Started</span>
               <span className="font-bold">{kpis.formStarted}</span>
             </div>
             <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
               <span>Form Submitted</span>
               <span className="font-bold">{kpis.formSubmitted}</span>
             </div>
           </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
           <h3 className="text-lg font-bold mb-4">Global Popup Funnel</h3>
           <div className="space-y-4">
             <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
               <span>Popup Views</span>
               <span className="font-bold">{kpis.popupViews}</span>
             </div>
             <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
               <span>Form Started</span>
               <span className="font-bold">{kpis.popupStarted}</span>
             </div>
             <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
               <span>Form Submitted</span>
               <span className="font-bold">{kpis.popupSubmitted}</span>
             </div>
           </div>
        </div>
      </div>

    </div>
  );
}
