'use client';

import { useEffect, useState } from 'react';
import { Search, Users, Shield, CheckCircle, XCircle, Loader2, Trophy, Mail, Calendar, User as UserIcon } from 'lucide-react';

interface IUser {
    _id: string;
    email: string;
    name?: string;
    profilePicture?: string;
    role: 'user' | 'admin';
    isVerified: boolean;
    profileComplete: boolean;
    age?: number;
    gender?: string;
    rewards?: { points: number; totalTreksCompleted: number };
    referralCode?: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [filtered, setFiltered] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        let result = users;
        if (roleFilter !== 'all') result = result.filter(u => u.role === roleFilter);
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(u =>
                u.email.toLowerCase().includes(q) ||
                (u.name?.toLowerCase().includes(q)) ||
                (u.referralCode?.toLowerCase().includes(q))
            );
        }
        setFiltered(result);
    }, [search, roleFilter, users]);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            const json = await res.json();
            if (json.success) {
                setUsers(json.data);
                setFiltered(json.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const totalUsers = users.length;
    const verifiedUsers = users.filter(u => u.isVerified).length;
    const adminUsers = users.filter(u => u.role === 'admin').length;
    const completedProfiles = users.filter(u => u.profileComplete).length;

    return (
        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">All Users</h1>
                    <p className="text-gray-500 dark:text-gray-400">View and manage all registered users on HikingPlanet</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Users', value: totalUsers, icon: Users, color: 'indigo' },
                    { label: 'Verified', value: verifiedUsers, icon: CheckCircle, color: 'green' },
                    { label: 'Admins', value: adminUsers, icon: Shield, color: 'purple' },
                    { label: 'Complete Profiles', value: completedProfiles, icon: UserIcon, color: 'blue' },
                ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                        <div className={`w-10 h-10 rounded-xl bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center mb-3`}>
                            <Icon className={`w-5 h-5 text-${color}-600 dark:text-${color}-400`} />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '—' : value}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium uppercase tracking-wide">{label}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email or referral code..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm dark:text-white"
                    />
                </div>
                <div className="flex gap-2">
                    {(['all', 'user', 'admin'] as const).map(r => (
                        <button
                            key={r}
                            onClick={() => setRoleFilter(r)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all border ${
                                roleFilter === r
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                            }`}
                        >
                            {r === 'all' ? 'All Roles' : r}
                        </button>
                    ))}
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Verified</th>
                                <th className="px-6 py-4">Profile</th>
                                <th className="px-6 py-4">Reward Points</th>
                                <th className="px-6 py-4">Treks Done</th>
                                <th className="px-6 py-4">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-16 text-center text-gray-500 dark:text-gray-400">
                                        <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-indigo-500" />
                                        Loading users...
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-16 text-center">
                                        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                                        <p className="text-gray-500 dark:text-gray-400 font-medium">No users found</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filter</p>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((u) => {
                                    const initials = u.name
                                        ? u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                                        : u.email[0].toUpperCase();
                                    return (
                                        <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                                            {/* User */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
                                                        {u.profilePicture ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img src={u.profilePicture} alt={u.name || u.email} className="w-10 h-10 rounded-full object-cover" />
                                                        ) : initials}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 dark:text-white leading-tight">
                                                            {u.name || <span className="italic text-gray-400 font-normal text-xs">No name set</span>}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                            <Mail className="w-3 h-3" />
                                                            {u.email}
                                                        </div>
                                                        {u.referralCode && (
                                                            <div className="text-[10px] text-gray-400 mt-0.5 font-mono">
                                                                REF: {u.referralCode}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role */}
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                                                    u.role === 'admin'
                                                        ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800'
                                                        : 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600'
                                                }`}>
                                                    {u.role === 'admin' && <Shield className="w-3 h-3" />}
                                                    {u.role}
                                                </span>
                                            </td>

                                            {/* Verified */}
                                            <td className="px-6 py-4">
                                                {u.isVerified ? (
                                                    <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold text-xs">
                                                        <CheckCircle className="w-4 h-4" /> Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-red-500 dark:text-red-400 text-xs font-medium">
                                                        <XCircle className="w-4 h-4" /> Unverified
                                                    </span>
                                                )}
                                            </td>

                                            {/* Profile Complete */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${u.profileComplete ? 'bg-green-500 w-full' : 'bg-orange-400 w-1/2'}`}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {u.profileComplete ? 'Complete' : 'Partial'}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Reward Points */}
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-200">
                                                    <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                                                    {u.rewards?.points ?? 0}
                                                </span>
                                            </td>

                                            {/* Treks Done */}
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">
                                                {u.rewards?.totalTreksCompleted ?? 0}
                                            </td>

                                            {/* Joined */}
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(u.createdAt).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                        Showing <span className="font-semibold text-gray-700 dark:text-gray-200">{filtered.length}</span> of <span className="font-semibold text-gray-700 dark:text-gray-200">{totalUsers}</span> users
                    </span>
                    <span className="text-xs opacity-60">Last refreshed: just now</span>
                </div>
            </div>
        </div>
    );
}
