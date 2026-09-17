'use client';

import React, { useState } from 'react';
import { HourglassHigh, TrendUp, Mountains, Footprints, PersonSimpleWalk, Drop } from '@phosphor-icons/react';

export interface DetailedItineraryDay {
    day: number;
    title: string;
    driveDuration?: string;
    trekDuration?: string;
    trekDistance?: string;
    altitude?: string;
    ascent?: string;
    waterSources?: string;
    description?: string;
    images?: string[];
}

export default function DetailedItineraryTabs({ itinerary }: { itinerary: DetailedItineraryDay[] }) {
    const [activeDay, setActiveDay] = useState(0);
    const dayData = itinerary[activeDay];

    if (!dayData) return null;

    return (
        <div className="w-full">
            {/* Tabs */}
            <div className="flex w-full overflow-x-auto hide-scrollbar bg-[#f5f5f4] mb-8">
                {itinerary.map((day, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveDay(idx)}
                        className={`flex flex-col items-center justify-center py-3 px-6 min-w-[80px] shrink-0 font-bold text-sm tracking-widest transition-colors ${
                            activeDay === idx 
                                ? 'bg-[#dc2626] text-white' 
                                : 'text-stone-700 hover:bg-stone-200'
                        }`}
                    >
                        <span>DAY</span>
                        <span>{day.day}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="space-y-6">
                <h3 className="font-serif font-black text-2xl md:text-3xl text-stone-900 leading-snug">
                    {dayData.title}
                </h3>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                    {dayData.driveDuration && (
                        <div className="flex items-start gap-3">
                            <HourglassHigh weight="duotone" className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                            <p className="text-[15px] text-stone-800">
                                <span className="font-bold text-stone-900">Drive Duration:</span> {dayData.driveDuration}
                            </p>
                        </div>
                    )}
                    
                    {(dayData.trekDuration || dayData.trekDistance) && (
                        <div className="flex items-start gap-3">
                            <PersonSimpleWalk weight="duotone" className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                            <p className="text-[15px] text-stone-800">
                                {dayData.trekDuration && <span><span className="font-bold text-stone-900">Trek Duration:</span> {dayData.trekDuration}</span>}
                                {dayData.trekDuration && dayData.trekDistance && <span className="mx-2 text-stone-300">|</span>}
                                {dayData.trekDistance && <span><span className="font-bold text-stone-900">Trek Distance:</span> {dayData.trekDistance}</span>}
                            </p>
                        </div>
                    )}

                    {dayData.altitude && (
                        <div className="flex items-start gap-3">
                            <Mountains weight="duotone" className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                            <p className="text-[15px] text-stone-800">
                                <span className="font-bold text-stone-900">Altitude:</span> {dayData.altitude}
                            </p>
                        </div>
                    )}

                    {dayData.ascent && (
                        <div className="flex items-start gap-3">
                            <TrendUp weight="duotone" className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                            <p className="text-[15px] text-stone-800">
                                {dayData.ascent}
                            </p>
                        </div>
                    )}

                    {dayData.waterSources && (
                        <div className="flex items-start gap-3">
                            <Drop weight="duotone" className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                            <p className="text-[15px] text-stone-800">
                                <span className="font-bold text-stone-900">Water Sources:</span> {dayData.waterSources}
                            </p>
                        </div>
                    )}
                </div>

                {/* Image Masonry Grid (up to 4 images) */}
                {dayData.images && dayData.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 my-8">
                        {/* First Image - Large on left */}
                        <div className="w-full h-full min-h-[300px]">
                            <img src={dayData.images[0]} alt={`Day ${dayData.day} scenery`} className="w-full h-full object-cover rounded-sm" />
                        </div>
                        {/* Remaining Images - Right side grid */}
                        {dayData.images.length > 1 && (
                            <div className={`grid gap-2 md:gap-4 ${dayData.images.length === 2 ? 'grid-rows-1' : dayData.images.length === 3 ? 'grid-rows-2' : 'grid-cols-2 grid-rows-2'}`}>
                                {dayData.images.slice(1, 5).map((img, i) => (
                                    <div key={i} className="w-full h-full min-h-[150px]">
                                        <img src={img} alt={`Day ${dayData.day} additional scenery`} className="w-full h-full object-cover rounded-sm" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Detailed Description */}
                {dayData.description && (
                    <div className="text-[16px] leading-relaxed text-stone-800 space-y-4 whitespace-pre-line font-serif">
                        {dayData.description}
                    </div>
                )}

                {/* Next Button */}
                {activeDay < itinerary.length - 1 && (
                    <div className="flex justify-end mt-12 pt-6 border-t border-stone-200">
                        <button 
                            onClick={() => setActiveDay(activeDay + 1)}
                            className="text-sm font-bold text-stone-800 hover:text-[#dc2626] transition-colors flex items-center gap-2"
                        >
                            Day {dayData.day + 1} &raquo;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
