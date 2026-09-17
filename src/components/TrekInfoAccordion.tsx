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
}

// Helper to guess an icon based on section title
const getIconForTitle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('itinerary')) return <ClipboardText weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    if (t.includes('day look') || t.includes('photo')) return <ImageSquare weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    if (t.includes('difficult')) return <Mountains weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    if (t.includes('time') || t.includes('season') || t.includes('weather')) return <CalendarBlank weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    if (t.includes('packing') || t.includes('take')) return <Backpack weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    if (t.includes('travel') || t.includes('reach')) return <AirplaneTilt weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
    return <BookOpen weight="duotone" className="w-9 h-9 md:w-10 md:h-10 text-stone-700 group-hover:text-[#dc2626] transition-colors" />;
};

export default function TrekInfoAccordion({ trekTitle, infoIntro, sections, itinerary, detailedItinerary, itineraryRouteMap }: Props) {
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
