import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { signJWT } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
            return NextResponse.redirect(new URL(`/admin/login?error=GoogleAuthFailed`, request.url));
        }

        if (!code) {
            return NextResponse.json({ error: 'Authorization code missing' }, { status: 400 });
        }

        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback/google`;

        // 1. Exchange Code for Tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: clientId!,
                client_secret: clientSecret!,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            console.error('Token Exchange Error:', tokenData);
            return NextResponse.redirect(new URL(`/admin/login?error=TokenExchangeFailed`, request.url));
        }

        // 2. Get User Info
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        const userData = await userResponse.json();

        if (!userData.email) {
            return NextResponse.redirect(new URL(`/admin/login?error=NoEmail`, request.url));
        }

        // 3. Verify User in Database
        await dbConnect();
        const user = await User.findOne({ email: userData.email });

        // SECURITY: Only allow login if user ALREADY exists (Admin must be seeded or created manually first)
        if (!user) {
            return NextResponse.redirect(new URL(`/admin/login?error=AccessDenied_UserNotFound`, request.url));
        }

        if (user.role !== 'admin') {
            return NextResponse.redirect(new URL(`/admin/login?error=AccessDenied_NotAdmin`, request.url));
        }

        // 4. Create Session
        const token = await signJWT({
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name || userData.name
        }, '7d'); // 7 days session

        // 5. Set Cookie & Redirect
        const response = NextResponse.redirect(new URL('/admin', request.url));
        response.cookies.set({
            name: 'admin_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;

    } catch (error: any) {
        console.error('Callback Error:', error);
        return NextResponse.redirect(new URL(`/admin/login?error=CallbackInternalError`, request.url));
    }
}
