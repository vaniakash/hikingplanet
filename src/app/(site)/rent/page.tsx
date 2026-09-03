import React from 'react';

export default function RentPage() {
    return (
        <div className="min-h-screen bg-[var(--deep-earth)] flex items-center justify-center p-6">
            <div className="text-center">
                <span className="text-[var(--terracotta)] font-black uppercase tracking-[0.5em] text-xs mb-4 block">Rentals</span>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white uppercase tracking-tight mb-6">Upcoming...</h1>
                <p className="text-white/60 max-w-md mx-auto font-light leading-relaxed">
                    Gear rentals for your next trek will be available soon.
                </p>
            </div>
        </div>
    );
}
