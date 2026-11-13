import { Suspense } from 'react';
import UpcomingTreksListing, { type UniqueTrekItem } from '@/components/UpcomingTreksListing';

export const metadata = {
    title: 'Explore Upcoming Treks | HikingPlanet',
    description: 'Curated Himalayan treks with confirmed live departure batches. Find your next high-altitude adventure.',
    alternates: { canonical: 'https://www.hikingplanet.in/upcoming-treks' },
};

export const dynamic = 'force-dynamic';

async function TrekDataFetcher() {
    const dbConnect = (await import('@/lib/db')).default;
    const Trek = (await import('@/models/Trek')).default;
    const Trip = (await import('@/models/Trip')).default;

    await dbConnect();

    // 1. Fetch unique active treks
    const rawTreks = await Trek.find({ isActive: { $ne: false } })
        .sort({ isFeatured: -1, createdAt: -1 })
        .lean();

    // 2. Fetch all upcoming trips (batches) with open or full status
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const rawTrips = await Trip.find({
        status: { $in: ['open', 'full'] },
        startDate: { $gte: today },
    })
        .sort({ startDate: 1 })
        .lean();

    // 3. Group batches under their respective unique trek (Strictly 1 card per unique trek)
    const uniqueTreks: UniqueTrekItem[] = rawTreks.map((trek: any) => {
        const trekBatches = rawTrips
            .filter((trip: any) => trip.trek && trip.trek.toString() === trek._id.toString())
            .map((trip: any) => ({
                _id: trip._id.toString(),
                startDate: trip.startDate.toISOString(),
                endDate: trip.endDate.toISOString(),
                capacity: trip.capacity || 15,
                seatsBooked: trip.seatsBooked || 0,
                waitlistCount: trip.waitlistCount || 0,
                status: trip.status,
                priceOverride: trip.priceOverride,
                label: trip.label || '',
            }));

        const availableSeats = trekBatches.reduce(
            (sum: number, b: any) => sum + Math.max(0, b.capacity - b.seatsBooked),
            0
        );

        const monthsSet = new Set<string>();
        trekBatches.forEach((b: any) => {
            const d = new Date(b.startDate);
            monthsSet.add(d.toLocaleString('en-IN', { month: 'long', year: 'numeric' }));
        });

        return {
            _id: trek._id.toString(),
            title: trek.title,
            slug: trek.slug,
            location: trek.location || 'Garhwal Himalayas, Uttarakhand',
            description: trek.description || '',
            shortDescription: trek.shortDescription || '',
            difficulty: trek.difficulty || 'Easy',
            duration: trek.duration || 6,
            price: trek.price || 9500,
            originalPrice: trek.originalPrice,
            elevation: trek.elevation || '',
            images: trek.images || [],
            isFeatured: trek.isFeatured || false,
            isActive: trek.isActive !== false,
            batches: trekBatches,
            batchesCount: trekBatches.length,
            availableSeats,
            nextBatch: trekBatches[0] || null,
            months: Array.from(monthsSet),
        };
    });

    return <UpcomingTreksListing treks={uniqueTreks} />;
}

export default async function UpcomingTreksPage() {
    return (
        <div className="bg-[#fcfaf8] min-h-screen font-sans selection:bg-[#e30613] selection:text-white">
            <Suspense
                fallback={
                    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfaf8] gap-4">
                        <div className="w-14 h-14 border-4 border-gray-200 border-t-[#e30613] rounded-full animate-spin"></div>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                            Loading Upcoming Treks...
                        </p>
                    </div>
                }
            >
                <TrekDataFetcher />
            </Suspense>
        </div>
    );
}
