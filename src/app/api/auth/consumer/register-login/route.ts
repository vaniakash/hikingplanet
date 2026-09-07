import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import OtpToken from '@/models/OtpToken';
import { hashPassword, comparePassword } from '@/lib/auth';
import { sendOtpEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { email, password, action } = await request.json();

        if (!email || !password || !action) {
            return NextResponse.json({ success: false, error: 'Email, password, and action are required' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // 1. Find or create the user
        let user = await User.findOne({ email: normalizedEmail }).select('+password');
        
        if (action === 'register') {
            if (user) {
                return NextResponse.json({ success: false, error: 'Account already exists. Please log in.' }, { status: 409 });
            }
            // New user - sign up flow
            const hashedPassword = await hashPassword(password);
            user = await User.create({
                email: normalizedEmail,
                password: hashedPassword,
                role: 'user',
                isVerified: false,
            });
        } else if (action === 'login') {
            if (!user) {
                return NextResponse.json({ success: false, error: 'Account not found. Please sign up.' }, { status: 404 });
            }
            // Existing user - login flow
            if (!user.password) {
                return NextResponse.json({ success: false, error: 'Account uses OAuth, please login with Google' }, { status: 400 });
            }
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
            }
        } else {
            return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
        }

        // 2. Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 3. Save OTP to DB (upsert if they requested multiple times)
        await OtpToken.findOneAndUpdate(
            { email: normalizedEmail },
            { otp, createdAt: new Date() },
            { upsert: true, new: true }
        );

        // 4. Send OTP via email (with fallback logging for development)
        try {
            await sendOtpEmail(normalizedEmail, otp);
            console.log(`[OTP] Sent to ${normalizedEmail}: ${otp}`);
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // In development, if email fails, we might still want to proceed and check terminal
            if (process.env.NODE_ENV === 'production') {
                return NextResponse.json({ success: false, error: 'Failed to send OTP email' }, { status: 500 });
            }
            console.log(`[DEV MODE] Email failed, but proceeding. Use this OTP from terminal: ${otp}`);
        }

        return NextResponse.json({ success: true, message: 'OTP sent to email' });

    } catch (error: any) {
        console.error('Auth Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
