'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, Users, X, Check, Pencil } from 'lucide-react';

interface Trip {
    _id: string;
    startDate: string;
    endDate: string;
    capacity: number;
    seatsBooked: number;
    waitlistCount: number;
    status: 'open' | 'full' | 'completed' | 'cancelled';
    label?: string;
}

interface TrekDatesProps {
    trekId: string;
}

const STATUS_OPTIONS = ['open', 'full', 'completed', 'cancelled'] as const;

function AvailabilityChip({ trip }: { trip: Trip }) {
    const seatsLeft = trip.capacity - trip.seatsBooked;

    if (trip.status === 'cancelled') {
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-gray-100 text-gray-500 uppercase tracking-wider">Cancelled</span>;
    }
    if (trip.status === 'completed') {
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-purple-100 text-purple-600 uppercase tracking-wider">Done</span>;
    }
    if (trip.status === 'full' || seatsLeft <= 0) {
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-gray-200 text-gray-500 uppercase tracking-wider">Full</span>;
    }
    if (trip.waitlistCount > 0) {
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-blue-100 text-blue-700 uppercase tracking-wider">WL {trip.waitlistCount}</span>;
    }
    if (seatsLeft <= 5) {
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-orange-100 text-orange-600 uppercase tracking-wider">Last {seatsLeft}</span>;
    }
    return <span className="px-2 py-0.5 text-xs font-bold rounded bg-green-100 text-green-700 uppercase tracking-wider">Avbl</span>;
}

