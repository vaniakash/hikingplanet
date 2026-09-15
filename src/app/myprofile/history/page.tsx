'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, MapPin, CalendarCheck, Award, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default function TrekHistoryPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch('/api/consumer/dashboard/history');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setHistory(data.history);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900">Trek History</h1>
                <p className="text-slate-500 mt-1">A record of all your completed adventures.</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
                </div>
            ) : (
                <div className="space-y-4">
                    {history.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                            <p className="text-slate-500">You haven't completed any treks yet.</p>
                            <Link href="/treks" className="mt-4 inline-block px-6 py-2 bg-[#e30613] text-white font-bold rounded-lg hover:bg-red-700">
                                Explore Treks
                            </Link>
                        </div>
                    ) : (
                        history.map(item => (
                            <div key={item.bookingId} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
                                <div className="w-full sm:w-48 h-32 relative rounded-xl overflow-hidden shrink-0 bg-slate-100">
                                    {item.trek?.images?.[0] && (
                                        <Image src={item.trek.images[0]} alt={item.trek.title} fill className="object-cover" />
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900">{item.trek?.title}</h3>
                                            <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                                                <MapPin className="w-4 h-4" /> {item.trek?.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 mt-4 text-sm text-slate-700">
                                        <div className="flex items-center gap-2">
                                            <CalendarCheck className="w-4 h-4 text-emerald-600" />
                                            Completed: {format(new Date(item.dateCompleted), 'MMM d, yyyy')}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Award className="w-4 h-4 text-amber-600" />
                                            {item.trek?.difficulty}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 flex justify-end">
                                        {item.review ? (
                                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-lg border border-emerald-100">
                                                <Star className="w-4 h-4 fill-emerald-700" /> 
                                                Reviewed
                                            </div>
                                        ) : (
                                            <Link 
                                                href={`/myprofile/reviews?write=${item.trek._id}`}
                                                className="px-4 py-2 bg-[#e30613] text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors"
                                            >
                                                Write Review
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
