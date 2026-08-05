import TrekCard from '@/components/TrekCard';
import TrekFilterBar from '@/components/TrekFilterBar';
import Link from 'next/link';
import { Suspense } from 'react';
import { ChatCircle } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
    title: 'All Treks | Himalayan Expeditions from Uttarkashi',
    description:
        'Browse all HikingPlanet trekking expeditions in the Himalayas. Filter by difficulty, duration, region, and price. Beginner to advanced treks across Uttarakhand.',
    alternates: { canonical: 'https://www.hikingplanet.in/treks' },
    openGraph: {
        type: 'website',
        url: 'https://www.hikingplanet.in/treks',
        title: 'All Himalayan Treks | HikingPlanet',
        description:
            'Explore every trekking expedition offered by HikingPlanet. Filter by difficulty, duration, region, season, and price. From beginner trails to advanced high-altitude routes.',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'HikingPlanet Trek Listings' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'All Himalayan Treks | HikingPlanet',
        description: 'Explore all Himalayan treks. Filter by difficulty, season, or budget.',
        images: ['/og-image.jpg'],
    },
};


export const dynamic = 'force-dynamic';

// ── Async component that fetches and renders trek cards (streamed via Suspense) ──
async function TrekResults({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const dbConnect = (await import('@/lib/db')).default;
    const Trek = (await import('@/models/Trek')).default;

    await dbConnect();

    const filters: any = {};

    if (searchParams.difficulty) {
        filters.difficulty = searchParams.difficulty;
    }

    if (searchParams.region) {
        filters.location = { $regex: searchParams.region as string, $options: 'i' };
    }

    if (searchParams.duration) {
        switch (searchParams.duration) {
            case 'short': filters.duration = { $lte: 4 }; break;
            case 'medium': filters.duration = { $gt: 4, $lte: 8 }; break;
            case 'long': filters.duration = { $gt: 8 }; break;
        }
    }

    if (searchParams.price) {
        switch (searchParams.price) {
            case 'budget': filters.price = { $lte: 10000 }; break;
            case 'standard': filters.price = { $gt: 10000, $lte: 20000 }; break;
            case 'premium': filters.price = { $gt: 20000 }; break;
        }
    }

    if (searchParams.season) {
        filters.bestTime = { $in: [searchParams.season] };
    }

    const treks = await Trek.find(filters).sort({ createdAt: -1 }).lean();

    if (treks.length === 0) {
        return (
            <div className="text-center py-32 bg-[var(--forest-green)]/20 angular-card border border-white/10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--terracotta)]/20 angular-card mb-4">
                    <span className="text-3xl">🏔️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">
                    No Expeditions Found
                </h3>
                <p className="text-white/50">
                    We couldn&apos;t find any treks matching your criteria.
                    <br />
                    <Link
                        href="/treks"
                        className="text-[var(--terracotta)] font-bold mt-2 hover:text-white inline-block transition-colors"
                    >
                        Clear all filters
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treks.map((trek: any) => (
                <TrekCard key={trek._id} trek={JSON.parse(JSON.stringify(trek))} />
            ))}
        </div>
    );
}

// ── Skeleton loader for trek cards ──
function TrekGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[var(--forest-green)]/30 angular-card overflow-hidden border border-white/5 animate-pulse">
                    <div className="h-64 bg-white/5" />
                    <div className="p-6 space-y-3">
                        <div className="h-5 bg-white/10 rounded w-3/4" />
                        <div className="h-4 bg-white/5 rounded w-1/2" />
                        <div className="h-4 bg-white/5 rounded w-1/3" />
                        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                            <div className="h-6 bg-white/10 rounded w-24" />
                            <div className="w-10 h-10 bg-white/5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default async function AllTreksPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;

    return (
        <div className="bg-[var(--deep-earth)] min-h-screen flex flex-col">
            {/* ── Hero Header ── */}
            <header className="text-center pt-32 pb-16 px-6 max-w-7xl mx-auto w-full relative">
                <span className="text-[var(--terracotta)] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
                    Expeditions
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight">
                    Choose Your{' '}
                    <span className="text-[var(--terracotta)]">Himalayan</span>{' '}
                    Adventure
                </h1>
                <p className="text-white/50 text-lg max-w-2xl mx-auto font-light">
                    From beginner-friendly trails to challenging summits across Uttarakhand
                </p>
            </header>

            {/* ── Main Layout: Sidebar + Grid ── */}
            <main className="w-full mb-16 px-4 md:px-8 max-w-7xl mx-auto flex-grow">
                <div className="flex gap-10 items-start">
                    {/* Sidebar filter (rendered by TrekFilterBar as aside on desktop) */}
                    <TrekFilterBar />

                    {/* Trek Cards Grid */}
                    <div className="flex-1 min-w-0">
                        <Suspense fallback={<TrekGridSkeleton />}>
                            <TrekResults searchParams={resolvedSearchParams} />
                        </Suspense>
                    </div>
                </div>
            </main>

            {/* ── Consultation CTA Section ── */}
            <section className="py-20 bg-[var(--forest-green)] relative border-t border-white/10">
                <div className="absolute inset-0 indigenous-pattern opacity-5" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <span className="text-[var(--terracotta)] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
                        Need Guidance?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 uppercase tracking-tight">
                        Not Sure Which Trek Is Right?
                    </h2>
                    <p className="text-white/50 text-lg mb-8 max-w-2xl mx-auto font-light">
                        Talk to our expert trek leaders to find the perfect adventure based on your fitness level and interests.
                    </p>
                    <button className="bg-[var(--terracotta)] hover:bg-[var(--clay)] text-white font-black py-4 px-10 uppercase tracking-widest transition-all angular-card flex items-center gap-3 mx-auto text-sm">
                        <ChatCircle weight="fill" className="text-xl" />
                        Get Free Consultation
                    </button>
                </div>
            </section>
        </div>
    );
}
