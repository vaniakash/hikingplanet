import { Suspense } from 'react';
import GarhwalExperienceClient from '@/components/GarhwalExperienceClient';

export const metadata = {
    title: 'Explore Garhwal Himalayas | Upcoming Treks',
    description: 'Curated treks across the most beautiful trails of Garhwal, Uttarakhand. Find your next adventure.',
};

export const dynamic = 'force-dynamic';

async function TrekDataFetcher({ search }: { search: string }) {
    const dbConnect = (await import('@/lib/db')).default;
    const Trek = (await import('@/models/Trek')).default;

    await dbConnect();
    
    // Fetch all active treks. Filter by search if provided.
    const query: any = {};
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }
    const treks = await Trek.find(query).sort({ createdAt: -1 }).lean();
    
    // Serialize for Client Component
    const serializedTreks = JSON.parse(JSON.stringify(treks));

    return <GarhwalExperienceClient initialTreks={serializedTreks} />;
}

export default async function UpcomingTreksPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const resolvedParams = await searchParams;
    const search = typeof resolvedParams.search === 'string' ? resolvedParams.search : '';
    return (
        <div className="bg-[#fcfaf8] min-h-screen font-sans selection:bg-[#e30613] selection:text-white">
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-[#fcfaf8]">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#e30613] rounded-full animate-spin"></div>
                </div>
            }>
                <TrekDataFetcher search={search} />
            </Suspense>
        </div>
    );
}
