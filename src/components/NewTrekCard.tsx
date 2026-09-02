import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin } from '@phosphor-icons/react/dist/ssr';

interface NewTrekCardProps {
    trek: {
        title: string;
        slug: string;
        images?: string[];
        location: string;
        duration: number;
        difficulty: string;
    };
}

export default function NewTrekCard({ trek }: NewTrekCardProps) {
    const imageUrl = trek.images && trek.images.length > 0 ? trek.images[0] : null;

    return (
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 h-full group">
            {/* Image Section */}
            <div className="relative h-56 md:h-64 w-full bg-slate-100">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={trek.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                )}

                {/* Heart Icon */}
                <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-500 hover:text-red-500 transition-colors z-10">
                    <Heart weight="bold" size={16} />
                </button>

                {/* Region Pill */}
                {trek.location && (
                    <div className="absolute bottom-4 right-4 bg-[#1e293b] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md z-10">
                        <MapPin weight="fill" className="text-red-500" size={12} />
                        <span className="uppercase tracking-wider">{trek.location}</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight leading-snug">
                    {trek.title}
                </h3>

                <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#94a3b8] font-bold tracking-widest uppercase">Duration:</span>
                        <span className="text-gray-900 font-extrabold">{trek.duration} Days</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#94a3b8] font-bold tracking-widest uppercase">Grade:</span>
                        <span className="text-gray-900 font-extrabold uppercase">{trek.difficulty}</span>
                    </div>
                </div>

                <div className="mt-auto pt-2">
                    <Link
                        href={`/treks/${trek.slug}`}
                        className="block w-full text-center border-2 border-gray-100 text-gray-900 font-bold text-xs uppercase tracking-widest py-3 rounded-lg hover:border-gray-900 transition-colors"
                    >
                        View Trek Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
