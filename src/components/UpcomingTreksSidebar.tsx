'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { CalendarBlank } from '@phosphor-icons/react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DIFFICULTIES = ['Easy', 'Easy - Moderate', 'Moderate', 'Moderate - Difficult', 'Difficult'];
const EXPERIENCES = ['Family Treks', 'Stargazing Treks', 'Senior Treks', 'Adventure Therapy', 'Summer Camps'];
const SEASONS = ['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter'];
const DURATIONS = ['4 days', '5 days', '6 days', '7+ days'];

export default function UpcomingTreksSidebar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (params.get(key) === value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.push(`/upcoming-treks?${params.toString()}`, { scroll: false });
    };

    const FilterSection = ({ title, options, filterKey }: { title: string, options: string[], filterKey: string }) => {
        const currentValue = searchParams.get(filterKey);
        
        return (
            <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
                <ul className="space-y-2">
                    {options.map((option) => (
                        <li key={option}>
                            <button 
                                onClick={() => updateFilter(filterKey, option)}
                                className={`text-sm text-left w-full hover:text-gray-900 transition-colors ${currentValue === option ? 'font-bold text-gray-900' : 'text-gray-600'}`}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <aside className="w-64 shrink-0 bg-[#FFFDF5] p-6 min-h-screen border-r border-gray-200">
            {/* Filter By Categories */}
            <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg border-b border-gray-200 pb-2">Filter By Categories</h3>
                <FilterSection title="Treks by Month" options={MONTHS} filterKey="month" />
                <FilterSection title="Treks by Difficulty" options={DIFFICULTIES} filterKey="difficulty" />
                <FilterSection title="Treks by Experience" options={EXPERIENCES} filterKey="experience" />
                <FilterSection title="Treks by Season" options={SEASONS} filterKey="season" />
                <FilterSection title="Treks by Duration" options={DURATIONS} filterKey="duration" />
            </div>
        </aside>
    );
}
