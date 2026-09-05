import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const articles = [
    {
        id: 'sahastra-tal-trek',
        title: 'Sahastra Tal Trek Uttarakhand: Complete Guide, Route, Difficulty, Best Time & Itinerary',
        author: 'The Hiking Planet Team',
        date: '2026-09-05',
        image: '/treks_images/sahastra-tal-trek-lake-view-uttarakhand-1024x683.jpeg',
        href: '/latest-articles/sahastra-tal-trek'
    }
];

export default function LatestArticlesIndexPage() {
    return (
        <div className="min-h-screen bg-[var(--sand)] text-[var(--deep-earth)] pt-20 pb-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Header */}
                <div className="mb-12 border-b border-yellow-500 pb-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                        Latest Articles
                    </h1>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link 
                            key={article.id} 
                            href={article.href}
                            className="group flex flex-col bg-white rounded-lg border border-black/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-100">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-xl font-bold leading-snug mb-4 group-hover:text-[var(--terracotta)] transition-colors line-clamp-3">
                                    {article.title}
                                </h2>
                                <div className="mt-auto space-y-1">
                                    <p className="text-sm opacity-80 italic">
                                        By {article.author}
                                    </p>
                                    <p className="text-sm opacity-60">
                                        {article.date}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
