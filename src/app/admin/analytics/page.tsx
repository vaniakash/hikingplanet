import dbConnect from '@/lib/db';
import AnalyticsEvent from '@/models/AnalyticsEvent';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export default async function AnalyticsDashboard() {
  await dbConnect();

  const now = new Date();
  
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
  
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Home Page Views
  const [homeViewsToday, homeViewsWeek, homeViewsMonth] = await Promise.all([
    AnalyticsEvent.countDocuments({ eventName: 'home_page_view', createdAt: { $gte: startOfDay } }),
    AnalyticsEvent.countDocuments({ eventName: 'home_page_view', createdAt: { $gte: startOfWeek } }),
    AnalyticsEvent.countDocuments({ eventName: 'home_page_view', createdAt: { $gte: startOfMonth } }),
  ]);

  // Trek Events Aggregation (Views vs Clicks)
  const trekEvents = await AnalyticsEvent.aggregate([
    {
      $match: {
        eventName: { $in: ['trek_page_view', 'trek_cta_click'] },
        'metadata.trekSlug': { $exists: true }
      }
    },
    {
      $group: {
        _id: '$metadata.trekSlug',
        views: {
          $sum: { $cond: [{ $eq: ['$eventName', 'trek_page_view'] }, 1, 0] }
        },
        clicks: {
          $sum: { $cond: [{ $eq: ['$eventName', 'trek_cta_click'] }, 1, 0] }
        }
      }
    },
    { $sort: { views: -1 } }
  ]);

  // Recent Users
  const recentUsers = await User.find({}).sort({ createdAt: -1 }).limit(20).lean();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Analytics</h1>
        <p className="text-gray-500 mt-2">Track page visits, user engagement, and trek conversions.</p>
      </div>

      {/* ── Home Page Visits ── */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Home Page Visits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-500">Today</p>
            <p className="text-4xl font-bold mt-2 text-indigo-600 dark:text-indigo-400">{homeViewsToday}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-500">This Week</p>
            <p className="text-4xl font-bold mt-2 text-indigo-600 dark:text-indigo-400">{homeViewsWeek}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-500">This Month</p>
            <p className="text-4xl font-bold mt-2 text-indigo-600 dark:text-indigo-400">{homeViewsMonth}</p>
          </div>
        </div>
      </div>

      {/* ── Trek Performance ── */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Trek Page Performance</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {trekEvents.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No trek page analytics recorded yet.</div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {trekEvents.map((trek: any) => {
                const ctr = trek.views > 0 ? Math.round((trek.clicks / trek.views) * 100) : 0;
                return (
                  <div key={trek._id} className="p-6">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{trek._id}</h3>
                        <p className="text-xs text-gray-500">{trek.views} visitors · {trek.clicks} CTA clicks</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{ctr}%</span>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Conversion</p>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full rounded-full transition-all" 
                        style={{ width: `${Math.min(ctr, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Registered Users ── */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Users</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Profile</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">No users found.</td>
                  </tr>
                ) : (
                  recentUsers.map((u: any) => (
                    <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4">
                        <p className="font-semibold text-gray-900 dark:text-white">{u.name || 'Anonymous'}</p>
                        <p className="text-sm text-gray-500">{u.email}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                         <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${u.profileComplete ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {u.profileComplete ? 'Complete' : 'Incomplete'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
