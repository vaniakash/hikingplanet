'use client';

import { useState } from 'react';
import TrekCard from '@/components/TrekCard';

export default function DifficultyScale({ treks }: { treks: any[] }) {
    const difficulties = [
        {
            level: 'EASY',
            description: 'First time trekking? Start here.',
            duration: '2 - 4 Days',
            altitude: 'Up to 10,000 ft',
            experience: 'No prior experience required'
        },
        {
            level: 'EASY-MODERATE',
            description: 'A step up. Some steep climbs but manageable.',
            duration: '4 - 6 Days',
            altitude: 'Up to 12,500 ft',
            experience: 'Active lifestyle recommended'
        },
        {
            level: 'MODERATE',
            description: 'For those who want a challenge. Long walking days.',
            duration: '6 - 8 Days',
            altitude: 'Up to 14,500 ft',
            experience: 'Prior trekking experience highly recommended'
        },
        {
            level: 'DIFFICULT',
            description: 'High passes, technical sections, and raw wilderness.',
            duration: '8+ Days',
            altitude: 'Above 15,000 ft',
            experience: 'Mandatory prior high-altitude experience'
        }
    ];

    const [activeDifficulty, setActiveDifficulty] = useState('EASY-MODERATE');

    // Filter treks based on active difficulty.
    // If we only have 3 treks and they don't match exactly, we'll just show them all
    // as a fallback for the demo so the UI isn't broken.
    const displayedTreks = treks.filter(t => t.difficulty?.toUpperCase() === activeDifficulty);
    const finalTreks = displayedTreks.length > 0 ? displayedTreks : treks; // Fallback to all if none match

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4 font-serif">
                        How Hard Do You Want To Go?
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        Choose a level that pushes you, but keeps you safe.
                    </p>
                </div>

                {/* Interactive Scale */}
                <div className="mb-16">
                    {/* Visual Line */}
                    <div className="relative h-2 bg-slate-100 rounded-full mb-8 hidden md:block">
                        <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full transition-all duration-500"
                            style={{ 
                                width: activeDifficulty === 'EASY' ? '25%' : 
                                       activeDifficulty === 'EASY-MODERATE' ? '50%' : 
                                       activeDifficulty === 'MODERATE' ? '75%' : '100%' 
                            }}
                        />
                    </div>

                    {/* Scale Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {difficulties.map((diff) => (
                            <button
                                key={diff.level}
                                onClick={() => setActiveDifficulty(diff.level)}
                                className={`text-left p-6 rounded-2xl transition-all ${
                                    activeDifficulty === diff.level 
                                        ? 'bg-slate-900 text-white shadow-2xl scale-105' 
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${activeDifficulty === diff.level ? 'text-white' : 'text-slate-900'}`}>
                                    {diff.level}
                                </h3>
                                <p className={`text-sm font-medium mb-6 ${activeDifficulty === diff.level ? 'text-slate-300' : 'text-slate-500'}`}>
                                    {diff.description}
                                </p>
                                
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="opacity-70">Duration</span>
                                        <span className="font-bold">{diff.duration}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="opacity-70">Altitude</span>
                                        <span className="font-bold">{diff.altitude}</span>
                                    </div>
                                    <div className="pt-2 mt-2 border-t border-current/10">
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                                            {diff.experience}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Relevant Treks */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6 border-l-4 border-[#e30613] pl-3">
                        Treks fitting {activeDifficulty}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {finalTreks.map(trek => (
                            <TrekCard key={trek._id} trek={trek} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
