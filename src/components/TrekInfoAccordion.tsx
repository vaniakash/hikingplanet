'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CaretDown, CaretUp, MapPin, Tent, Backpack, Person, Bed, CloudSun, Mountains, Heartbeat, ImageSquare, FileText, Compass, Sun, MapTrifold, CalendarBlank, AirplaneTilt, BookOpen, ClipboardText, ShareNetwork, Image as ImageIcon, Thermometer } from '@phosphor-icons/react';
import DetailedItineraryTabs, { DetailedItineraryDay } from './DetailedItineraryTabs';

interface InfoSection {
    title: string;
    subtitle: string;
    content: string;
    imageUrl?: string;
}

interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    distance?: string;
    durationInfo?: string;
}

interface Props {
    trekTitle: string;
    infoIntro?: string;
    sections: InfoSection[];
    itinerary?: ItineraryDay[];
    detailedItinerary?: DetailedItineraryDay[];
    itineraryRouteMap?: string;
    difficultyDetails?: {
        level: string;
        description: string;
        terrain?: string;
        weather?: string;
        altitude?: string;
        safety?: string;
    };
    bestSeasonDetails?: {
        seasonName: string;
        temperature: string;
        weather: string;
        warmLayers: string;
        description: string;
    }[];
}

// Helper to guess an icon based on section title
const getIconForTitle = (title: string) => {
    const t = title.toLowerCase();
    if (t === 'journey breakdown') return <img src="/svgs/daybyday.svg" alt="Journey Breakdown" className="w-9 h-9 md:w-10 md:h-10 object-contain group-hover:opacity-80 transition-opacity" />;
    if (t === 'quick itinerary') return <img src="/svgs/quick_itanary.svg" alt="Quick Itinerary" className="w-9 h-9 md:w-10 md:h-10 object-contain group-hover:opacity-80 transition-opacity" />;
    if (t.includes('itinerary')) return <ClipboardText weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    if (t.includes('day look') || t.includes('photo')) return <ImageSquare weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    if (t.includes('difficult')) return <Mountains weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    if (t.includes('time') || t.includes('season') || t.includes('weather')) return <CalendarBlank weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    if (t.includes('packing') || t.includes('take')) return <Backpack weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    if (t.includes('travel') || t.includes('reach')) return <AirplaneTilt weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    return <BookOpen weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
};

