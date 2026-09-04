'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { CaretLeft, CaretRight, Megaphone, ShieldCheck } from '@phosphor-icons/react/dist/ssr';

const slides = [
    {
        image: 'https://res.cloudinary.com/djiwbsioo/image/upload/v1785929316/hikingplanet/hero/tbcxrenhcuqfprgpykqi.jpg',
        eyebrow: 'YOUR NEXT ADVENTURE AWAITS',
        headline: "Find Your Trail. Find Your Wild.",
        subtitle: 'From peaceful alpine meadows to challenging Himalayan summits, discover a trek that matches your adventure.',
        priceText: 'Starting from ₹6,499', // Will be dynamic based on lowestPrice
        ctaText: 'EXPLORE TREKS →',
        ctaLink: '/upcoming-treks',
        secondaryCtaText: 'FIND MY TREK',
        secondaryCtaLink: '/upcoming-treks',
        trustText: "Beginner Friendly • Expert Leaders • Small Groups"
    },
    {
        image: 'https://res.cloudinary.com/djiwbsioo/image/upload/v1785928865/hikingplanet/hero/z1jgr885bgldsswzv2fy.jpg',
        eyebrow: 'DAYARA BUGYAL • UTTARAKHAND',
        headline: 'Walk Through Endless Himalayan Meadows',
        subtitle: "A breathtaking 4-day journey through alpine meadows, oak forests and panoramic Himalayan views.",
        priceText: 'Starting from ₹6,499',
        ctaText: 'EXPLORE DAYARA BUGYAL →',
        ctaLink: '/treks/dayara-bugyal-trek',
        secondaryCtaText: 'TALK TO AN EXPERT',
        secondaryCtaLink: 'https://wa.me/918556043708?text=Hi! I want to know more about the Dayara Bugyal Trek.',
        trustText: "Beginner Friendly • 4 Days • Small Groups"
    },
    {
        image: 'https://res.cloudinary.com/djiwbsioo/image/upload/v1785928866/hikingplanet/hero/ndjx2tvzgigwyh4xaccq.jpg',
        eyebrow: 'KEDARKANTHA • UTTARAKHAND',
        headline: 'Wake Up Above the Clouds',
        subtitle: "Chase snow-covered trails, stunning sunrises and a summit experience you'll remember long after you return.",
        priceText: 'Starting from ₹8,999',
        ctaText: 'EXPLORE KEDARKANTHA →',
        ctaLink: '/treks/kedarkantha-trek',
        secondaryCtaText: 'VIEW BATCHES',
        secondaryCtaLink: '/treks/kedarkantha-trek',
        trustText: "6 Days • Summit Trek • Winter Favourite"
    },
    {
        image: 'https://res.cloudinary.com/djiwbsioo/image/upload/v1785928868/hikingplanet/hero/fgfib9vf635g2xib74ax.jpg',
        eyebrow: 'YOUR FIRST HIMALAYAN TREK',
        headline: 'Never Trekked Before? Start Here.',
        subtitle: "Your first trek doesn't have to be intimidating. Discover beginner-friendly trails with expert guidance every step of the way.",
        ctaText: 'FIND MY TREK →',
        ctaLink: '/upcoming-treks',
        secondaryCtaText: 'TALK TO AN EXPERT',
        secondaryCtaLink: 'https://wa.me/918556043708?text=Hi! I am a beginner looking for my first Himalayan trek.',
        trustText: "Beginner Friendly • Guided Treks • Small Groups"
    },
    {
        image: 'https://res.cloudinary.com/djiwbsioo/image/upload/v1785929316/hikingplanet/hero/tbcxrenhcuqfprgpykqi.jpg', // Reusing first image for emotional slide
        eyebrow: 'THE MOUNTAINS ARE CALLING',
        headline: 'Some Stories Are Meant to Be Lived.',
        subtitle: "Leave the familiar behind, step into the mountains and come back with a story worth telling.",
        ctaText: 'EXPLORE ALL TREKS →',
        ctaLink: '/upcoming-treks',
        secondaryCtaText: 'TALK ON WHATSAPP',
        secondaryCtaLink: 'https://wa.me/918556043708',
        trustText: "Himalayan Adventures • Local Expertise • Memorable Journeys"
    }
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

// Scene (Slide) transition variants
const sceneVariants: Variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.05
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.8 },
            scale: { duration: 0.8, ease: "easeOut" }
        }
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
            }
        };
    }
};

const reducedSceneVariants: Variants = {
    enter: { opacity: 0 },
    center: { zIndex: 1, opacity: 1, transition: { duration: 0.8 } },
    exit: { zIndex: 0, opacity: 0, transition: { duration: 0.8 } }
};

// Text stagger container
const textContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
};

