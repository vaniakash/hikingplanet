'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, Loader2, Target, Activity, Clock, Map } from 'lucide-react';

// Custom SVG Topography Component
const TopographicBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 mix-blend-screen">
    <svg 
      className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-[spin_240s_linear_infinite] origin-center opacity-30" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 800 800"
    >
      <defs>
        <pattern id="topography" width="200" height="200" patternUnits="userSpaceOnUse">
           <path d="M 0,100 Q 50,50 100,100 T 200,100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/20" />
           <path d="M 0,120 Q 50,70 100,120 T 200,120" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/10" />
           <path d="M 0,140 Q 50,90 100,140 T 200,140" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/10" />
           <path d="M 0,160 Q 50,110 100,160 T 200,160" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/10" />
           
           <path d="M 0,80 Q 50,30 100,80 T 200,80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/10" />
           <path d="M 0,60 Q 50,10 100,60 T 200,60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/10" />
           
           <circle cx="150" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/30" />
           <circle cx="150" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/20" />
           <circle cx="150" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/10" />
           <circle cx="150" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topography)" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f16] via-[#0a0f16]/90 to-transparent" />
  </div>
);

function AdminLoginForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(searchParams.get('error') || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            router.push('/admin');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#0a0f16] text-slate-300 font-sans flex items-center justify-center overflow-hidden">
            {/* Topographic Background */}
            <TopographicBackground />
            
            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                
                {/* Left Side: Login Form (approx 40%) */}
                <div className="col-span-1 lg:col-span-5 w-full max-w-md mx-auto lg:mx-0">
                    <div className="bg-[#0f1722]/80 backdrop-blur-md border border-slate-800/60 p-8 rounded-sm shadow-2xl relative">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500/50" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/50" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500/50" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500/50" />

                        <div className="mb-10 text-left">
                            <h1 className="text-xl tracking-[0.2em] font-light text-slate-100 uppercase mb-2">Expedition Control</h1>
                            <div className="h-px w-12 bg-emerald-500/50 mb-4" />
                            <p className="text-xs tracking-widest text-slate-500 uppercase">Secure Authentication Required</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] tracking-widest text-slate-400 uppercase">Operator ID (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-[#0a0f16] border border-slate-800 rounded-none py-3 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-700 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all outline-none"
                                        placeholder="admin@hikingplanet.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] tracking-widest text-slate-400 uppercase">Security Clearance (Password)</label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-[#0a0f16] border border-slate-800 rounded-none py-3 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-700 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-950/30 border border-red-900/50 p-3 text-xs tracking-wide text-red-400 text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-100 hover:bg-white text-[#0a0f16] font-medium tracking-widest text-xs uppercase py-4 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Initialize Uplink'}
                            </button>

                            <div className="flex items-center gap-4 py-2">
                                <div className="flex-1 h-px bg-slate-800" />
                                <span className="text-[10px] tracking-widest text-slate-600 uppercase">Alternate</span>
                                <div className="flex-1 h-px bg-slate-800" />
                            </div>

                            <a
                                href="/api/auth/google"
                                className="flex w-full items-center justify-center border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 py-3 text-xs tracking-widest font-medium text-slate-300 transition-colors disabled:opacity-50 gap-3 uppercase"
                            >
                                <svg className="h-4 w-4 opacity-80" aria-hidden="true" viewBox="0 0 24 24">
                                    <path d="M12.0003 20.45c4.6669 0 8.1251-3.2916 8.1251-8.3126 0-0.687-.0625-1.2291-.1875-1.75h-7.9376v3.1874h4.7291c-0.2708 1.4792-1.25 3.0209-3.0833 4.25l-.0153 0.1664 2.8986 2.2474 0.2007 0.0202c1.7709-1.625 2.7917-4.0208 2.7917-6.684-0.0001-0.0001 0-0.0002 0-0.0003z" fill="#fff" />
                                    <path d="M12.0003 24.0001c3.2499 0 5.979-1.0833 7.9686-2.9167l-3.8853-3.0208c-1.0104 0.7083-2.3958 1.1875-4.0833 1.1875-3.3228 0-6.104-2.2084-7.1144-5.2709l-0.1584 0.0135-3.0031 2.3278-0.0402 0.1557c1.9999 4.0208 6.1664 6.7083 11.0003 6.7083z" fill="#fff" />
                                    <path d="M4.8856 13.9792c-0.2604-0.7917-0.4062-1.625-0.4062-2.5001 0-0.875 0.1458-1.7083 0.4062-2.5001l-0.0032-0.1804-3.1235-2.4241-0.1064 0.051C1.0314 7.6459 0.6252 9.2709 0.6252 11.0001c0 1.7292 0.4062 3.3542 1.3437 5.0626l3.2041-2.4876z" fill="#fff" />
                                    <path d="M12.0003 7.1042c2.1145 0 3.7395 0.9167 4.5 1.625l2.4062-2.4375c-1.7604-1.625-4.3228-2.6666-6.9062-2.6666-4.8339 0-9.0004 2.6875-11.0003 6.7083l3.2917 2.5625c0.9166-2.9583 3.6978-5.1666 7.0208-5.1666z" fill="#fff" />
                                </svg>
                                Standard SSO
                            </a>
                        </form>
                    </div>
                </div>

                {/* Right Side: Environment / System Info (approx 60%) */}
                <div className="hidden lg:flex col-span-7 flex-col justify-center items-end text-right space-y-16 pl-12 border-r border-slate-800/30 pr-8">
                    
                    {/* Status Indicator */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-end gap-3">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-emerald-500/80">System Status</span>
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </div>
                        </div>
                        <p className="text-2xl font-light tracking-widest text-slate-200">OPERATIONAL</p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                        {/* Active Expeditions */}
                        <div className="space-y-3">
                            <div className="flex justify-end text-slate-500">
                                <Target className="w-5 h-5 opacity-50" />
                            </div>
                            <div>
                                <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase block mb-1">Active Expeditions</span>
                                <span className="text-3xl font-light tracking-wider text-slate-200">12</span>
                            </div>
                        </div>

                        {/* Trekkers on Route */}
                        <div className="space-y-3">
                            <div className="flex justify-end text-slate-500">
                                <Activity className="w-5 h-5 opacity-50" />
                            </div>
                            <div>
                                <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase block mb-1">Trekkers on Route</span>
                                <span className="text-3xl font-light tracking-wider text-slate-200">48</span>
                            </div>
                        </div>

                        {/* Coordinates */}
                        <div className="space-y-3">
                            <div className="flex justify-end text-slate-500">
                                <Map className="w-5 h-5 opacity-50" />
                            </div>
                            <div>
                                <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase block mb-1">HQ Coordinates</span>
                                <span className="text-sm tracking-[0.1em] font-mono text-slate-300">LAT 30.73° N</span>
                                <span className="text-sm tracking-[0.1em] font-mono text-slate-300 block">LON 79.06° E</span>
                            </div>
                        </div>

                        {/* Last Sync */}
                        <div className="space-y-3">
                            <div className="flex justify-end text-slate-500">
                                <Clock className="w-5 h-5 opacity-50" />
                            </div>
                            <div>
                                <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase block mb-1">Last Sync</span>
                                <span className="text-sm tracking-[0.1em] font-mono text-slate-300">Just now</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            {/* Minimal Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-20" />
        </div>
    );
}

export default function AdminLogin() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#0a0f16]"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>}>
            <AdminLoginForm />
        </Suspense>
    );
}
