import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.hikingplanet.in';

    // Dynamically import to avoid breaking if DB not available at build time
    let trekUrls: MetadataRoute.Sitemap = [];
    try {
        const dbConnect = (await import('@/lib/db')).default;
        const Trek = (await import('@/models/Trek')).default;
        await dbConnect();
        const treks = await Trek.find({}).select('slug updatedAt').lean() as any[];
        trekUrls = treks.map((trek) => ({
            url: `${baseUrl}/treks/${trek.slug}`,
            lastModified: trek.updatedAt ?? new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }));
    } catch {
        // DB unavailable at build time — static pages still get sitemapped
    }

    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/treks`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/upcoming-treks`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/butter-festival`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/latest-articles`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/latest-articles/dayara-bugyal-trek-guide-2027`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/latest-articles/dayara-bugyal-snowfall-weather-guide-2027`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/latest-articles/dayara-bugyal-butter-festival-anduri-utsav-2027`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/latest-articles/is-dayara-bugyal-safe-for-beginners-kids-2027`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/latest-articles/dayara-bugyal-vs-kedarkantha-trek-2027`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/latest-articles/sahastra-tal-trek`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    return [...staticUrls, ...trekUrls];
}
