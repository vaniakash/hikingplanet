import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Dayara Bugyal Trek 2027: Itinerary, Cost, Altitude & Route Map',
    description:
        'Complete guide to Dayara Bugyal Trek 2027. Plan your Himalayan journey with detailed 6-day itinerary, Dehradun to Raithal route, per-person costs, altitude profile, and route map.',
    alternates: {
        canonical: 'https://www.hikingplanet.in/latest-articles/dayara-bugyal-trek-guide-2027',
    },
    openGraph: {
        title: 'Dayara Bugyal Trek 2027: Itinerary, Cost, Altitude & Route Map | HikingPlanet',
        description:
            'Plan your Dayara Bugyal trek with our definitive 2027 guide. Includes Dehradun to Raithal travel, day-by-day itinerary, cost breakdown, altitude, and trail tips.',
        url: 'https://www.hikingplanet.in/latest-articles/dayara-bugyal-trek-guide-2027',
        siteName: 'HikingPlanet',
        images: [
            {
                url: '/images/dayarabugyal1.webp',
                width: 1200,
                height: 630,
                alt: 'Dayara Bugyal Alpine Meadows Uttarakhand',
            },
        ],
        locale: 'en_IN',
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dayara Bugyal Trek 2027: Complete Itinerary & Cost Guide',
        description:
            'Everything you need to know about Dayara Bugyal 2027: Route map from Dehradun, 6-day itinerary, altitude chart, and cost breakdown.',
        images: ['/images/dayarabugyal1.webp'],
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Article',
            '@id': 'https://www.hikingplanet.in/latest-articles/dayara-bugyal-trek-guide-2027#article',
            isPartOf: {
                '@type': 'WebPage',
                '@id': 'https://www.hikingplanet.in/latest-articles/dayara-bugyal-trek-guide-2027',
            },
            headline: 'Dayara Bugyal Trek 2027: Itinerary, Cost, Altitude & Route Map',
            description:
                'Comprehensive guide to the Dayara Bugyal Trek in 2027, covering the route from Dehradun to Raithal, day-by-day plan, pricing, and altitude details.',
            image: 'https://www.hikingplanet.in/images/dayarabugyal1.webp',
            datePublished: '2026-11-15T08:00:00+05:30',
            dateModified: '2026-11-15T08:00:00+05:30',
            author: {
                '@type': 'Organization',
                name: 'The HikingPlanet Team',
                url: 'https://www.hikingplanet.in',
            },
            publisher: {
                '@type': 'Organization',
                name: 'HikingPlanet',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.hikingplanet.in/images/new_logo.png',
                },
            },
        },
        {
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'How do I reach Dayara Bugyal from Dehradun?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Take a scenic 6 to 7-hour drive (approx. 180 km) from Dehradun via Mussoorie/Chamba to Uttarkashi, and then continue 42 km further up to Raithal village, which serves as the traditional base camp for the trek.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'What is the maximum altitude of Dayara Bugyal Trek?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'The main meadows sit between 10,000 and 11,180 feet, while the highest vantage point at Bakaria Top reaches an altitude of 12,057 feet (3,675 m).',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'What is the total cost for Dayara Bugyal Trek in 2027?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'The typical package cost ranges from ₹7,999 to ₹9,999 per person, which covers base-to-base accommodation, meals, camping gear, forest permits, certified trek leaders, and safety equipment. Shared transport between Dehradun and Raithal usually costs ₹1,500 to ₹2,000 round trip.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'How difficult is Dayara Bugyal Trek?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Dayara Bugyal is graded as an Easy to Moderate trek. The gradual ascents through oak forests make it ideal for beginners, families, and first-time Himalayan trekkers.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'Which base village is better: Raithal or Barsu?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Raithal is widely considered the superior route because of its gentler gradient, panoramic views of Mt. Srikanth, and charming traditional Garhwali wooden architecture, while Barsu has a steeper trail.',
                    },
                },
            ],
        },
    ],
};

