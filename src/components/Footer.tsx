'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
    Mountains,
    FacebookLogo,
    TwitterLogo,
    InstagramLogo,
    Envelope,
    MapPin,
    Phone,
    Clock,
    ShieldCheck,
    LockKey,
    Certificate,
    ArrowUp
} from '@phosphor-icons/react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[var(--deep-earth)] text-white relative pt-24 pb-10 border-t-4 border-[var(--terracotta)] overflow-hidden mt-auto">
            {/* Mountain Silhouette Background (Subtle) */}
            <div className="absolute bottom-0 left-0 w-full h-80 opacity-[0.03] pointer-events-none flex items-end">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full fill-current text-white">
                    <path d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    <path d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,149.3C672,128,768,128,864,149.3C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* Indigenous pattern overlay */}
            <div className="absolute inset-0 indigenous-pattern opacity-5 pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                {/* ── Top Section: Brand & Newsletter ── */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 pb-12 border-b border-white/10">
                    <div className="max-w-md">
                        <Link href="/" className="inline-block mb-6 focus:outline-none">
                            <Image
                                src="/images/new_logo.png"
                                alt="HikingPlanet"
                                width={280}
                                height={80}
                                className="h-32 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-white/70 text-base leading-relaxed font-light">
                            India’s trusted platform for curated Himalayan trekking adventures. Expert-guided trails with safety, sustainability, and unforgettable experiences.
                        </p>
                    </div>

                    <div className="w-full lg:w-auto lg:min-w-[420px] bg-white/5 p-8 angular-card border border-white/10 backdrop-blur-sm shadow-xl">
                        <h3 className="text-[var(--terracotta)] font-black uppercase tracking-widest text-sm mb-2">Get Trek Updates</h3>
                        <p className="text-white/60 text-sm mb-6 font-medium">No spam. Only adventure directly to your inbox.</p>
                        <form className="flex w-full min-w-0" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="bg-[var(--deep-earth)] text-white px-5 py-4 w-full focus:outline-none focus:ring-1 focus:ring-[var(--terracotta)] transition-all text-sm min-w-0"
                                required
                            />
                            <button type="submit" className="bg-[var(--terracotta)] text-white px-8 py-4 font-black uppercase tracking-widest text-xs hover:bg-[var(--clay)] transition-all shrink-0">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* ── Middle Section: Links Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* RESOURCES */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-8 flex items-center gap-3">
                            <span className="w-6 h-1 bg-[var(--terracotta)] rounded-full"></span>
                            Resources
                        </h4>
                        <ul className="space-y-4 text-white/60 text-sm font-medium">
                            <li><Link href="/treks" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">All Treks</Link></li>
                            <li><Link href="#" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">Trek Difficulty Guide</Link></li>
                            <li><Link href="#" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">Packing List</Link></li>
                            <li><Link href="#" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">Safety Guidelines</Link></li>
                            <li><Link href="/blog" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">Blog</Link></li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-8 flex items-center gap-3">
                            <span className="w-6 h-1 bg-[var(--terracotta)] rounded-full"></span>
                            Company
                        </h4>
                        <ul className="space-y-4 text-white/60 text-sm font-medium">
                            <li><Link href="/about" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">Our Team</Link></li>
                            <li><Link href="#" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">Certifications / Licenses</Link></li>
                            <li><Link href="#" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">Careers</Link></li>
                            <li><Link href="#" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">Partner With Us</Link></li>
                        </ul>
                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-8 flex items-center gap-3">
                            <span className="w-6 h-1 bg-[var(--terracotta)] rounded-full"></span>
                            Support
                        </h4>
                        <ul className="space-y-4 text-white/60 text-sm font-medium">
                            <li><Link href="#" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">Cancellation & Refund Policy</Link></li>
                            <li><Link href="#" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-[var(--terracotta)] hover:translate-x-1 inline-block transition-all duration-300">Safety Info</Link></li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-8 flex items-center gap-3">
                            <span className="w-6 h-1 bg-[var(--terracotta)] rounded-full"></span>
                            Contact
                        </h4>
                        <ul className="space-y-5 text-white/70 text-sm font-medium">
                            <li className="flex items-start gap-4">
                                <div className="p-1.5 bg-white/5 rounded-full shrink-0">
                                    <MapPin weight="fill" className="w-4 h-4 text-[var(--terracotta)]" />
                                </div>
                                <span className="pt-1">Uttarkashi, Uttarakhand, India</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1.5 bg-white/5 rounded-full shrink-0">
                                    <Phone weight="fill" className="w-4 h-4 text-[var(--terracotta)]" />
                                </div>
                                <span className="pt-1">+91 90273 14439</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1.5 bg-white/5 rounded-full shrink-0">
                                    <Envelope weight="fill" className="w-4 h-4 text-[var(--terracotta)]" />
                                </div>
                                <span className="pt-1">trekplanet.official@gmail.com</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-1.5 bg-white/5 rounded-full shrink-0">
                                    <Clock weight="fill" className="w-4 h-4 text-[var(--terracotta)]" />
                                </div>
                                <span className="pt-1">Mon–Sat, 9 AM – 7 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ── Bottom Section: Trust Signals, Socials, Legal ── */}
                <div className="pt-10 border-t border-white/10 flex flex-col items-center gap-10">

                    {/* Trust Signals & Socials */}
                    <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-8">
                        {/* Trust Signals */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                            <div className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                    <ShieldCheck weight="fill" className="w-5 h-5 text-green-500" />
                                </div>
                                <span className="text-white/60 font-black uppercase tracking-widest text-[10px]">Govt. Registered</span>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <LockKey weight="fill" className="w-5 h-5 text-blue-500" />
                                </div>
                                <span className="text-white/60 font-black uppercase tracking-widest text-[10px]">Secure Payments</span>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                                    <Certificate weight="fill" className="w-5 h-5 text-amber-500" />
                                </div>
                                <span className="text-white/60 font-black uppercase tracking-widest text-[10px]">ISO Certified</span>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase font-black tracking-widest text-[var(--terracotta)] mr-2">Follow Us</span>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#1877F2] hover:-translate-y-1 transition-all angular-card shadow-lg">
                                <FacebookLogo weight="fill" className="w-6 h-6" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#E4405F] hover:-translate-y-1 transition-all angular-card shadow-lg">
                                <InstagramLogo weight="fill" className="w-6 h-6" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#1DA1F2] hover:-translate-y-1 transition-all angular-card shadow-lg">
                                <TwitterLogo weight="fill" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Legal Links & Copyright */}
                    <div className="w-full flex-col md:flex-row flex items-center justify-between gap-6 pt-6 border-t border-white/5 text-xs font-semibold text-white/40">
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                            <Link href="/policies/privacy" className="hover:text-[var(--terracotta)] transition-colors">Privacy Policy</Link>
                            <Link href="/policies/terms" className="hover:text-[var(--terracotta)] transition-colors">Terms of Service</Link>
                            <Link href="/policies/refund" className="hover:text-[var(--terracotta)] transition-colors">Cancellation & Refund Policy</Link>
                            <Link href="/policies/disclaimer" className="hover:text-[var(--terracotta)] transition-colors">Disclaimer</Link>
                            <Link href="/policies/cookie" className="hover:text-[var(--terracotta)] transition-colors">Cookie Policy</Link>
                            <Link href="/admin/login" className="hover:text-[var(--terracotta)] transition-colors opacity-30 hover:opacity-100">Admin Login</Link>
                        </div>
                        <div className="text-center md:text-right uppercase tracking-[0.2em] text-[10px] font-black text-white/30">
                            © {new Date().getFullYear()} HikingPlanet — Made for adventurers.
                        </div>
                    </div>
                </div>

                {/* ── Back to Top Button ── */}
                <button
                    onClick={scrollToTop}
                    className="absolute -top-6 right-6 lg:right-10 w-14 h-14 bg-[var(--terracotta)] text-white flex items-center justify-center angular-card hover:bg-[var(--clay)] transition-all shadow-[0_0_30px_rgba(194,94,68,0.3)] group z-20"
                    aria-label="Back to top"
                >
                    <ArrowUp weight="bold" className="w-6 h-6 group-hover:-translate-y-1.5 transition-transform" />
                </button>
            </div>
        </footer>
    );
}
