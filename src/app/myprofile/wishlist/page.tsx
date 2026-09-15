'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, MapPin, Clock, IndianRupee, Trash2, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [removing, setRemoving] = useState<string | null>(null);

    const fetchWishlist = async () => {
        try {
            const res = await fetch('/api/consumer/dashboard/wishlist');
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setWishlist(data.wishlist);
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemove = async (trekId: string) => {
        setRemoving(trekId);
        try {
            const res = await fetch('/api/consumer/dashboard/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trekId, action: 'remove' })
            });
            if (res.ok) {
                setWishlist(prev => prev.filter(item => item.trek._id !== trekId));
            }
        } catch (error) {
            console.error('Error removing from wishlist', error);
        } finally {
            setRemoving(null);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-900">Saved Treks</h1>
                <p className="text-slate-500 mt-1">Treks you want to experience in the future.</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.length === 0 ? (
                        <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-100">
                            <p className="text-slate-500">Your wishlist is empty.</p>
                            <Link href="/treks" className="mt-4 inline-block px-6 py-2 bg-[#e30613] text-white font-bold rounded-lg hover:bg-red-700">
                                Explore Treks
                            </Link>
                        </div>
                    ) : (
                        wishlist.map(item => (
                            <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group relative">
                                <button 
                                    onClick={() => handleRemove(item.trek._id)}
                                    disabled={removing === item.trek._id}
                                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                                    title="Remove from wishlist"
                                >
                                    {removing === item.trek._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                </button>
                                
                                <Link href={`/treks/${item.trek.slug}`} className="block relative h-48 bg-slate-100 overflow-hidden">
                                    {item.trek?.images?.[0] && (
                                        <Image 
                                            src={item.trek.images[0]} 
                                            alt={item.trek.title} 
                                            fill 
                                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <div className="flex items-center text-white text-sm font-bold gap-1">
                                            View Trek <ExternalLink className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                                
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="text-lg font-black text-slate-900 line-clamp-1">{item.trek.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                                            <MapPin className="w-3.5 h-3.5" /> {item.trek.location}
                                        </div>
                                        
                                        <div className="flex items-center gap-4 mt-4 text-sm text-slate-600 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4 text-slate-400" />
                                                {item.trek.duration} Days
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                                            <div>{item.trek.difficulty}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Starts From</div>
                                            <div className="text-lg font-black text-slate-900 flex items-center">
                                                <IndianRupee className="w-4 h-4" />{item.trek.price}
                                            </div>
                                        </div>
                                        <Link 
                                            href={`/treks/${item.trek.slug}`}
                                            className="px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