export default function DayaraBugyalTrekGuide2027() {
    return (
        <div className="min-h-screen bg-[var(--sand)] text-[var(--deep-earth)] pt-24 pb-20">
            {/* Structured Data Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header Section */}
            <header className="px-6 md:px-12 max-w-4xl mx-auto mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--terracotta)]/10 text-[var(--terracotta)] rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    <span>Uttarakhand Himalayan Guide</span>
                    <span>•</span>
                    <span>Updated for 2027</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 font-serif leading-tight">
                    Dayara Bugyal Trek 2027: Itinerary, Cost, Altitude & Route Map
                </h1>
                <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mb-6">
                    Everything you need to plan your trek across India's most expansive alpine meadow: Dehradun to Raithal transit, day-by-day plan, pricing breakdown, and essential mountain tips.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold opacity-70 uppercase tracking-widest">
                    <span>By HikingPlanet Editorial</span>
                    <span>•</span>
                    <span>Reading Time: 8 Mins</span>
                    <span>•</span>
                    <span>Region: Uttarkashi, Uttarakhand</span>
                </div>
            </header>

            {/* Featured Image */}
            <div className="px-6 md:px-12 max-w-5xl mx-auto mb-14">
                <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden relative shadow-xl border border-black/10">
                    <Image
                        src="/images/dayarabugyal1.webp"
                        alt="Endless velvet green meadows of Dayara Bugyal against snow-capped peaks"
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 md:p-10">
                        <p className="text-white text-sm md:text-base font-medium max-w-xl">
                            The rolling expanse of Dayara Bugyal spans over 28 square kilometers, framing Mt. Bandarpoonch and the Gangotri massif.
                        </p>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="px-6 md:px-12 max-w-3xl mx-auto prose prose-lg prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-[var(--terracotta)] prose-a:no-underline hover:prose-a:underline">
                
                <p className="lead text-xl opacity-90 font-medium leading-relaxed mb-8">
                    If you close your eyes and imagine the quintessential Himalayan meadow—velvety green grass rippling in the mountain breeze, wild alpine flowers, quaint shepherd huts, and a dramatic amphitheatre of snow-capped 20,000-foot peaks—you are picturing <strong>Dayara Bugyal</strong>.
                </p>

                <p>
                    Perched at an elevation of 11,181 feet (with its highest summit at <strong>Bakaria Top</strong> touching 12,057 feet) in the Uttarkashi district of Uttarakhand, Dayara Bugyal is revered by veteran mountaineers as one of the two most stunning alpine meadows in India (alongside Ali Bedni Bugyal). Whether draped in pristine powder snow in winter or carpeted in wildflowers in summer, Dayara is an enchanting year-round Himalayan trek.
                </p>

                {/* Quick Facts Card */}
                <h2 className="text-2xl mt-12 mb-6">Dayara Bugyal Trek 2027: Quick Snapshot</h2>
                <div className="overflow-x-auto mb-8 not-prose">
                    <table className="w-full text-left border-collapse bg-white shadow-sm rounded-xl overflow-hidden border border-black/10">
                        <thead className="bg-[var(--deep-earth)] text-white uppercase text-xs tracking-wider">
                            <tr>
                                <th className="p-4 font-bold w-1/3">Key Parameter</th>
                                <th className="p-4 font-bold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-black/5">
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Location</td>
                                <td className="p-4">Uttarkashi District, Garhwal Himalayas, Uttarakhand</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Base Village</td>
                                <td className="p-4">Raithal Village (7,400 ft)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Highest Altitude</td>
                                <td className="p-4 font-bold text-[var(--terracotta)]">12,057 ft (3,675 m) at Bakaria Top</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Total Trek Distance</td>
                                <td className="p-4">Approx. 22 km (round trip from Raithal)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Standard Duration</td>
                                <td className="p-4">6 Days / 5 Nights (Dehradun to Dehradun)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Trek Difficulty</td>
                                <td className="p-4 text-emerald-700 font-bold">Easy to Moderate (Beginner-Friendly)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Best Time to Visit</td>
                                <td className="p-4">Winter snow: Dec – March | Greenery: May – Oct</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Expected Cost (2027)</td>
                                <td className="p-4 font-semibold">₹7,999 – ₹9,500 + 5% GST (Base to Base)</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Key Mountain Peaks</td>
                                <td className="p-4">Bandarpoonch (6,316 m), Black Peak (Kalanag), Srikanth, Gangotri Range</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Route Map & How to Reach */}
                <h2 className="text-2xl mt-12 mb-6 border-b-2 border-[var(--terracotta)] pb-2 inline-block">
                    How to Reach Dayara Bugyal: Dehradun to Raithal Route
                </h2>
                <p>
                    The trek begins from the picturesque village of <strong>Raithal</strong>, nestled 42 km north of Uttarkashi. While an alternative route starts from Barsu, Raithal is overwhelmingly preferred because its ascent through dense oak forests is significantly more gradual, well-acclimatized, and offers superior vistas.
                </p>

                <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm my-6 not-prose">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--terracotta)]"></span>
                        Road Route Breakdown: Dehradun → Raithal (185 km · 7 hours)
                    </h3>
                    <ol className="space-y-3 text-sm text-[var(--deep-earth)]/90 list-decimal pl-5">
                        <li><strong>Dehradun to Suwakholi / Dhanaulti:</strong> Climb through Mussoorie bypass with stunning valley views.</li>
                        <li><strong>Chamba to Chinyalisaur:</strong> Drive along the turquoise waters of the Tehri Dam reservoir.</li>
                        <li><strong>Dharasu Bend to Uttarkashi:</strong> Follow the Bhagirathi river into the sacred hub of Uttarkashi (great spot for breakfast or lunch).</li>
                        <li><strong>Uttarkashi to Bhatwari &amp; Raithal:</strong> Cross the bridge past Bhatwari and ascend the gentle serpentine roads through pine forests to Raithal village (7,400 ft).</li>
                    </ol>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 not-prose">
                    <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl">
                        <h4 className="font-bold text-emerald-900 mb-2">Public Transport Option</h4>
                        <p className="text-xs text-emerald-800 leading-relaxed">
                            Shared sumos and GMOU/UTC state buses depart daily from Dehradun Railway Station / Rispana Bridge to Uttarkashi (₹350–₹450). From Uttarkashi, shared jeeps run to Bhatwari/Raithal (₹100–₹150).
                        </p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl">
                        <h4 className="font-bold text-amber-900 mb-2">HikingPlanet Group Pickup</h4>
                        <p className="text-xs text-amber-800 leading-relaxed">
                            All scheduled batches include organized private tempo traveler / Bolero pickups directly from Dehradun Railway Station at 6:30 AM on Day 1 for a seamless door-to-trailhead transfer.
                        </p>
                    </div>
                </div>

                {/* Day-by-Day Itinerary */}
                <h2 className="text-2xl mt-12 mb-6 border-b-2 border-[var(--terracotta)] pb-2 inline-block">
                    Detailed 6-Day Itinerary: Dayara Bugyal Trek
                </h2>

                <div className="space-y-8 not-prose my-8">
                    {/* Day 1 */}
                    <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span className="font-black text-sm uppercase tracking-wider text-[var(--terracotta)]">Day 1</span>
                            <span className="text-xs font-semibold px-2.5 py-1 bg-black/5 rounded-full">Drive: 185 km · 7–8 hrs</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Dehradun to Raithal Base Village (7,400 ft)</h3>
                        <p className="text-sm text-[var(--deep-earth)]/80 leading-relaxed">
                            Depart early from Dehradun. The drive winds alongside the Bhagirathi River through Mussoorie and Uttarkashi. Reach Raithal by late afternoon. Check into your cozy traditional village homestay. In the evening, explore the ancient 500-year-old <em>Panchpura</em> wooden temple and witness the sunset lighting up Mt. Srikanth and Gangotri peaks.
                        </p>
                    </div>

                    {/* Day 2 */}
                    <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span className="font-black text-sm uppercase tracking-wider text-[var(--terracotta)]">Day 2</span>
                            <span className="text-xs font-semibold px-2.5 py-1 bg-black/5 rounded-full">Trek: 4.5 km · 4 hrs · Gain: 2,100 ft</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Raithal to Gui Campsite (9,500 ft)</h3>
                        <p className="text-sm text-[var(--deep-earth)]/80 leading-relaxed">
                            Begin your trek with a gentle incline through terrace fields before entering a dense canopy of ancient rhododendron, silver oak, and deodar trees. The forest air is crisp and fragrant. Reach Gui campsite, nestled in a clearing surrounded by rustic wooden shepherd huts (<em>Gujjar Kothis</em>) with an enchanting small mountain pond.
                        </p>
                    </div>

                    {/* Day 3 */}
                    <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span className="font-black text-sm uppercase tracking-wider text-[var(--terracotta)]">Day 3</span>
                            <span className="text-xs font-semibold px-2.5 py-1 bg-black/5 rounded-full">Trek: 3.5 km · 3 hrs · Gain: 1,600 ft</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Gui to Chilapada / Dayara Meadow Edge (11,100 ft)</h3>
                        <p className="text-sm text-[var(--deep-earth)]/80 leading-relaxed">
                            A relaxed trekking day allowing optimal acclimatization. Trek through clearing forest trails where tree lines begin to recede. You will pass Chilapada camp and enter the breathtaking entrance of Dayara Bugyal. Settle into the camp, sip hot Garhwali tea, and marvel at Bandarpoonch (Monkey’s Tail) looming majestically right before your eyes.
                        </p>
                    </div>

                    {/* Day 4 */}
                    <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm border-l-4 border-l-[var(--terracotta)]">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span className="font-black text-sm uppercase tracking-wider text-[var(--terracotta)]">Day 4 · Summit Day</span>
                            <span className="text-xs font-semibold px-2.5 py-1 bg-black/5 rounded-full">Trek: 8 km · 6–7 hrs</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Chilapada to Dayara Bugyal, Bakaria Top (12,057 ft) &amp; Return to Gui</h3>
                        <p className="text-sm text-[var(--deep-earth)]/80 leading-relaxed">
                            Start before dawn. As the first rays of sunlight illuminate the meadows, the endless rolling hills stretch out like green velvet or brilliant white snowfields. Ascend gradually to <strong>Bakaria Top</strong>, the highest elevation of the trek. From here, enjoy a jaw-dropping 360-degree panorama of Draupadi Ka Danda, Jaonli, Gangotri I, II, III, Srikanth, and Black Peak. Descend back through Dayara to the peaceful shelter of Gui camp for the night.
                        </p>
                    </div>

                    {/* Day 5 */}
                    <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span className="font-black text-sm uppercase tracking-wider text-[var(--terracotta)]">Day 5</span>
                            <span className="text-xs font-semibold px-2.5 py-1 bg-black/5 rounded-full">Trek: 4.5 km · 3 hrs · Descent</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Gui Campsite to Raithal Village (7,400 ft)</h3>
                        <p className="text-sm text-[var(--deep-earth)]/80 leading-relaxed">
                            A scenic, easy descent through the whispering oak canopy. You will reach Raithal by lunch. Spend the afternoon relaxing, celebrating with your trek mates, tasting authentic local food (like Mandua roti and Gahat dal), and reflecting on an unforgettable summit experience.
                        </p>
                    </div>

                    {/* Day 6 */}
                    <div className="bg-white p-6 rounded-xl border border-black/10 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span className="font-black text-sm uppercase tracking-wider text-[var(--terracotta)]">Day 6</span>
                            <span className="text-xs font-semibold px-2.5 py-1 bg-black/5 rounded-full">Drive: 185 km · 7–8 hrs</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Raithal to Dehradun</h3>
                        <p className="text-sm text-[var(--deep-earth)]/80 leading-relaxed">
                            Board your vehicle for the drive back to Dehradun. Reach Dehradun Railway Station or ISBT by 6:00 PM to 7:00 PM, concluding your journey with memories that will last a lifetime.
                        </p>
                    </div>
                </div>

                {/* Cost Breakdown */}
                <h2 className="text-2xl mt-12 mb-6 border-b-2 border-[var(--terracotta)] pb-2 inline-block">
                    Dayara Bugyal Trek Cost &amp; Inclusions (2027 Estimates)
                </h2>
                <p>
                    Planning your budget transparently is critical. When booking through a certified, safety-first operator like HikingPlanet, your base package fee covers all essentials from your arrival at Raithal until your final descent.
                </p>

                <div className="overflow-x-auto my-6 not-prose">
                    <table className="w-full text-left border-collapse bg-white shadow-sm rounded-xl overflow-hidden border border-black/10">
                        <thead className="bg-[var(--deep-earth)] text-white uppercase text-xs tracking-wider">
                            <tr>
                                <th className="p-4 font-bold">Category</th>
                                <th className="p-4 font-bold">Typical Price Range</th>
                                <th className="p-4 font-bold">What is Included</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-black/5">
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Base Trek Package</td>
                                <td className="p-4 font-semibold text-[var(--terracotta)]">₹7,999 – ₹9,500 / person</td>
                                <td className="p-4">Homestay in Raithal, 4-season alpine tents, sleeping bags, hot nutritious meals, certified guides, permits &amp; first-aid.</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Round-Trip Transport</td>
                                <td className="p-4 font-semibold">₹1,800 – ₹2,200 / person</td>
                                <td className="p-4">Shared tempo traveler / Bolero from Dehradun Railway Station to Raithal and back.</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Rental Gear (Optional)</td>
                                <td className="p-4 font-semibold">₹800 – ₹1,500 total</td>
                                <td className="p-4">Trekking poles, waterproof gaiters, microspikes (for winter batches), insulated down jackets.</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-bold bg-black/5">Offloading (Optional)</td>
                                <td className="p-4 font-semibold">₹1,200 – ₹1,500 / bag</td>
                                <td className="p-4">Mule or porter offloading if you do not want to carry your 50–60L rucksack on trail.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* CTA Card */}
                <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-[#1a1c1e] to-[#2d3134] text-white shadow-xl not-prose">
                    <div className="max-w-xl">
                        <span className="text-[#e30613] font-bold text-xs uppercase tracking-widest block mb-2">
                            Limited Upcoming Batches
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 text-white">
                            Ready to Trek Across the Meadows of Dayara?
                        </h3>
                        <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                            Join HikingPlanet's expert-led small batches with certified mountaineering instructors, cozy village homestays, and high-altitude safety protocols.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/treks/dayara-bugyal-trek"
                                className="inline-flex items-center justify-center px-6 py-3 bg-[#e30613] hover:bg-[#c00510] text-white font-bold rounded-lg text-sm transition-all duration-200 shadow-lg hover:shadow-red-500/20"
                            >
                                View Live Batches &amp; Book
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg text-sm transition-all duration-200"
                            >
                                Enquire for Custom Group
                            </Link>
                        </div>
                    </div>
                </div>

                {/* FAQs Section */}
                <h2 className="text-2xl mt-12 mb-6 border-b-2 border-[var(--terracotta)] pb-2 inline-block">
                    Frequently Asked Questions (FAQ)
                </h2>
                
                <div className="space-y-6 not-prose my-6">
                    <div className="bg-white p-5 rounded-xl border border-black/10 shadow-sm">
                        <h4 className="font-bold text-base text-[var(--deep-earth)] mb-2">
                            Is there mobile network connectivity on Dayara Bugyal?
                        </h4>
                        <p className="text-sm text-[var(--deep-earth)]/80 leading-relaxed">
                            Raithal base village has decent Airtel and Jio 4G connectivity. However, once you trek past Gui camp towards Chilapada and Dayara meadows, signals become intermittent or absent. We advise informing family before departing Raithal.
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-black/10 shadow-sm">
                        <h4 className="font-bold text-base text-[var(--deep-earth)] mb-2">
                            Are there ATM facilities available along the route?
                        </h4>
                        <p className="text-sm text-[var(--deep-earth)]/80 leading-relaxed">
                            The last reliable ATMs are in Uttarkashi. There are no ATMs in Raithal or on the trekking route. Please carry sufficient cash (₹3,000 to ₹5,000) for personal expenses, mule offloading, and hot snacks in the village.
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-black/10 shadow-sm">
                        <h4 className="font-bold text-base text-[var(--deep-earth)] mb-2">
                            Can I trek Dayara Bugyal solo without a guide?
                        </h4>
                        <p className="text-sm text-[var(--deep-earth)]/80 leading-relaxed">
                            Uttarakhand Forest Department rules mandate an authorized forest permit and a certified local guide for high-altitude bugyals. Trekking without permits can attract fines, and unpredictable mountain weather (sudden fog or snowfall) makes having a qualified guide essential for safety.
                        </p>
                    </div>
                </div>

                {/* Final Takeaway */}
                <div className="bg-[var(--deep-earth)] text-white p-8 rounded-xl my-12 not-prose">
                    <h3 className="text-xl font-bold uppercase tracking-wide text-[var(--terracotta)] mb-3">
                        The Final Word for 2027
                    </h3>
                    <p className="text-sm opacity-90 leading-relaxed mb-4">
                        Dayara Bugyal remains unmatched in its balance of approachable trails and otherworldly grandeur. In 6 days, you transition from ancient Garhwali villages to one of the world's most sublime alpine amphitheatres. If you are picking your first Himalayan journey in 2027, or returning for winter snow magic, Dayara should be at the top of your list.
                    </p>
                    <p className="text-xs opacity-70">
                        Have more questions? Reach out to our expedition team at <Link href="/contact" className="text-white underline">HikingPlanet Support</Link>.
                    </p>
                </div>

            </article>
        </div>
    );
}
