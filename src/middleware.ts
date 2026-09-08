import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth';

const publicAdminPaths = ['/admin/login'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ── Admin protection ──────────────────────────────────────────────────────
    if (pathname.startsWith('/admin')) {
        if (publicAdminPaths.some((path) => pathname.startsWith(path))) {
            return NextResponse.next();
        }

        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        const payload = await verifyJWT(token);
        if (!payload || payload.role !== 'admin') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
