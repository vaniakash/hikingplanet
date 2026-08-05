'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import AdminShell from '@/components/admin/AdminShell';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Don't apply admin shell to login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <ThemeProvider>
            <AdminShell>
                {children}
            </AdminShell>
        </ThemeProvider>
    );
}