export default function TrekInfoAccordion({ trekTitle, infoIntro, sections, itinerary, detailedItinerary, itineraryRouteMap, difficultyDetails, bestSeasonDetails }: Props) {
    const [openId, setOpenId] = useState<number | null>(null);

    // Build the combined list of accordion items.
    // If itinerary exists, it becomes the first item.
    const allItems: any[] = [];
    
    if (itinerary && itinerary.length > 0) {
        allItems.push({
            isItinerary: true,
            title: 'Quick Itinerary',
            subtitle: 'Get your trek plan',
            data: itinerary
        });
    }
        
    if (detailedItinerary && detailedItinerary.length > 0) {
        allItems.push({
            isDetailedItinerary: true,
            title: 'Journey Breakdown',
            subtitle: 'Complete Trek Guide with Photos',
            data: detailedItinerary
        });
    }

    if (difficultyDetails && difficultyDetails.level) {
        allItems.push({
            isDifficultyDetails: true,
            title: `How Difficult Is ${trekTitle}`,
            subtitle: 'What You Can Expect in terms of Terrain, Altitude, Weather and Safety',
            data: difficultyDetails
        });
    }

    if (bestSeasonDetails && bestSeasonDetails.length > 0) {
        allItems.push({
            isBestSeasonDetails: true,
            title: `Best Time To Do ${trekTitle}`,
            subtitle: 'Schedule Your Trek Dates Based on the Best Season',
            data: bestSeasonDetails
        });
    }

    sections.forEach(sec => {
        allItems.push({
            isItinerary: false,
            ...sec
        });
    });

    if (allItems.length === 0) return null;

    const toggle = (i: number) => setOpenId(openId === i ? null : i);

    return (
        <section className="mt-16 mb-20 max-w-[1000px] mx-auto">
            {/* Header */}
            <div className="mb-8 pb-4 border-b-2 border-[#dc2626] flex flex-col md:flex-row md:items-end justify-between gap-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight max-w-3xl">
                    {trekTitle} - Complete Trek Information
                </h2>
                <button className="flex items-center gap-2 text-stone-900 font-medium hover:text-[#dc2626] transition-colors whitespace-nowrap mb-2">
                    <ShareNetwork className="w-5 h-5" /> Share Link
                </button>
            </div>

            {/* Intro text */}
            {infoIntro && (
                <div className="mb-10 text-[17px] md:text-[19px] text-stone-800 leading-relaxed font-serif whitespace-pre-line">
                    {infoIntro}
                </div>
            )}

            {/* Accordion list */}
            <div className="flex flex-col border-t border-[#dc2626]">
                {allItems.map((item, i) => {
                    const isOpen = openId === i;
                    
                    return (
                        <div key={i} className="border-b border-[#dc2626]">
                            <button
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between py-5 md:py-8 group text-left"
                            >
                                <div className="flex items-center gap-4 md:gap-6 min-w-0">
                                    <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                                        {getIconForTitle(item.title)}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-serif font-black text-2xl md:text-[28px] text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">
                                            {item.title}
                                        </h3>
                                        {item.subtitle && (
                                            <p className="text-[15px] md:text-base text-stone-900 mt-1 truncate font-medium">{item.subtitle}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="shrink-0 ml-4 text-stone-900">
                                    {isOpen ? <CaretUp weight="bold" className="w-6 h-6" /> : <CaretDown weight="bold" className="w-6 h-6" />}
                                </div>
                            </button>

                            {isOpen && (
                                <div className="pb-10 pt-2 pl-2 md:pl-[88px] pr-2 md:pr-4">
                                    {item.isItinerary ? (
                                        <div className="space-y-12">
                                            {itineraryRouteMap && (
                                                <div className="mb-10 text-center">
                                                    <h3 className="font-serif font-black text-3xl md:text-5xl text-[#57534e] tracking-tight uppercase mb-1">
                                                        {trekTitle}
                                                    </h3>
                                                    <p className="text-[15px] font-bold tracking-widest text-[#78716c] uppercase mb-6">Trek Map</p>
                                                    <div className="relative w-full rounded-2xl overflow-hidden border border-[#e7e5e4] bg-white p-4 shadow-sm">
                                                        <img
                                                            src={itineraryRouteMap}
                                                            alt={`${trekTitle} Trek Map`}
                                                            className="w-full h-auto object-contain max-h-[80vh]"
                                                        />
                                                    </div>
                                                    <p className="text-[14px] text-stone-500 italic mt-4 mb-4">
                                                        Study this map to get a visual cue of the {trekTitle} trek.
                                                    </p>
                                                </div>
                                            )}
                                            {item.data.map((dayItem: any, idx: number) => (
                                                <div key={idx} className="flex flex-col md:flex-row gap-3 md:gap-8">
                                                    <div className="md:w-20 shrink-0 font-black text-[#dc2626] text-lg mt-0.5 tracking-tight">
                                                        DAY {dayItem.day}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-lg md:text-xl font-bold text-stone-900 mb-2 leading-snug">{dayItem.title}</h4>
                                                        
                                                        {(dayItem.distance || dayItem.durationInfo) && (
                                                            <div className="text-[14px] text-stone-600 mb-4 flex flex-wrap items-center gap-2">
                                                                {dayItem.distance && <span><span className="font-bold text-stone-800">Trek Distance:</span> {dayItem.distance}</span>}
                                                                {dayItem.distance && dayItem.durationInfo && <span className="text-stone-300">|</span>}
                                                                {dayItem.durationInfo && <span><span className="font-bold text-stone-800">Trek Duration:</span> {dayItem.durationInfo}</span>}
                                                            </div>
                                                        )}
                                                        
                                                        <p className="text-stone-700 leading-relaxed text-[16px]">
                                                            {dayItem.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : item.isDetailedItinerary ? (
                                        <DetailedItineraryTabs itinerary={item.data} />
                                    ) : item.isBestSeasonDetails ? (
                                        <div className="space-y-12 pt-4">
                                            {item.data.map((season: any, idx: number) => (
                                                <div key={idx} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                                                    <h3 className="text-2xl font-bold text-stone-900 mb-6 font-serif tracking-tight">{season.seasonName}</h3>
                                                    
                                                    <div className="space-y-5 mb-8 text-[15px]">
                                                        {season.temperature && (
                                                            <div className="flex items-start gap-4">
                                                                <HourglassHigh weight="duotone" className="w-7 h-7 text-yellow-500 shrink-0" />
                                                                <div className="text-stone-800 leading-relaxed pt-0.5">{season.temperature}</div>
                                                            </div>
                                                        )}
                                                        {season.weather && (
                                                            <div className="flex items-start gap-4">
                                                                <Boot weight="duotone" className="w-7 h-7 text-yellow-500 shrink-0" />
                                                                <div className="text-stone-800 leading-relaxed pt-0.5">{season.weather}</div>
                                                            </div>
                                                        )}
                                                        {season.warmLayers && (
                                                            <div className="flex items-start gap-4">
                                                                <Backpack weight="duotone" className="w-7 h-7 text-yellow-500 shrink-0" />
                                                                <div className="text-stone-800 leading-relaxed pt-0.5">{season.warmLayers}</div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {season.description && (
                                                        <div className="text-stone-800 leading-loose space-y-5 font-serif text-[17px]">
                                                            {season.description.split('\n').map((para: string, pIdx: number) => {
                                                                if (!para.trim()) return null;
                                                                // Highlight specific notes if they start with "| Note:"
                                                                if (para.startsWith('| Note:')) {
                                                                    return <p key={pIdx} className="font-bold text-stone-900">{para}</p>;
                                                                }
                                                                return <p key={pIdx}>{para}</p>;
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : item.isDifficultyDetails ? (
                                        <div className="flex flex-col md:flex-row gap-8 md:gap-16 pt-4">
                                            {/* Graphic Left */}
                                            <div className="md:w-48 shrink-0 text-center flex flex-col items-center">
                                                <div className="flex items-end gap-1.5 justify-center mb-4 h-20">
                                                    {[1, 2, 3, 4].map(idx => {
                                                        const activeThreshold = 
                                                            item.data.level === 'Easy' ? 1 : 
                                                            item.data.level === 'Easy-Moderate' ? 2 : 
                                                            item.data.level === 'Moderate' ? 2 : 
                                                            item.data.level === 'Moderate-Difficult' ? 3 : 
                                                            item.data.level === 'Difficult' ? 4 : 4;
                                                        
                                                        const colorClass = 
                                                            item.data.level.includes('Easy') ? 'bg-green-400' :
                                                            item.data.level === 'Moderate' ? 'bg-orange-400' :
                                                            item.data.level === 'Moderate-Difficult' ? 'bg-orange-500' :
                                                            'bg-red-500';

                                                        const isActive = idx <= activeThreshold;

                                                        return (
                                                            <div 
                                                                key={idx} 
                                                                className={`w-4 rounded-t-sm transition-all ${isActive ? colorClass : 'bg-gray-200 dark:bg-gray-700'}`}
                                                                style={{ height: `${(idx / 4) * 100}%` }}
                                                            />
                                                        )
                                                    })}
                                                </div>
                                                <div className="font-black text-xl text-stone-900 mb-2 leading-tight uppercase">
                                                    {item.data.level}
                                                </div>
                                                <div className="text-[15px] font-bold text-stone-600 leading-snug">
                                                    {item.data.description}
                                                </div>
                                            </div>
                                            
                                            {/* Content Right */}
                                            <div className="flex-1 space-y-8">
                                                {item.data.terrain && (
                                                    <div>
                                                        <h4 className="font-bold text-xl text-stone-900 mb-3 font-serif">Terrain:</h4>
                                                        <ul className="text-stone-700 leading-relaxed space-y-2 whitespace-pre-line ml-6 list-disc list-outside text-[16px]">
                                                            {item.data.terrain.split('\n').map((line: string, i: number) => {
                                                                if (!line.trim()) return null;
                                                                const cleanLine = line.replace(/^[•\-\*]\s*/, '');
                                                                return <li key={i}>{cleanLine}</li>;
                                                            })}
                                                        </ul>
                                                    </div>
                                                )}
                                                
                                                {item.data.weather && (
                                                    <div>
                                                        <h4 className="font-bold text-xl text-stone-900 mb-3 font-serif">Weather:</h4>
                                                        <ul className="text-stone-700 leading-relaxed space-y-2 whitespace-pre-line ml-6 list-disc list-outside text-[16px]">
                                                            {item.data.weather.split('\n').map((line: string, i: number) => {
                                                                if (!line.trim()) return null;
                                                                const cleanLine = line.replace(/^[•\-\*]\s*/, '');
                                                                return <li key={i}>{cleanLine}</li>;
                                                            })}
                                                        </ul>
                                                    </div>
                                                )}

                                                {item.data.altitude && (
                                                    <div>
                                                        <h4 className="font-bold text-xl text-stone-900 mb-3 font-serif">Altitude:</h4>
                                                        <ul className="text-stone-700 leading-relaxed space-y-2 whitespace-pre-line ml-6 list-disc list-outside text-[16px]">
                                                            {item.data.altitude.split('\n').map((line: string, i: number) => {
                                                                if (!line.trim()) return null;
                                                                const cleanLine = line.replace(/^[•\-\*]\s*/, '');
                                                                return <li key={i}>{cleanLine}</li>;
                                                            })}
                                                        </ul>
                                                    </div>
                                                )}

                                                {item.data.safety && (
                                                    <div className="font-bold text-[15px] text-stone-900 leading-relaxed mt-10">
                                                        Please note: {item.data.safety}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {item.imageUrl && (
                                                <div className="mb-8 relative w-full rounded-xl overflow-hidden border border-stone-200" style={{ aspectRatio: '16/9', maxHeight: 450 }}>
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                        fill
                                                        className="object-contain bg-white"
                                                    />
                                                </div>
                                            )}
                                            {item.content && (
                                                <div className="prose prose-stone prose-lg max-w-none text-stone-800 leading-relaxed font-serif whitespace-pre-line">
                                                    {item.content}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
