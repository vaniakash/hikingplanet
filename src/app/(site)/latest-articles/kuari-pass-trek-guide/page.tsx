import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Kuari Pass Trek: Complete Guide 2027 | Route, Altitude, Best Time & Itinerary',
    description: 'Complete guide to the Kuari Pass Trek in Uttarakhand 2027. Discover the Lord Curzon Trail — route, altitude 3,857m, 6-day itinerary, best time to visit, difficulty, and packing list.',
    alternates: { canonical: 'https://www.hikingplanet.in/latest-articles/kuari-pass-trek-guide' },
    openGraph: {
        title: 'Kuari Pass Trek Guide 2027 | HikingPlanet',
        description: 'Plan your Kuari Pass trek in 2027. Panoramic views of Nanda Devi, Dronagiri, Kamet & Hathi Parbat from 3,857 m. Best time, route map & itinerary inside.',
        url: 'https://www.hikingplanet.in/latest-articles/kuari-pass-trek-guide',
        siteName: 'HikingPlanet',
        images: [{ url: '/treks_images/kuari-pass-trek-uttarakhand.jpg', width: 1200, height: 630, alt: 'Kuari Pass Trek Uttarakhand' }],
        locale: 'en_IN',
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kuari Pass Trek Guide 2027 | HikingPlanet',
        description: 'Plan your Kuari Pass trek: panoramic Himalayan views, 6-day itinerary, altitude 3,857m, best months & packing tips.',
        images: ['/treks_images/kuari-pass-trek-uttarakhand.jpg'],
    },
};

