'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface InfoSection {
    title: string;
    subtitle: string;
    content: string;
    imageUrl?: string;
}

interface Props {
    trekTitle: string;
    infoIntro?: string;
    sections: InfoSection[];
}

export default function TrekInfoAccordion({ trekTitle, infoIntro, sections }: Props) {
    const [openId, setOpenId] = useState<number | null>(null);

    if (!sections || sections.length === 0) return null;

    const toggle = (i: number) => setOpenId(openId === i ? null : i);

    return (
        <section className="mt-10">
            {/* Header */}
            <div className="mb-6 pb-4 border-b-2 border-[#1f7a4c]">
                <h2 className="text-2xl font-bold text-stone-900">
                    {trekTitle} — Complete Trek Information
                </h2>
                {infoIntro ? (
                    <p className="mt-3 text-stone-600 leading-relaxed text-sm whitespace-pre-line">
                        {infoIntro}
                    </p>
                ) : null}
            </div>

            {/* Accordion list */}
            <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden">
                {sections.map((sec, i) => {
                    const isOpen = openId === i;
                    return (
                        <div key={i} className="bg-white">
                            <button
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors text-left group"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="shrink-0 w-9 h-9 rounded-lg bg-[#f4f1ea] flex items-center justify-center text-[#1f7a4c]">
                                        <BookOpen className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-stone-900 group-hover:text-[#1f7a4c] transition-colors text-sm md:text-base leading-snug">
                                            {sec.title}
                                        </p>
                                        {sec.subtitle && (
                                            <p className="text-xs text-stone-400 mt-0.5 truncate">{sec.subtitle}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="shrink-0 ml-4 text-stone-400 group-hover:text-[#1f7a4c] transition-colors">
                                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </div>
                            </button>

                            {isOpen && (
                                <div className="px-5 pb-6 pt-2 bg-stone-50 border-t border-stone-100">
                                    {/* Section image (map / route) */}
                                    {sec.imageUrl && (
                                        <div className="mb-4 relative w-full rounded-xl overflow-hidden border border-stone-200" style={{ aspectRatio: '16/9', maxHeight: 400 }}>
                                            <Image
                                                src={sec.imageUrl}
                                                alt={sec.title}
                                                fill
                                                className="object-contain bg-white"
                                            />
                                        </div>
                                    )}
                                    {/* Content */}
                                    {sec.content && (
                                        <div className="prose prose-stone prose-sm max-w-none text-stone-700 leading-relaxed whitespace-pre-line">
                                            {sec.content}
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
