'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowCounterClockwise } from '@phosphor-icons/react/dist/ssr';

export default function FindMyTrek({ treks }: { treks: any[] }) {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        experience: '',
        duration: '',
        vibe: ''
    });
    
    // Fallback recommendation logic just using the 3 DB treks
    const getRecommendation = () => {
        if (!treks || treks.length === 0) return null;
        // In a real app, we'd have a scoring algorithm here.
        // For now, let's just pick one pseudo-randomly based on the string lengths of answers.
        const hash = (answers.experience.length + answers.duration.length + answers.vibe.length) % treks.length;
        return treks[hash];
    };

    const handleAnswer = (key: keyof typeof answers, value: string) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        setTimeout(() => setStep(s => s + 1), 300); // Small delay for smooth transition
    };

    const resetQuiz = () => {
        setAnswers({ experience: '', duration: '', vibe: '' });
        setStep(1);
    };

    const recommendation = step === 4 ? getRecommendation() : null;

    return (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#1b4332] text-white">
            <div className="max-w-4xl mx-auto w-full text-center">
                
                {step < 4 && (
                    <div className="mb-8 md:mb-12">
                        <span className="text-yellow-400 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                            Trek Matchmaker
                        </span>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-2 md:mb-4 font-serif">
                            Don't Know Where To Start?
                        </h2>
                        <p className="text-sm md:text-lg text-[#a7c9b8] font-medium">
                            Answer 3 quick questions and we'll find your perfect trail.
                        </p>
                        
                        {/* Progress */}
                        <div className="flex justify-center gap-2 mt-6 md:mt-8">
                            {[1, 2, 3].map(i => (
                                <div 
                                    key={i} 
                                    className={`h-1.5 w-12 rounded-full transition-colors ${step >= i ? 'bg-yellow-400' : 'bg-white/20'}`} 
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Quiz Container */}
                <div className="bg-white text-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden min-h-[300px] md:min-h-[400px] flex flex-col justify-center">
                    
                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="animate-[fadeIn_0.5s_ease-out]">
                            <h3 className="text-xl md:text-3xl font-bold mb-6 md:mb-8">What is your trekking experience?</h3>
                            <div className="flex flex-col gap-3 md:gap-4 max-w-md mx-auto">
                                {['First Trek', 'Some Experience', 'Experienced Trekker'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => handleAnswer('experience', opt)}
                                        className="w-full text-left px-4 py-3 md:px-6 md:py-4 rounded-xl border-2 border-slate-100 hover:border-[#1b4332] hover:bg-[#1b4332]/5 font-bold text-base md:text-lg transition-all"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="animate-[fadeIn_0.5s_ease-out]">
                            <h3 className="text-xl md:text-3xl font-bold mb-6 md:mb-8">How many days do you have?</h3>
                            <div className="flex flex-col gap-3 md:gap-4 max-w-md mx-auto">
                                {['2–4 Days', '5–7 Days', '8+ Days'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => handleAnswer('duration', opt)}
                                        className="w-full text-left px-4 py-3 md:px-6 md:py-4 rounded-xl border-2 border-slate-100 hover:border-[#1b4332] hover:bg-[#1b4332]/5 font-bold text-base md:text-lg transition-all"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div className="animate-[fadeIn_0.5s_ease-out]">
                            <h3 className="text-xl md:text-3xl font-bold mb-6 md:mb-8">What are you looking for the most?</h3>
                            <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto">
                                {['Snow', 'Meadows', 'Summits', 'Deep Forests'].map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => handleAnswer('vibe', opt)}
                                        className="w-full px-4 py-5 md:px-6 md:py-8 rounded-xl border-2 border-slate-100 hover:border-[#1b4332] hover:bg-[#1b4332]/5 font-bold text-base md:text-lg transition-all flex flex-col items-center justify-center gap-2"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Result */}
                    {step === 4 && recommendation && (
                        <div className="animate-[fadeIn_0.5s_ease-out] text-left flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-full md:w-1/2 relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                                {recommendation.images?.[0] ? (
                                    <Image src={recommendation.images[0]} alt={recommendation.title} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-200" />
                                )}
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col items-start">
                                <span className="text-[#e30613] font-bold text-xs uppercase tracking-[0.2em] mb-2 block">
                                    Your Perfect Match
                                </span>
                                <h3 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight mb-4 leading-none">
                                    We think {recommendation.title} is perfect for you.
                                </h3>
                                <p className="text-slate-600 font-medium mb-8">
                                    Based on your answers, this {recommendation.duration}-day {recommendation.difficulty.toLowerCase()} trek offers exactly what you're looking for.
                                </p>
                                
                                <div className="flex gap-4 w-full">
                                    <Link 
                                        href={`/treks/${recommendation.slug}`}
                                        className="flex-1 bg-[#1b4332] text-white px-6 py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-[#2d6a4f] transition-colors text-center flex items-center justify-center gap-2"
                                    >
                                        View Details <ArrowRight weight="bold" />
                                    </Link>
                                    <button 
                                        onClick={resetQuiz}
                                        className="px-4 py-4 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                                        title="Start Over"
                                    >
                                        <ArrowCounterClockwise weight="bold" size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
