import Link from 'next/link';
import Image from 'next/image';
import { MapPin, CalendarDots, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

interface TrekCardProps {
    trek: {
        title: string;
        slug: string;
        images: string[];
        price: number;
        difficulty: string;
        duration: number;
        location: string;
    };
}

export default function TrekCard({ trek }: TrekCardProps) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-black/5 flex flex-col h-full">
            {/* Image Container */}
            <Link href={`/treks/${trek.slug}`} className="block relative h-56 md:h-64 overflow-hidden">
                {trek.images?.[0] ? (
                    <Image
                        src={trek.images[0]}
                        alt={trek.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                        No Image
                    </div>
                )}

                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

                {/* Tags (Top) */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                        {trek.difficulty}
                    </span>
                </div>

                {/* Title inside image (Bottom) */}
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight drop-shadow-md group-hover:text-[#C25E44] transition-colors">
                        {trek.title}
                    </h3>
                </div>
            </Link>

            {/* Content Container */}
            <div className="p-5 md:p-6 flex flex-col flex-grow bg-white">

                {/* Meta Info */}
                <div className="flex flex-col gap-2.5 text-slate-600 text-xs font-semibold uppercase tracking-wider mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                            <MapPin weight="fill" className="text-[#C25E44] w-3 h-3" />
                        </div>
                        <span className="truncate">{trek.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                            <CalendarDots weight="fill" className="text-[#C25E44] w-3 h-3" />
                        </div>
                        <span>{trek.duration} Days</span>
                    </div>
                </div>

                <div className="mt-auto pt-5 border-t border-slate-100 flex items-end justify-between">
                    <div>
                        <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mb-0.5">
                            Starting At
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-[#C25E44] transition-colors">
                            ₹{trek.price.toLocaleString()}
                        </p>
                    </div>
                    <Link
                        href={`/treks/${trek.slug}`}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-50 text-slate-800 flex items-center justify-center border border-slate-200 group-hover:bg-[#C25E44] group-hover:text-white group-hover:border-[#C25E44] transition-all duration-300"
                    >
                        <ArrowUpRight weight="bold" className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
