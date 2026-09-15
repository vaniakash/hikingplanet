import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/userAuth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function PUT(request: Request) {
    try {
        const payload = await getUserFromRequest(request);
        if (!payload) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, age, gender, emergencyContactName, emergencyContactPhone, medicalNotes, profilePicture } = body;

        await dbConnect();

        const user = await User.findById(payload.id);
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        if (name) user.name = name;
        if (profilePicture) user.profilePicture = profilePicture;
        if (age) user.age = parseInt(age);
        if (gender) user.gender = gender;
        
        user.emergencyContact = {
            name: emergencyContactName || user.emergencyContact?.name || '',
            phone: emergencyContactPhone || user.emergencyContact?.phone || ''
        };
        
        if (medicalNotes !== undefined) user.medicalNotes = medicalNotes;

        user.profileComplete = !!(user.name && user.age && user.gender && user.emergencyContact?.name && user.emergencyContact?.phone);

        await user.save();

        return NextResponse.json({ success: true, message: 'Profile updated' });
    } catch (error) {
        console.error('Update Profile Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
