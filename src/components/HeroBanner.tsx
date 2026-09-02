'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, CaretRight, Megaphone } from '@phosphor-icons/react/dist/ssr';

const slides = [
    {
        image: 'https://res.cloudinary.com/djiwbsioo/image/upload/v1785929316/hikingplanet/hero/tbcxrenhcuqfprgpykqi.jpg',
        headline: "What If Your Next Trek Changed Everything?",
        subtitle: 'Join us on a mindfully designed trek experience that connects you to yourself. The person before and after the trek are rarely the same.',
        ctaText: 'View Upcoming Treks',
        ctaLink: '/upcoming-treks',
        reviewText: "Join thousands of happy trekkers on our next adventure."
    },
    {
        image: 'https://res.cloudinary.com/djiwbsioo/image/upload/v1785928865/hikingplanet/hero/z1jgr885bgldsswzv2fy.jpg',
        headline: 'Conquer The White Wilderness',
        subtitle: "Experience the magic of snow-covered peaks on Uttarakhand's most iconic winter treks. Mindfully curated for pure transformation.",
        ctaText: 'View Winter Treks',
        ctaLink: '/upcoming-treks?category=winter',
        reviewText: "Join thousands of happy trekkers on our next adventure."
    },
    {
        image: 'https://res.cloudinary.com/djiwbsioo/image/upload/v1785928866/hikingplanet/hero/ndjx2tvzgigwyh4xaccq.jpg',
        headline: 'Where Meadows Touch The Sky',
        subtitle: 'Discover vast alpine bugyals, wildflowers, and panoramic Himalayan views that expand your horizons and clear your mind.',
        ctaText: 'Explore Meadow Treks',
        ctaLink: '/upcoming-treks?category=meadows',
        reviewText: "Join thousands of happy trekkers on our next adventure."
    },
    {
        image: 'https://res.cloudinary.com/djiwbsioo/image/upload/v1785928868/hikingplanet/hero/fgfib9vf635g2xib74ax.jpg',
        headline: 'Adventure With Purpose',
        subtitle: 'Small groups, expert guides, and journeys designed for meaningful exploration. Leave the mountains better than you found them.',
        ctaText: 'View All Expeditions',
        ctaLink: '/upcoming-treks',
        reviewText: "Join thousands of happy trekkers on our next adventure."
    },
];

const SWIPE_THRESHOLD = 50;

// Image cross-fade variants
const imageVariants = {
    enter: { opacity: 0, scale: 1.03 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } },
};

// Text stagger container
const textContainer = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

// Each text piece slides up + fades in
const textItem = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function HeroBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

    const goToPrevious = () =>
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

    const goToNext = () =>
        setCurrentIndex((prev) => (prev + 1) % slides.length);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) >= SWIPE_THRESHOLD) {
            diff > 0 ? goToNext() : goToPrevious();
        }
        touchStartX.current = null;
    };

    const slide = slides[currentIndex];

    return (
        <div className="flex flex-col w-full select-none">
            {/* ── Main Hero Carousel ── */}
            <section
                className="relative h-[380px] md:h-[450px] flex items-center overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Animated background image */}
                <AnimatePresence mode="sync">
                    <motion.div
                        key={`bg-${currentIndex}`}
                        className="absolute inset-0"
                        variants={imageVariants as any}
                        initial="enter"
                        animate="center"
                        exit="exit"
                    >
                        <Image
                            src={slide.image}
                            alt={slide.headline}
                            fill
                            priority={currentIndex === 0}
                            className="object-cover pointer-events-none"
                            quality={90}
                            draggable={false}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Dark overlay */}
                <motion.div
                    key={`overlay-${currentIndex}`}
                    className="absolute inset-0 bg-black/40"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 0.45 }}
                    transition={{ duration: 0.8 }}
                />

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none hidden sm:flex border border-white/20"
                    aria-label="Previous slide"
                >
                    <CaretLeft weight="bold" size={24} />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none hidden sm:flex border border-white/20"
                    aria-label="Next slide"
                >
                    <CaretRight weight="bold" size={24} />
                </button>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`text-${currentIndex}`}
                            className="max-w-3xl text-white py-4"
                            variants={textContainer}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
                        >
                            {/* Headline */}
                            <motion.h1
                                variants={textItem}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-[1.1] tracking-tight text-white drop-shadow-md"
                            >
                                {slide.headline}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                variants={textItem}
                                className="text-sm sm:text-base md:text-lg mb-6 opacity-95 font-medium leading-relaxed drop-shadow max-w-2xl"
                            >
                                {slide.subtitle}
                            </motion.p>

                            {/* Button & Review Text */}
                            <motion.div
                                variants={textItem}
                                className="flex flex-col items-start gap-3"
                            >
                                <Link
                                    href={slide.ctaLink}
                                    className="px-7 py-3.5 bg-[#e30613] text-white font-black rounded shadow-2xl hover:bg-[#c10510] transition-all text-xs md:text-sm uppercase tracking-wider"
                                >
                                    {slide.ctaText}
                                </Link>

                                <div className="mt-1">
                                    <Link href="/reviews" className="text-white hover:text-[#e30613] font-bold underline text-xs sm:text-sm transition-colors drop-shadow">
                                        {slide.reviewText}
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dot indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
                    {slides.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            animate={{ width: i === currentIndex ? 32 : 12, opacity: i === currentIndex ? 1 : 0.6 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className={`h-2.5 rounded-full ${i === currentIndex ? 'bg-[#e30613]' : 'bg-white'}`}
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
