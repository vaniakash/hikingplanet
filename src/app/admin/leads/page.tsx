'use client';

import { useState, useEffect } from 'react';

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    fetch('/api/admin/leads')
      .then(res => res.json())
      .then(json => {
        if (json.success) setLeads(json.data);
        setLoading(false);
      });
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchLeads(); // Refresh leads
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading leads...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lead Management</h1>
        <p className="text-gray-500 mt-2">Manage enquiries and update their status.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Campaign/Trek</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{lead.name}</td>
                  <td className="px-6 py-4">
                    <p>{lead.email}</p>
                    <p className="text-xs text-gray-500">{lead.mobile}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>{lead.trek}</p>
                    <p className="text-xs text-gray-500">Source: {lead.source || 'Direct'}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status || 'New'}
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                        lead.status === 'New' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                        lead.status === 'Confirmed' ? 'bg-green-100 text-green-700 border-green-200' :
                        lead.status === 'Cancelled' ? 'bg-red-100 text-red-700 border-red-200' :
                        'bg-purple-100 text-purple-700 border-purple-200' // Interested
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Interested">Interested</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
