import { SignJWT, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'secret';
const key = new TextEncoder().encode(SECRET_KEY);

const COOKIE_NAME = 'user_token';

export interface UserTokenPayload {
    id: string;
    email: string;
    name?: string | null;
    isVerified: boolean;
    profileComplete?: boolean;
    age?: number;
    gender?: string;
    emergencyContact?: {
        name: string;
        phone: string;
    };
    medicalNotes?: string;
}

// ── Sign a JWT for a consumer user ───────────────────────────────────────────
export async function signUserJWT(payload: UserTokenPayload, expiresIn: string = '30d') {
    return await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(key);
}

// ── Verify a consumer user JWT ───────────────────────────────────────────────
export async function verifyUserJWT(token: string): Promise<UserTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ['HS256'],
        });
        return payload as unknown as UserTokenPayload;
    } catch (error) {
        return null;
    }
}

// ── Read user session from an incoming request ───────────────────────────────
export async function getUserFromRequest(req: Request): Promise<UserTokenPayload | null> {
    const cookieStr = req.headers.get('cookie') ?? '';
    const match = cookieStr.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
    const token = match?.[1];
    if (!token) return null;
    return await verifyUserJWT(decodeURIComponent(token));
}

// ── Attach user_token cookie to a NextResponse ───────────────────────────────
export async function setUserCookie(response: NextResponse, payload: UserTokenPayload) {
    const token = await signUserJWT(payload);
    
    // Set for 30 days
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);

    response.cookies.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires,
    });
}

// ── Clear user_token cookie ──────────────────────────────────────────────────
export function clearUserCookie(response: NextResponse) {
    response.cookies.delete({
        name: COOKIE_NAME,
        path: '/',
    });
}
