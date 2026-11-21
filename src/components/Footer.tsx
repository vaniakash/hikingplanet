'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    InstagramLogo,
    Envelope,
    MapPin,
    Phone,
    Clock,
    ShieldCheck,
    LockKey,
    Certificate,
    ArrowUp,
    Cookie,
    CheckCircle,
    WhatsappLogo,
    PaperPlaneRight
} from '@phosphor-icons/react';
import { useCookieConsentCtx } from '@/components/CookieConsentProvider';

export default function Footer() {
    const { openSettings } = useCookieConsentCtx();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 5000);
        }
    };

    return (
        <footer className="bg-[#070E0B] text-slate-300 relative border-t border-emerald-950/60 overflow-hidden mt-auto">
            {/* Top Accent Gradient Border */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-[#E30613] to-emerald-500 opacity-90" />

            {/* Subtle Ambient Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-emerald-950/20 blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-emerald-900/10 blur-3xl rounded-full" />
                <div className="absolute inset-0 bg-[radial-gradient(#153E2B_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-20 pb-12">

                {/* ── Top Newsletter & Dispatch Card ── */}
                <div className="relative mb-16 rounded-3xl bg-gradient-to-br from-[#0D1D16] to-[#0A1611] border border-emerald-500/20 p-8 sm:p-12 shadow-2xl overflow-hidden">
                    <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#E30613]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="max-w-xl text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 text-[#E30613] text-xs font-black uppercase tracking-[0.25em] mb-2">
                                <span>🏔️</span> The Mountain Dispatch
                            </span>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase font-serif">
                                Get Live Trail Updates &amp; Seasonal Guides
                            </h3>
                            <p className="text-slate-400 text-sm sm:text-base mt-2 font-light leading-relaxed">
                                Curated weather alerts, newly opened batch departures, and high-altitude advice. No spam, ever.
                            </p>
                        </div>

                        <div className="w-full lg:w-auto lg:min-w-[420px]">
                            {subscribed ? (
                                <div className="flex items-center gap-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 p-4 rounded-2xl">
                                    <CheckCircle size={24} weight="fill" className="text-emerald-400 shrink-0" />
                                    <span className="text-sm font-semibold">Thank you for subscribing! Check your inbox soon.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 bg-[#060D0A] p-2 rounded-2xl border border-emerald-500/30 shadow-inner">
                                    <div className="relative flex-1">
                                        <Envelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            required
                                            className="w-full bg-transparent pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#c20510] text-white px-7 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md active:scale-95 shrink-0"
                                    >
                                        <span>Subscribe</span>
                                        <PaperPlaneRight weight="bold" size={14} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Main Footer Columns Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 pb-14 border-b border-white/10">

                    {/* Col 1: Brand & Contact Info (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block focus:outline-none">
                            <Image
                                src="/weblogo.svg"
                                alt="HikingPlanet"
                                width={240}
                                height={64}
                                className="h-11 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">
                            India’s trusted platform for curated Himalayan trekking adventures. Guided by certified mountain leaders with uncompromising safety, zero-waste principles, and authentic local connections.
                        </p>

                        <div className="space-y-3 pt-2 text-xs text-slate-300">
                            <div className="flex items-start gap-3">
                                <MapPin size={17} className="text-emerald-400 shrink-0 mt-0.5" />
                                <span>Ganga View Estate, Gyansu, Uttarkashi, Uttarakhand 249193</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-emerald-400 shrink-0" />
                                <a href="tel:+918556043708" className="hover:text-emerald-300 transition-colors font-semibold">
                                    +91 85560 43708
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Envelope size={16} className="text-emerald-400 shrink-0" />
                                <a href="mailto:hikingplanet.official@gmail.com" className="hover:text-emerald-300 transition-colors">
                                    hikingplanet.official@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <Clock size={16} className="text-emerald-400 shrink-0" />
                                <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
                            </div>
                        </div>
                    </div>

                    {/* Col 2: Top Himalayan Treks (3 cols) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E30613]" />
                            Featured Treks
                        </h4>
                        <ul className="space-y-2.5 text-xs text-slate-400">
                            <li><Link href="/treks/kedarkantha-trek" className="hover:text-white hover:translate-x-1 inline-block transition-all">Kedarkantha Trek (Winter Summit)</Link></li>
                            <li><Link href="/treks/dayara-bugyal-trek" className="hover:text-white hover:translate-x-1 inline-block transition-all">Dayara Bugyal Trek (Alpine Meadows)</Link></li>
                            <li><Link href="/treks/har-ki-dun" className="hover:text-white hover:translate-x-1 inline-block transition-all">Har Ki Dun (Ancient Valley of Gods)</Link></li>
                            <li><Link href="/treks/kuari-pass-trek" className="hover:text-white hover:translate-x-1 inline-block transition-all">Kuari Pass (Lord Curzon Trail)</Link></li>
                            <li><Link href="/treks/valley-of-flowers-trek" className="hover:text-white hover:translate-x-1 inline-block transition-all">Valley of Flowers &amp; Hemkund</Link></li>
                            <li><Link href="/treks/hampta-pass-trek" className="hover:text-white hover:translate-x-1 inline-block transition-all">Hampta Pass &amp; Chandratal</Link></li>
                            <li><Link href="/upcoming-treks" className="text-emerald-400 font-bold hover:underline inline-block pt-1">Explore All 19 Treks →</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Resources & Guides (3 cols) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Guides &amp; Resources
                        </h4>
                        <ul className="space-y-2.5 text-xs text-slate-400">
                            <li><Link href="/latest-articles" className="hover:text-white hover:translate-x-1 inline-block transition-all">Latest Articles &amp; Trail Dispatches</Link></li>
                            <li><Link href="/latest-articles/dayara-bugyal-trek-guide-2027" className="hover:text-white hover:translate-x-1 inline-block transition-all">Dayara Bugyal 2027 Trek Guide</Link></li>
                            <li><Link href="/latest-articles/kuari-pass-trek-guide" className="hover:text-white hover:translate-x-1 inline-block transition-all">Kuari Pass Complete Guide 2027</Link></li>
                            <li><Link href="/latest-articles/is-dayara-bugyal-safe-for-beginners-kids-2027" className="hover:text-white hover:translate-x-1 inline-block transition-all">Beginner &amp; Family Safety Checklist</Link></li>
                            <li><Link href="/blog" className="hover:text-white hover:translate-x-1 inline-block transition-all">Himalayan Journal &amp; Stories</Link></li>
                            <li><Link href="/upcoming-treks" className="hover:text-white hover:translate-x-1 inline-block transition-all">Confirmed Batch Departures</Link></li>
                        </ul>
                    </div>

                    {/* Col 4: Company & Policies (2 cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            Company
                        </h4>
                        <ul className="space-y-2.5 text-xs text-slate-400">
                            <li><Link href="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-white hover:translate-x-1 inline-block transition-all">Careers &amp; Trek Leaders</Link></li>
                            <li><Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all">Contact Us</Link></li>
                            <li><Link href="/shop" className="hover:text-white hover:translate-x-1 inline-block transition-all">Trek Gear Shop</Link></li>
                            <li><Link href="/rent" className="hover:text-white hover:translate-x-1 inline-block transition-all">Gear Rentals</Link></li>
                            <li><a href="/files/Hiking_Planet_Cancellation_Refund_Policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-1 inline-block transition-all">Cancellation Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* ── Trust Signals & Social Links Bar ── */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs text-slate-400 font-semibold">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <ShieldCheck weight="fill" className="w-4 h-4" />
                            </div>
                            <span>Govt. Registered</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <LockKey weight="fill" className="w-4 h-4" />
                            </div>
                            <span>100% Secure Payments</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                                <Certificate weight="fill" className="w-4 h-4" />
                            </div>
                            <span>Certified WFR Mountain Leaders</span>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                            Follow Our Trail:
                        </span>
                        <a
                            href="https://www.instagram.com/hikingplanet.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E4405F] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                            aria-label="Instagram"
                        >
                            <InstagramLogo weight="fill" size={18} />
                        </a>
                        <a
                            href="https://wa.me/918556043708"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                            aria-label="WhatsApp"
                        >
                            <WhatsappLogo weight="fill" size={18} />
                        </a>
                        <a
                            href="mailto:hikingplanet.official@gmail.com"
                            className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#EA4335] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                            aria-label="Email"
                        >
                            <Envelope weight="fill" size={18} />
                        </a>
                    </div>
                </div>

                {/* ── Bottom Legal Links & Copyright ── */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium">
                        <Link href="/policies/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
                        <Link href="/policies/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
                        <a href="/files/Hiking_Planet_Cancellation_Refund_Policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Cancellation &amp; Refund</a>
                        <a href="/files/Hiking_Planet_Trekker_Disclaimer%20(1).pdf" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Disclaimer</a>
                        <Link href="/policies/cookie" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link>
                        <button
                            type="button"
                            onClick={openSettings}
                            className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                            <Cookie size={12} />
                            Cookie Settings
                        </button>
                        <Link href="/admin/login" className="hover:text-emerald-400 transition-colors opacity-40 hover:opacity-100">
                            Admin Login
                        </Link>
                    </div>

                    <div className="text-center md:text-right font-medium text-[11px] text-slate-500">
                        © {new Date().getFullYear()} HikingPlanet. Crafted with ♥ in Uttarkashi for adventurers worldwide.
                    </div>
                </div>
            </div>

            {/* ── Floating Back to Top Button ── */}
            <button
                onClick={scrollToTop}
                aria-label="Back to top of page"
                className="absolute bottom-8 right-6 lg:right-10 w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all duration-300 shadow-xl hover:-translate-y-1 active:scale-95 focus:outline-none z-20 group"
            >
                <ArrowUp weight="bold" size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
        </footer>
    );
}
