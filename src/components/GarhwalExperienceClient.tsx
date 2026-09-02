'use client';

import { useState } from 'react';
import HeroGarhwal from '@/components/upcoming-treks-v2/HeroGarhwal';
import FeaturedGarhwalTreks from '@/components/upcoming-treks-v2/FeaturedGarhwalTreks';
import ExploreByExperience from '@/components/upcoming-treks-v2/ExploreByExperience';
import ExploreBySeason from '@/components/upcoming-treks-v2/ExploreBySeason';
import DifficultyScale from '@/components/upcoming-treks-v2/DifficultyScale';
import FindMyTrek from '@/components/upcoming-treks-v2/FindMyTrek';
import UpcomingDepartures from '@/components/upcoming-treks-v2/UpcomingDepartures';
import PremiumContentBlocks from '@/components/upcoming-treks-v2/PremiumContentBlocks';

export default function GarhwalExperienceClient({ initialTreks }: { initialTreks: any[] }) {
    // Top-level state for interactive filtering if needed, 
    // though sub-components can also manage their own filtered views.
    
    return (
        <main className="w-full overflow-x-hidden">
            {/* 1. Hero Section & Trek Finder */}
            <HeroGarhwal treks={initialTreks} />

            {/* 2. Featured Treks (Large Cards) */}
            <FeaturedGarhwalTreks treks={initialTreks} />

            {/* 3. Explore by Experience */}
            <ExploreByExperience treks={initialTreks} />

            {/* 4. Explore by Season */}
            <ExploreBySeason treks={initialTreks} />

            {/* 6. Difficulty Explorer */}
            <DifficultyScale treks={initialTreks} />

            {/* 7. "Find My Trek" Questionnaire */}
            <FindMyTrek treks={initialTreks} />

            {/* 8. Upcoming Departures & Urgency */}
            <UpcomingDepartures treks={initialTreks} />

            {/* 9. Why Trek With Us, Story, Reviews, Final CTA */}
            <PremiumContentBlocks />
        </main>
    );
}
