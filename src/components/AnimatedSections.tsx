'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

// ─── Shared variants ─────────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const staggerContainer = (stagger = 0.1, delay = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const scaleIn = {
    hidden: { opacity: 0, scale: 0.88 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const slideLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

// ─── Why HikingPlanet ──────────────────────────────────────────────────────────

const whyCards = [
    {
        id: '01',
        title: 'Expert-Led Adventures with Uncompromising Safety Standards',
        desc: 'Every journey is guided by experienced professionals, ensuring security, preparedness, and seamless execution at every altitude.',
    },
    {
        id: '02',
        title: 'Authentic Trails, Local Insight, Responsible Exploration',
        desc: 'We design immersive trekking experiences rooted in regional knowledge while preserving the natural integrity of every landscape we enter.',
    },
    {
        id: '03',
        title: 'Quality-Driven Experiences with Transparent Value',
        desc: 'From equipment to logistics, we deliver thoughtfully curated expeditions that balance comfort, reliability, and fair pricing.',
    },
];

export function WhySection() {
    return (
        <section className="py-24 md:py-32 relative bg-[#F4F1EA] overflow-hidden border-t-2 border-[#2D4030]">
            <div className="absolute inset-0 indigenous-pattern opacity-5 pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Sticky Header */}
                    <motion.div
                        className="lg:col-span-5 lg:sticky top-32 self-start space-y-6"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={staggerContainer(0.12)}
                    >
                        <motion.span variants={fadeUp} className="text-[#C25E44] font-black uppercase tracking-[0.4em] text-xs block">
                            Our Philosophy
                        </motion.span>
                        <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--forest-green)] leading-tight">
                            Why <br className="hidden lg:block" />
                            <span className="text-[#C25E44] italic">HikingPlanet</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-[var(--forest-green)]/80 text-lg md:text-xl font-normal leading-relaxed max-w-md">
                            We don&apos;t just guide trails; we curate transformative experiences built on trust, respect, and unmatched quality.
                        </motion.p>
                    </motion.div>

                    {/* Right Cards */}
                    <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12">
                        {whyCards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-100px' }}
                                variants={{
                                    hidden: { opacity: 0, y: 60 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 } }
                                }}
                                className="group relative bg-white p-8 md:p-12 angular-card mt-0 shadow-lg hover:shadow-2xl transition-all duration-700 border border-black/5 overflow-hidden"
                            >
                                {/* Decorative Number Background */}
                                <div className="absolute -right-6 -top-10 text-[140px] font-black italic text-black/[0.03] group-hover:text-[#C25E44]/5 transition-colors duration-700 select-none pointer-events-none">
                                    {card.id}
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="text-xs font-bold text-[#C25E44] uppercase tracking-widest border border-[#C25E44]/20 px-4 py-1.5 rounded-full bg-[#C25E44]/5">
                                            Principle {card.id}
                                        </div>
                                        <div className="flex-1 h-[2px] bg-gradient-to-r from-black/10 to-transparent" />
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--forest-green)] leading-snug mb-4 group-hover:text-[#C25E44] transition-colors duration-300">
                                        {card.title}
                                    </h3>

                                    <p className="text-[var(--forest-green)]/80 text-base md:text-lg leading-relaxed font-normal">
                                        {card.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}



// ─── CTA ─────────────────────────────────────────────────────────────────────

export function CTASection() {
    return (
        <section className="relative py-28 md:py-36 bg-[#08150F] overflow-hidden selection:bg-[#E30613] selection:text-white">
            {/* Ambient Mountain Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-emerald-600/15 via-[#C25E44]/10 to-transparent blur-3xl rounded-full" />
                <div className="absolute -bottom-32 right-10 w-[500px] h-[350px] bg-emerald-500/10 blur-3xl rounded-full" />
                <div className="absolute inset-0 bg-[radial-gradient(#143D2B_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={staggerContainer(0.12, 0.05)}
                    className="flex flex-col items-center"
                >
                    {/* Badge */}
                    <motion.div
                        variants={fadeUp}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Begin Your Himalayan Odyssey</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-[1.05] mb-6 font-serif"
                    >
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#E30613] to-rose-400 italic">Explore?</span>
                    </motion.h2>

                    {/* Subheading */}
                    <motion.p
                        variants={fadeUp}
                        className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-10"
                    >
                        Step onto ancient Himalayan trails and witness sunrise panoramas from 12,000+ ft. Handcrafted itineraries, certified mountain leaders, and small-group departures.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-12"
                    >
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                href="/upcoming-treks"
                                className="inline-flex items-center gap-3 bg-[#E30613] hover:bg-[#c20510] text-white px-8 sm:px-10 py-4 sm:py-4.5 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 shadow-[0_10px_30px_-5px_rgba(227,6,19,0.4)] group"
                            >
                                <span>Browse All Treks</span>
                                <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm backdrop-blur-md transition-all duration-300"
                            >
                                <span>Contact Us</span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Trust Highlights */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-8 border-t border-white/10 text-xs sm:text-sm text-emerald-200/80 font-medium"
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">✓</span> Confirmed Batch Departures
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">✓</span> Certified Mountain Guides
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">✓</span> Zero-Waste Green Trails
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// ─── Featured Treks section header ───────────────────────────────────────────

export function FeaturedTreksHeader() {
    return (
        <motion.div
            className="flex flex-col md:flex-row items-baseline justify-between mb-20 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer(0.15)}
        >
            <div className="space-y-4">
                <motion.span variants={slideLeft} className="text-[#C25E44] font-black uppercase tracking-[0.4em] text-xs block">
                    Chosen Destinations
                </motion.span>
                <motion.h2 variants={slideLeft} className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight">
                    Featured <span className="text-[#C25E44]">Treks</span>
                </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
                <Link
                    href="/upcoming-treks"
                    className="flex items-center gap-4 text-[#C25E44] font-black uppercase tracking-widest hover:gap-6 transition-all group"
                >
                    View All Expeditions
                    <ArrowRight weight="bold" className="w-5 h-5 transition-transform" />
                </Link>
            </motion.div>
        </motion.div>
    );
}
