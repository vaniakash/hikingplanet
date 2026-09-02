'use client';

import { Snowflake, Tree, Mountains, Waves } from '@phosphor-icons/react/dist/ssr';

export default function ExploreByExperience({ treks }: { treks: any[] }) {
    // In a full app, these would actually filter the displayed treks.
    // Given we only have 3 treks, we will just use them visually to show the architecture.
    
    const experiences = [
        {
            title: "Chase The Snow",
            subtitle: "Winter treks & snow-covered summits",
            icon: <Snowflake weight="fill" className="w-8 h-8" />,
            image: "https://res.cloudinary.com/djiwbsioo/image/upload/v1785928865/hikingplanet/hero/z1jgr885bgldsswzv2fy.jpg",
        },
        {
            title: "Walk Through Meadows",
            subtitle: "Alpine bugyals & endless views",
            icon: <Tree weight="fill" className="w-8 h-8" />,
            image: "https://res.cloudinary.com/djiwbsioo/image/upload/v1785928866/hikingplanet/hero/ndjx2tvzgigwyh4xaccq.jpg",
        },
        {
            title: "Go Higher",
            subtitle: "High-altitude Garhwal adventures",
            icon: <Mountains weight="fill" className="w-8 h-8" />,
            image: "https://res.cloudinary.com/djiwbsioo/image/upload/v1785928868/hikingplanet/hero/fgfib9vf635g2xib74ax.jpg",
        },
        {
            title: "Into The Wild",
            subtitle: "Forests, rivers & remote trails",
            icon: <Waves weight="fill" className="w-8 h-8" />,
            image: "https://res.cloudinary.com/djiwbsioo/image/upload/v1785929316/hikingplanet/hero/tbcxrenhcuqfprgpykqi.jpg",
        }
    ];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4 font-serif">
                        Find Your Element
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        Explore our treks by the experiences they offer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {experiences.map((exp, idx) => (
                        <div 
                            key={idx}
                            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${exp.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="text-white mb-4 bg-white/20 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 transition-transform group-hover:-translate-y-2">
                                    {exp.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 transition-transform group-hover:-translate-y-2">
                                    {exp.title}
                                </h3>
                                <p className="text-white/80 font-medium text-sm transition-transform group-hover:-translate-y-2">
                                    {exp.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
