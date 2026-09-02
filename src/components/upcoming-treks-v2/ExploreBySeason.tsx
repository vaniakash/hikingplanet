'use client';

import { useState } from 'react';
import TrekCard from '@/components/TrekCard';

export default function ExploreBySeason({ treks }: { treks: any[] }) {
    const seasons = ['WINTER', 'SPRING', 'SUMMER', 'MONSOON', 'AUTUMN'];
    const [activeSeason, setActiveSeason] = useState('AUTUMN');

    // Mocks for descriptions since it's UI specific
    const seasonDescriptions: Record<string, string> = {
        WINTER: 'Snow-covered trails, frozen landscapes and summit adventures. (Dec - Mar)',
        SPRING: 'Blooming rhododendrons and lingering snow. (Mar - Apr)',
        SUMMER: 'High altitude passes open up for exploration. (May - Jun)',
        MONSOON: 'Lush green valleys and rain-shadow deserts. (Jul - Aug)',
        AUTUMN: 'Crystal clear views and crisp mountain air. (Sep - Nov)',
    };

    // Filter treks based on season (Mock logic to ensure we show the 3 treks somehow)
    // Since we only have 3 treks and they might not have a 'season' field in the DB yet,
    // we'll just show all of them and pretend they fit the season for demo purposes,
    // OR filter if they actually have a season field.
    const displayedTreks = treks.filter(t => {
        // If DB has season array, use it
        if (t.seasons && Array.isArray(t.seasons)) {
            return t.seasons.map((s: string) => s.toUpperCase()).includes(activeSeason);
        }
        // Fallback: just show all 3 treks so the UI isn't empty.
        return true; 
    });

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4 font-serif">
                        The Mountains Change With The Seasons
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        Every season offers a completely different Garhwal.
                    </p>
                </div>

                {/* Season Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {seasons.map(season => (
                        <button
                            key={season}
                            onClick={() => setActiveSeason(season)}
                            className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${
                                activeSeason === season 
                                    ? 'bg-[#e30613] text-white shadow-xl scale-105' 
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'
                            }`}
                        >
                            {season}
                        </button>
                    ))}
                </div>

                {/* Season Description */}
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
                        {activeSeason} TREKKING
                    </h3>
                    <p className="text-slate-600 font-medium">
                        {seasonDescriptions[activeSeason]}
                    </p>
                </div>

                {/* Trek Grid */}
                {displayedTreks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedTreks.map(trek => (
                            <TrekCard key={trek._id} trek={trek} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                        <p className="text-slate-500 font-medium">No treks available for this season yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
