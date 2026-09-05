import React from 'react';
import Link from 'next/link';

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-[var(--sand)] text-[var(--deep-earth)] pt-24 pb-20">
            {/* Header Section */}
            <section className="px-6 md:px-12 max-w-5xl mx-auto mb-20 text-center">
                <span className="text-[var(--terracotta)] font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                    Hiking Planet Careers
                </span>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">
                    Work where you belong
                </h1>
                <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto opacity-80">
                    Most careers pull young people from the hills to the cities. We're trying to build the opposite — real,
                    sustainable work in Uttarakhand, for people who know these mountains best. If you grew up here, love
                    these trails, and want to build something that puts your home on the map, we'd love to hear from you.
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto opacity-80 mt-6">
                    Hiking Planet is small, hands-on, and growing fast. Everyone on the team wears more than one hat —
                    you might be leading a trek on Monday and shooting a Reel on Wednesday. If that sounds exciting
                    rather than exhausting, you'll fit right in.
                </p>
            </section>

            {/* Pillars Section */}
            <section className="px-6 md:px-12 max-w-6xl mx-auto mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-black/5 hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-[var(--terracotta)] mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Rooted, Not Remote</h3>
                        <p className="opacity-70 leading-relaxed">
                            Work from your own village — no need to move to a city for a real career.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-black/5 hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-[var(--terracotta)] mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Learn By Doing</h3>
                        <p className="opacity-70 leading-relaxed">
                            Real responsibility from day one — treks, content, bookings, partnerships.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-black/5 hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-[var(--terracotta)] mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Grow With Us</h3>
                        <p className="opacity-70 leading-relaxed">
                            We're early-stage — join now, and grow into bigger roles as we scale pan-India.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="bg-[var(--deep-earth)] text-white py-16 px-6 md:px-12 my-20">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-2xl md:text-3xl font-light italic leading-snug mb-8">
                        "We are a bunch of committed individuals who love to work as a team, with Uttarakhand at
                        their heart. We firmly believe we are going to be the agents of change in Uttarakhand — and
                        we're looking for people who want to be that too."
                    </p>
                    <p className="text-[var(--terracotta)] font-bold tracking-[0.2em] uppercase text-sm">
                        — The Hiking Planet Team
                    </p>
                </div>
            </section>

            {/* Open Roles Section */}
            <section className="px-6 md:px-12 max-w-5xl mx-auto mb-24">
                <div className="text-center mb-16">
                    <span className="text-[var(--terracotta)] font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                        Open Roles
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
                        Where you could fit in
                    </h2>
                    <p className="text-lg opacity-80 max-w-2xl mx-auto">
                        These are the kinds of roles we're actively building out. Don't see an exact match? Reach out anyway
                        — we're a small team and often shape roles around the right person.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Role 1 */}
                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border-t-4 border-[var(--terracotta)]">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Trek Leader / Local Guide</h3>
                                <p className="opacity-80">Lead trekking groups across our Himalayan routes — from Gidara Bugyal to future pan-India treks — keeping travelers safe while sharing the local knowledge that only someone from here can give.</p>
                            </div>
                            <span className="inline-block bg-[var(--sand)] text-[var(--deep-earth)] font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full whitespace-nowrap self-start">
                                Full-Time • Raithal Base
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-[var(--terracotta)] mb-4 text-sm uppercase tracking-wider">What You'll Do</h4>
                                <ul className="space-y-2 opacity-80">
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Lead treks safely, end to end</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Coordinate with porters & camps</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Share local stories & culture</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-[var(--terracotta)] mb-4 text-sm uppercase tracking-wider">What We Look For</h4>
                                <ul className="space-y-2 opacity-80">
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Trekking / mountaineering experience</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> First-aid awareness</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Comfort speaking with travelers</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Role 2 */}
                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border-t-4 border-[var(--terracotta)]">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Content Creator & Social Media</h3>
                                <p className="opacity-80">Shoot and edit Reels, photos, and stories from treks and village life that tell Uttarakhand's story to the world, and grow the Hiking Planet Instagram and YouTube presence.</p>
                            </div>
                            <span className="inline-block bg-[var(--sand)] text-[var(--deep-earth)] font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full whitespace-nowrap self-start">
                                Full-Time • On-Trek + Remote
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-[var(--terracotta)] mb-4 text-sm uppercase tracking-wider">What You'll Do</h4>
                                <ul className="space-y-2 opacity-80">
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Shoot & edit Reels on treks</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Plan a monthly content calendar</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Grow our Instagram & YouTube</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-[var(--terracotta)] mb-4 text-sm uppercase tracking-wider">What We Look For</h4>
                                <ul className="space-y-2 opacity-80">
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Comfort with phone/camera shooting</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> CapCut or similar editing skills</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> An eye for authentic storytelling</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Role 3 */}
                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border-t-4 border-[var(--terracotta)]">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Operations & Bookings Coordinator</h3>
                                <p className="opacity-80">Own the traveler journey from first DM to trek completion — managing bookings, payments, itineraries, and day-to-day coordination with our on-ground team.</p>
                            </div>
                            <span className="inline-block bg-[var(--sand)] text-[var(--deep-earth)] font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full whitespace-nowrap self-start">
                                Full-Time • Remote / Hybrid
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-[var(--terracotta)] mb-4 text-sm uppercase tracking-wider">What You'll Do</h4>
                                <ul className="space-y-2 opacity-80">
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Handle inquiries & bookings</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Track payments & schedules</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Coordinate guides & logistics</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-[var(--terracotta)] mb-4 text-sm uppercase tracking-wider">What We Look For</h4>
                                <ul className="space-y-2 opacity-80">
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Organized, detail-oriented</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Comfortable with spreadsheets</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Good written communication</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Role 4 */}
                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border-t-4 border-[var(--terracotta)]">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Village & Homestay Partnerships</h3>
                                <p className="opacity-80">Work directly with village homestay owners and local entrepreneurs along our trek routes — onboarding them to Hiking Planet and helping them earn from tourism, in line with our rural entrepreneurship mission.</p>
                            </div>
                            <span className="inline-block bg-[var(--sand)] text-[var(--deep-earth)] font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full whitespace-nowrap self-start">
                                Part-Time • Uttarkashi Region
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-[var(--terracotta)] mb-4 text-sm uppercase tracking-wider">What You'll Do</h4>
                                <ul className="space-y-2 opacity-80">
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Identify & onboard homestays</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Support local hosts on standards</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Build long-term village relationships</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-[var(--terracotta)] mb-4 text-sm uppercase tracking-wider">What We Look For</h4>
                                <ul className="space-y-2 opacity-80">
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Strong local network in the hills</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Trusted, respected in the community</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Basic smartphone comfort</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Role 5 */}
                    <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border-t-4 border-[var(--terracotta)]">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Marketing & Content Intern</h3>
                                <p className="opacity-80">A hands-on internship for students or early-career folks who want real experience in travel marketing — supporting content, outreach, and campaign planning for Hiking Planet.</p>
                            </div>
                            <span className="inline-block bg-[var(--sand)] text-[var(--deep-earth)] font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full whitespace-nowrap self-start">
                                Internship • Remote
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-[var(--terracotta)] mb-4 text-sm uppercase tracking-wider">What You'll Do</h4>
                                <ul className="space-y-2 opacity-80">
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Assist with content & captions</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Support creator & school outreach</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Help track campaigns & results</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-[var(--terracotta)] mb-4 text-sm uppercase tracking-wider">What We Look For</h4>
                                <ul className="space-y-2 opacity-80">
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Interest in travel & social media</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> Reliable, proactive attitude</li>
                                    <li className="flex gap-3"><span className="text-[var(--terracotta)]">•</span> 2–3 hours/day availability</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Process Section */}
            <section className="px-6 md:px-12 max-w-4xl mx-auto mb-20 bg-[var(--deep-earth)] text-white p-10 md:p-16 rounded-2xl relative overflow-hidden">
                <div className="indigenous-pattern absolute inset-0 z-0 opacity-10"></div>
                <div className="relative z-10">
                    <div className="text-center mb-12">
                        <span className="text-[var(--terracotta)] font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                            How to Apply
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                            Three simple steps
                        </h2>
                    </div>

                    <div className="space-y-10">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-[var(--terracotta)] flex items-center justify-center font-bold text-xl shrink-0">1</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Send us a message</h3>
                                <p className="opacity-80">DM us on Instagram <a href="https://instagram.com/hikingplanet.in" target="_blank" rel="noopener noreferrer" className="text-[var(--terracotta)] hover:underline">@hikingplanet.in</a> or write to us through hikingplanet.in, telling us which role interests you and a little about yourself.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-[var(--terracotta)] flex items-center justify-center font-bold text-xl shrink-0">2</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Share your work or story</h3>
                                <p className="opacity-80">A short intro video, your Instagram/portfolio, trekking experience, or just a genuine note on why you want to build this with us — whatever shows us who you are.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-[var(--terracotta)] flex items-center justify-center font-bold text-xl shrink-0">3</div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Have a conversation</h3>
                                <p className="opacity-80">We'll set up a quick call or in-person chat in Raithal/Uttarkashi to see if it's a good fit — for you and for us.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section / Info */}
            <section className="px-6 md:px-12 max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-black uppercase mb-8">Ready to apply?</h3>
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm">
                    <div className="flex flex-col items-center">
                        <span className="text-[var(--terracotta)] font-bold tracking-widest uppercase mb-1">Website</span>
                        <a href="https://hikingplanet.in" className="opacity-80 hover:text-[var(--terracotta)] hover:underline transition-colors">hikingplanet.in</a>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[var(--terracotta)] font-bold tracking-widest uppercase mb-1">Instagram</span>
                        <a href="https://instagram.com/hikingplanet.in" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:text-[var(--terracotta)] hover:underline transition-colors">@hikingplanet.in</a>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[var(--terracotta)] font-bold tracking-widest uppercase mb-1">Base Village</span>
                        <span className="opacity-80">Raithal, Uttarkashi, Uttarakhand</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[var(--terracotta)] font-bold tracking-widest uppercase mb-1">Company</span>
                        <span className="opacity-80">Hiking Planet Private Limited</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
