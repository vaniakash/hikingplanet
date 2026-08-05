import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

import dbConnect from "@/lib/db";
import Trek from "@/models/Trek";

// Force dynamic rendering so the Navbar always shows the latest treks from DB
export const dynamic = 'force-dynamic';

export default async function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Fetch treks for the Navbar dropdown
    await dbConnect();
    const treks = await Trek.find({ isActive: true })
        .select('title slug difficulty duration')
        .sort({ title: 1 })
        .lean();

    // Serialize to pass to client component
    const serializedTreks = JSON.parse(JSON.stringify(treks));

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar treks={serializedTreks} />
            <main className="flex-grow">
                {children}
            </main>
            <ScrollProgress />

            <Footer />
        </div>
    );
}
