import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { ArrowRight, InstagramLogo, Globe, MapPin } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
    title: 'About Us | Hiking Planet',
    description: 'A movement to promote the culture, business, and tourism of Uttarakhand. Rooted in Raithal Village, Uttarkashi.',
    alternates: { canonical: 'https://www.hikingplanet.in/about' },
};

export default function AboutPage() {
    return (
        <div className="bg-white text-gray-900 selection:bg-red-600 selection:text-white font-sans">

            {/* ── Hero ── */}
            <header className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden flex items-center justify-center text-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images/hero.webp"
                        alt="Atmospheric landscape of Uttarkashi"
                        fill
                        priority
                        className="object-cover"
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                </div>
                <div className="relative z-10 container mx-auto px-6 max-w-4xl">
                    <FadeIn>
                        <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block bg-white/10 backdrop-blur-md py-2 px-4 rounded-full inline-block border border-white/20">
                            Our Story • Hiking Planet
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
                            Real trails.<br />
                            Real locals.<br />
                            <span className="text-red-500">Real India.</span>
                        </h1>
                        <p className="mt-6 text-white/90 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold">
                            From Raithal Village, Uttarkashi · Uttarakhand, India
                        </p>
                    </FadeIn>
                </div>
            </header>

            {/* ── Who We Are ── */}
            <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <FadeIn>
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div>
                                <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                                    Who We Are
                                </span>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                                    A movement, <br />
                                    <span className="text-gray-500">not just a company</span>
                                </h2>
                                <div className="h-1 w-20 bg-red-600 rounded-full mb-8"></div>
                            </div>
                            <div className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed">
                                <p>
                                    Hiking Planet is a collaborative effort to promote the culture, business, and tourism of Uttarakhand. It began as a shared idea among people who grew up in these hills, and has grown into an initiative built with one purpose — to put Uttarakhand on the map, told by the very people who call it home.
                                </p>
                                <p>
                                    We&apos;re also something more than a travel brand. Hiking Planet is an initiative to encourage rural entrepreneurship in Uttarakhand — to give local people a reason, and a real opportunity, to build their future in their own homeland instead of leaving it behind.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── What & Why ── */}
            <section className="py-20 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        <FadeIn>
                            <div className="bg-white p-10 lg:p-14 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
                                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-8">
                                    <Globe className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-extrabold tracking-tight mb-4 text-gray-900">What We Do</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    We curate and run treks and travel experiences across Uttarakhand, share the real, unfiltered stories of the mountains, and connect travelers with the villages, guides, and traditions that make this region what it is.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <div className="bg-white p-10 lg:p-14 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
                                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-8">
                                    <MapPin className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-extrabold tracking-tight mb-4 text-gray-900">Why We Do It</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Because Uttarakhand deserves to be seen for what it truly is — not just a destination on a map, but a living culture, a home, and an opportunity waiting for its own people to lead the way.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── Team Quote ── */}
            <section className="py-16 md:py-20 bg-red-600 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] opacity-10 bg-repeat"></div>
                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <FadeIn>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-8 leading-snug tracking-tight">
                            &quot;We are a bunch of committed individuals who love to work as a team, with Uttarakhand at their heart. We firmly believe we are going to be the agents of change in Uttarakhand.&quot;
                        </h2>
                        <div className="flex flex-col items-center gap-3">
                            <div className="h-1 w-12 bg-white/50 rounded-full" />
                            <span className="text-white font-bold uppercase tracking-[0.2em] text-sm mt-4">
                                — The Hiking Planet Team
                            </span>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Timeline / Our Story ── */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <div className="text-center mb-20 max-w-3xl mx-auto">
                            <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                                Our Story
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
                                From an idea to a movement
                            </h2>
                            <div className="h-1 w-20 bg-red-600 rounded-full mx-auto"></div>
                        </div>
                    </FadeIn>

                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 relative">
                        {/* Timeline Connector */}
                        <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0" />

                        {[
                            {
                                date: 'October 2025',
                                title: 'The Seed is Planted',
                                desc: 'Hiking Planet was seeded in October 2025 with a single, clear objective — to promote Uttarakhand over the internet, and show the world the mountains the way we know them.'
                            },
                            {
                                date: 'Concept',
                                title: 'Just an Idea',
                                desc: 'What started as a conversation between a few people who cared about their home became a concept worth building — a platform for Uttarakhand\'s culture, business, and tourism, made by locals themselves.'
                            },
                            {
                                date: 'Today',
                                title: 'Concept Turned Reality',
                                desc: 'Once just a concept, Hiking Planet is now proud to have turned that idea into reality — a registered travel company, a growing community, and a genuine platform for rural entrepreneurship across Uttarakhand.'
                            }
                        ].map((item, i) => (
                            <FadeIn key={item.title} delay={i * 0.2}>
                                <div className="relative z-10 text-center px-4">
                                    <div className="hidden lg:flex w-12 h-12 bg-white border-4 border-red-600 rounded-full mb-8 mx-auto shadow-sm items-center justify-center">
                                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                                    </div>
                                    <span className="text-red-600 font-bold uppercase tracking-[0.1em] text-sm mb-3 block">
                                        {item.date}
                                    </span>
                                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-base">
                                        {item.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Core Pillars ── */}
            <section className="py-24 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                                Our Team
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
                                Agents of Change
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                We are a crazy team with a firm belief — that we are going to be the &quot;agents of change&quot; in Uttarakhand.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            { num: '01', title: 'Rooted in local culture & community' },
                            { num: '02', title: 'Driven by rural entrepreneurship' },
                            { num: '03', title: 'Committed to honest storytelling' }
                        ].map((pillar, i) => (
                            <FadeIn key={pillar.num} delay={i * 0.15}>
                                <div className="bg-white rounded-2xl p-10 h-full shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md transition-shadow text-center">
                                    <span className="text-6xl font-black text-gray-100 mb-4 block leading-none select-none">
                                        {pillar.num}
                                    </span>
                                    <h4 className="text-xl font-extrabold tracking-tight text-gray-900">
                                        {pillar.title}
                                    </h4>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── The Company ── */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <div className="bg-gray-900 rounded-3xl p-10 md:p-16 lg:p-20 relative overflow-hidden shadow-xl">
                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 relative z-10 items-center">
                                <div>
                                    <span className="text-red-400 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                                        The Company
                                    </span>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
                                        Hiking Planet <br /> Private Limited
                                    </h2>
                                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                        Behind every trek and every story is a registered, accountable company built for the long run — because promoting Uttarakhand responsibly means doing it the right way.
                                    </p>
                                </div>
                                <div className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-4 border-b border-white/10">
                                        Registration & Credentials
                                    </h4>
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-1 flex-shrink-0 text-red-400">✦</div>
                                        <p className="text-gray-300">
                                            Hiking Planet is a registered travel company, with its registered office located in Dehradun, Uttarakhand.
                                        </p>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-1 flex-shrink-0 text-red-400">✦</div>
                                        <p className="text-gray-300">
                                            We are registered as an Adventure Tour Operator with the Uttarakhand Tourism Development Board, Government of Uttarakhand.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-3 pt-6">
                                        <span className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-white">
                                            Registered Travel Company
                                        </span>
                                        <span className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-white">
                                            Adventure Tour Operator
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Footer CTA ── */}
            <section className="py-24 bg-gray-50 border-t border-gray-200 text-center">
                <div className="container mx-auto px-6 max-w-4xl">
                    <FadeIn>
                        <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                            Get In Touch
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
                            Come trek with us
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
                            Whether you want to book a trek, collaborate with us, or bring rural tourism to your own village — we&apos;d love to hear from you.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                            <Link href="/contact" className="bg-red-600 text-white hover:bg-red-700 transition-colors px-10 py-4 rounded-full font-bold uppercase tracking-widest inline-flex items-center justify-center gap-3 shadow-md hover:shadow-lg">
                                Contact Us <ArrowRight weight="bold" />
                            </Link>
                            <Link href="/upcoming-treks" className="bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-900 transition-colors px-10 py-4 rounded-full font-bold uppercase tracking-widest inline-flex items-center justify-center gap-3 shadow-sm">
                                View Treks
                            </Link>
                        </div>

                        {/* Social/Location Bar */}
                        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 pt-10 border-t border-gray-200">
                            <a href="https://hikingplanet.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                                <Globe className="w-5 h-5" />
                                <span className="font-bold tracking-wider text-sm">hikingplanet.in</span>
                            </a>
                            <a href="https://instagram.com/hikingplanet.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                                <InstagramLogo className="w-5 h-5" />
                                <span className="font-bold tracking-wider text-sm">@hikingplanet.in</span>
                            </a>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-5 h-5" />
                                <span className="font-bold tracking-wider text-sm">
                                    Raithal, Uttarkashi
                                </span>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

        </div>
    );
}
