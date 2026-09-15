'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

// Create a context to share user data across dashboard tabs
export const DashboardContext = createContext<any>(null);

export function useDashboard() {
    return useContext(DashboardContext);
}

export default function MyProfileLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/consumer/me', { cache: 'no-store' });
            const json = await res.json();
            if (json.success && json.user) {
                setUser(json.user);
            } else {
                router.replace('/login?callbackUrl=/myprofile');
            }
        } catch (err) {
            console.error(err);
            router.replace('/login?callbackUrl=/myprofile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-[#e30613]" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <DashboardContext.Provider value={{ user, fetchUser }}>
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
                        <DashboardSidebar user={user} pathname={pathname} />
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </div>
        </DashboardContext.Provider>
    );
}
