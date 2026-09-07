'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeSlash, GoogleLogo } from '@phosphor-icons/react/dist/ssr';
import { Loader2 } from 'lucide-react';

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/myprofile';

    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [step, setStep] = useState<'creds' | 'otp'>('creds');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-6">
                        <Image
                            src="/images/new_logo.png"
                            alt="HikingPlanet"
                            width={150}
                            height={44}
                            className="h-8 w-auto object-contain mx-auto"
                        />
                    </Link>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                        {step === 'creds' ? (authMode === 'login' ? 'Welcome Back' : 'Create Account') : 'Verify OTP'}
                    </h2>
                    <p className="text-slate-500 text-sm">
                        {step === 'creds' 
                            ? (authMode === 'login' ? 'Sign in to manage your bookings.' : 'Join us to start your adventure.')
                            : `We've sent a 6-digit code to ${email}`
                        }
                    </p>
                </div>

                {step === 'creds' && (
                    <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                        <button 
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'login' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                            onClick={() => { setAuthMode('login'); setError(''); setSuccessMessage(''); }}
                        >
                            Log In
                        </button>
                        <button 
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'register' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                            onClick={() => { setAuthMode('register'); setError(''); setSuccessMessage(''); }}
                        >
                            Sign Up
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}
                
                {successMessage && (
                    <div className="mb-6 bg-green-50 text-green-700 p-3 rounded-xl text-sm font-medium border border-green-100">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={step === 'creds' ? handleSendOtp : handleVerifyOtp} className="space-y-5">
                    {step === 'creds' ? (
                        <>
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

                            <button
                                type="submit"
                                disabled={authLoading || !email || !password}
                                className="w-full bg-[#e30613] hover:bg-[#c10510] text-white font-bold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center mt-6"
                            >
                                {authLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (authMode === 'login' ? 'Send OTP' : 'Create Account')}
                            </button>
                        </>
                    ) : (
                        <>
                            <div>
                                <label htmlFor="otp" className="block text-sm font-bold text-slate-700 mb-1.5 text-center">
                                    Enter 6-digit OTP
                                </label>
                                <input
                                    id="otp"
                                    type="text"
                                    placeholder="000000"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    className="w-full text-center tracking-[0.5em] text-2xl font-mono bg-white border border-gray-200 text-slate-900 placeholder:text-gray-300 py-4 px-4 rounded-xl focus:outline-none focus:border-[#e30613] focus:ring-1 focus:ring-[#e30613] transition-all shadow-sm"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={authLoading || otp.length !== 6}
                                className="w-full bg-[#e30613] hover:bg-[#c10510] text-white font-bold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center mt-6"
                            >
                                {authLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Verify & Continue'}
                            </button>

                            <button
                                type="button"
                                onClick={() => { setStep('creds'); setOtp(''); }}
                                className="w-full mt-4 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                Back to {authMode === 'login' ? 'Login' : 'Sign Up'}
                            </button>
                        </>
                    )}
                </form>

                {step === 'creds' && (
                    <>
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-100"></div>
                            <span className="mx-4 text-xs font-bold tracking-widest text-gray-400 uppercase">OR</span>
                            <div className="flex-grow border-t border-gray-100"></div>
                        </div>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-slate-800 font-bold py-3.5 px-4 rounded-xl hover:bg-slate-50 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613]/50"
                        >
                            <GoogleLogo weight="bold" className="text-slate-700 w-5 h-5" />
                            <span>Continue with Google</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
