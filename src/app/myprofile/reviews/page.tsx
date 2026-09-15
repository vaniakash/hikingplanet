'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Loader2, Star, Edit2, Trash2, MapPin } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

function ReviewsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const writeTrekId = searchParams.get('write');

    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Edit/Write Form State
    const [isFormOpen, setIsFormOpen] = useState(!!writeTrekId);
    const [formData, setFormData] = useState({ trekId: writeTrekId || '', rating: 5, reviewText: '' });
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/consumer/dashboard/reviews');
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setReviews(data.reviews);
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
        // If writeTrekId is provided but not in reviews, we'd ideally fetch the trek name. 
        // For simplicity, we'll let the user type the review and just submit.
    }, [writeTrekId]);

    const handleEdit = (review: any) => {
        setFormData({
            trekId: review.trek._id,
            rating: review.rating,
            reviewText: review.reviewText
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this review?')) return;
        try {
            const res = await fetch(`/api/consumer/dashboard/reviews?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setReviews(prev => prev.filter(r => r._id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg('');
        
        try {
            const res = await fetch('/api/consumer/dashboard/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if (data.success) {
                setIsFormOpen(false);
                setFormData({ trekId: '', rating: 5, reviewText: '' });
                if (writeTrekId) {
                    router.replace('/myprofile/reviews');
                }
                fetchReviews();
            } else {
                setErrorMsg(data.error || 'Failed to submit review.');
            }
        } catch (err) {
            setErrorMsg('An unexpected error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">My Reviews</h1>
                    <p className="text-slate-500 mt-1">Share your experiences and help others.</p>
                </div>
                {!isFormOpen && (
                    <button 
                        onClick={() => router.push('/myprofile/history')}
                        className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        Review a Past Trek
                    </button>
                )}
            </div>

            {isFormOpen && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">{writeTrekId ? 'Write a Review' : 'Edit Review'}</h2>
                    
                    {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{errorMsg}</div>}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!writeTrekId && (
                             <p className="text-sm text-slate-500 mb-2">You are editing an existing review.</p>
                        )}
                        
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className="focus:outline-none"
                                    >
                                        <Star className={`w-8 h-8 ${star <= formData.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Your Review</label>
                            <textarea
                                value={formData.reviewText}
                                onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all resize-none"
                                placeholder="Tell us about your experience..."
                            ></textarea>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2.5 bg-[#e30613] text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center gap-2"
                            >
                                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                Submit Review
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsFormOpen(false);
                                    if (writeTrekId) router.replace('/myprofile/reviews');
                                }}
                                className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {!isFormOpen && (
                loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                        <p className="text-slate-500">You haven't written any reviews yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-full sm:w-32 h-24 relative rounded-lg overflow-hidden shrink-0 bg-slate-100">
                                        {review.trek?.images?.[0] && (
                                            <Image src={review.trek.images[0]} alt={review.trek.title} fill className="object-cover" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-black text-slate-900">{review.trek?.title}</h3>
                                                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                                    <MapPin className="w-3.5 h-3.5" /> {review.trek?.location}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(review)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-slate-50 rounded-lg hover:bg-blue-50">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(review._id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-slate-50 rounded-lg hover:bg-red-50">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 mt-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                                            ))}
                                            <span className="ml-2 text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 capitalize">
                                                {review.status}
                                            </span>
                                        </div>
                                        
                                        <p className="text-slate-600 mt-3 text-sm leading-relaxed">"{review.reviewText}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}

export default function ReviewsPage() {
    return (
        <Suspense fallback={<div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#e30613]" /></div>}>
            <ReviewsContent />
        </Suspense>
    );
}
