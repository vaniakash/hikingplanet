// This file tells Next.js to never index any /admin/* pages in search engines
// It sits alongside the 'use client' layout.tsx for the admin section
import type { Metadata } from 'next';

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};
