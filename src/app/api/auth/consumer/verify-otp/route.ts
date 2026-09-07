import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import OtpToken from '@/models/OtpToken';
import { setUserCookie } from '@/lib/userAuth';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json({ success: false, error: 'Email and OTP are required' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // 1. Verify OTP
        const otpRecord = await OtpToken.findOne({ email: normalizedEmail, otp });
        if (!otpRecord) {
            return NextResponse.json({ success: false, error: 'Invalid or expired OTP' }, { status: 400 });
        }

        // 2. Find User
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        // 3. Mark user as verified
        user.isVerified = true;
        await user.save();

        // 4. Delete the OTP token so it can't be reused
        await OtpToken.deleteOne({ _id: otpRecord._id });

        // 5. Generate and set the session cookie
        const response = NextResponse.json({ 
            success: true, 
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                isVerified: user.isVerified,
                profileComplete: user.profileComplete || false,
                age: user.age,
                gender: user.gender,
                emergencyContact: user.emergencyContact,
                medicalNotes: user.medicalNotes
            } 
        });

        await setUserCookie(response, {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            isVerified: user.isVerified,
            profileComplete: user.profileComplete || false,
            age: user.age,
            gender: user.gender,
            emergencyContact: user.emergencyContact,
            medicalNotes: user.medicalNotes
        });

        return response;

    } catch (error: any) {
        console.error('Verify OTP Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
