import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
    title: 'Our Roots | HikingPlanet',
    description:
        'Born in Uttarkashi—the true gateway to iconic high-altitude routes—we are redefining adventure with an unwavering focus on safety, logistics, and meaningful exploration.',
    alternates: { canonical: 'https://www.hikingplanet.in/about' },
    openGraph: {
        type: 'website',
        url: 'https://www.hikingplanet.in/about',
        title: 'Our Roots | HikingPlanet',
        description:
            'Born in Uttarkashi—the true gateway to iconic high-altitude routes. Meet the team redefining adventure with safety, logistics, and meaningful exploration.',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'HikingPlanet — Our Roots' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Roots | HikingPlanet — Himalayan Journeys from Uttarkashi',
        description: 'Meet the certified team behind expert Himalayan treks from Uttarkashi.',
        images: ['/og-image.jpg'],
    },
};


export default function AboutPage() {
    return (
        <div className="bg-[var(--sand)]">

            {/* ── Hero ── */}
            <header className="relative h-[85vh] w-full overflow-hidden flex items-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images/hero.webp"
                        alt="Atmospheric landscape of Uttarkashi"
                        fill
                        priority
                        className="object-cover"
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 via-[#0F172A]/40 to-[#0F172A]/80" />
                    <div className="absolute inset-0 indigenous-pattern" />
                </div>
                <div className="relative z-10 container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <div className="max-w-4xl">
                            <span className="text-[var(--terracotta)] font-black uppercase tracking-[0.5em] text-xs mb-6 block">
                                Est. 2025 • Uttarkashi
                            </span>
                            <h1 className="text-7xl md:text-9xl font-extrabold text-white leading-[0.85] uppercase tracking-tight">
                                Our Roots in the <br />
                                <span className="text-[var(--terracotta)]">High Himalayas</span>
                            </h1>
                            <p className="mt-8 text-white/70 text-xl max-w-xl leading-relaxed font-light font-serif italic">
                                Born in Uttarkashi—the true gateway to iconic high-altitude routes—we are redefining adventure with an unwavering focus on safety, logistics, and meaningful exploration.
                            </p>
                        </div>
                    </FadeIn>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black">Begin the Story</span>
                    <span className="animate-bounce text-lg">↓</span>
                </div>
            </header>

            {/* ── The Genesis ── */}
            <section className="py-24 bg-[#0F172A] overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-0 overflow-hidden shadow-2xl rounded-sm">
                        <div className="relative h-[600px] lg:h-auto overflow-hidden">
                            <Image
                                src="/images/herosection.webp"
                                alt="Founders of HikingPlanet"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[var(--forest-green)]/20 mix-blend-multiply" />
                            <div className="absolute bottom-8 left-8">
                                <div className="bg-[var(--terracotta)] p-4 angular-card">
                                    <p className="text-white text-xs uppercase tracking-widest font-bold">
                                        The Expeditionist Vision
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[var(--forest-green)] p-12 lg:p-20 flex flex-col justify-center relative">
                            <div className="absolute top-0 right-0 w-32 h-32 indigenous-pattern opacity-20" />
                            <span className="text-[var(--terracotta)] font-black uppercase tracking-[0.4em] text-xs mb-8">
                                The Genesis
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight uppercase tracking-tight">
                                From Offline <br />to Online
                            </h2>
                            <div className="space-y-6 text-white/80 leading-relaxed font-serif text-lg">
                                <p>
                                    What began in 2025 as a passionate, grassroots initiative led by a dedicated expedition enthusiast has evolved into a professional trekking network. Our roots lie in organizing intimate, offline trekking groups where the connection to the trail was personal and profound.
                                </p>
                                <p>
                                    Today, we bridge that raw, authentic experience with professional logistics. We have transitioned from local meetups to a structured organization that opens the doors of the Himalayas to the world, without losing the spirit of our humble beginnings.
                                </p>
                            </div>
                            <div className="mt-12 flex items-center gap-4">
                                <div className="h-px w-12 bg-[var(--terracotta)]" />
                                <span className="text-[var(--terracotta)] font-bold uppercase tracking-widest text-sm">
                                    Our Ancestral Promise
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Philosophy & Mission ── */}
            <section className="py-32 relative bg-[var(--sand)]">
                <div className="absolute inset-0 motif-bg" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <FadeIn>
                        <div className="text-center mb-24 max-w-3xl mx-auto">
                            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 uppercase tracking-tight text-[#0F172A]">
                                Philosophy &amp;{' '}
                                <span className="text-[var(--terracotta)]">Mission</span>
                            </h2>
                            <p className="text-[#0F172A]/60 uppercase tracking-widest font-semibold text-sm">
                                Guided by the principles of the mountains
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: 'hiking',
                                title: 'Beginner-Friendly',
                                desc: 'We specialize in building confidence on the trail. Our itineraries are crafted to introduce novices to the mountains safely, ensuring your first trek is the beginning of a lifelong passion.',
                                borderColor: 'border-[var(--terracotta)]',
                                iconColor: 'text-[var(--terracotta)]',
                            },
                            {
                                icon: 'trending_up',
                                title: 'Professional Growth',
                                desc: 'We understand the value of time. Our fixed departures are designed for working professionals, offering streamlined schedules that maximize adventure without compromising your career.',
                                borderColor: 'border-[var(--forest-green)]',
                                iconColor: 'text-[var(--forest-green)]',
                            },
                            {
                                icon: 'handshake',
                                title: 'Authentic Value',
                                desc: 'We believe in honest experiences with no inflated costs. You pay for genuine adventure, expert guidance, and safety—ensuring every rupee contributes directly to the quality of your journey.',
                                borderColor: 'border-[var(--terracotta)]',
                                iconColor: 'text-[var(--terracotta)]',
                            },
                        ].map((item, i) => (
                            <FadeIn key={item.title} delay={i * 0.15}>
                                <div
                                    className={`relative p-10 bg-white shadow-xl angular-card border-t-4 ${item.borderColor} group hover:-translate-y-2 transition-transform duration-500 h-full`}
                                >
                                    <div className={`mb-8 ${item.iconColor}`}>
                                        <span className="material-symbols-outlined text-5xl">{item.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight text-[#0F172A]">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#0F172A]/70 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Safety / Eco / Empowerment Strip ── */}
            <section className="py-20 bg-white border-y border-gray-100">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid md:grid-cols-3 gap-8 text-center divide-x divide-gray-100">
                        <div className="p-6">
                            <span className="material-symbols-outlined text-4xl text-[var(--terracotta)] mb-4 block">medical_services</span>
                            <h4 className="text-xl font-bold text-[#0F172A] mb-2 uppercase tracking-tight">Safety First</h4>
                            <p className="text-sm text-gray-600">Comprehensive risk management protocols and certified leaders on every route.</p>
                        </div>
                        <div className="p-6">
                            <span className="material-symbols-outlined text-4xl text-[var(--forest-green)] mb-4 block">forest</span>
                            <h4 className="text-xl font-bold text-[#0F172A] mb-2 uppercase tracking-tight">Eco-Conscious</h4>
                            <p className="text-sm text-gray-600">Strict Leave-No-Trace policies to protect the fragile Himalayan ecosystem.</p>
                        </div>
                        <div className="p-6">
                            <span className="material-symbols-outlined text-4xl text-[var(--terracotta)] mb-4 block">diversity_2</span>
                            <h4 className="text-xl font-bold text-[#0F172A] mb-2 uppercase tracking-tight">Local Empowerment</h4>
                            <p className="text-sm text-gray-600">Directly supporting mountain economies by hiring and training local talent.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Trek Leadership ── */}
            <section className="py-32 bg-[#0F172A]">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Leader portrait */}
                        <div className="relative order-2 lg:order-1">
                            <div className="absolute -top-10 -left-10 w-32 h-32 indigenous-pattern opacity-10" />
                            <div className="relative w-full max-w-md mx-auto lg:mx-0">
                                <div className="absolute inset-0 bg-[var(--terracotta)]/10 translate-x-4 translate-y-4 angular-card" />
                                <Image
                                    src="/images/herosection.webp"
                                    alt="Portrait of Rajan Rawat in mountains"
                                    width={600}
                                    height={700}
                                    className="relative w-full h-[500px] object-cover angular-card border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute -bottom-6 -right-6 bg-[var(--forest-green)] p-6 angular-card border-l-4 border-[var(--terracotta)] shadow-xl">
                                    <p className="text-white font-bold text-2xl uppercase tracking-wider">Rajan Rawat</p>
                                    <p className="text-[var(--terracotta)] text-xs uppercase tracking-[0.2em] font-black mt-1">Lead Trek Leader</p>
                                </div>
                            </div>
                        </div>

                        {/* Leader bio */}
                        <div className="order-1 lg:order-2 space-y-8">
                            <div>
                                <span className="text-[var(--terracotta)] font-black uppercase tracking-[0.4em] text-xs">
                                    Our Trek Leadership
                                </span>
                                <h2 className="text-5xl md:text-6xl font-extrabold text-white mt-4 uppercase tracking-tight leading-tight">
                                    Leading with <br />
                                    <span className="text-[var(--terracotta)]">Authority</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-white/70 font-serif text-lg leading-relaxed">
                                <p>
                                    At the helm of our expeditions stands{' '}
                                    <strong className="text-white">Rajan Rawat</strong>, an experienced trek leader whose deep connection to the mountains shapes every journey we undertake. With years of traversing high-altitude passes, Rajan brings not just expertise but a profound respect for the Himalayan terrain.
                                </p>
                                <p>
                                    He is supported by a permanent core team of certified professionals and trusted local experts, ensuring that every trek is built on a foundation of safety and logistical excellence. Our leadership structure is robust, flexible, and designed to handle the unpredictable nature of the wild.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--terracotta)]">
                                        <span className="material-symbols-outlined">verified</span>
                                    </div>
                                    <div>
                                        <h5 className="text-white font-bold text-sm uppercase tracking-tight">Certified Trek Leader</h5>
                                        <p className="text-white/40 text-xs">Official Certification</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--terracotta)]">
                                        <span className="material-symbols-outlined">emergency</span>
                                    </div>
                                    <div>
                                        <h5 className="text-white font-bold text-sm uppercase tracking-tight">Emergency Specialist</h5>
                                        <p className="text-white/40 text-xs">Crisis Response Ready</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Uttarkashi Advantage ── */}
            <section className="py-32 bg-[var(--sand)] relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <FadeIn>
                        <div className="grid lg:grid-cols-12 gap-16 items-center">
                            {/* Map placeholder */}
                            <div className="lg:col-span-7">
                                <div className="relative w-full aspect-[4/3] overflow-hidden shadow-2xl geometric-border">
                                    <iframe
                                        title="HikingPlanet Uttarkashi HQ - Satellite View"
                                        src="https://maps.google.com/maps?q=30.817713,78.604622&t=h&z=16&output=embed"
                                        className="w-full h-full border-0"
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                    {/* HQ pin label */}
                                    <div className="absolute bottom-4 left-4 bg-[#0F172A]/90 backdrop-blur-sm px-4 py-2 flex items-center gap-2 angular-card">
                                        <span className="material-symbols-outlined text-[var(--terracotta)] text-lg">satellite_alt</span>
                                        <span className="text-white text-xs font-bold uppercase tracking-widest">Uttarkashi HQ</span>
                                    </div>
                                </div>
                            </div>

                            {/* Text */}
                            <div className="lg:col-span-5 space-y-8">
                                <span className="text-[var(--terracotta)] font-black uppercase tracking-[0.4em] text-xs">
                                    Strategic Base
                                </span>
                                <h2 className="text-5xl font-extrabold text-[#0F172A] uppercase tracking-tight">
                                    The Uttarkashi{' '}
                                    <span className="text-[var(--terracotta)]">Advantage</span>
                                </h2>
                                <div className="space-y-6 text-[#0F172A]/70 leading-relaxed font-serif text-lg">
                                    <p>
                                        Our headquarters in Uttarkashi isn&apos;t just an address—it&apos;s a strategic asset. Being based here gives us a decisive edge in weather monitoring and deploying efficient logistics for every expedition.
                                    </p>
                                    <p>
                                        We are positioned at the veritable gateway to the Greater Himalayas, allowing us to manage resources swiftly and ensure safety protocols are executed without delay.
                                    </p>
                                    <div className="p-8 border-l-4 border-[var(--terracotta)] bg-[#0F172A]/5">
                                        <p className="font-bold text-[#0F172A] text-sm uppercase tracking-widest mb-2">HQ Location</p>
                                        <p className="font-sans text-sm text-[#0F172A]/70">
                                            Ganga View Estate, Gyansu, Uttarkashi,<br />
                                            Uttarakhand 249193, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── CTA Quote ── */}
            <section className="py-32 bg-[var(--terracotta)] relative overflow-hidden">
                <div className="absolute inset-0 indigenous-pattern opacity-20" />
                <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-10 leading-[1.1] uppercase tracking-tight">
                            The mountains don&apos;t change <br /> you overnight — but the <br /> journey always does.
                        </h2>
                        <p className="text-white/80 text-xl font-serif mb-12 italic">
                            Experience the transformative power of the high Himalayas with us.
                        </p>
                        <Link href="/upcoming-treks">
                            <button className="bg-[#0F172A] text-white px-12 py-6 font-black uppercase tracking-widest hover:bg-[#1F1B1A] transition-all angular-card flex items-center gap-4 mx-auto text-lg group">
                                Explore Expeditions
                                <ArrowRight
                                    weight="bold"
                                    className="w-6 h-6 group-hover:translate-x-2 transition-transform"
                                />
                            </button>
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
