'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Mail, Phone, ExternalLink } from 'lucide-react';

export default function SideContactWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const panelRef = useRef<HTMLDivElement>(null);

    // Close on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    // Don't display in admin views
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <aside
            ref={panelRef}
            aria-label="Quick Social & Contact Dock"
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
        >
            {/* ── Slide-Out Drawer Panel ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="contact-panel"
                        initial={{ opacity: 0, x: 80, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 80, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-l-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)] border-y border-l border-slate-200 dark:border-slate-800 p-4 sm:p-5 w-72 sm:w-80 mr-0 select-none"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-wider text-[#143D2B] dark:text-emerald-400">
                                        HikingPlanet
                                    </h3>
                                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                        Quick Connect &amp; Enquiries
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close contact section"
                                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center transition-colors"
                            >
                                <X size={15} />
                            </button>
                        </div>

                        {/* Social Links List */}
                        <div className="space-y-2.5">
                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/918556043708?text=Hi%20HikingPlanet%2C%20I%20have%20an%20enquiry%20regarding%20a%20trek."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100/90 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 border border-emerald-200/80 dark:border-emerald-800/40 transition-all hover:translate-x-[-2px] shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                                            WhatsApp
                                        </div>
                                        <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                                            +91 85560 43708 • Chat Now
                                        </div>
                                    </div>
                                </div>
                                <ExternalLink size={13} className="text-emerald-600 dark:text-emerald-400 opacity-60 group-hover:opacity-100" />
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/hikingplanet.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-3 rounded-2xl bg-rose-50 hover:bg-rose-100/90 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 border border-rose-200/80 dark:border-rose-800/40 transition-all hover:translate-x-[-2px] shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                                            Instagram
                                        </div>
                                        <div className="text-[10px] text-rose-700 dark:text-rose-400 font-medium">
                                            @hikingplanet.in • Photos &amp; Reels
                                        </div>
                                    </div>
                                </div>
                                <ExternalLink size={13} className="text-rose-600 dark:text-rose-400 opacity-60 group-hover:opacity-100" />
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:hikingplanet.official@gmail.com"
                                className="group flex items-center justify-between p-3 rounded-2xl bg-amber-50 hover:bg-amber-100/90 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 border border-amber-200/80 dark:border-amber-800/40 transition-all hover:translate-x-[-2px] shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#EA4335] text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                                        <Mail size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                                            Email Support
                                        </div>
                                        <div className="text-[10px] text-amber-800 dark:text-amber-400 font-medium truncate max-w-[130px]">
                                            hikingplanet.official@gmail.com
                                        </div>
                                    </div>
                                </div>
                                <ExternalLink size={13} className="text-amber-700 dark:text-amber-400 opacity-60 group-hover:opacity-100" />
                            </a>

                            {/* Direct Phone Call */}
                            <a
                                href="tel:+918556043708"
                                className="group flex items-center justify-between p-3 rounded-2xl bg-[#143D2B]/10 hover:bg-[#143D2B]/15 dark:bg-[#143D2B]/40 dark:hover:bg-[#143D2B]/60 border border-[#143D2B]/20 dark:border-emerald-700/40 transition-all hover:translate-x-[-2px] shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#143D2B] text-emerald-300 flex items-center justify-center shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform">
                                        <Phone size={18} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                                            Call Trek Leader
                                        </div>
                                        <div className="text-[10px] text-[#143D2B] dark:text-emerald-400 font-semibold">
                                            +91 85560 43708
                                        </div>
                                    </div>
                                </div>
                                <ExternalLink size={13} className="text-[#143D2B] dark:text-emerald-400 opacity-60 group-hover:opacity-100" />
                            </a>
                        </div>

                        {/* Footer note */}
                        <div className="mt-3 pt-2 text-center text-[10px] text-slate-400 dark:text-slate-500 font-medium border-t border-slate-100 dark:border-slate-800">
                            Available 24/7 for Himalayan Trek Inquiries
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating Toggle Handle [<] ── */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? 'Collapse social section' : 'Open social section (Instagram, WhatsApp, Mail)'}
                className={`relative group flex items-center justify-center pl-2.5 pr-2 py-3.5 rounded-l-2xl border-l border-y transition-all duration-300 shadow-2xl focus:outline-none cursor-pointer ${
                    isOpen
                        ? 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800'
                        : 'bg-[#143D2B] hover:bg-[#1C543B] text-white border-emerald-500/40 hover:pl-3.5'
                }`}
            >
                <div className="flex flex-col items-center gap-1">
                    {/* [<] icon toggles between ChevronLeft (<) and ChevronRight (>) */}
                    {isOpen ? (
                        <ChevronRight size={18} className="text-white group-hover:translate-x-0.5 transition-transform" />
                    ) : (
                        <ChevronLeft size={18} className="text-emerald-200 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
                    )}

                    {/* Small vertical text indicator */}
                    <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-black uppercase tracking-widest text-emerald-200/90 group-hover:text-white transition-colors mt-0.5">
                        {isOpen ? 'Close' : 'Connect'}
                    </span>
                </div>
            </button>
        </aside>
    );
}
