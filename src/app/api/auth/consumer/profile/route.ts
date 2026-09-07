import { NextResponse } from 'next/server';
import { getUserFromRequest, setUserCookie } from '@/lib/userAuth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function PATCH(request: Request) {
    try {
        const payload = await getUserFromRequest(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, age, gender, emergencyContact, medicalNotes } = body;

        // Validation
        if (!name || !age || !emergencyContact?.name || !emergencyContact?.phone) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        await dbConnect();
        const user = await User.findById(payload.id);

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        user.name = name;
        user.age = age;
        user.gender = gender;
        user.emergencyContact = emergencyContact;
        user.medicalNotes = medicalNotes;
        user.profileComplete = true;

        await user.save();

        const response = NextResponse.json({
            success: true,
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                isVerified: user.isVerified,
                profileComplete: user.profileComplete,
                age: user.age,
                gender: user.gender,
                emergencyContact: user.emergencyContact,
                medicalNotes: user.medicalNotes
            }
        });

        // Update the session cookie with new name/profileComplete
        await setUserCookie(response, {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            isVerified: user.isVerified,
            profileComplete: user.profileComplete
        });

        return response;
    } catch (error) {
        console.error('Update Profile Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
