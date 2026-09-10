import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'admin';
    const callbackUrl = searchParams.get('callbackUrl') || '';
    
    // We can encode both type and callbackUrl in state
    const stateObj = { type, callbackUrl };
    const stateStr = Buffer.from(JSON.stringify(stateObj)).toString('base64');

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback/google`;

    if (!clientId) {
        return NextResponse.json({ error: 'Google Client ID not found' }, { status: 500 });
    }

    const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    const responseType = 'code';

    // Construct Google OAuth URL
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=offline&prompt=consent&state=${stateStr}`;

    return NextResponse.redirect(googleAuthUrl);
}
