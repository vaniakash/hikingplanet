'use client';

import { useState } from 'react';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';
import {
    WhatsappLogo,
    Phone,
    EnvelopeSimple,
    MapPin,
    CalendarCheck,
    Compass,
    Lifebuoy,
    Info,
    CheckCircle,
    WarningCircle,
    CaretDown,
    ArrowRight,
    PaperPlaneTilt,
    CircleNotch,
    ShieldCheck
} from '@phosphor-icons/react';

export default function ContactClient() {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);

    const [formState, setFormState] = useState({
        name: '',
        mobile: '',
        email: '',
        city: '',
        trek: 'Kedarkantha Trek',
        month: 'October',
        trekkers: '1',
        experience: 'Beginner',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState('');

    const handleSubmitEnquiry = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError('');

        try {
            const trekkersCount = parseInt(formState.trekkers, 10) || 1;
            const res = await fetch('/api/enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formState.name.trim(),
                    mobile: formState.mobile.trim(),
                    email: formState.email.trim(),
                    city: formState.city.trim(),
                    trek: formState.trek,
                    month: formState.month,
                    trekkers: trekkersCount,
                    experience: formState.experience,
                    message: formState.message.trim(),
                    source: 'contact-page',
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
            }

            setFormSubmitted(true);

            fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campaignId: 'contact-page',
                    eventName: 'contact_form_submitted',
                }),
            }).catch(() => {});
        } catch (err: any) {
            setFormError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const [findTrekState, setFindTrekState] = useState({
        month: 'October',
        experience: 'Beginner (Never trekked)',
        difficulty: 'Easy / Moderate',
        budget: '₹5k - ₹10k'
    });

    const handleFindTrek = (e: React.FormEvent) => {
        e.preventDefault();
        const text = `Hi, I'm looking for a trek.\nMonth: ${findTrekState.month}\nExperience: ${findTrekState.experience}\nDifficulty: ${findTrekState.difficulty}\nBudget: ${findTrekState.budget}\nCan you suggest some options?`;
        window.open(`https://wa.me/918556043708?text=${encodeURIComponent(text)}`, '_blank');
    };

    const faqs = [
        { q: "How do I book?", a: "You can book directly through our website by selecting your preferred date on the trek page, or reach out to us on WhatsApp for assistance." },
        { q: "What happens after booking?", a: "You'll receive a confirmation email with a detailed itinerary, packing list, and a link to join your batch's WhatsApp group." },
        { q: "Can beginners join?", a: "Yes, many of our treks are beginner-friendly. Look for 'Easy' or 'Moderate' difficulty levels when browsing, or ask our experts for recommendations." },
        { q: "What if weather cancels the trek?", a: "Safety is our priority. If a trek is cancelled due to weather, we offer alternative routes or a voucher for future treks." },
        { q: "What's included/excluded?", a: "Our packages typically include accommodation, meals on the trek, permits, and guide fees. Transport to base camp and personal gear are usually excluded." },
        { q: "Cancellation/refund?", a: "Cancellations made 30 days before departure get a full refund. Please refer to our full cancellation policy for details." },
        { q: "How do I contact my trek leader?", a: "Your trek leader will be introduced in the batch WhatsApp group a week before your departure." },
    ];

    return (
        <div className="bg-white text-gray-900 min-h-screen pt-32 pb-20 font-sans selection:bg-red-600 selection:text-white">
            <div className="container mx-auto px-6 max-w-7xl space-y-24">
                
                {/* 1. Hero */}
                <section className="text-center max-w-4xl mx-auto">
                    <FadeIn>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900">
                            Plan Your Next <span className="text-red-600">Adventure</span>
                        </h1>
                        <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
                            Have a question about a trek, batch, difficulty, or what to pack? Our trek experts are here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="https://wa.me/918556043708" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-3 w-full sm:w-auto shadow-md">
                                <WhatsappLogo weight="fill" className="w-6 h-6" />
                                WhatsApp an Expert
                            </a>
                            <a href="#contact-form" className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-3 w-full sm:w-auto border border-gray-300 shadow-sm">
                                <CalendarCheck weight="fill" className="w-6 h-6 text-red-600" />
                                Book a Callback
                            </a>
                        </div>
                    </FadeIn>
                </section>

                {/* 2. "How can we help?" — 4 cards */}
                <section>
                    <FadeIn>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-10 text-center text-gray-900">How can we help?</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <a href="/upcoming-treks" className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-red-200 transition-all group flex flex-col items-center text-center h-full">
                                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                                    <Compass weight="fill" className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">I want to book a trek</h3>
                                <p className="text-gray-500 text-sm mb-6">View upcoming treks</p>
                                <span className="text-red-600 text-sm font-bold uppercase tracking-widest mt-auto group-hover:translate-x-1 transition-transform inline-block">Explore →</span>
                            </a>
                            <a href="#contact-form" className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-red-200 transition-all group flex flex-col items-center text-center h-full">
                                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                                    <EnvelopeSimple weight="fill" className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">Send an Enquiry</h3>
                                <p className="text-gray-500 text-sm mb-6">Fill our contact form</p>
                                <span className="text-red-600 text-sm font-bold uppercase tracking-widest mt-auto group-hover:translate-x-1 transition-transform inline-block">Fill Form →</span>
                            </a>
                            <a href="https://wa.me/918556043708" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-[#25D366]/30 transition-all group flex flex-col items-center text-center h-full">
                                <div className="w-14 h-14 bg-[#25D366]/10 rounded-xl flex items-center justify-center mb-6">
                                    <WhatsappLogo weight="fill" className="w-8 h-8 text-[#25D366]" />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">I have a question</h3>
                                <p className="text-gray-500 text-sm mb-6">WhatsApp us</p>
                                <span className="text-[#25D366] text-sm font-bold uppercase tracking-widest mt-auto group-hover:translate-x-1 transition-transform inline-block">Chat Now →</span>
                            </a>
                            <a href="tel:+918556043708" className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-orange-200 transition-all group flex flex-col items-center text-center h-full">
                                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                                    <Lifebuoy weight="fill" className="w-8 h-8 text-orange-500" />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">I need help with an existing booking</h3>
                                <p className="text-gray-500 text-sm mb-6">Booking Support</p>
                                <span className="text-orange-500 text-sm font-bold uppercase tracking-widest mt-auto group-hover:translate-x-1 transition-transform inline-block">Get Help →</span>
                            </a>
                        </div>
                    </FadeIn>
                </section>

                {/* Contact & Enquiry Form Section */}
                <section id="contact-form" className="scroll-mt-28">
                    <FadeIn>
                        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-10 md:p-14 shadow-lg relative overflow-hidden">
                            {/* Decorative background blur */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

                            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
                                {/* Left Info / Context Column */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                                        <ShieldCheck weight="fill" className="w-4 h-4" />
                                        Direct From Basecamp
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                                        Send Us an <span className="text-red-600">Inquiry</span>
                                    </h2>
                                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                        Planning a solo trek, group summit, or custom corporate expedition? Leave your details below and our team in Uttarkashi will get back to you with tailored itineraries and batch schedules.
                                    </p>

                                    {/* Value highlights */}
                                    <div className="space-y-4 pt-2">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle weight="fill" className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">Swift 2–4 Hour Response</p>
                                                <p className="text-xs text-gray-500">Every inquiry is reviewed directly by our certified trek leaders.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle weight="fill" className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">Custom Group & Solo Itineraries</p>
                                                <p className="text-xs text-gray-500">Tailored routes, dates, and difficulty calibrations for your group.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle weight="fill" className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">Zero Pressure, Honest Advice</p>
                                                <p className="text-xs text-gray-500">No pushy sales. We help you pick the safest, most rewarding experience.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* WhatsApp Direct fallback card */}
                                    <div className="p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-between gap-4">
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">Need an instant reply?</p>
                                            <p className="text-xs text-gray-600">Our trek leaders are online on WhatsApp.</p>
                                        </div>
                                        <a
                                            href="https://wa.me/918556043708?text=Hi%2C%20I%20have%20an%20enquiry%20regarding%20a%20Himalayan%20trek."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full shadow-sm transition-all flex-shrink-0"
                                        >
                                            <WhatsappLogo weight="fill" className="w-4 h-4" />
                                            Chat Now
                                        </a>
                                    </div>
                                </div>

                                {/* Right Form Column */}
                                <div className="lg:col-span-7">
                                    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 md:p-10 shadow-sm relative">
                                        {formSubmitted ? (
                                            <div className="py-12 px-4 text-center space-y-5">
                                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                                    <CheckCircle weight="fill" className="w-10 h-10" />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-2xl font-extrabold text-gray-900">Enquiry Received!</h3>
                                                    <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                                                        Thank you, <span className="font-bold text-gray-900">{formState.name}</span>! We&apos;ve logged your enquiry for <span className="font-semibold text-gray-900">{formState.trek || 'your Himalayan trek'}</span>. Our trek coordinator will connect with you via mobile or email shortly.
                                                    </p>
                                                </div>
                                                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                                                    <a
                                                        href={`https://wa.me/918556043708?text=${encodeURIComponent(`Hi, I just submitted an enquiry on the website. My name is ${formState.name} and I'm interested in ${formState.trek || 'a trek'}.`)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                                                    >
                                                        <WhatsappLogo weight="fill" className="w-5 h-5" />
                                                        Follow Up on WhatsApp
                                                    </a>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormSubmitted(false);
                                                            setFormState({
                                                                name: '',
                                                                mobile: '',
                                                                email: '',
                                                                city: '',
                                                                trek: 'Kedarkantha Trek',
                                                                month: 'October',
                                                                trekkers: '1',
                                                                experience: 'Beginner',
                                                                message: '',
                                                            });
                                                        }}
                                                        className="w-full sm:w-auto text-gray-600 hover:text-gray-900 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                                                    >
                                                        Send Another Inquiry
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmitEnquiry} className="space-y-5">
                                                <div>
                                                    <h3 className="text-xl font-extrabold text-gray-900">Plan Your Himalayan Journey</h3>
                                                    <p className="text-xs text-gray-500 mt-1">Fields marked with <span className="text-red-500">*</span> are required.</p>
                                                </div>

                                                {formError && (
                                                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                                                        <WarningCircle weight="fill" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                                        <span>{formError}</span>
                                                    </div>
                                                )}

                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    {/* Full Name */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Full Name <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={formState.name}
                                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                            placeholder="e.g. Rahul Sharma"
                                                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                                        />
                                                    </div>

                                                    {/* Phone / Mobile */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Phone / WhatsApp <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            required
                                                            value={formState.mobile}
                                                            onChange={(e) => setFormState({ ...formState, mobile: e.target.value })}
                                                            placeholder="e.g. +91 98765 43210"
                                                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    {/* Email */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Email Address <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            required
                                                            value={formState.email}
                                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                            placeholder="e.g. rahul@example.com"
                                                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                                        />
                                                    </div>

                                                    {/* City */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Your City
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={formState.city}
                                                            onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                                                            placeholder="e.g. Delhi, Mumbai, Bengaluru"
                                                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    {/* Trek Selection */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Trek of Interest
                                                        </label>
                                                        <select
                                                            value={formState.trek}
                                                            onChange={(e) => setFormState({ ...formState, trek: e.target.value })}
                                                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all cursor-pointer"
                                                        >
                                                            <option value="Kedarkantha Trek">Kedarkantha Trek</option>
                                                            <option value="Dayara Bugyal Trek">Dayara Bugyal Trek</option>
                                                            <option value="Har Ki Dun Trek">Har Ki Dun Trek</option>
                                                            <option value="Brahmatal Trek">Brahmatal Trek</option>
                                                            <option value="Gidara Bugyal Trek">Gidara Bugyal Trek</option>
                                                            <option value="Kuari Pass Trek">Kuari Pass Trek</option>
                                                            <option value="Roopkund Trek">Roopkund Trek</option>
                                                            <option value="Gomukh Tapovan Trek">Gomukh Tapovan Trek</option>
                                                            <option value="Butter Festival / Anduri Utsav">Butter Festival / Anduri Utsav</option>
                                                            <option value="Custom / Other Himalayan Trek">Custom / Other Himalayan Trek</option>
                                                            <option value="Not Sure Yet (Need Advice)">Not Sure Yet (Need Advice)</option>
                                                        </select>
                                                    </div>

                                                    {/* Preferred Month */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Preferred Month / Time
                                                        </label>
                                                        <select
                                                            value={formState.month}
                                                            onChange={(e) => setFormState({ ...formState, month: e.target.value })}
                                                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all cursor-pointer"
                                                        >
                                                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Flexible / Anytime'].map((m) => (
                                                                <option key={m} value={m}>{m}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    {/* Number of Trekkers */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Number of Trekkers
                                                        </label>
                                                        <select
                                                            value={formState.trekkers}
                                                            onChange={(e) => setFormState({ ...formState, trekkers: e.target.value })}
                                                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all cursor-pointer"
                                                        >
                                                            <option value="1">1 (Solo Trekker)</option>
                                                            <option value="2">2 Trekkers</option>
                                                            <option value="3">3 - 4 Trekkers</option>
                                                            <option value="5">5 - 8 Trekkers</option>
                                                            <option value="10">9+ (Group / Corporate)</option>
                                                        </select>
                                                    </div>

                                                    {/* Experience Level */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Experience Level
                                                        </label>
                                                        <select
                                                            value={formState.experience}
                                                            onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
                                                            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all cursor-pointer"
                                                        >
                                                            <option value="Beginner">Beginner (Never Trekked)</option>
                                                            <option value="Moderate">Moderate (Done 1–2 Treks)</option>
                                                            <option value="Intermediate">Intermediate (Regular Hiker)</option>
                                                            <option value="Experienced">Experienced (High-Altitude Veteran)</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Message / Query */}
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                                                        Message / Special Requirements
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        value={formState.message}
                                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                        placeholder="Tell us about your preferred dates, fitness levels, dietary requirements, or any specific questions..."
                                                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all resize-y"
                                                    />
                                                </div>

                                                {/* Submit Button */}
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <CircleNotch weight="bold" className="w-5 h-5 animate-spin" />
                                                            Sending Enquiry...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <PaperPlaneTilt weight="fill" className="w-5 h-5" />
                                                            Submit Trek Enquiry
                                                        </>
                                                    )}
                                                </button>

                                                <p className="text-center text-[11px] text-gray-500 font-medium">
                                                    🔒 We respect your privacy. No spam. Direct contact from our local mountain team.
                                                </p>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* 3. Talk to a Trek Expert */}
                <section className="bg-gray-50 rounded-3xl p-8 md:p-16 relative overflow-hidden border border-gray-100">
                    <FadeIn>
                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-gray-900">
                                    Not sure which trek is right for you?
                                </h2>
                                <p className="text-xl text-red-600 font-bold mb-8">
                                    Talk to someone who&apos;s actually been there.
                                </p>
                                <div className="space-y-4">
                                    <a href="https://wa.me/918556043708" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-[#25D366]/30 transition-all">
                                        <div className="bg-[#25D366]/10 p-4 rounded-xl text-[#25D366]"><WhatsappLogo weight="fill" className="w-6 h-6" /></div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg">WhatsApp</p>
                                            <p className="text-sm text-gray-500">Quick text response</p>
                                        </div>
                                    </a>
                                    <a href="tel:+918556043708" className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-red-200 transition-all">
                                        <div className="bg-red-50 p-4 rounded-xl text-red-600"><Phone weight="fill" className="w-6 h-6" /></div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg">Call</p>
                                            <p className="text-sm text-gray-500">Speak directly to an expert</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                {/* Placeholder for Trek Expert Photo */}
                                <div className="w-56 h-56 rounded-full overflow-hidden bg-gray-200 mb-6 border-4 border-white shadow-xl relative">
                                     <Image
                                        src="/images/heroji.webp" 
                                        alt="Trek Expert"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-extrabold text-gray-900">Rajan Rawat</h3>
                                <p className="text-red-600 font-bold mt-2 uppercase tracking-widest text-sm bg-red-50 px-4 py-1 rounded-full inline-block">Trek Expert</p>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* 4. WhatsApp-first section & 6. Before you message us */}
                <section className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    <FadeIn>
                        <div className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-gray-900">Planning a trek? <br/>Just message us.</h2>
                            <p className="text-lg text-gray-700 mb-8 font-medium">Tell us your preferred date, budget and experience level. We&apos;ll help you find the right trek.</p>
                            
                            <a href="https://wa.me/918556043708" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 w-full mb-4 text-lg">
                                <WhatsappLogo weight="fill" className="w-8 h-8" />
                                Chat on WhatsApp
                            </a>
                            <p className="text-center text-gray-600 font-bold text-sm tracking-widest uppercase">Typical response: &lt; 10 minutes</p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 h-full shadow-sm">
                            <h3 className="text-2xl font-extrabold tracking-tight mb-6 border-b border-gray-100 pb-4 text-gray-900">Before you message us</h3>
                            <p className="text-gray-600 mb-6 text-lg">To help us recommend the right trek, send:</p>
                            <ul className="space-y-5">
                                {['Number of people', 'Preferred month/date', 'Trekking experience', 'Budget', 'Preferred difficulty'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-lg text-gray-800 font-medium">
                                        <CheckCircle weight="fill" className="text-red-600 w-6 h-6 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>
                </section>

                {/* 5. Contact options */}
                <section>
                    <FadeIn>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center flex flex-col items-center hover:shadow-md transition-shadow">
                                <WhatsappLogo weight="fill" className="w-12 h-12 text-[#25D366] mb-6" />
                                <h3 className="text-xl font-extrabold tracking-tight mb-2 text-gray-900">WhatsApp</h3>
                                <p className="text-gray-500 text-sm mb-6">Fastest way to reach us</p>
                                <p className="font-bold text-lg mt-auto text-gray-900">+91 85560 43708</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center flex flex-col items-center hover:shadow-md transition-shadow">
                                <Phone weight="fill" className="w-12 h-12 text-red-600 mb-6" />
                                <h3 className="text-xl font-extrabold tracking-tight mb-2 text-gray-900">Call Us</h3>
                                <p className="text-gray-500 text-sm mb-6">For detailed trek planning</p>
                                <p className="font-bold text-lg mt-auto text-gray-900">+91 85560 43708</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center flex flex-col items-center hover:shadow-md transition-shadow">
                                <EnvelopeSimple weight="fill" className="w-12 h-12 text-gray-400 mb-6" />
                                <h3 className="text-xl font-extrabold tracking-tight mb-2 text-gray-900">Email</h3>
                                <p className="text-gray-500 text-sm mb-6">For bookings & general queries</p>
                                <p className="font-bold text-lg mt-auto text-gray-900">hikingplanet.official@gmail.com</p>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* 7. Emergency / Existing Booking */}
                <section>
                    <FadeIn>
                        <div className="bg-red-50 border border-red-200 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <WarningCircle weight="fill" className="text-red-600 w-8 h-8" />
                                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Emergency & On-Trek Support</h2>
                                </div>
                                <p className="text-gray-700 font-medium text-lg">Already on a trek? Need urgent assistance? Please have your Booking ID ready.</p>
                            </div>
                            <div className="flex-shrink-0 text-center md:text-right">
                                <p className="text-red-600 font-bold text-sm uppercase tracking-widest mb-2">24/7 Emergency Line</p>
                                <a href="tel:+918556043708" className="text-3xl font-extrabold text-gray-900 hover:text-red-600 transition-colors">+91 85560 43708</a>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* 8. Office / Location */}
                <section className="text-center py-10">
                    <FadeIn>
                        <MapPin weight="fill" className="w-12 h-12 text-red-600 mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-gray-900">We operate from the mountains,</h2>
                        <p className="text-xl text-gray-500 font-medium mb-12">but we&apos;re always one message away.</p>
                        
                        <div className="inline-block text-left bg-white rounded-3xl shadow-lg border border-gray-100 p-10 max-w-md w-full">
                            <h4 className="text-red-600 font-bold text-sm uppercase tracking-widest mb-4 border-b border-gray-100 pb-4">Base Camp / Office</h4>
                            <p className="text-gray-800 leading-relaxed mb-8 text-lg font-medium">
                                Village Raithal<br />
                                Uttarkashi, Uttarakhand<br />
                                India<br/>
                                <br/>
                                <span className="text-gray-500 text-sm uppercase tracking-widest font-bold">Current Office Address:</span><br/>
                                Dehradun, Uttarakhand
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-gray-600 font-medium">
                                    <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center"><Phone className="w-4 h-4 text-gray-900" /></div> +91 85560 43708
                                </div>
                                <div className="flex items-center gap-4 text-gray-600 font-medium">
                                    <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center"><EnvelopeSimple className="w-4 h-4 text-gray-900" /></div> hikingplanet.official@gmail.com
                                </div>
                                <div className="flex items-center gap-4 text-gray-600 font-medium">
                                    <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center"><CalendarCheck className="w-4 h-4 text-gray-900" /></div> Mon–Sat, 9 AM – 7 PM
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* 10. Tell us your adventure */}
                <section id="find-my-trek">
                    <FadeIn>
                        <div className="bg-gray-900 rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/pattern-light.svg')] opacity-5 pointer-events-none" />
                            <div className="relative z-10 max-w-3xl mx-auto text-center">
                                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Tell us your adventure.</h2>
                                <p className="text-xl text-gray-400 font-medium mb-12">We&apos;ll find the perfect trek for you.</p>

                                <form className="space-y-6 text-left" onSubmit={handleFindTrek}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-bold text-gray-400">When do you want to go?</label>
                                            <select 
                                                value={findTrekState.month}
                                                onChange={e => setFindTrekState({...findTrekState, month: e.target.value})}
                                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white focus:border-red-500 focus:bg-white/20 outline-none appearance-none cursor-pointer transition-all"
                                            >
                                                {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                                                    <option key={m} value={m} className="bg-gray-900 text-white">{m}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Your experience?</label>
                                            <select 
                                                value={findTrekState.experience}
                                                onChange={e => setFindTrekState({...findTrekState, experience: e.target.value})}
                                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white focus:border-red-500 focus:bg-white/20 outline-none appearance-none cursor-pointer transition-all"
                                            >
                                                <option className="bg-gray-900 text-white">Beginner (Never trekked)</option>
                                                <option className="bg-gray-900 text-white">Intermediate (1-2 treks)</option>
                                                <option className="bg-gray-900 text-white">Experienced (3+ treks)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Difficulty?</label>
                                            <select 
                                                value={findTrekState.difficulty}
                                                onChange={e => setFindTrekState({...findTrekState, difficulty: e.target.value})}
                                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white focus:border-red-500 focus:bg-white/20 outline-none appearance-none cursor-pointer transition-all"
                                            >
                                                <option className="bg-gray-900 text-white">Easy</option>
                                                <option className="bg-gray-900 text-white">Easy to Moderate</option>
                                                <option className="bg-gray-900 text-white">Moderate</option>
                                                <option className="bg-gray-900 text-white">Moderate to Difficult</option>
                                                <option className="bg-gray-900 text-white">Difficult</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Budget?</label>
                                            <select 
                                                value={findTrekState.budget}
                                                onChange={e => setFindTrekState({...findTrekState, budget: e.target.value})}
                                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white focus:border-red-500 focus:bg-white/20 outline-none appearance-none cursor-pointer transition-all"
                                            >
                                                <option className="bg-gray-900 text-white">₹5k - ₹10k</option>
                                                <option className="bg-gray-900 text-white">₹10k - ₹15k</option>
                                                <option className="bg-gray-900 text-white">₹15k+</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="pt-8 text-center">
                                        <button type="submit" className="bg-red-600 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-red-700 shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-3">
                                            Find My Trek <ArrowRight weight="bold" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* 9. FAQ */}
                <section className="max-w-3xl mx-auto border-t border-gray-200 pt-20">
                    <FadeIn>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-10 text-center text-gray-900">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                    <button 
                                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                                        className="w-full text-left p-6 flex items-center justify-between font-bold text-lg hover:bg-gray-50 transition-colors text-gray-900"
                                    >
                                        {faq.q}
                                        <CaretDown weight="bold" className={`w-6 h-6 text-gray-400 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                                    </button>
                                    {faqOpen === i && (
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </section>

            </div>
        </div>
    );
}