export default function KuariPassTrekArticle() {
    return (
        <div className="min-h-screen bg-[var(--sand)] text-[var(--deep-earth)] pt-24 pb-20">

            {/* Header */}
            <header className="px-6 md:px-12 max-w-4xl mx-auto mb-16 text-center">
                <span className="text-[var(--terracotta)] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                    Trek Guide · Garhwal Himalayas
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-8 font-serif leading-tight">
                    Kuari Pass Trek: Complete Guide 2027
                </h1>
                <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto font-medium leading-relaxed mb-6">
                    The Lord Curzon Trail — panoramic views of Nanda Devi, Dronagiri, Kamet & Hathi Parbat from 3,857 m
                </p>
                <div className="flex items-center justify-center gap-4 text-sm font-semibold opacity-70 uppercase tracking-widest">
                    <span>Chamoli, Uttarakhand</span>
                    <span>•</span>
                    <span>Moderate Trek</span>
                    <span>•</span>
                    <span>6 Days</span>
                </div>
            </header>

            {/* Hero Image Placeholder */}
            <div className="px-6 md:px-12 max-w-5xl mx-auto mb-16">
                <div className="w-full aspect-[21/9] bg-[var(--deep-earth)] rounded-2xl overflow-hidden relative shadow-lg flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-600 opacity-80" />
                    <div className="relative z-10 text-center px-8">
                        <span className="text-white/90 text-2xl md:text-3xl font-serif italic block mb-2">
                            &ldquo;A window into the highest peaks of Garhwal&rdquo;
                        </span>
                        <span className="text-white/50 text-sm uppercase tracking-widest">Kuari Pass · 3,857 m · Chamoli, Uttarakhand</span>
                    </div>
                </div>
            </div>

            {/* Article Body */}
            <article className="px-6 md:px-12 max-w-3xl mx-auto prose prose-lg prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-[var(--terracotta)] prose-a:no-underline hover:prose-a:underline">

                <p className="lead text-xl opacity-90 font-medium leading-relaxed mb-10">
                    The Kuari Pass Trek, historically known as the Lord Curzon Trail, is one of the most celebrated moderate treks in the Garhwal Himalayas. Sitting at an altitude of 3,857 metres in the Chamoli district of Uttarakhand, Kuari Pass rewards trekkers with some of the most spectacular close-up panoramas of high Himalayan peaks — including Nanda Devi, Dronagiri, Kamet, and Hathi Parbat — without requiring technical mountaineering skills.
                </p>

                <p>
                    Named after Lord Curzon, the Viceroy of India who trekked this route in 1905, the trail has captivated adventurers for well over a century. Today it remains one of the finest viewpoint treks in India, particularly beloved for its ridge walks through dense oak and rhododendron forests, expansive bugyals (alpine meadows), and clear mountain sightlines that few other Uttarakhand treks can match.
                </p>

                {/* Trek at a Glance Table */}
                <h2 className="text-2xl mt-12 mb-6">Kuari Pass Trek at a Glance</h2>
                <div className="overflow-x-auto mb-8">
                    <table className="w-full text-left border-collapse bg-white shadow-sm rounded-xl overflow-hidden">
                        <thead className="bg-[var(--deep-earth)] text-white uppercase text-xs tracking-wider">
                            <tr>
                                <th className="p-4 font-bold w-1/3">Detail</th>
                                <th className="p-4 font-bold">Information</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-black/5">
                            <tr><td className="p-4 font-bold bg-black/5">Location</td><td className="p-4">Chamoli District, Uttarakhand</td></tr>
                            <tr><td className="p-4 font-bold bg-black/5">Base Camp</td><td className="p-4">Joshimath</td></tr>
                            <tr><td className="p-4 font-bold bg-black/5">Maximum Altitude</td><td className="p-4">3,857 m (12,655 ft)</td></tr>
                            <tr><td className="p-4 font-bold bg-black/5">Trek Distance</td><td className="p-4">Approx. 33–36 km</td></tr>
                            <tr><td className="p-4 font-bold bg-black/5">Duration</td><td className="p-4">5–6 Days</td></tr>
                            <tr><td className="p-4 font-bold bg-black/5">Difficulty</td><td className="p-4 font-semibold text-[var(--terracotta)]">Moderate</td></tr>
                            <tr><td className="p-4 font-bold bg-black/5">Best Time</td><td className="p-4">April–June & October–December</td></tr>
                            <tr><td className="p-4 font-bold bg-black/5">Trek Type</td><td className="p-4">Point to Point (Auli to Tapovan)</td></tr>
                            <tr><td className="p-4 font-bold bg-black/5">Nearest Airport</td><td className="p-4">Jolly Grant Airport, Dehradun</td></tr>
                            <tr><td className="p-4 font-bold bg-black/5">Suitable For</td><td className="p-4">Beginners with basic fitness & experienced trekkers</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* Why Kuari Pass */}
                <h2 className="text-2xl mt-12 mb-6 border-b-2 border-[var(--terracotta)] pb-2 inline-block">Why Trek Kuari Pass?</h2>
                <p>
                    Kuari Pass stands apart from many popular Uttarakhand treks because of the sheer scale and proximity of the Himalayan panorama it offers. At the pass, trekkers stand face-to-face with some of the highest peaks on Earth. Here is what makes this trail exceptional:
                </p>
                <ul className="list-none space-y-2 pl-0">
                    {[
                        'Unobstructed 180° view of Nanda Devi (7,816 m), India\'s highest peak within its borders',
                        'Close sightlines to Dronagiri, Kamet, Hathi Parbat, Ghori Parbat & Bethartoli',
                        'Dense rhododendron & oak forests — stunning in spring bloom',
                        'Vast bugyals (alpine meadows) at Khullara & Chitrakantha',
                        'Suitable for first-time high-altitude trekkers',
                        'Snow-covered trail from November to March',
                        'Winter version offers a magical snow-walking experience',
                    ].map((point) => (
                        <li key={point} className="flex gap-3 items-start">
                            <span className="text-[var(--terracotta)] text-lg mt-0.5 flex-shrink-0">✦</span>
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>

                {/* Trek Route */}
                <h2 className="text-2xl mt-12 mb-6 border-b-2 border-[var(--terracotta)] pb-2 inline-block">Kuari Pass Trek Route</h2>
                <p>
                    The classic route runs from <strong>Auli</strong> (or the village of Dhak near Joshimath) to <strong>Tapovan</strong>, traversing the pass in between. The trail is a point-to-point trek with distinct terrain at each stage.
                </p>
                <div className="bg-white p-6 rounded-lg font-bold text-center my-6 shadow-sm border border-black/5 uppercase tracking-wider text-sm flex flex-wrap gap-2 justify-center items-center">
                    {['Joshimath', 'Auli / Dhak', 'Gularia', 'Khullara', 'Kuari Pass', 'Chitrakantha', 'Tapovan'].map((place, i, arr) => (
                        <span key={place} className="flex items-center gap-2">
                            <span>{place}</span>
                            {i < arr.length - 1 && <span className="text-[var(--terracotta)]">→</span>}
                        </span>
                    ))}
                </div>
                <p>
                    The trail begins in dense forest before opening into sweeping ridge walks. The highlight is the final climb to Kuari Pass, where the Himalayan panorama suddenly comes into full view. The descent towards Tapovan passes through scenic bugyals and remote pastoral hamlets.
                </p>

                {/* Itinerary */}
                <h2 className="text-2xl mt-16 mb-8 text-center bg-[var(--deep-earth)] text-white py-4 rounded-lg">6-Day Trek Itinerary</h2>
                <div className="space-y-6">
                    {[
                        {
                            day: 'Day 1',
                            title: 'Dehradun / Haridwar to Joshimath',
                            desc: 'The journey begins with a long but scenic drive (approx. 9–10 hours) through Rishikesh, Devprayag, Rudraprayag, and Chamoli to reach Joshimath. Overnight at Joshimath (1,890 m). Check gear and acclimatise.',
                        },
                        {
                            day: 'Day 2',
                            title: 'Joshimath → Auli → Dhak → Gularia Camp (2,900 m)',
                            desc: 'Drive or take the ropeway to Auli (or drive to Dhak village). The trek begins through oak and rhododendron forest, climbing steadily to Gularia campsite. Distance: ~5 km. First views of the surrounding peaks emerge.',
                        },
                        {
                            day: 'Day 3',
                            title: 'Gularia → Khullara Bugyal (3,580 m)',
                            desc: 'A beautiful day through increasingly open terrain. The forest gives way to alpine meadows as you ascend to Khullara, one of the most picturesque campsites on the route. Distance: ~8 km. Clear days offer first glimpses of Nanda Devi.',
                        },
                        {
                            day: 'Day 4',
                            title: 'Khullara → Kuari Pass (3,857 m) → Chitrakantha (3,600 m)',
                            desc: 'The summit day. A steep but manageable climb to Kuari Pass, where the full Himalayan panorama opens up — Nanda Devi, Dronagiri, Kamet, Hathi Parbat, and more. Descend to Chitrakantha campsite. Distance: ~8 km.',
                        },
                        {
                            day: 'Day 5',
                            title: 'Chitrakantha → Tapovan (2,660 m)',
                            desc: 'Descend through forests and pastoral landscapes to the village of Tapovan. The trail passes local shepherd settlements and offers a quieter, more intimate conclusion to the trek. Distance: ~9 km.',
                        },
                        {
                            day: 'Day 6',
                            title: 'Tapovan → Joshimath → Dehradun',
                            desc: 'Short drive back to Joshimath followed by the long drive to Dehradun or Haridwar. Trek concludes.',
                        },
                    ].map(({ day, title, desc }) => (
                        <div key={day} className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
                            <h3 className="text-xl font-bold text-[var(--terracotta)] mb-1 uppercase tracking-wide">{day}: {title}</h3>
                            <p className="m-0 opacity-80">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* Best Time */}
                <h2 className="text-2xl mt-12 mb-6 border-b-2 border-[var(--terracotta)] pb-2 inline-block">Best Time to Trek Kuari Pass</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {[
                        { season: '🌸 April – June', label: 'Spring', note: 'Rhododendrons in full bloom, green meadows, clear skies. Some snow may remain at the pass. Ideal for first-timers.' },
                        { season: '🍂 October – November', label: 'Post-Monsoon', note: 'Crystal-clear mountain views after the monsoon clears the haze. Cool temperatures, vibrant autumn colours.' },
                        { season: '❄️ December – March', label: 'Winter', note: 'Kuari Pass becomes a snow trek. Stunning snow-covered landscapes, but requires cold-weather gear and experience.' },
                        { season: '🌧️ July – September', label: 'Monsoon', note: 'NOT recommended. Heavy rainfall, slippery trails, leeches, and limited visibility make trekking unsafe.' },
                    ].map(({ season, label, note }) => (
                        <div key={label} className="bg-white p-5 rounded-xl border border-black/5 shadow-sm">
                            <div className="font-bold text-[var(--deep-earth)] mb-1">{season} <span className="text-[var(--terracotta)]">— {label}</span></div>
                            <p className="text-sm opacity-75 m-0">{note}</p>
                        </div>
                    ))}
                </div>

                {/* Difficulty */}
                <h2 className="text-2xl mt-12 mb-6 border-b-2 border-[var(--terracotta)] pb-2 inline-block">Difficulty Level</h2>
                <p>
                    Kuari Pass is rated <strong>Moderate</strong> and is well within reach of first-time high-altitude trekkers who have reasonable fitness. The trail does not involve any technical climbing, river crossings, or exposed ridges requiring ropes or special equipment.
                </p>
                <p>Key factors to be aware of:</p>
                <ul className="list-disc pl-5 space-y-1 mb-8 opacity-90">
                    <li>Altitude goes up to 3,857 m — mild AMS is possible, stay hydrated and ascend gradually</li>
                    <li>Steep section on Day 4 approaching the pass — manageable with trekking poles</li>
                    <li>Long drive to Joshimath can be tiring — rest well on Day 1</li>
                    <li>Winter version requires crampons and cold-weather experience</li>
                </ul>

                {/* Packing List */}
                <h2 className="text-2xl mt-12 mb-6 border-b-2 border-[var(--terracotta)] pb-2 inline-block">What to Pack</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mb-8 opacity-90 text-sm">
                    <ul className="list-disc pl-5 m-0 space-y-1">
                        <li>Sturdy trekking boots</li>
                        <li>Warm layering system</li>
                        <li>Waterproof jacket & pants</li>
                        <li>Thermal innerwear</li>
                    </ul>
                    <ul className="list-disc pl-5 m-0 space-y-1">
                        <li>Fleece jacket</li>
                        <li>Woollen cap & gloves</li>
                        <li>Sunglasses (UV protection)</li>
                        <li>Sunscreen SPF 50+</li>
                    </ul>
                    <ul className="list-disc pl-5 m-0 space-y-1">
                        <li>Trekking poles</li>
                        <li>Headlamp + spare batteries</li>
                        <li>Water bottles / hydration pack</li>
                        <li>Personal first-aid kit</li>
                    </ul>
                </div>
                <p className="italic opacity-80 text-sm">
                    For the winter version (Dec–Mar), add crampons, gaiters, and a down jacket rated to at least −10°C.
                </p>

                {/* FAQ */}
                <div className="my-16 bg-white p-8 rounded-2xl shadow-sm border border-black/10">
                    <h2 className="text-3xl mb-8 font-black uppercase tracking-tight text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'Is Kuari Pass Trek suitable for beginners?',
                                a: 'Yes. Kuari Pass is one of the best moderate treks for first-time high-altitude trekkers. With basic cardiovascular fitness and a gradual pace, most healthy adults can complete it comfortably.',
                            },
                            {
                                q: 'What is the highest point of Kuari Pass Trek?',
                                a: 'The highest point is Kuari Pass at 3,857 metres (12,655 ft) above sea level.',
                            },
                            {
                                q: 'Can Kuari Pass be done in winter?',
                                a: 'Yes — December to March offers a beautiful snow trek experience. However, you will need cold-weather gear (crampons, down jacket) and prior cold-weather trekking experience.',
                            },
                            {
                                q: 'How do I reach Joshimath from Dehradun?',
                                a: 'Joshimath is approximately 250 km from Dehradun via Rishikesh and Badrinath Highway. The journey takes around 9–10 hours by road. Shared taxis and buses are available from Rishikesh.',
                            },
                            {
                                q: 'Which peaks can be seen from Kuari Pass?',
                                a: 'From the pass you can see Nanda Devi (7,816 m), Dronagiri (7,110 m), Kamet (7,756 m), Hathi Parbat (6,727 m), Ghori Parbat, and Bethartoli Himal, among others.',
                            },
                        ].map(({ q, a }) => (
                            <div key={q}>
                                <h4 className="font-bold text-lg">{q}</h4>
                                <p className="opacity-80 mt-2">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final Takeaway */}
                <div className="bg-[var(--deep-earth)] text-white p-8 rounded-xl my-12">
                    <h2 className="text-2xl mb-4 font-black uppercase tracking-wide text-[var(--terracotta)] mt-0 border-none">Final Takeaway</h2>
                    <p className="opacity-90">
                        The Kuari Pass Trek is a perfect blend of accessibility and reward. It demands neither technical skill nor extreme fitness, yet delivers one of the most jaw-dropping Himalayan panoramas available on any Indian trek. Whether you tackle it in spring bloom, autumn clarity, or winter snow — the views from that pass, with Nanda Devi towering above everything — are genuinely unforgettable.
                    </p>
                    <p className="opacity-90 mb-4">
                        For anyone looking to experience the grandeur of the Garhwal Himalayas on a first (or fifth) high-altitude trek, Kuari Pass belongs near the top of your list.
                    </p>
                    <Link
                        href="/upcoming-treks"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#e30613] hover:bg-[#c00510] text-white font-bold rounded-xl text-sm transition-all duration-200 no-underline"
                    >
                        Browse Our Upcoming Trek Batches →
                    </Link>
                </div>

            </article>
        </div>
    );
}
