import type { Metadata } from 'next';
import HeroBanner from '@/components/HeroBanner';
import { CTASection, FeaturedTreksHeader } from '@/components/AnimatedSections';
import LeadCapturePopup from '@/components/LeadCapturePopup';
import TheHikingPlanetWay from '@/components/TheHikingPlanetWay';
import KedarkanthaJournal from '@/components/KedarkanthaJournal';
import TrekkerReviews from '@/components/TrekkerReviews';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: { absolute: "HikingPlanet" },
  description:
    "Discover the real Himalayas with HikingPlanet. Experience authentic trekking adventures, stunning landscapes, local culture, and unforgettable memories.",
  alternates: { canonical: 'https://www.hikingplanet.in' },
  openGraph: {
    type: 'website',
    url: 'https://www.hikingplanet.in',
    title: 'HikingPlanet',
    description:
      "Discover the real Himalayas with HikingPlanet. Experience authentic trekking adventures, stunning landscapes, local culture, and unforgettable memories.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'HikingPlanet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HikingPlanet',
    description: "Discover the real Himalayas with HikingPlanet. Experience authentic trekking adventures, stunning landscapes, local culture, and unforgettable memories.",
    images: ['/og-image.jpg'],
  },
};



// ── Async component: Featured Treks (streams via Suspense) ──
async function FeaturedTreks() {
  const dbConnect = (await import('@/lib/db')).default;
  const Trek = (await import('@/models/Trek')).default;

  await dbConnect();
  const featuredTreks = await Trek.find({ isActive: true, isFeatured: true })
    .sort({ createdAt: -1 })
    .lean();

  const PlanYourAdventure = (await import('@/components/PlanYourAdventure')).default;

  return <PlanYourAdventure initialTreks={JSON.parse(JSON.stringify(featuredTreks))} />;
}

// ── Async component: Open Batches (streams via Suspense) ──
async function OpenBatches() {
  const dbConnect = (await import('@/lib/db')).default;
  const Trip = (await import('@/models/Trip')).default;
  await import('@/models/Trek'); // ensure model registered

  await dbConnect();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const trips = await Trip.find({
    status: 'open',
    startDate: { $gte: today },
  })
    .populate('trek', 'title slug location difficulty duration price originalPrice images elevation isActive')
    .sort({ startDate: 1 })
    .lean();

  const validTrips = trips.filter((t: any) => t.trek && t.trek.title && t.trek.slug);

  const OpenBatchesSection = (await import('@/components/OpenBatchesSection')).default;

  return <OpenBatchesSection initialTrips={JSON.parse(JSON.stringify(validTrips))} />;
}

// ── Loading skeletons ──
function OpenBatchesSkeleton() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-6 bg-slate-200 rounded w-48 mx-auto mb-4 animate-pulse" />
        <div className="h-10 bg-slate-200 rounded w-72 mx-auto mb-10 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 h-96 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

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

export default async function Home() {
  const dbConnect = (await import('@/lib/db')).default;
  const Trek = (await import('@/models/Trek')).default;

  await dbConnect();
  
  // Find the lowest price active trek
  const lowestPriceTrek = await Trek.findOne({ isActive: true })
    .sort({ price: 1 })
    .select('price slug')
    .lean();

  const lowestPrice = lowestPriceTrek?.price || 6999;
  const lowestPriceSlug = lowestPriceTrek?.slug || null;
  return (
    <div className="bg-[#F4F1EA]">
      <LeadCapturePopup />
      {/* ── Hero ── */}
      <HeroBanner lowestPrice={lowestPrice} lowestPriceSlug={lowestPriceSlug} />

      {/* ── Plan Your Next Adventure ── */}
      <Suspense fallback={<TrekCardsSkeleton />}>
        <FeaturedTreks />
      </Suspense>

      {/* ── Upcoming Open Batches ── */}
      <Suspense fallback={<OpenBatchesSkeleton />}>
        <OpenBatches />
      </Suspense>

      {/* ── The Hiking Planet Way ── */}
      <TheHikingPlanetWay />

      {/* ── Kedarkantha Trek Journal ── */}
      <KedarkanthaJournal />

      {/* ── Trekker Reviews ── */}
      <TrekkerReviews />

      {/* ── CTA — animated blobs + staggered text ── */}
      <CTASection />

    </div>
  );
}
