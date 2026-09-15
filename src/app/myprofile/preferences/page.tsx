'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Save, Filter } from 'lucide-react';

const OPTIONS = {
    difficulty: ['Easy', 'Moderate', 'Difficult', 'Expert'],
    duration: ['Weekend (1-2 days)', 'Short (3-5 days)', 'Long (6-10 days)', 'Expedition (10+ days)'],
    seasons: ['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter'],
    regions: ['Uttarakhand', 'Himachal Pradesh', 'Kashmir', 'Sikkim', 'Nepal', 'Sahyadris']
};

export default function PreferencesPage() {
    const [preferences, setPreferences] = useState<{ [key: string]: string[] }>({
        difficulty: [],
        duration: [],
        seasons: [],
        regions: []
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const res = await fetch('/api/consumer/dashboard/preferences');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && data.preferences) {
                        setPreferences(data.preferences);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPreferences();
    }, []);

    const togglePreference = (category: string, value: string) => {
        setPreferences(prev => {
            const current = prev[category] || [];
            if (current.includes(value)) {
                return { ...prev, [category]: current.filter(v => v !== value) };
            } else {
                return { ...prev, [category]: [...current, value] };
            }
        });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });
        
        try {
            const res = await fetch('/api/consumer/dashboard/preferences', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ preferences })
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: 'success', text: 'Preferences saved successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to save preferences.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900">Trek Preferences</h1>
                <p className="text-slate-500 mt-1">Tell us what you like, and we'll recommend the best treks for you.</p>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
                </div>
            ) : (
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
                    {/* Difficulty */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-[#e30613]" /> Preferred Difficulty
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {OPTIONS.difficulty.map(option => (
                                <button
                                    key={option}
                                    onClick={() => togglePreference('difficulty', option)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                                        preferences.difficulty?.includes(option)
                                        ? 'bg-[#e30613] text-white border-[#e30613]'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#e30613] hover:text-[#e30613]'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-[#e30613]" /> Preferred Duration
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {OPTIONS.duration.map(option => (
                                <button
                                    key={option}
                                    onClick={() => togglePreference('duration', option)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                                        preferences.duration?.includes(option)
                                        ? 'bg-[#e30613] text-white border-[#e30613]'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#e30613] hover:text-[#e30613]'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Seasons */}
                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-[#e30613]" /> Preferred Seasons
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {OPTIONS.seasons.map(option => (
                                <button
                                    key={option}
                                    onClick={() => togglePreference('seasons', option)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                                        preferences.seasons?.includes(option)
                                        ? 'bg-[#e30613] text-white border-[#e30613]'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#e30613] hover:text-[#e30613]'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Regions */}
                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-[#e30613]" /> Preferred Regions
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {OPTIONS.regions.map(option => (
                                <button
                                    key={option}
                                    onClick={() => togglePreference('regions', option)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                                        preferences.regions?.includes(option)
                                        ? 'bg-[#e30613] text-white border-[#e30613]'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#e30613] hover:text-[#e30613]'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-8 py-3 bg-[#e30613] text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-70"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            {saving ? 'Saving...' : 'Save Preferences'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
