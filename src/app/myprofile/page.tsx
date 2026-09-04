'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeSlash, GoogleLogo, CheckCircle } from '@phosphor-icons/react/dist/ssr';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Login logic would go here
        console.log("Login with", { email, password, rememberMe });
    };

    return (
        <div className="min-h-screen flex font-sans bg-white selection:bg-[#e30613]/20">
            {/* ── LEFT PANEL (Brand / Value Prop) ── */}
            <div className="hidden md:flex md:w-1/2 bg-[#0B132B] relative flex-col justify-between p-12 lg:p-16 overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
                    {/* Subtle glow / gradient */}
                    <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#e30613] blur-[150px] opacity-20" />
                    <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-900 blur-[150px] opacity-30" />
                </div>

                <div className="relative z-10">
                    {/* Logo */}
                    <Link href="/" className="inline-block mb-16 lg:mb-24">
                        <Image
                            src="/images/new_logo.png"
                            alt="HikingPlanet"
                            width={180}
                            height={52}
                            className="h-10 lg:h-12 w-auto object-contain brightness-0 invert"
                        />
                    </Link>

                    {/* Headline & Subheadline */}
                    <div className="max-w-lg">
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
                            Your Next Adventure <br />
                            <span className="text-[#e30613]">Starts Here.</span>
                        </h1>
                        <p className="text-white/70 text-lg lg:text-xl font-medium mb-12 max-w-md leading-relaxed">
                            Discover, book, and manage your Himalayan treks seamlessly on India&apos;s most trusted platform.
                        </p>

                        {/* Benefits list */}
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <div className="mt-1">
                                    <CheckCircle weight="fill" className="text-[#e30613] w-6 h-6" />
                                </div>
                                <span className="text-white/90 font-medium text-base lg:text-lg">Discover treks that match your experience</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1">
                                    <CheckCircle weight="fill" className="text-[#e30613] w-6 h-6" />
                                </div>
                                <span className="text-white/90 font-medium text-base lg:text-lg">Easy & secure trek bookings</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1">
                                    <CheckCircle weight="fill" className="text-[#e30613] w-6 h-6" />
                                </div>
                                <span className="text-white/90 font-medium text-base lg:text-lg">Expert support before and during your trek</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Trust Line */}
                <div className="relative z-10 flex items-center gap-4 mt-16 pt-8 border-t border-white/10">
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full border-2 border-[#0B132B] bg-slate-200 overflow-hidden relative">
                            {/* Placeholder avatars since we might not have real ones */}
                            <div className="w-full h-full bg-slate-300"></div>
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-[#0B132B] bg-slate-400 overflow-hidden relative">
                            <div className="w-full h-full bg-slate-400"></div>
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-[#0B132B] bg-slate-500 overflow-hidden relative">
                            <div className="w-full h-full bg-slate-500"></div>
                        </div>
                    </div>
                    <span className="text-white/60 text-sm font-semibold tracking-wide">
                        Trusted by thousands of trekkers
                    </span>
                </div>
            </div>

            {/* ── RIGHT PANEL (Login Form) ── */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-12 relative">
                {/* Mobile Top Nav / Logo */}
                <div className="md:hidden absolute top-6 left-6">
                    <Link href="/">
                        <Image
                            src="/images/new_logo.png"
                            alt="HikingPlanet"
                            width={150}
                            height={44}
                            className="h-8 w-auto object-contain"
                        />
                    </Link>
                </div>

                <div className="w-full max-w-md mx-auto mt-12 md:mt-0">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome back</h2>
                        <p className="text-slate-500 font-medium">Sign in to continue your adventure.</p>
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-slate-800 font-bold py-3.5 px-4 rounded-xl hover:bg-slate-50 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613]/50"
                    >
                        <GoogleLogo weight="bold" className="text-slate-700 w-5 h-5" />
                        <span>Continue with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-8">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="mx-4 text-xs font-bold tracking-widest text-gray-400 uppercase">OR</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-gray-200 text-slate-900 placeholder:text-gray-400 text-sm py-3.5 px-4 rounded-xl focus:outline-none focus:border-[#e30613] focus:ring-1 focus:ring-[#e30613] transition-all shadow-sm"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white border border-gray-200 text-slate-900 placeholder:text-gray-400 text-sm py-3.5 pl-4 pr-12 rounded-xl focus:outline-none focus:border-[#e30613] focus:ring-1 focus:ring-[#e30613] transition-all shadow-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-700 focus:outline-none p-1 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeSlash weight="bold" size={20} />
                                    ) : (
                                        <Eye weight="bold" size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between pt-1 pb-4">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-[#e30613] focus:ring-[#e30613] cursor-pointer"
                                    />
                                </div>
                                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                                    Remember me
                                </span>
                            </label>

                            <Link
                                href="#"
                                className="text-sm font-bold text-slate-600 hover:text-[#e30613] transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#e30613] text-white font-black text-base py-4 rounded-xl shadow-lg shadow-[#e30613]/20 hover:bg-[#c10510] hover:shadow-[#e30613]/40 transition-all hover:-translate-y-0.5"
                        >
                            Sign in &rarr;
                        </button>
                    </form>

                    {/* Bottom Links */}
                    <div className="mt-10 text-center space-y-6">
                        <p className="text-sm font-medium text-slate-600">
                            Don&apos;t have an account?{' '}
                            <Link href="#" className="text-slate-900 font-bold hover:text-[#e30613] transition-colors">
                                Sign up
                            </Link>
                        </p>

                        <div>
                            <Link
                                href="/"
                                className="text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center gap-1"
                            >
                                &larr; Back to homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
