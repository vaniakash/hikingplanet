import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth';

// Paths that do not require authentication even under /admin
const publicAdminPaths = ['/admin/login'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check if we are in the admin section
    if (pathname.startsWith('/admin')) {

        // 2. Allow access to public admin paths (login)
        if (publicAdminPaths.some((path) => pathname.startsWith(path))) {
            return NextResponse.next();
        }

        // 3. Verify Token
        const token = request.cookies.get('admin_token')?.value;

        // If no token, redirect to login
        if (!token) {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        // Verify validity using jose (Edge compatible)
        const payload = await verifyJWT(token);

        if (!payload || payload.role !== 'admin') {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        // Token is valid, proceed
        return NextResponse.next();
    }

    // Continue for non-admin routes
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
