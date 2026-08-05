'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Warning, X } from '@phosphor-icons/react';

export default function ConstructionBanner() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[60] bg-[var(--forest-green)] text-white p-5 pr-12 shadow-2xl angular-card border-l-4 border-[var(--terracotta)]"
                >
                    <button
                        onClick={() => setShow(false)}
                        className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
                    >
                        <X weight="bold" size={18} />
                    </button>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[var(--terracotta)] flex items-center justify-center shrink-0 angular-card">
                            <Warning weight="fill" className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-sm uppercase tracking-widest mb-1">
                                Under Construction
                            </p>
                            <p className="text-white/70 text-sm leading-relaxed">
                                This website is still being built. Please do not book any treks
                                — features are not fully functional yet.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
