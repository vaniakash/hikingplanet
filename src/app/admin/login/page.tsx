'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';

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
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-sm space-y-6 rounded-xl bg-gray-800 p-8 shadow-2xl border border-gray-700">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                    <p className="mt-2 text-sm text-gray-400">Authenticate to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-400 uppercase">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-lg bg-gray-700 border-transparent py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-gray-700 focus:ring-0"
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-400 uppercase">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-lg bg-gray-700 border-transparent py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-gray-700 focus:ring-0"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 text-center border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <a
                        href="/api/auth/google"
                        className="flex w-full items-center justify-center rounded-lg bg-white py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 disabled:opacity-50 gap-2"
                    >
                        <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                            <path
                                d="M12.0003 20.45c4.6669 0 8.1251-3.2916 8.1251-8.3126 0-0.687-.0625-1.2291-.1875-1.75h-7.9376v3.1874h4.7291c-0.2708 1.4792-1.25 3.0209-3.0833 4.25l-.0153 0.1664 2.8986 2.2474 0.2007 0.0202c1.7709-1.625 2.7917-4.0208 2.7917-6.684-0.0001-0.0001 0-0.0002 0-0.0003z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12.0003 24.0001c3.2499 0 5.979-1.0833 7.9686-2.9167l-3.8853-3.0208c-1.0104 0.7083-2.3958 1.1875-4.0833 1.1875-3.3228 0-6.104-2.2084-7.1144-5.2709l-0.1584 0.0135-3.0031 2.3278-0.0402 0.1557c1.9999 4.0208 6.1664 6.7083 11.0003 6.7083z"
                                fill="#34A853"
                            />
                            <path
                                d="M4.8856 13.9792c-0.2604-0.7917-0.4062-1.625-0.4062-2.5001 0-0.875 0.1458-1.7083 0.4062-2.5001l-0.0032-0.1804-3.1235-2.4241-0.1064 0.051C1.0314 7.6459 0.6252 9.2709 0.6252 11.0001c0 1.7292 0.4062 3.3542 1.3437 5.0626l3.2041-2.4876z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12.0003 7.1042c2.1145 0 3.7395 0.9167 4.5 1.625l2.4062-2.4375c-1.7604-1.625-4.3228-2.6666-6.9062-2.6666-4.8339 0-9.0004 2.6875-11.0003 6.7083l3.2917 2.5625c0.9166-2.9583 3.6978-5.1666 7.0208-5.1666z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </a>
                </form>
            </div>
        </div>
    );
}

export default function AdminLogin() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-gray-900"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
            <AdminLoginForm />
        </Suspense>
    );
}
