'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SlidersHorizontal, CaretRight, CaretLeft, MapPin, Heart, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';

interface TrekItem {
    id: string;
    title: string;
    slug: string;
    location: string;
    duration: string;
    grade: string;
    image: string;
}

export default function PlanYourAdventure({ initialTreks = [] }: { initialTreks?: any[] }) {
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});
    const carouselRef = useRef<HTMLDivElement>(null);

    const displayTreks: TrekItem[] = (initialTreks || []).map((dbTrek: any) => ({
        id: dbTrek._id?.toString() || Math.random().toString(),
        title: dbTrek.title,
        slug: dbTrek.slug,
        location: dbTrek.location?.replace('Bhatwari Block, ', ''),
        duration: `${dbTrek.duration} days`,
        grade: dbTrek.difficulty,
        image: dbTrek.images?.[0] || ''
    }));



    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -340 : 340;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const toggleFavorite = (id: string) => {
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="py-20 bg-white text-slate-900 select-none overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* ── Header Section ── */}
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Plan Your Next Adventure
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 font-medium mt-2 max-w-xl">
                        Filter treks by season, region, difficulty, month and more.
                    </p>
                    {/* Underline accent */}
                    <div className="w-12 h-1 bg-[#e30613] mt-4 rounded-full" />
                </div>



                {/* ── Carousel Section Title ── */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 text-left">
                    Most Popular Upcoming Himalayan Treks
                </h3>

                {/* ── Trek Cards Carousel ── */}
                <div className="relative">
                    {/* Left Navigation Button */}
                    <button
                        onClick={() => scrollCarousel('left')}
                        className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xl flex items-center justify-center text-slate-700 hover:bg-gray-50 transition-all focus:outline-none hidden sm:flex"
                        aria-label="Scroll left"
                    >
                        <CaretLeft weight="bold" size={18} />
                    </button>

                    {/* Right Navigation Button */}
                    <button
                        onClick={() => scrollCarousel('right')}
                        className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xl flex items-center justify-center text-slate-700 hover:bg-gray-50 transition-all focus:outline-none hidden sm:flex"
                        aria-label="Scroll right"
                    >
                        <CaretRight weight="bold" size={18} />
                    </button>

                    {/* Cards Container */}
                    <div 
                        ref={carouselRef}
                        className="flex gap-6 overflow-x-auto scrollbar-none py-2 scroll-smooth px-1"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {displayTreks.length === 0 ? (
                            <div className="w-full text-center py-10 text-gray-500">
                                No treks found in the database.
                            </div>
                        ) : displayTreks.map((trek) => {
                            const isFav = favorites[trek.id];
                            return (
                                <div
                                    key={trek.id}
                                    className="min-w-[280px] sm:min-w-[300px] md:min-w-[310px] lg:min-w-[320px] max-w-[340px] flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                                        {trek.image ? (
                                            <Image
                                                src={trek.image}
                                                alt={trek.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                                        )}
                                        
                                        {/* Favorite Heart Button */}
                                        <button
                                            onClick={() => toggleFavorite(trek.id)}
                                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-slate-600 hover:text-[#e30613] transition-colors focus:outline-none z-10"
                                            aria-label="Favorite trek"
                                        >
                                            <Heart weight={isFav ? 'fill' : 'bold'} size={18} className={isFav ? 'text-[#e30613]' : ''} />
                                        </button>
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-5 flex flex-col flex-grow bg-white">
                                        
                                        {/* Title & Location */}
                                        <div className="flex flex-col gap-2 mb-4">
                                            <h4 className="text-base font-black text-slate-900 group-hover:text-[#e30613] transition-colors leading-snug">
                                                {trek.title}
                                            </h4>
                                            <div className="flex">
                                                <span className="bg-[#e30613] text-white text-[10px] sm:text-[11px] font-bold px-2 py-1 sm:px-2.5 sm:py-1 rounded flex items-center gap-1 shadow-sm max-w-full">
                                                    <MapPin weight="fill" size={12} className="text-white flex-shrink-0" />
                                                    <span className="truncate">{trek.location}</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex flex-col gap-1.5 text-xs mb-6">
                                            <div>
                                                <span className="text-slate-400 font-bold uppercase tracking-wider mr-1">DURATION:</span>
                                                <span className="text-slate-800 font-extrabold uppercase">{trek.duration}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 font-bold uppercase tracking-wider mr-1">GRADE:</span>
                                                <span className="text-slate-800 font-extrabold uppercase">{trek.grade}</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="mt-auto flex items-stretch gap-2">
                                            <Link
                                                href={`/treks/${trek.slug}`}
                                                className="flex-1 flex items-center justify-center text-center py-2.5 px-2 rounded-lg border border-gray-300 text-slate-800 font-bold text-[10px] sm:text-xs hover:bg-slate-50 transition-colors uppercase tracking-wider shadow-sm"
                                            >
                                                View Trek Details
                                            </Link>
                                            <a
                                                href={`https://wa.me/918556043708?text=Hi%21%20I%20am%20interested%20in%20the%20${encodeURIComponent(trek.title)}%20trek.%20Could%20you%20share%20more%20details%3F`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-shrink-0 w-11 sm:w-12 flex items-center justify-center bg-[#25D366] text-white rounded-lg hover:bg-[#20b858] transition-colors shadow-sm"
                                                aria-label="Ask on WhatsApp"
                                            >
                                                <WhatsappLogo weight="fill" size={22} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
