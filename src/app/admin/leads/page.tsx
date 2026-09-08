'use client';

import { useState, useEffect } from 'react';
import { X, Eye } from 'lucide-react';

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any>(null);

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
      if (res.ok) {
        fetchLeads(); // Refresh leads
        if (selectedLead && selectedLead._id === id) {
           setSelectedLead({...selectedLead, status: newStatus});
        }
      }
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
                <th className="px-6 py-4">Actions</th>
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
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedLead(lead)}
                      className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1 text-xs"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold">Lead Details</h2>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <div>
                  <h3 className="text-xl font-bold">{selectedLead.name}</h3>
                  <div className="text-sm text-gray-500 mt-1 space-y-1">
                    <p>📧 {selectedLead.email}</p>
                    <p>📱 {selectedLead.mobile}</p>
                    <p>📍 {selectedLead.city || 'Location unknown'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <select
                    value={selectedLead.status || 'New'}
                    onChange={(e) => updateStatus(selectedLead._id, e.target.value)}
                    className="text-sm font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Trek Details</h4>
                  <ul className="space-y-2 text-sm">
                    <li><span className="text-gray-500">Trek:</span> {selectedLead.trek}</li>
                    <li><span className="text-gray-500">Date:</span> {selectedLead.month}</li>
                    <li><span className="text-gray-500">Trekkers:</span> {selectedLead.trekkers}</li>
                    <li><span className="text-gray-500">Source:</span> {selectedLead.source}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Profile</h4>
                  <ul className="space-y-2 text-sm">
                    <li><span className="text-gray-500">Age:</span> {selectedLead.age || 'N/A'}</li>
                    <li><span className="text-gray-500">Done trek before?:</span> {selectedLead.hasTrekBefore || 'N/A'}</li>
                    <li><span className="text-gray-500">Fitness:</span> {selectedLead.experience || 'N/A'}</li>
                  </ul>
                </div>
              </div>

              {/* Special Info */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Medical Info</h4>
                <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 p-4 rounded-xl border border-orange-100 dark:border-orange-800/50 text-sm">
                  {selectedLead.medicalCondition || 'No medical conditions reported.'}
                </div>
              </div>

              {selectedLead.helpNeeded && selectedLead.helpNeeded.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Help Requested With</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.helpNeeded.map((help: string, idx: number) => (
                      <span key={idx} className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800/50">
                        {help}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message / Notes</h4>
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 text-sm whitespace-pre-wrap">
                    {selectedLead.message}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
              <button 
                onClick={() => setSelectedLead(null)}
                className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
