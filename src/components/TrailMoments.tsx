'use client';

import { motion } from 'framer-motion';
import CircularGallery from './CircularGallery';

const trailMoments = [
    {
        image: '/images/dayarabugyal1.webp',
        text: 'Mountain morning',
    },
    {
        image: '/images/dayarabugyal2.webp',
        text: 'Local hospitality',
    },
    {
        image: '/images/dayarabugyal3.webp',
        text: 'Trail ascent',
    },
    {
        image: '/images/dayarabugyal4.webp',
        text: 'Summit view',
    },
];

export default function TrailMoments() {
    return (
        <section
            className="py-24 md:py-32 bg-[#F4F1EA] relative overflow-hidden"
        >
            <div className="container mx-auto px-6 max-w-7xl relative z-20">
                {/* Heading */}
                <div className="mb-10 md:mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[#C25E44] font-black uppercase tracking-[0.4em] text-xs block mb-4"
                    >
                        Visual Storytelling
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[var(--forest-green)]"
                    >
                        Trail Moments: <br className="md:hidden" />
                        <span className="italic text-[#C25E44]">Garhwal Himalayas</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-sm mt-6 text-[#2D4030]/60 uppercase tracking-widest"
                    >
                        Drag to explore
                    </motion.p>
                </div>
            </div>

            {/* OGL Circular Gallery */}
            <div className="w-full relative z-10" style={{ height: '600px' }}>
                <CircularGallery
                    items={trailMoments}
                    bend={1}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollEase={0.05}
                    scrollSpeed={2}
                    font="bold 24px Inter, sans-serif"
                />
            </div>
        </section>
    );
}
