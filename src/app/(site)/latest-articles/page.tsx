import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Latest Trekking Articles, Weather & Guides 2027 | HikingPlanet',
    description:
        'Explore verified Himalayan trekking guides, month-by-month weather analyses, festival specials, and trail comparisons authored by certified mountain leaders.',
    alternates: {
        canonical: 'https://www.hikingplanet.in/latest-articles',
    },
    openGraph: {
        title: 'Latest Articles & Himalayan Trek Guides 2027 | HikingPlanet',
        description:
            'Expert trekking guides, snowfall updates, cultural festival features, and beginner safety advice for Uttarakhand Himalayas.',
        url: 'https://www.hikingplanet.in/latest-articles',
        siteName: 'HikingPlanet',
        images: [
            {
                url: '/images/dayarabugyal1.webp',
                width: 1200,
                height: 630,
                alt: 'HikingPlanet Himalayan Trekking Articles Hub',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Latest Trekking Articles & Guides 2027 | HikingPlanet',
        description:
            'Comprehensive guides, weather reports, and trail tips for Indian Himalayan treks.',
        images: ['/images/dayarabugyal1.webp'],
    },
};

const articles = [
    {
        id: 'dayara-bugyal-trek-guide-2027',
        title: 'Dayara Bugyal Trek 2027: Itinerary, Cost, Altitude & Route Map',
        tag: 'Complete Trek Guide',
        excerpt:
            'Everything you need to plan Dayara Bugyal in 2027: Dehradun to Raithal transport, day-by-day 6-day plan, transparent cost breakdown, altitude profile, and route map.',
        author: 'The HikingPlanet Team',
        date: '2026-11-15',
        readTime: '8 min read',
        image: '/images/dayarabugyal1.webp',
        href: '/latest-articles/dayara-bugyal-trek-guide-2027',
        featured: true,
    },
    {
        id: 'dayara-bugyal-snowfall-weather-guide-2027',
        title: 'Dayara Bugyal Snowfall Time 2027: Month-by-Month Weather Guide',
        tag: 'Weather & Snow',
        excerpt:
            'When does snow fall in Dayara Bugyal? Detailed month-by-month temperature charts, peak snowfall timing, winter gear checklist, and packing advice.',
        author: 'Meteorological Desk',
        date: '2026-11-15',
        readTime: '7 min read',
        image: '/images/dayarabugyal2.webp',
        href: '/latest-articles/dayara-bugyal-snowfall-weather-guide-2027',
    },
    {
        id: 'dayara-bugyal-butter-festival-anduri-utsav-2027',
        title: 'Dayara Bugyal Butter Festival (Anduri Utsav) 2027 Dates & Package',
        tag: 'Cultural Special',
        excerpt:
            'Play Holi with butter and buttermilk at 11,000 ft in August 2027! Discover Bhado Sankranti dates, Garhwali cultural rituals, and special 5-day festival packages.',
        author: 'Culture Desk',
        date: '2026-11-15',
        readTime: '8 min read',
        image: '/butter-festival/Butter-Festival_2026.webp',
        href: '/latest-articles/dayara-bugyal-butter-festival-anduri-utsav-2027',
    },
    {
        id: 'is-dayara-bugyal-safe-for-beginners-kids-2027',
        title: 'Is Dayara Bugyal Safe for Beginners & Kids in 2027? Difficulty & Packing List',
        tag: 'Family & Beginners',
        excerpt:
            'Honest safety breakdown for first-timers and families: terrain gradient, AMS risk, campsite comfort, child readiness, fitness prep, and family packing checklist.',
        author: 'Safety Council',
        date: '2026-11-15',
        readTime: '8 min read',
        image: '/images/dayarabugyal3.webp',
        href: '/latest-articles/is-dayara-bugyal-safe-for-beginners-kids-2027',
    },
    {
        id: 'dayara-bugyal-vs-kedarkantha-trek-2027',
        title: 'Dayara Bugyal vs Kedarkantha Trek 2027: Which Winter Trek is Better?',
        tag: 'Trek Comparison',
        excerpt:
            'Summit climb or endless snow meadow? Compare altitude, steepness, crowd factor, campsite views, and suitability to choose your ideal 2027 winter trek.',
        author: 'Mountain Guides',
        date: '2026-11-15',
        readTime: '9 min read',
        image: '/images/dayarabugyal4.webp',
        href: '/latest-articles/dayara-bugyal-vs-kedarkantha-trek-2027',
    },
    {
        id: 'kuari-pass-trek-guide',
        title: 'Kuari Pass Trek: Complete Guide 2027 — Route, Altitude, Best Time & Itinerary',
        tag: 'Trek Guide',
        excerpt:
            'The Lord Curzon Trail: panoramic views of Nanda Devi, Dronagiri & Kamet from 3,857 m. 6-day itinerary, difficulty breakdown, best time to visit, and full packing list.',
        author: 'The HikingPlanet Team',
        date: '2026-11-18',
        readTime: '8 min read',
        image: '/treks_images/kuari-pass-trek-uttarakhand.jpg',
        href: '/latest-articles/kuari-pass-trek-guide',
    },
    {
        id: 'sahastra-tal-trek',
        title: 'Sahastra Tal Trek Uttarakhand: Complete Guide, Route, Difficulty, Best Time & Itinerary',
        tag: 'High-Altitude Expedition',
        excerpt:
            'Explore the remote glacial lakes of Tehri Garhwal: Silla/Bhatwari approach routes, 4,700m altitude profile, challenging alpine terrain, and comprehensive planning.',
        author: 'The HikingPlanet Team',
        date: '2026-09-05',
        readTime: '10 min read',
        image: '/treks_images/sahastra-tal-trek-lake-view-uttarakhand-1024x683.jpeg',
        href: '/latest-articles/sahastra-tal-trek',
    },
];

export default function LatestArticlesIndexPage() {
    return (
        <div className="min-h-screen bg-[var(--sand)] text-[var(--deep-earth)] pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Header */}
                <div className="mb-12 border-b border-black/10 pb-8">
                    <span className="text-[var(--terracotta)] font-bold uppercase tracking-[0.25em] text-xs mb-3 block">
                        Trek Intelligence &amp; Dispatch
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 font-serif">
                        Latest Articles &amp; Trek Guides
                    </h1>
                    <p className="text-base sm:text-lg opacity-80 max-w-2xl">
                        Handcrafted route intel, weather breakdowns, seasonal analyses, and packing advice written by certified mountain leaders.
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link 
                            key={article.id} 
                            href={article.href}
                            className="group flex flex-col bg-white rounded-2xl border border-black/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
                                        {article.tag}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-xl font-bold leading-snug mb-3 group-hover:text-[var(--terracotta)] transition-colors line-clamp-2">
                                    {article.title}
                                </h2>
                                <p className="text-xs sm:text-sm text-[var(--deep-earth)]/75 leading-relaxed mb-6 line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between text-xs text-[var(--deep-earth)]/60">
                                    <span>{article.author}</span>
                                    <span>{article.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom Call to Action */}
                <div className="mt-16 p-8 md:p-12 rounded-3xl bg-[var(--deep-earth)] text-white text-center shadow-xl">
                    <span className="text-[#e30613] font-bold text-xs uppercase tracking-widest block mb-2">
                        Plan Ahead for 2026 – 2027
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                        Have a Question About an Upcoming Himalayan Trail?
                    </h2>
                    <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto mb-6">
                        Our trek captains are on call to help you evaluate difficulty, weather windows, and gear requirements for any trail.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/treks"
                            className="inline-flex items-center justify-center px-6 py-3 bg-[#e30613] hover:bg-[#c00510] text-white font-bold rounded-xl text-sm transition-all duration-200"
                        >
                            Browse All Treks
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-all duration-200"
                        >
                            Speak to a Trek Leader
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
