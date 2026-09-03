import React from 'react';

export default function MyProfilePage() {
    return (
        <div className="min-h-screen bg-[var(--deep-earth)] flex items-center justify-center p-6">
            <div className="text-center">
                <span className="text-[var(--terracotta)] font-black uppercase tracking-[0.5em] text-xs mb-4 block">My Profile</span>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white uppercase tracking-tight mb-6">Upcoming...</h1>
                <p className="text-white/60 max-w-md mx-auto font-light leading-relaxed">
                    Your personal trek dashboard is currently being built.
                </p>
            </div>
        </div>
    );
}
