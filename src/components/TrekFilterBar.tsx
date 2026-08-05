'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CaretDown,
    X,
    Faders,
} from '@phosphor-icons/react';

interface FilterOption {
    label: string;
    value: string;
}

interface FilterGroup {
    key: string;
    title: string;
    options: FilterOption[];
}

const FILTERS: FilterGroup[] = [
    {
        key: 'difficulty',
        title: 'Difficulty',
        options: [
            { label: 'Easy', value: 'Easy' },
            { label: 'Moderate', value: 'Moderate' },
            { label: 'Difficult', value: 'Difficult' },
        ],
    },
    {
        key: 'duration',
        title: 'Duration',
        options: [
            { label: 'Short (1-4 Days)', value: 'short' },
            { label: 'Medium (5-8 Days)', value: 'medium' },
            { label: 'Long (9+ Days)', value: 'long' },
        ],
    },
    {
        key: 'price',
        title: 'Price',
        options: [
            { label: 'Under ₹10k', value: 'budget' },
            { label: '₹10k - ₹20k', value: 'standard' },
            { label: 'Above ₹20k', value: 'premium' },
        ],
    },
    {
        key: 'region',
        title: 'Region',
        options: [
            { label: 'Sankri', value: 'Sankri' },
            { label: 'Lohajung', value: 'Lohajung' },
            { label: 'Chamoli', value: 'Chamoli' },
            { label: 'Uttarkashi', value: 'Uttarkashi' },
        ],
    },
    {
        key: 'season',
        title: 'Season',
        options: [
            { label: 'Spring (Mar-Apr)', value: 'spring' },
            { label: 'Summer (May-Jun)', value: 'summer' },
            { label: 'Monsoon (Jul-Sep)', value: 'monsoon' },
            { label: 'Autumn (Oct-Nov)', value: 'autumn' },
            { label: 'Winter (Dec-Feb)', value: 'winter' },
        ],
    },
];

/* ── Accordion filter content (shared between sidebar & drawer) ── */
function FilterAccordion() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [openSections, setOpenSections] = useState<string[]>(['difficulty']);

    const toggleSection = (key: string) => {
        setOpenSections((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (params.get(key) === value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.push(`/treks?${params.toString()}`, { scroll: false });
    };

    const clearFilters = () => {
        router.push('/treks', { scroll: false });
    };

    const activeFiltersCount = Array.from(searchParams.keys()).length;

    return (
        <div className="space-y-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-3">
                    <Faders weight="bold" className="w-5 h-5 text-[var(--terracotta)]" />
                    <span className="text-sm font-black uppercase tracking-widest text-white">
                        Filters
                    </span>
                </div>
                {activeFiltersCount > 0 && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[var(--terracotta)] hover:text-white transition-colors"
                    >
                        <X weight="bold" className="w-3 h-3" />
                        Clear All
                    </button>
                )}
            </div>

            {/* Accordion Groups */}
            {FILTERS.map((group) => {
                const isOpen = openSections.includes(group.key);
                const currentValue = searchParams.get(group.key);

                return (
                    <div key={group.key} className="border-t border-white/10">
                        <button
                            onClick={() => toggleSection(group.key)}
                            className="w-full flex items-center justify-between py-4 px-1 text-left group"
                        >
                            <span className="text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                                {group.title}
                                {currentValue && (
                                    <span className="ml-2 inline-block w-2 h-2 rounded-full bg-[var(--terracotta)]" />
                                )}
                            </span>
                            <CaretDown
                                weight="bold"
                                className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-4 px-1 space-y-1">
                                        {group.options.map((option) => {
                                            const isSelected = currentValue === option.value;
                                            return (
                                                <button
                                                    key={option.value}
                                                    onClick={() => updateFilter(group.key, option.value)}
                                                    className={`w-full text-left px-4 py-2.5 text-sm transition-all angular-card ${isSelected
                                                            ? 'bg-[var(--terracotta)] text-white font-bold'
                                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

/* ── Main export: desktop sidebar + mobile drawer ── */
export default function TrekFilterBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const searchParams = useSearchParams();
    const activeFiltersCount = Array.from(searchParams.keys()).length;

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [drawerOpen]);

    return (
        <>
            {/* ── Desktop Sidebar (visible lg+) ── */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-28 self-start">
                <div className="bg-[var(--forest-green)] p-6 angular-card border border-white/10">
                    <FilterAccordion />
                </div>
            </aside>

            {/* ── Mobile Filter Button (visible below lg) ── */}
            <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-40 bg-[var(--terracotta)] text-white px-8 py-4 font-black uppercase tracking-widest text-xs angular-card shadow-2xl flex items-center gap-3 hover:bg-[var(--clay)] transition-all"
            >
                <Faders weight="bold" className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 bg-white text-[var(--terracotta)] text-[10px] font-black flex items-center justify-center rounded-full">
                        {activeFiltersCount}
                    </span>
                )}
            </button>

            {/* ── Mobile Drawer Overlay ── */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDrawerOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-[var(--forest-green)] lg:hidden overflow-y-auto"
                        >
                            <div className="p-6">
                                {/* Close button */}
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-lg font-bold text-white uppercase tracking-widest">
                                        Filter Treks
                                    </h2>
                                    <button
                                        onClick={() => setDrawerOpen(false)}
                                        className="w-10 h-10 bg-white/10 flex items-center justify-center angular-card text-white hover:bg-[var(--terracotta)] transition-all"
                                    >
                                        <X weight="bold" className="w-5 h-5" />
                                    </button>
                                </div>

                                <FilterAccordion />

                                {/* Apply button */}
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    className="w-full mt-8 bg-[var(--terracotta)] text-white py-4 font-black uppercase tracking-widest text-sm angular-card hover:bg-[var(--clay)] transition-all"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