export default function TrekDates({ trekId }: TrekDatesProps) {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    // Add form
    const [showAdd, setShowAdd] = useState(false);
    const [newTrip, setNewTrip] = useState({
        startDate: '', endDate: '', capacity: 15, waitlistCount: 0, label: '', status: 'open',
    });
    const [adding, setAdding] = useState(false);

    // Edit state: { [tripId]: editedFields }
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editFields, setEditFields] = useState<Partial<Trip>>({});
    const [saving, setSaving] = useState(false);

    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchTrips();
    }, [trekId]);

    const fetchTrips = async () => {
        try {
            const res = await fetch(`/api/trips?trekID=${trekId}`);
            const json = await res.json();
            if (json.success) setTrips(json.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTrip.startDate || !newTrip.endDate) return;
        setAdding(true);
        try {
            const res = await fetch('/api/trips', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newTrip, trek: trekId }),
            });
            const json = await res.json();
            if (json.success) {
                setTrips(prev => [...prev, json.data]);
                setShowAdd(false);
                setNewTrip({ startDate: '', endDate: '', capacity: 15, waitlistCount: 0, label: '', status: 'open' });
            } else {
                alert(json.error);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setAdding(false);
        }
    };

    const startEdit = (trip: Trip) => {
        setEditingId(trip._id);
        setEditFields({
            startDate: trip.startDate.slice(0, 10),
            endDate: trip.endDate.slice(0, 10),
            capacity: trip.capacity,
            seatsBooked: trip.seatsBooked,
            waitlistCount: trip.waitlistCount ?? 0,
            status: trip.status,
            label: trip.label || '',
        });
    };

    const handleSaveEdit = async (tripId: string) => {
        setSaving(true);
        try {
            const res = await fetch(`/api/trips/${tripId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editFields),
            });
            const json = await res.json();
            if (json.success) {
                setTrips(prev => prev.map(t => t._id === tripId ? { ...t, ...json.data } : t));
                setEditingId(null);
            } else {
                alert(json.error || 'Failed to save');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this batch?')) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/trips/${id}`, { method: 'DELETE' });
            if (res.ok) setTrips(prev => prev.filter(t => t._id !== id));
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    };

    const inputCls = "w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-[#4b2e83] focus:ring-2 focus:ring-[#4b2e83]/20 focus:outline-none transition-all";
    const labelCls = "block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider";

    const fmt = (iso: string) => new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    Scheduled Batches
                    <span className="ml-2 text-sm font-normal text-gray-400">({trips.length})</span>
                </h3>
                {!showAdd && (
                    <button
                        type="button"
                        onClick={() => setShowAdd(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition font-medium text-sm"
                    >
                        <Plus className="w-4 h-4" /> Add Batch
                    </button>
                )}
            </div>

            {/* ── Add form ── */}
            {showAdd && (
                <div className="bg-indigo-50/60 dark:bg-gray-900/50 p-5 rounded-xl border border-dashed border-indigo-300 dark:border-gray-600 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Create New Batch</h4>
                        <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <form onSubmit={handleAdd} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
                        <div>
                            <label className={labelCls}>Start Date</label>
                            <input type="date" className={inputCls} value={newTrip.startDate}
                                onChange={e => setNewTrip(p => ({ ...p, startDate: e.target.value }))} required />
                        </div>
                        <div>
                            <label className={labelCls}>End Date</label>
                            <input type="date" className={inputCls} value={newTrip.endDate}
                                onChange={e => setNewTrip(p => ({ ...p, endDate: e.target.value }))} required />
                        </div>
                        <div>
                            <label className={labelCls}>Capacity</label>
                            <input type="number" min={1} className={inputCls} value={newTrip.capacity}
                                onChange={e => setNewTrip(p => ({ ...p, capacity: parseInt(e.target.value) || 1 }))} />
                        </div>
                        <div>
                            <label className={labelCls}>Waitlist</label>
                            <input type="number" min={0} className={inputCls} value={newTrip.waitlistCount}
                                onChange={e => setNewTrip(p => ({ ...p, waitlistCount: parseInt(e.target.value) || 0 }))} />
                        </div>
                        <div className="col-span-2 md:col-span-1 lg:col-span-1">
                            <label className={labelCls}>Label (optional)</label>
                            <input type="text" className={inputCls} placeholder="e.g. Family Trek" value={newTrip.label}
                                onChange={e => setNewTrip(p => ({ ...p, label: e.target.value }))} />
                        </div>
                        <div>
                            <button type="submit" disabled={adding}
                                className="w-full flex justify-center items-center gap-2 bg-[#4b2e83] hover:bg-[#3b2368] text-white py-2.5 rounded-xl transition font-medium shadow-md text-sm disabled:opacity-60">
                                {adding ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Check className="w-4 h-4" />}
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ── List ── */}
            <div className="space-y-3">
                {loading ? (
                    <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                        <div className="animate-spin w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-2" />
                        Loading schedule...
                    </div>
                ) : trips.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/30 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                        <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No batches scheduled yet</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Add dates so users can book this trek</p>
                    </div>
                ) : (
                    trips.map(trip => {
                        const seatsLeft = trip.capacity - trip.seatsBooked;
                        const fillPct = Math.min(100, (trip.seatsBooked / trip.capacity) * 100);
                        const isEditing = editingId === trip._id;

                        return (
                            <div key={trip._id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">

                                {/* ── View Mode ── */}
                                {!isEditing ? (
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3">
                                        {/* Date + label */}
                                        <div className="flex items-center gap-4">
                                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg text-indigo-600 dark:text-indigo-400 shrink-0 text-center min-w-[48px]">
                                                <span className="text-[10px] font-bold uppercase block">
                                                    {new Date(trip.startDate).toLocaleString('default', { month: 'short' })}
                                                </span>
                                                <span className="text-xl font-bold leading-none block">
                                                    {new Date(trip.startDate).getDate()}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                                        {fmt(trip.startDate)} → {fmt(trip.endDate)}
                                                    </h4>
                                                    {trip.label && (
                                                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full border border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
                                                            {trip.label}
                                                        </span>
                                                    )}
                                                </div>
                                                {/* Seats fill bar */}
                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="h-1.5 w-28 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all ${fillPct >= 100 ? 'bg-gray-400' : fillPct >= 70 ? 'bg-orange-400' : 'bg-green-500'}`}
                                                            style={{ width: `${fillPct}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {trip.seatsBooked}/{trip.capacity} seats
                                                        {trip.waitlistCount > 0 && <span className="ml-1 text-blue-500">· WL {trip.waitlistCount}</span>}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: chips + actions */}
                                        <div className="flex items-center gap-2 pl-16 sm:pl-0">
                                            <AvailabilityChip trip={trip} />
                                            <button
                                                type="button"
                                                onClick={() => startEdit(trip)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                                title="Edit Batch"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(trip._id)}
                                                disabled={deletingId === trip._id}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-40"
                                                title="Delete Batch"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* ── Edit Mode ── */
                                    <div className="p-4 bg-indigo-50/50 dark:bg-gray-900/60">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Edit Batch</h4>
                                            <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
                                            <div>
                                                <label className={labelCls}>Start</label>
                                                <input type="date" className={inputCls}
                                                    value={typeof editFields.startDate === 'string' ? editFields.startDate : ''}
                                                    onChange={e => setEditFields(p => ({ ...p, startDate: e.target.value }))} />
                                            </div>
                                            <div>
                                                <label className={labelCls}>End</label>
                                                <input type="date" className={inputCls}
                                                    value={typeof editFields.endDate === 'string' ? editFields.endDate : ''}
                                                    onChange={e => setEditFields(p => ({ ...p, endDate: e.target.value }))} />
                                            </div>
                                            <div>
                                                <label className={labelCls}>Capacity</label>
                                                <input type="number" min={1} className={inputCls}
                                                    value={editFields.capacity ?? ''}
                                                    onChange={e => setEditFields(p => ({ ...p, capacity: parseInt(e.target.value) || 1 }))} />
                                            </div>
                                            <div>
                                                <label className={labelCls}>Waitlist</label>
                                                <input type="number" min={0} className={inputCls}
                                                    value={editFields.waitlistCount ?? 0}
                                                    onChange={e => setEditFields(p => ({ ...p, waitlistCount: parseInt(e.target.value) || 0 }))} />
                                            </div>
                                            <div>
                                                <label className={labelCls}>Status</label>
                                                <select className={inputCls}
                                                    value={editFields.status ?? 'open'}
                                                    onChange={e => setEditFields(p => ({ ...p, status: e.target.value as any }))}>
                                                    {STATUS_OPTIONS.map(s => (
                                                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelCls}>Label</label>
                                                <input type="text" className={inputCls} placeholder="e.g. Family Trek"
                                                    value={editFields.label ?? ''}
                                                    onChange={e => setEditFields(p => ({ ...p, label: e.target.value }))} />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 mt-4">
                                            <button type="button" onClick={() => setEditingId(null)}
                                                className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                                Cancel
                                            </button>
                                            <button type="button" onClick={() => handleSaveEdit(trip._id)} disabled={saving}
                                                className="flex items-center gap-2 px-5 py-2 text-sm bg-[#4b2e83] hover:bg-[#3b2368] text-white rounded-lg transition font-medium shadow disabled:opacity-60">
                                                {saving ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Check className="w-4 h-4" />}
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
