'use client';

import React, { useState } from 'react';
import { useDashboard } from '../layout';
import { Lock, Shield, HelpCircle, Mail, MessageSquare } from 'lucide-react';

export default function AccountSettingsPage() {
    const { user } = useDashboard();
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Password change functionality will be integrated with the authentication provider soon.');
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-black text-slate-900">Account & Security</h1>
                <p className="text-slate-500 mt-1">Manage your account security and get help.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Security Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-[#e30613]" /> Security Settings
                    </h2>
                    
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                            <input
                                type="password"
                                value={passwordData.current}
                                onChange={e => setPasswordData({...passwordData, current: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                            <input
                                type="password"
                                value={passwordData.new}
                                onChange={e => setPasswordData({...passwordData, new: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwordData.confirm}
                                onChange={e => setPasswordData({...passwordData, confirm: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                <Lock className="w-4 h-4" /> Update Password
                            </button>
                        </div>
                    </form>
                </div>

                {/* Help & Support Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-blue-500" /> Help & Support
                    </h2>
                    
                    <div className="space-y-4">
                        <a href="/about" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white">
                                <MessageSquare className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 group-hover:text-blue-700">FAQ & Guidelines</h3>
                                <p className="text-sm text-slate-500">Read our trekking guidelines.</p>
                            </div>
                        </a>
                        
                        <a href="mailto:support@hikingplanet.in" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white">
                                <Mail className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 group-hover:text-blue-700">Contact Support</h3>
                                <p className="text-sm text-slate-500">support@hikingplanet.in</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
