'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CaretDown, MagnifyingGlass, MapPin, CalendarBlank, Barbell, Timer } from '@phosphor-icons/react/dist/ssr';

export default function HeroGarhwal({ treks }: { treks: any[] }) {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/upcoming-treks?search=${encodeURIComponent(search.trim())}`);
        } else {
            router.push(`/upcoming-treks`);
        }
    };

    return (
        <section className="relative w-full h-[60vh] min-h-[450px] flex flex-col justify-between bg-slate-900 mb-12">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                    src="https://res.cloudinary.com/djiwbsioo/image/upload/v1785929316/hikingplanet/hero/tbcxrenhcuqfprgpykqi.jpg" // High altitude Garhwal landscape
                    alt="Garhwal Himalayas"
                    fill
                    priority
                    className="object-cover opacity-80 scale-105 animate-[slowZoom_20s_ease-out_forwards]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
            </div>

            {/* Hero Text */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-20">
                <span className="text-yellow-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 drop-shadow-md">
                    Find Your Next Adventure
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-lg font-serif">
                    Explore All Treks
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl font-medium mb-10 drop-shadow">
                    Curated treks across the most beautiful trails of Garhwal.
                </p>

                <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] md:text-xs text-white/70 font-bold uppercase tracking-widest">
                    <span>{treks.length}+ Treks</span>
                    <span className="hidden sm:inline">•</span>
                    <span>4 Difficulty Levels</span>
                    <span className="hidden sm:inline">•</span>
                    <span>10,000–18,000 FT</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Garhwal, Uttarakhand</span>
                </div>
            </div>

            {/* Floating Trek Finder */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 translate-y-1/2">
                <div className="bg-white rounded-xl shadow-2xl p-2 md:p-4 flex flex-col md:flex-row gap-2 border border-slate-100">
                    
                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-lg border border-transparent focus-within:border-slate-200 transition-colors">
                        <MagnifyingGlass className="text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search a trek (e.g. Kedarkantha)"
                            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-400 font-medium text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>

                    {/* Filter Dropdowns */}
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                        <button className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 font-semibold text-sm whitespace-nowrap transition-colors">
                            <CalendarBlank className="text-[#e30613]" />
                            <span>Select Month</span>
                            <CaretDown className="ml-1 opacity-50" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 font-semibold text-sm whitespace-nowrap transition-colors">
                            <Barbell className="text-[#e30613]" />
                            <span>Difficulty</span>
                            <CaretDown className="ml-1 opacity-50" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 font-semibold text-sm whitespace-nowrap transition-colors hidden lg:flex">
                            <Timer className="text-[#e30613]" />
                            <span>Duration</span>
                            <CaretDown className="ml-1 opacity-50" />
                        </button>
                    </div>

                    {/* Submit */}
                    <button 
                        onClick={handleSearch}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-bold text-sm transition-colors whitespace-nowrap shadow-md"
                    >
                        Find Treks →
                    </button>
                </div>
            </div>
        </section>
    );
}
