import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
    Clock, Mountains, MapPin, Check, WarningCircle, CheckCircle,
    TrendUp, Users, Tent, Heartbeat, Bus, ArrowCounterClockwise, Backpack, LockKey, PersonSimpleHike
} from '@phosphor-icons/react/dist/ssr';
import dbConnect from '@/lib/db';
import Trek from '@/models/Trek';
import Trip from '@/models/Trip';
import BookingSummaryCard from '@/components/BookingSummaryCard';
import TrekInfoAccordion from '@/components/TrekInfoAccordion';

// Generate full SEO + OG + Twitter Metadata for each trek
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    await dbConnect();
    const trek = await Trek.findOne({ slug }).select('title description images location duration difficulty price').lean() as any;
    if (!trek) return { title: 'Trek Not Found' };

    const ogImage = trek.images?.[0] || 'https://www.hikingplanet.in/og-image.jpg';
    const url = `https://www.hikingplanet.in/treks/${slug}`;
    const rawDesc: string = trek.description ?? '';
    const desc = rawDesc.length > 0
        ? rawDesc.substring(0, 155) + (rawDesc.length > 155 ? '...' : '')
        : `${trek.title} — a guided Himalayan trek from HikingPlanet, Uttarkashi.`;

    return {
        title: trek.title,          // uses root template → "Kedarkantha | HikingPlanet"
        description: desc,
        alternates: { canonical: url },
        openGraph: {
            type: 'website',
            url,
            siteName: 'HikingPlanet',
            title: `${trek.title} Trek | HikingPlanet`,
            description: desc,
            images: [{ url: ogImage, width: 1200, height: 630, alt: `${trek.title} — HikingPlanet` }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${trek.title} Trek | HikingPlanet`,
            description: desc,
            images: [ogImage],
        },
    };
}


// ISR: Generate paths for all treks at build time
export async function generateStaticParams() {
    await dbConnect();
    const treks = await Trek.find({}).select('slug').lean();
    return treks.map((trek: any) => ({ slug: trek.slug }));
}

export default async function TrekDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    await dbConnect();

    const trek = await Trek.findOne({ slug }).lean();
    if (!trek) notFound();

    // Fetch upcoming trips (open + full so FULL rows show in the date picker)
    const tripsRaw = await Trip.find({
        trek: trek._id,
        startDate: { $gte: new Date() },
        status: { $in: ['open', 'full'] },
    }).sort({ startDate: 1 }).lean();

    // Serialize trips for Client Component
    const trips = tripsRaw.map((trip: any) => ({
        ...trip,
        _id: trip._id.toString(),
        trek: trip.trek.toString(),
        startDate: trip.startDate.toISOString(),
        endDate: trip.endDate.toISOString(),
        waitlistCount: trip.waitlistCount ?? 0,
        label: trip.label ?? '',
    }));

    // Serialize infoSections (strip _id buffer from subdocuments)
    const infoSections = (trek.infoSections ?? []).map((s: any) => ({
        title: s.title ?? '',
        subtitle: s.subtitle ?? '',
        content: s.content ?? '',
        imageUrl: s.imageUrl ?? '',
    }));

    const SnapshotItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | undefined }) => (
        <div className="flex items-start gap-3 select-none group">
            <div className="shrink-0 text-[#1f7a4c] group-hover:scale-110 transition-transform duration-300">
                <Icon weight="duotone" className="w-8 h-8" />
            </div>
            <div>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-0.5">{label}</p>
                <div className="text-sm font-bold text-stone-900 leading-tight">{value || 'N/A'}</div>
            </div>
        </div>
    );

    // Gallery images (all uploaded images)
    const galleryImages: string[] = trek.images ?? [];

    // JSON-LD Structured Data for rich Google results
    const trekJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        name: trek.title,
        description: trek.description,
        image: galleryImages[0] || 'https://www.hikingplanet.in/og-image.jpg',
        url: `https://www.hikingplanet.in/treks/${trek.slug}`,
        touristType: ['Hikers', 'Adventure Travelers'],
        geo: {
            '@type': 'GeoCoordinates',
            addressCountry: 'IN',
            addressRegion: 'Uttarakhand',
        },
        offers: trek.price ? {
            '@type': 'Offer',
            price: trek.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: `https://www.hikingplanet.in/treks/${trek.slug}`,
            seller: { '@type': 'Organization', name: 'HikingPlanet' },
        } : undefined,
    };

    return (
        <div className="min-h-screen bg-stone-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(trekJsonLd) }}
            />

            {/* ── Hero ─────────────────────────────────── */}
            <div className="relative h-[60vh] md:h-[70vh] w-full">
                <Image
                    src={galleryImages[0] || 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5'}
                    alt={trek.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <div className="max-w-7xl mx-auto">
                        <span className="inline-block px-4 py-1.5 bg-[#1f7a4c] backdrop-blur-md bg-opacity-90 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-lg border border-white/20">
                            {trek.difficulty}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-md">{trek.title}</h1>
                        <div className="flex flex-wrap gap-6 text-sm md:text-base font-medium text-stone-200">
                            <span className="flex items-center gap-2"><MapPin weight="duotone" className="w-5 h-5 text-[#4ade80]" /> {trek.location}</span>
                            <span className="flex items-center gap-2"><Clock weight="duotone" className="w-5 h-5" /> {trek.duration} Days</span>
                            {trek.elevation && (
                                <span className="flex items-center gap-2"><Mountains weight="duotone" className="w-5 h-5" /> {trek.elevation}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Content Grid ─────────────────────────────────
             *  Desktop: Row 1 — Snapshot (2/3) | Booking Card (1/3, row-span-2)
             *           Row 2 — Main content (2/3)
             *  Mobile:  Snapshot → Booking Card → Main content
             * ─────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ── Row 1 Left: Trek Snapshot ── */}
                <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
                    <h2 className="text-xl font-bold mb-6">Trek Snapshot</h2>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                        <SnapshotItem icon={TrendUp} label="Difficulty Level" value={trek.difficulty} />
                        <SnapshotItem icon={Clock} label="Journey Length" value={`${trek.duration} Days`} />
                        <SnapshotItem icon={Mountains} label="Max Elevation" value={trek.elevation} />
                        <SnapshotItem icon={Users} label="Age Requirement" value={trek.ageRequirement} />
                        <SnapshotItem icon={MapPin} label="Starting Point" value={trek.startingPoint} />
                        <SnapshotItem icon={Tent} label="Stay Type" value={trek.accommodationType} />
                        <SnapshotItem icon={Heartbeat} label="Fitness Benchmark" value={trek.fitnessBenchmark} />
                        <SnapshotItem icon={Bus} label="Assembly Point" value={trek.assemblyPoint} />
                        <SnapshotItem icon={ArrowCounterClockwise} label="Return Point" value={trek.returnPoint} />
                        <SnapshotItem icon={Backpack} label="Gear Support" value={trek.gearSupport} />
                        <SnapshotItem icon={LockKey} label="Storage Facility" value={trek.storageFacility} />
                        <SnapshotItem icon={PersonSimpleHike} label="Backpack Assist" value={trek.backpackAssist} />
                    </div>
                </section>

                {/* ── Booking Card — sticky, spans both rows on desktop ── */}
                <div className="lg:col-span-1 lg:row-span-2">
                    <BookingSummaryCard
                        price={trek.price}
                        originalPrice={trek.originalPrice}
                        trips={trips}
                        feeDetails={trek.feeDetails}
                        addOns={trek.addOns}
                    />
                </div>

                {/* ── Row 2 Left: Overview → Inclusions/Exclusions → Gallery → Info Accordion ── */}
                <div className="lg:col-span-2 space-y-10 pb-12">

                    {/* Overview */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                            {trek.description}
                        </div>
                        {trek.shortDescription && (
                            <div className="mt-8 p-6 bg-[#f4f1ea] border border-[#dcd6c8] rounded-2xl text-[#3d3d3d] italic leading-relaxed">
                                <span className="block mb-2 font-bold text-[#1f7a4c] not-italic uppercase tracking-wider text-xs">Highlights</span>
                                {trek.shortDescription}
                            </div>
                        )}
                    </section>

                    {/* Inclusions / Exclusions — only shown if admin has added data */}
                    {((trek.inclusions && trek.inclusions.length > 0) || (trek.exclusions && trek.exclusions.length > 0)) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {trek.inclusions && trek.inclusions.length > 0 && (
                                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#1f7a4c]">
                                        <CheckCircle weight="duotone" className="w-5 h-5" /> What's Included
                                    </h3>
                                    <ul className="space-y-3">
                                        {trek.inclusions.map((inc: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-stone-600 text-sm">
                                                <Check weight="bold" className="w-4 h-4 text-[#1f7a4c] mt-0.5 shrink-0" />
                                                <span>{inc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {trek.exclusions && trek.exclusions.length > 0 && (
                                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-rose-600">
                                        <WarningCircle weight="duotone" className="w-5 h-5" /> What's Not Included
                                    </h3>
                                    <ul className="space-y-3">
                                        {trek.exclusions.map((exc: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-stone-600 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                                                <span>{exc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Complete Trek Information accordion — fully admin-managed */}
                    <TrekInfoAccordion
                        trekTitle={trek.title}
                        infoIntro={trek.infoIntro ?? ''}
                        sections={infoSections}
                    />

                </div>
            </div>

            {/* ── Photo Gallery — full width, bottom of page ── */}
            {galleryImages.length > 1 && (
                <section className="max-w-7xl mx-auto px-4 pb-16">
                    <h2 className="text-2xl font-bold mb-6 text-stone-900">Photo Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {galleryImages.map((img, i) => (
                            <div
                                key={i}
                                className={`relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 ${i === 0 ? 'col-span-2 md:col-span-2 lg:col-span-2 aspect-video' : 'aspect-square'
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${trek.title} photo ${i + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