// Each text piece slides up + fades in
const textItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroBanner({ lowestPrice = 6999, lowestPriceSlug = null }: { lowestPrice?: number, lowestPriceSlug?: string | null }) {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isHovered, setIsHovered] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const slideIndex = Math.abs(page % slides.length);
    const slide = slides[slideIndex];

    const paginate = useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    }, [page]);

    // Autoplay logic
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            paginate(1);
        }, 6000);
        return () => clearInterval(timer);
    }, [isHovered, paginate]);

    return (
        <div className="flex flex-col w-full select-none">
            {/* ── Main Hero Carousel ── */}
            <section
                className="relative h-[65vh] md:h-[60vh] min-h-[500px] md:min-h-[550px] overflow-hidden bg-black flex items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={shouldReduceMotion ? reducedSceneVariants : sceneVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing flex items-center"
                    >
                        {/* Animated background image */}
                        <Image
                            src={slide.image}
                            alt={slide.headline}
                            fill
                            priority={slideIndex === 0}
                            className="object-cover pointer-events-none"
                            quality={90}
                            draggable={false}
                        />

                        {/* Dark gradient overlay for text readability (Left side bias) */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />

                        {/* Content */}
                        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 pointer-events-auto">
                            <motion.div
                                className="max-w-2xl text-white py-4 mt-8 md:mt-0"
                                variants={textContainer}
                                initial="hidden"
                                animate="show"
                            >
                                {/* Eyebrow */}
                                <motion.div variants={textItem} className="mb-4">
                                    <span className="text-[#e30613] font-black tracking-widest text-[10px] sm:text-xs uppercase bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-[#e30613]/30">
                                        {slide.eyebrow}
                                    </span>
                                </motion.div>

                                {/* Headline */}
                                <motion.h1
                                    variants={textItem}
                                    className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 leading-[1.1] tracking-tight text-white drop-shadow-lg"
                                >
                                    {slide.headline}
                                </motion.h1>

                                {/* Subtitle */}
                                <motion.p
                                    variants={textItem}
                                    className="text-base sm:text-lg md:text-xl mb-4 opacity-95 font-medium leading-relaxed drop-shadow-md text-white/90"
                                >
                                    {slide.subtitle}
                                </motion.p>

                                {/* Price Anchor */}
                                {slide.priceText && (
                                    <motion.p
                                        variants={textItem}
                                        className="text-base sm:text-lg mb-8 opacity-95 font-bold leading-relaxed drop-shadow-md text-white"
                                    >
                                        {slideIndex === 0 ? `Starting from ₹${lowestPrice.toLocaleString('en-IN')}` : slide.priceText}
                                    </motion.p>
                                )}

                                {/* Buttons */}
                                <motion.div
                                    variants={textItem}
                                    className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${!slide.priceText ? 'mt-8' : ''}`}
                                >
                                    <Link
                                        href={slide.ctaLink}
                                        className="px-8 py-4 bg-[#e30613] text-white font-black rounded-lg shadow-xl shadow-black/20 hover:bg-[#c10510] hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider w-full sm:w-auto text-center"
                                    >
                                        {slide.ctaText}
                                    </Link>
                                    
                                    {slide.secondaryCtaText && (
                                        <Link
                                            href={slide.secondaryCtaLink}
                                            className="px-8 py-4 bg-white/10 border border-white/30 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all text-sm uppercase tracking-wider w-full sm:w-auto text-center"
                                            target={slide.secondaryCtaLink.startsWith('http') ? '_blank' : undefined}
                                        >
                                            {slide.secondaryCtaText}
                                        </Link>
                                    )}
                                </motion.div>

                                {/* Trust Text */}
                                <motion.div variants={textItem} className="mt-8 flex items-center gap-2 text-white/70 text-xs sm:text-sm font-bold tracking-wide uppercase">
                                    <ShieldCheck weight="fill" className="text-[#e30613] w-5 h-5" />
                                    <span>{slide.trustText}</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={() => paginate(-1)}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all focus:outline-none hidden sm:flex border border-white/10 shadow-lg hover:scale-105"
                    aria-label="Previous slide"
                >
                    <CaretLeft weight="bold" size={24} />
                </button>
                <button
                    onClick={() => paginate(1)}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all focus:outline-none hidden sm:flex border border-white/10 shadow-lg hover:scale-105"
                    aria-label="Next slide"
                >
                    <CaretRight weight="bold" size={24} />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const newDirection = i > slideIndex ? 1 : -1;
                                setPage([i, newDirection]);
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2.5 transition-all duration-300 ease-out rounded-full ${i === slideIndex ? 'bg-[#e30613] w-8' : 'bg-white/60 hover:bg-white w-2.5'}`}
                        />
                    ))}
                </div>
            </section>

            {/* ── Highlight Banner directly below Hero section ── */}
            <div className="bg-[#FFF5F5] border-b border-red-200/60 py-4 sm:py-5 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-slate-900 shadow-inner relative z-10">
                <div className="max-w-7xl w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm md:text-[15px]">
                    <div className="flex items-center gap-3.5 font-bold text-slate-800 leading-snug">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[#e30613] flex-shrink-0 border border-red-200 shadow-sm">
                            <Megaphone weight="fill" className="w-5 h-5" />
                        </div>
                        <span className="font-extrabold text-slate-900">
                            Registrations are now open for the Dayara Bugyal Trek — walk through endless alpine meadows with breathtaking Himalayan views.
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 font-semibold text-slate-700 md:text-right flex-shrink-0">
                        <span>Limited seats available.</span>
                        <Link href="/treks/dayara-bugyal-trek" className="text-[#0066CC] hover:text-[#004d99] underline font-bold transition-colors ml-1">
                            Explore the Trek →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
