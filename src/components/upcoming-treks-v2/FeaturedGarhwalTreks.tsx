'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mountains, Timer, Path } from '@phosphor-icons/react/dist/ssr';

export default function FeaturedGarhwalTreks({ treks }: { treks: any[] }) {
    if (!treks || treks.length === 0) return null;

    return (
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="mb-16 md:mb-24 max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4 font-serif">
                    Treks Worth Waking Up Early For
                </h2>
                <p className="text-lg text-slate-600 font-medium border-l-4 border-[#e30613] pl-4">
                    From quiet alpine meadows to high Himalayan passes. These are the trails that define Garhwal.
                </p>
            </div>

            <div className="flex flex-col gap-12 md:gap-24">
                {treks.map((trek, idx) => (
                    <div 
                        key={trek._id} 
                        className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center group`}
                    >
                        {/* Large Image */}
                        <div className="w-full md:w-3/5 relative h-[60vh] min-h-[400px] max-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                            {trek.images && trek.images.length > 0 ? (
                                <Image
                                    src={trek.images[0]}
                                    alt={trek.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                        </div>

                        {/* Content */}
                        <div className="w-full md:w-2/5 flex flex-col items-start">
                            <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.2em] mb-4 block">
                                {trek.location || 'Garhwal Himalayas'}
                            </span>
                            <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-6 leading-none">
                                {trek.title}
                            </h3>
                            
                            <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-700 uppercase tracking-wider mb-8">
                                <div className="flex items-center gap-1.5">
                                    <Timer className="text-slate-400 w-5 h-5" />
                                    {trek.duration} Days
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Path className="text-slate-400 w-5 h-5" />
                                    {trek.difficulty}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Mountains className="text-slate-400 w-5 h-5" />
                                    12,500 FT {/* Fallback mock for now if not in DB */}
                                </div>
                            </div>

                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                {trek.description ? trek.description.substring(0, 150) + '...' : 'Experience the raw beauty of the Himalayas on this incredible journey through ancient forests and high alpine meadows.'}
                            </p>

                            <div className="flex items-center justify-between w-full border-t border-slate-200 pt-8 mt-auto">
                                <div>
                                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Starting At</span>
                                    <span className="text-2xl font-black text-slate-900">₹{trek.price?.toLocaleString() || 'XX,XXX'}</span>
                                </div>
                                
                                <Link 
                                    href={`/treks/${trek.slug}`}
                                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#e30613] hover:gap-4 transition-all"
                                >
                                    View Trek <ArrowRight weight="bold" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
