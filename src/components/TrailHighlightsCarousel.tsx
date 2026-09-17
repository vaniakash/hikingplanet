'use client';

import { useState } from 'react';
import { CaretLeft, CaretRight, FileText } from '@phosphor-icons/react';

interface Highlight {
    title: string;
    description: string;
}

export default function TrailHighlightsCarousel({ highlights }: { highlights: Highlight[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev === highlights.length - 1 ? 0 : prev + 1));
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev === 0 ? highlights.length - 1 : prev - 1));
    };

    if (!highlights || highlights.length === 0) return null;

    const currentHighlight = highlights[currentIndex];

    return (
        <div className="relative mt-6 max-w-[550px]">
            {/* The single window card */}
            <div className="bg-white rounded-[24px] p-6 text-stone-900 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden border border-stone-100">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                
                {/* Icon / Step indicator */}
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-5 border border-red-100 shadow-sm">
                    <FileText weight="fill" className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="min-h-[90px]">
                    <h4 className="text-lg md:text-xl font-bold mb-2 tracking-tight">{currentHighlight.title}</h4>
                    <p className="text-stone-600 leading-relaxed text-sm md:text-[15px]">{currentHighlight.description}</p>
                </div>

                {/* Controls and Dots */}
                <div className="flex items-center justify-center gap-4 mt-6 pt-5 border-t border-stone-100">
                    <button 
                        onClick={prev}
                        className="p-1.5 rounded-full hover:bg-red-50 transition-colors text-stone-400 hover:text-red-600"
                        aria-label="Previous"
                    >
                        <CaretLeft weight="bold" className="w-4 h-4" />
                    </button>

                    {/* Dots */}
                    <div className="flex gap-2">
                        {highlights.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === currentIndex ? 'bg-red-600 w-4' : 'bg-stone-200 w-1.5 hover:bg-red-300'
                                }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button 
                        onClick={next}
                        className="p-1.5 rounded-full hover:bg-red-50 transition-colors text-stone-400 hover:text-red-600"
                        aria-label="Next"
                    >
                        <CaretRight weight="bold" className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
