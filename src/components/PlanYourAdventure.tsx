'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SlidersHorizontal, CaretRight, CaretLeft, MapPin, Heart } from '@phosphor-icons/react/dist/ssr';

interface TrekItem {
    id: string;
    title: string;
    slug: string;
    location: string;
    duration: string;
    grade: string;
    image: string;
}

const defaultTreks: TrekItem[] = [
    {
        id: '1',
        title: 'Valley of Flowers Trek',
        slug: 'valley-of-flowers',
        location: 'Uttarakhand',
        duration: '6 days',
        grade: 'Easy to Moderate',
        image: '/images/hero.webp'
    },
    {
        id: '2',
        title: 'Hampta Pass Trek',
        slug: 'hampta-pass',
        location: 'Himachal Pradesh',
        duration: '5 days',
        grade: 'Moderate',
        image: '/images/heroji.webp'
    },
    {
        id: '3',
        title: 'Pin Bhaba Pass Trek',
        slug: 'pin-bhaba-pass',
        location: 'Himachal Pradesh',
        duration: '8 days',
        grade: 'Moderate to Difficult',
        image: '/images/herosection.webp'
    },
    {
        id: '4',
        title: 'Markha Valley Trek',
        slug: 'markha-valley',
        location: 'Ladakh',
        duration: '7 days',
        grade: 'Moderate',
        image: '/images/herosectionne.webp'
    }
];

const filterOptions = [
    'Upcoming Treks', 'India', 'Nepal', 'Africa', 'Russia', 'China', 'Spring', 'Summer', 'Autumn', 'Monsoon', 'Winter',
    'Himachal Pradesh', 'Kashmir', 'Ladakh', 'Pokhara', 'Sikkim', 'Uttarakhand', 'West Bengal',
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    'Easy', 'Easy to Moderate', 'Moderate', 'Moderate to Difficult', 'Difficult', 'Challenging',
    'Trekking', 'Mountaineering', 'Pilgrimage Tours', 'Multi Sports', 'Beginner', 'Couples', 'Crossover Through',
    'Family with kids', 'Frozen River and Waterfall', 'Glacier', 'Hot Springs', 'Lakes', 'Meadow', 'Off Beat Trek',
    'Snow', 'Summit a Peak', 'River', 'Peaks View', 'Walk in the Valley', 'Waterfall'
];

export default function PlanYourAdventure({ initialTreks = [] }: { initialTreks?: any[] }) {
    const [activeFilter, setActiveFilter] = useState('Upcoming Treks');
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});
    const filterScrollRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Merge default treks with database treks if available
    const displayTreks: TrekItem[] = defaultTreks.map((defaultTrek, idx) => {
        const dbTrek = initialTreks[idx];
        if (dbTrek) {
            return {
                id: dbTrek._id?.toString() || defaultTrek.id,
                title: defaultTrek.title, // Keep requested titles for perfect match
                slug: dbTrek.slug || defaultTrek.slug,
                location: defaultTrek.location,
                duration: defaultTrek.duration,
                grade: defaultTrek.grade,
                image: dbTrek.images?.[0] || defaultTrek.image
            };
        }
        return defaultTrek;
    });

    const scrollFilters = () => {
        if (filterScrollRef.current) {
            filterScrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
        }
    };

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

                {/* ── Filter Bar Section ── */}
                <div className="flex items-center gap-3 relative mb-14 max-w-7xl mx-auto">
                    {/* Left Filter Icon Button */}
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 shadow-md hover:bg-gray-800 transition-colors cursor-pointer">
                        <SlidersHorizontal weight="bold" size={18} />
                    </div>

                    {/* Scrollable Filter Pills */}
                    <div 
                        ref={filterScrollRef}
                        className="flex items-center gap-2.5 overflow-x-auto scrollbar-none py-1 scroll-smooth px-1 select-none flex-grow"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filterOptions.map((filter) => {
                            const isActive = activeFilter === filter;
                            return (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`flex-shrink-0 text-xs px-4.5 py-2 rounded-full font-bold transition-all shadow-sm ${
                                        isActive
                                            ? 'bg-[#e30613] text-white shadow-md'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'
                                    }`}
                                >
                                    {filter}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Scroll Arrow */}
                    <button
                        onClick={scrollFilters}
                        className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 flex-shrink-0 shadow-sm cursor-pointer z-10 hidden sm:flex focus:outline-none"
                        aria-label="Scroll filters right"
                    >
                        <CaretRight weight="bold" size={16} />
                    </button>
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
                        {displayTreks.map((trek) => {
                            const isFav = favorites[trek.id];
                            return (
                                <div
                                    key={trek.id}
                                    className="min-w-[280px] sm:min-w-[300px] md:min-w-[310px] lg:min-w-[320px] max-w-[340px] flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                                        <Image
                                            src={trek.image}
                                            alt={trek.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                        
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
                                        
                                        {/* Title & Location Row */}
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <h4 className="text-base font-black text-slate-900 group-hover:text-[#e30613] transition-colors flex-grow pr-2 truncate">
                                                {trek.title}
                                            </h4>
                                            <span className="bg-[#1C2B39] text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 flex-shrink-0 shadow-sm">
                                                <MapPin weight="fill" size={12} className="text-[#e30613]" />
                                                {trek.location}
                                            </span>
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
                                        <Link
                                            href={`/treks/${trek.slug}`}
                                            className="w-full py-2.5 px-4 rounded-lg border border-gray-300 text-slate-800 font-bold text-xs text-center hover:bg-slate-50 transition-colors block mt-auto uppercase tracking-wider shadow-sm"
                                        >
                                            View Trek Details
                                        </Link>
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
