'use client';

import { useState } from 'react';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';
import {
    Phone,
    ChatCircle,
    At,
    ArrowRight,
    MapPin,
    ArrowSquareOut,
    CircleNotch,
    PaperPlaneTilt,
} from '@phosphor-icons/react';

export default function ContactClient() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
        setSuccess(true);
    };

    return (
        <div className="bg-[var(--deep-earth)]">
            {/* ── Hero + Form Section ── */}
            <section className="relative min-h-screen flex items-center pt-32 pb-20">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero.webp"
                        alt="Atmospheric Uttarkashi base camp"
                        fill
                        priority
                        className="object-cover grayscale-[30%] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep-earth)] via-[var(--deep-earth)]/80 to-transparent" />
                    <div className="absolute inset-0 indigenous-pattern" />
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Left — Glass Form Panel */}
                        <div className="lg:col-span-7">
                            <FadeIn>
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-16 angular-card relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 indigenous-pattern opacity-10" />

                                    <span className="text-[var(--terracotta)] font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">
                                        Communion
                                    </span>
                                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-none mb-8 uppercase tracking-tight">
                                        Seek the <br />
                                        <span className="text-[var(--terracotta)] italic">
                                            Unspoken
                                        </span>
                                    </h1>
                                    <p className="text-white/60 mb-12 max-w-md font-light leading-relaxed">
                                        Share your intent. Our stewards respond with the precision of
                                        a mountain guide and the warmth of a Himalayan hearth.
                                    </p>

                                    {success ? (
                                        <div className="flex flex-col items-center justify-center text-center py-12">
                                            <div className="w-16 h-16 bg-[var(--terracotta)]/20 text-[var(--terracotta)] flex items-center justify-center angular-card mb-4">
                                                <PaperPlaneTilt weight="fill" className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                                                Dispatch Sent!
                                            </h3>
                                            <p className="text-white/50 mb-6">
                                                We&apos;ll get back to you within 12 solar hours.
                                            </p>
                                            <button
                                                onClick={() => setSuccess(false)}
                                                className="text-[var(--terracotta)] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                                            >
                                                Send another →
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-2 border-b border-white/10 focus-within:border-[var(--terracotta)] transition-colors pb-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-white/40">
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="Anand Sharma"
                                                        className="w-full bg-transparent border-none p-0 text-white focus:ring-0 placeholder:text-white/10 outline-none"
                                                    />
                                                </div>
                                                <div className="space-y-2 border-b border-white/10 focus-within:border-[var(--terracotta)] transition-colors pb-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-white/40">
                                                        Digital Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        required
                                                        placeholder="anand@domain.com"
                                                        className="w-full bg-transparent border-none p-0 text-white focus:ring-0 placeholder:text-white/10 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 border-b border-white/10 focus-within:border-[var(--terracotta)] transition-colors pb-2">
                                                <label className="text-[10px] uppercase tracking-widest font-black text-white/40">
                                                    Inquiry Essence
                                                </label>
                                                <select className="w-full bg-transparent border-none p-0 text-white focus:ring-0 appearance-none outline-none cursor-pointer">
                                                    <option className="bg-[var(--deep-earth)]">
                                                        Expedition Planning
                                                    </option>
                                                    <option className="bg-[var(--deep-earth)]">
                                                        Cultural Stewardship
                                                    </option>
                                                    <option className="bg-[var(--deep-earth)]">
                                                        Corporate Sanctuary
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="space-y-2 border-b border-white/10 focus-within:border-[var(--terracotta)] transition-colors pb-2">
                                                <label className="text-[10px] uppercase tracking-widest font-black text-white/40">
                                                    Your Message
                                                </label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    placeholder="Describe the path you wish to tread..."
                                                    className="w-full bg-transparent border-none p-0 text-white focus:ring-0 placeholder:text-white/10 resize-none outline-none"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full md:w-auto bg-[var(--terracotta)] text-white px-12 py-5 font-black uppercase tracking-widest hover:bg-[var(--clay)] transition-all angular-card flex items-center justify-center gap-4 disabled:opacity-50"
                                            >
                                                {loading ? (
                                                    <CircleNotch
                                                        weight="bold"
                                                        className="w-5 h-5 animate-spin"
                                                    />
                                                ) : (
                                                    <>
                                                        Send Dispatch
                                                        <ArrowRight weight="bold" className="w-5 h-5" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </FadeIn>
                        </div>

                        {/* Right — Direct Channels */}
                        <div className="lg:col-span-5 pt-0 lg:pt-12">
                            <FadeIn delay={0.2}>
                                <div className="space-y-16">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-8 tracking-wider flex items-center gap-4 uppercase">
                                            <span className="w-8 h-px bg-[var(--terracotta)]" />
                                            Direct Channels
                                        </h2>
                                        <div className="space-y-8">
                                            {[
                                                {
                                                    icon: (
                                                        <Phone weight="fill" className="w-5 h-5" />
                                                    ),
                                                    label: 'Voice Dispatch',
                                                    value: '+91 1374 222 555',
                                                },
                                                {
                                                    icon: (
                                                        <ChatCircle weight="fill" className="w-5 h-5" />
                                                    ),
                                                    label: 'WhatsApp Circle',
                                                    value: '+91 98765 43210',
                                                },
                                                {
                                                    icon: <At weight="bold" className="w-5 h-5" />,
                                                    label: 'Script Correspondence',
                                                    value: 'stewards@trekplanet.com',
                                                },
                                            ].map((ch) => (
                                                <div
                                                    key={ch.label}
                                                    className="flex items-start gap-6 group"
                                                >
                                                    <div className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center angular-card group-hover:bg-[var(--terracotta)] transition-all text-[var(--terracotta)] group-hover:text-white">
                                                        {ch.icon}
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-1">
                                                            {ch.label}
                                                        </p>
                                                        <p className="text-xl font-bold text-white">
                                                            {ch.value}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Response Vow */}
                                    <div className="p-8 bg-[var(--muted-green)]/30 border-l-4 border-[var(--terracotta)] angular-card">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-[var(--terracotta)] mb-4">
                                            The Response Vow
                                        </h4>
                                        <p className="text-white/60 text-sm leading-relaxed italic">
                                            &ldquo;As the sun touches the peaks of Uttarkashi, we
                                            begin our day&apos;s work. Expect a reply within 12 solar
                                            hours.&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Physical HQ Section ── */}
            <section className="py-32 bg-[var(--deep-earth)] relative overflow-hidden">
                <div className="absolute inset-0 indigenous-pattern opacity-5" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                            <div>
                                <span className="text-[var(--terracotta)] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
                                    Physical Presence
                                </span>
                                <h2 className="text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight">
                                    Visit our{' '}
                                    <span className="text-[var(--terracotta)]">
                                        High-Altitude
                                    </span>{' '}
                                    HQ
                                </h2>
                            </div>
                            <p className="text-white/40 text-sm max-w-xs font-light leading-relaxed border-l border-white/10 pl-6">
                                Nestled in the heart of the Bhagirathi valley, where tradition
                                meets modern exploration.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.15}>
                        <div className="relative w-full h-[500px] md:h-[600px] angular-card overflow-hidden group">
                            <Image
                                src="/images/heroji.webp"
                                alt="Map of Uttarkashi"
                                fill
                                className="object-cover brightness-[0.3] contrast-[1.2] sepia-[0.2]"
                            />
                            <div className="absolute inset-0 bg-[var(--deep-earth)]/40" />

                            {/* Map pin */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="relative">
                                    <div className="absolute -inset-8 bg-[var(--terracotta)]/20 rounded-full animate-pulse" />
                                    <div className="w-12 h-12 bg-[var(--terracotta)] flex items-center justify-center rotate-45 shadow-[0_0_30px_rgba(194,94,68,0.5)]">
                                        <MapPin
                                            weight="fill"
                                            className="text-white -rotate-45 w-6 h-6"
                                        />
                                    </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-[var(--deep-earth)]/90 backdrop-blur px-6 py-4 angular-card border border-white/10 whitespace-nowrap">
                                        <p className="text-white font-bold uppercase tracking-widest text-sm">
                                            Uttarkashi Main Road
                                        </p>
                                        <p className="text-white/40 text-[10px] uppercase font-black tracking-widest">
                                            Near Vishwanath Temple
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Address card */}
                            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                                <div className="bg-[var(--deep-earth)]/80 backdrop-blur p-8 angular-card border border-white/10 max-w-sm">
                                    <h4 className="text-[var(--terracotta)] font-black text-xs uppercase tracking-widest mb-4">
                                        Base Camp Uttarkashi
                                    </h4>
                                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                                        Main Market, Near Bhagirathi River Bank,
                                        <br />
                                        Uttarkashi, Uttarakhand 249193, India
                                    </p>
                                    <a
                                        href="https://maps.google.com/?q=Uttarkashi+Uttarakhand"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:text-[var(--terracotta)] transition-colors"
                                    >
                                        Get Directions{' '}
                                        <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
