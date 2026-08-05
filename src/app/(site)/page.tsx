import type { Metadata } from 'next';
import HeroBanner from '@/components/HeroBanner';
import { WhySection, CTASection, FeaturedTreksHeader } from '@/components/AnimatedSections';
import TrailMoments from '@/components/TrailMoments';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'HikingPlanet — Modern Indigenous Himalayan Journeys',
  description:
    'Book expert-led Himalayan treks from Uttarkashi. Beginner-friendly to advanced expeditions with safety, certified leaders, food & stay included.',
  alternates: { canonical: 'https://www.hikingplanet.in' },
  openGraph: {
    type: 'website',
    url: 'https://www.hikingplanet.in',
    title: 'HikingPlanet — Modern Indigenous Himalayan Journeys',
    description:
      'Book your Himalayan trek today. Safety-first expeditions led by certified trek leaders from Uttarkashi.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'HikingPlanet — Himalayan Adventures' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HikingPlanet — Modern Indigenous Himalayan Journeys',
    description: 'Book your Himalayan trek today. Certified leaders, safety-first, from Uttarkashi.',
    images: ['/og-image.jpg'],
  },
};



// ── Async component: Featured Treks (streams via Suspense) ──
async function FeaturedTreks() {
  const dbConnect = (await import('@/lib/db')).default;
  const Trek = (await import('@/models/Trek')).default;

  await dbConnect();
  const featuredTreks = await Trek.find({ isActive: true })
    .sort({ isFeatured: -1, createdAt: -1 })
    .limit(4)
    .lean();

  const PlanYourAdventure = (await import('@/components/PlanYourAdventure')).default;

  return <PlanYourAdventure initialTreks={JSON.parse(JSON.stringify(featuredTreks))} />;
}

// ── Loading skeleton ──
function TrekCardsSkeleton() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-slate-100 rounded w-64 mx-auto mb-12 animate-pulse" />
        <div className="h-12 bg-slate-100 rounded-full mb-14 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse flex flex-col h-[400px]">
              <div className="h-64 bg-slate-100" />
              <div className="p-5 space-y-4 flex-grow">
                <div className="h-5 bg-slate-100 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-1/2 mt-4" />
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <div className="h-10 bg-slate-100 rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-[#F4F1EA]">

      {/* ── Hero ── */}
      <HeroBanner />

      {/* ── Plan Your Next Adventure ── */}
      <Suspense fallback={<TrekCardsSkeleton />}>
        <FeaturedTreks />
      </Suspense>

      {/* ── Why HikingPlanet — fully animated ── */}
      <WhySection />

      {/* ── Trail Moments GSAP Gallery ── */}
      <TrailMoments />

      {/* ── CTA — animated blobs + staggered text ── */}
      <CTASection />

    </div>
  );
}
