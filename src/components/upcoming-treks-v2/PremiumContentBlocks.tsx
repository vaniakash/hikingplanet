'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from '@phosphor-icons/react/dist/ssr';

export default function PremiumContentBlocks() {
    return (
        <div className="w-full">
            
            {/* 11. Why Trek With Us */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4 font-serif">
                            More Than A Trek
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {[
                            {
                                num: '01',
                                title: 'Local Expertise',
                                text: 'Garhwal is our primary playground. We know these trails better than anyone.'
                            },
                            {
                                num: '02',
                                title: 'Small Groups',
                                text: 'Less crowd. Better experience. We cap our batches to keep the mountains quiet.'
                            },
                            {
                                num: '03',
                                title: 'Expert Leaders',
                                text: 'Certified, experienced mountaineers leading every single expedition.'
                            },
                            {
                                num: '04',
                                title: 'Responsible',
                                text: 'Leave the mountains better than we found them. Zero trace policy.'
                            }
                        ].map(block => (
                            <div key={block.num} className="flex flex-col">
                                <span className="text-4xl font-black text-slate-200 mb-4 font-serif">{block.num}</span>
                                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-2">
                                    {block.title}
                                </h3>
                                <p className="text-slate-600 font-medium">
                                    {block.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 12. Experience / Story Section */}
            <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/djiwbsioo/image/upload/v1785928865/hikingplanet/hero/z1jgr885bgldsswzv2fy.jpg"
                        alt="Cinematic Himalayan Trail"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-12 font-serif drop-shadow-xl">
                        The Trail Is The Destination
                    </h2>
                    
                    <div className="text-xl md:text-2xl text-white/90 font-medium space-y-2 mb-12 italic font-serif">
                        <p>Cold mornings.</p>
                        <p>Long climbs.</p>
                        <p>Silent forests.</p>
                        <p>Views you'll remember for years.</p>
                    </div>

                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded font-bold uppercase tracking-wider text-sm transition-colors shadow-xl">
                        See What A Trek Feels Like →
                    </button>
                </div>
            </section>

            {/* 13. Reviews */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fcfaf8]">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4 font-serif">
                            From The Trail
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Rahul S.', trek: 'Kedarkantha', text: 'An absolute masterpiece of a trek. The team was incredibly professional and the summit day was flawless.' },
                            { name: 'Priya M.', trek: 'Har Ki Dun', text: 'The food, the guides, the equipment—everything felt premium. They really know Garhwal inside out.' },
                            { name: 'Arjun K.', trek: 'Dayara Bugyal', text: 'As a beginner, I felt completely safe. The meadows are breathtaking. Highly recommended.' }
                        ].map((review, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex gap-1 text-yellow-400 mb-6">
                                    {[1,2,3,4,5].map(star => <Star key={star} weight="fill" />)}
                                </div>
                                <p className="text-slate-700 text-lg mb-8 italic">"{review.text}"</p>
                                <div>
                                    <h4 className="font-bold text-slate-900 uppercase tracking-tight">{review.name}</h4>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{review.trek} Trekker</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 14. Final CTA */}
            <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/djiwbsioo/image/upload/v1785928868/hikingplanet/hero/fgfib9vf635g2xib74ax.jpg"
                        alt="The Mountains Are Waiting"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                </div>
                
                <div className="relative z-10 text-center px-4 pt-32">
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 font-serif drop-shadow-xl">
                        The Mountains <br/> Are Waiting.
                    </h2>
                    <p className="text-xl text-slate-300 font-medium mb-10">
                        Find your trail in Garhwal.
                    </p>
                    
                    <button className="bg-[#e30613] hover:bg-[#c10510] text-white px-10 py-5 rounded font-bold uppercase tracking-widest text-sm transition-colors shadow-2xl">
                        Explore All Treks
                    </button>
                </div>
            </section>

        </div>
    );
}
