import Image from 'next/image';

const CATEGORIES = [
    {
        title: 'Top Treks in Sept, Oct & Nov',
        imageUrl: 'https://placehold.co/400x400/2a5c43/FFFFFF/png?text=Autumn+Treks'
    },
    {
        title: 'Best for Beginners in Sept, Oct & Nov',
        imageUrl: 'https://placehold.co/400x400/2a5c43/FFFFFF/png?text=Beginner+Treks'
    },
    {
        title: 'Adventures Above 14,000 ft',
        imageUrl: 'https://placehold.co/400x400/2a5c43/FFFFFF/png?text=High+Altitude'
    },
    {
        title: 'Central Indian Treks',
        imageUrl: 'https://placehold.co/400x400/2a5c43/FFFFFF/png?text=Central+India'
    },
    {
        title: 'Top Treks in Dec, Jan & Feb',
        imageUrl: 'https://placehold.co/400x400/2a5c43/FFFFFF/png?text=Winter+Treks'
    },
    {
        title: 'Unexplored India Trips',
        imageUrl: 'https://placehold.co/400x400/2a5c43/FFFFFF/png?text=Unexplored'
    },
];

export default function TopCategories() {
    return (
        <section className="mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 pb-2 border-b-2 border-yellow-400 inline-block">
                Explore Our Top Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 border-b border-yellow-200 pb-10">
                {CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-pointer">
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3">
                            <Image
                                src={cat.imageUrl}
                                alt={cat.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 text-center leading-snug">
                            {cat.title}
                        </h3>
                    </div>
                ))}
            </div>
            
            <div className="mt-6 bg-yellow-50 p-4 border border-yellow-200 rounded-md flex items-start gap-3">
                <span className="text-yellow-600 text-xl">📢</span>
                <p className="text-sm text-gray-700">
                    Roopkund is back! Be among the first to reopen this chapter of one of India&apos;s most iconic treks. <a href="#" className="text-blue-600 hover:underline">View trek and register</a>
                </p>
            </div>
        </section>
    );
}
