'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, X } from '@phosphor-icons/react/dist/ssr';

export default function GarhwalInteractiveMap({ treks }: { treks: any[] }) {
    const [selectedTrek, setSelectedTrek] = useState<any | null>(null);

    // We only have 3 treks, so we will assign them arbitrary coordinates on our abstract map 
    // to simulate a real map experience.
    const mapMarkers = treks.map((trek, index) => {
        // Just spreading them out visually on our abstract SVG area
        const positions = [
            { top: '30%', left: '40%' },
            { top: '50%', left: '60%' },
            { top: '40%', left: '20%' },
        ];
        return {
            ...trek,
            position: positions[index % positions.length]
        };
    });

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto w-full relative z-10">


                {/* Abstract Interactive Map Area */}
                <div className="relative w-full h-[500px] md:h-[600px] bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                    
                    {/* Abstract Topography SVG Background */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="topo" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M0 50 Q 25 25 50 50 T 100 50" fill="none" stroke="white" strokeWidth="0.5" />
                                <path d="M0 75 Q 25 50 50 75 T 100 75" fill="none" stroke="white" strokeWidth="0.5" />
                                <path d="M0 25 Q 25 0 50 25 T 100 25" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#topo)" />
                        {/* Abstract mountain shapes */}
                        <path d="M10% 100% L30% 40% L50% 100% Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" />
                        <path d="M40% 100% L60% 20% L80% 100% Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
                        <path d="M70% 100% L85% 50% L100% 100% Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" />
                    </svg>

                    {/* Markers */}
                    {mapMarkers.map((trek) => (
                        <div 
                            key={trek._id}
                            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                            style={trek.position}
                            onClick={() => setSelectedTrek(trek)}
                        >
                            <div className="relative">
                                {/* Pulse effect */}
                                <div className="absolute inset-0 bg-[#e30613] rounded-full animate-ping opacity-75" />
                                {/* Marker */}
                                <div className={`relative w-6 h-6 rounded-full border-4 border-slate-900 transition-colors ${selectedTrek?._id === trek._id ? 'bg-yellow-400' : 'bg-[#e30613] group-hover:bg-yellow-400'}`} />
                            </div>
                            
                            {/* Always-on Label */}
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/80 backdrop-blur border border-slate-700 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">
                                {trek.title}
                            </div>
                        </div>
                    ))}

                    {/* Popup Card */}
                    {selectedTrek && (
                        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-96 bg-white rounded-2xl overflow-hidden shadow-2xl z-30 animate-[slideUp_0.3s_ease-out]">
                            <div className="relative h-48 w-full">
                                {selectedTrek.images?.[0] ? (
                                    <Image src={selectedTrek.images[0]} alt={selectedTrek.title} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">No Image</div>
                                )}
                                <button 
                                    onClick={() => setSelectedTrek(null)}
                                    className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white backdrop-blur transition-colors"
                                >
                                    <X weight="bold" />
                                </button>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                                    {selectedTrek.title}
                                </h3>
                                <div className="flex gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                                    <span>{selectedTrek.difficulty}</span>
                                    <span>•</span>
                                    <span>{selectedTrek.duration} Days</span>
                                </div>
                                <Link 
                                    href={`/treks/${selectedTrek.slug}`}
                                    className="flex items-center justify-center gap-2 w-full bg-[#e30613] text-white py-3 rounded uppercase font-bold text-xs tracking-widest hover:bg-[#c10510] transition-colors"
                                >
                                    Explore Expedition <ArrowRight weight="bold" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
