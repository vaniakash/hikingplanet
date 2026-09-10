'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeSlash, GoogleLogo, EnvelopeSimple, LockKey, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { Loader2 } from 'lucide-react';

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/myprofile';

    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [step, setStep] = useState<'creds' | 'otp'>('creds');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        // If already logged in, redirect away
        fetch('/api/auth/consumer/me', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.user) {
                    router.replace(callbackUrl);
                } else {
                    setCheckingAuth(false);
                }
            })
            .catch(() => setCheckingAuth(false));
    }, [router, callbackUrl]);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (authMode === 'register' && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setAuthLoading(true);
        try {
            const res = await fetch('/api/auth/consumer/register-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, action: authMode }),
            });
            const data = await res.json();
            if (data.success) {
                setStep('otp');
                setSuccessMessage(data.message || 'OTP sent successfully!');
            } else {
                setError(data.error || 'Authentication failed');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setAuthLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setAuthLoading(true);
        try {
            const res = await fetch('/api/auth/consumer/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();
            if (data.success) {
                router.push(callbackUrl);
                router.refresh();
            } else {
                setError(data.error || 'Invalid OTP');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setAuthLoading(false);
        }
    };

    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
                <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
            </div>
        );
    }

    const toggleMode = () => {
        setAuthMode(authMode === 'login' ? 'register' : 'login');
        setError('');
        setSuccessMessage('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="min-h-screen flex w-full bg-[#09090b]">
            {/* Left Panel - Hidden on small screens */}
            <div className="hidden lg:flex flex-col flex-1 bg-black text-white p-12 lg:p-20 justify-between border-r border-gray-900">
                <div>
                    <Link href="/" className="inline-block mb-16">
                        <Image
                            src="/images/new_logo.png"
                            alt="HikingPlanet"
                            width={180}
                            height={52}
                            className="h-10 w-auto object-contain brightness-0 invert"
                        />
                    </Link>
                    
                    <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
                        Explore.<br/>
                        Discover.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e30613] to-orange-500">Adventure.</span>
                    </h1>
                    
                    <p className="text-gray-400 text-lg mb-12 max-w-md">
                        The all-in-one platform for booking your next epic trek — discover hidden trails, book verified guides, and join a passionate community.
                    </p>

                    <ul className="space-y-4">
                        {[
                            'Discover and book 500+ verified treks',
                            'Expert local guides and complete safety',
                            'Join an exclusive community of adventurers'
                        ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-300">
                                <div className="bg-[#e30613]/20 rounded-full p-1">
                                    <CheckCircle weight="fill" className="w-5 h-5 text-[#e30613]" />
                                </div>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="flex items-center gap-4 pt-12 border-t border-gray-900">
                    <div className="flex -space-x-3">
                        {/* Dummy avatars for social proof */}
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border-2 border-black overflow-hidden flex items-center justify-center text-xs font-bold text-gray-400">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Trusted by 10,000+ trekkers worldwide</p>
                </div>
            </div>

            {/* Right Panel - Auth Form */}
            <div className="flex-1 flex flex-col justify-center items-center bg-[#09090b] text-white p-6 sm:p-12">
                <div className="w-full max-w-[440px]">
                    <div className="mb-8 text-center lg:text-left">
                        {/* Show logo on mobile only */}
                        <Link href="/" className="inline-block mb-8 lg:hidden">
                            <Image
                                src="/images/new_logo.png"
                                alt="HikingPlanet"
                                width={150}
                                height={44}
                                className="h-8 w-auto object-contain brightness-0 invert mx-auto"
                            />
                        </Link>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">
                            {step === 'creds' ? (authMode === 'login' ? 'Welcome back' : 'Create an account') : 'Verify OTP'}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            {step === 'creds' 
                                ? (authMode === 'login' ? 'Sign in to continue your adventure.' : 'Join us to start booking treks.')
                                : `We've sent a 6-digit code to ${email}`
                            }
                        </p>
                    </div>

                    <div className="bg-[#111111] border border-[#222] rounded-2xl p-6 sm:p-8 shadow-2xl">
                        {step === 'creds' && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        window.location.href = `/api/auth/google?type=consumer&callbackUrl=${encodeURIComponent(callbackUrl)}`;
                                    }}
                                    className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-3.5 px-4 rounded-xl hover:bg-gray-100 transition-all focus:outline-none mb-6"
                                >
                                    <GoogleLogo weight="bold" className="w-5 h-5" />
                                    <span>Continue with Google</span>
                                </button>

                                <div className="flex items-center mb-6">
                                    <div className="flex-grow border-t border-[#333]"></div>
                                    <span className="mx-4 text-xs font-bold tracking-widest text-gray-500 uppercase">OR</span>
                                    <div className="flex-grow border-t border-[#333]"></div>
                                </div>
                            </>
                        )}

                        {error && (
                            <div className="mb-6 bg-red-500/10 text-red-500 p-3 rounded-xl text-sm font-medium border border-red-500/20">
                                {error}
                            </div>
                        )}
                        
                        {successMessage && (
                            <div className="mb-6 bg-green-500/10 text-green-500 p-3 rounded-xl text-sm font-medium border border-green-500/20">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={step === 'creds' ? handleSendOtp : handleVerifyOtp} className="space-y-5">
                            {step === 'creds' ? (
                                <>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                                            Email address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <EnvelopeSimple className="w-5 h-5 text-gray-500" />
                                            </div>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-[#1a1a1a] border border-[#333] text-white placeholder:text-gray-600 text-sm py-3.5 pl-11 pr-4 rounded-xl focus:outline-none focus:border-[#e30613] focus:ring-1 focus:ring-[#e30613] transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <LockKey className="w-5 h-5 text-gray-500" />
                                            </div>
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-[#1a1a1a] border border-[#333] text-white placeholder:text-gray-600 text-sm py-3.5 pl-11 pr-12 rounded-xl focus:outline-none focus:border-[#e30613] focus:ring-1 focus:ring-[#e30613] transition-all"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none p-1 transition-colors"
                                            >
                                                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {authMode === 'register' && (
                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <LockKey className="w-5 h-5 text-gray-500" />
                                                </div>
                                                <input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="Confirm your password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="w-full bg-[#1a1a1a] border border-[#333] text-white placeholder:text-gray-600 text-sm py-3.5 pl-11 pr-12 rounded-xl focus:outline-none focus:border-[#e30613] focus:ring-1 focus:ring-[#e30613] transition-all"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none p-1 transition-colors"
                                                >
                                                    {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {authMode === 'login' && (
                                        <div className="flex items-center justify-between mt-2">
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#e30613] focus:ring-[#e30613] focus:ring-offset-gray-900 cursor-pointer" />
                                                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                                            </label>
                                            <button type="button" className="text-sm text-gray-400 hover:text-white transition-colors">
                                                Forgot password?
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={authLoading || !email || !password || (authMode === 'register' && !confirmPassword)}
                                        className="w-full bg-gradient-to-r from-[#e30613] to-orange-500 hover:from-[#c10510] hover:to-orange-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(227,6,19,0.3)] hover:shadow-[0_0_25px_rgba(227,6,19,0.5)] flex justify-center items-center mt-6 disabled:opacity-50"
                                    >
                                        {authLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (authMode === 'login' ? 'Sign in' : 'Create account')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2 text-center">
                                            Enter 6-digit OTP
                                        </label>
                                        <input
                                            id="otp"
                                            type="text"
                                            placeholder="000000"
                                            maxLength={6}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                            className="w-full text-center tracking-[0.5em] text-2xl font-mono bg-[#1a1a1a] border border-[#333] text-white placeholder:text-gray-600 py-4 px-4 rounded-xl focus:outline-none focus:border-[#e30613] focus:ring-1 focus:ring-[#e30613] transition-all"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={authLoading || otp.length !== 6}
                                        className="w-full bg-gradient-to-r from-[#e30613] to-orange-500 hover:from-[#c10510] hover:to-orange-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(227,6,19,0.3)] hover:shadow-[0_0_25px_rgba(227,6,19,0.5)] flex justify-center items-center mt-6 disabled:opacity-50"
                                    >
                                        {authLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Verify & Continue'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => { setStep('creds'); setOtp(''); }}
                                        className="w-full mt-4 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                    >
                                        Back
                                    </button>
                                </>
                            )}
                        </form>
                    </div>

                    {step === 'creds' && (
                        <div className="mt-8 text-center text-sm text-gray-400">
                            {authMode === 'login' ? (
                                <>
                                    Don&apos;t have an account?{' '}
                                    <button onClick={toggleMode} className="text-white font-bold hover:underline">
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button onClick={toggleMode} className="text-white font-bold hover:underline">
                                        Sign in
                                    </button>
                                </>
                            )}
                            <div className="mt-4">
                                <Link href="/" className="text-gray-500 hover:text-gray-300 flex items-center justify-center gap-1">
                                    <span aria-hidden="true">&larr;</span> Back to homepage
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
                <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
