import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
    email: string;
    password?: string;
    name?: string;
    role: 'user' | 'admin';
    isVerified: boolean;
    profileComplete: boolean;
    age?: number;
    gender?: string;
    emergencyContact?: {
        name: string;
        phone: string;
    };
    medicalNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, select: false },
        name: { type: String },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        isVerified: { type: Boolean, default: false },
        profileComplete: { type: Boolean, default: false },
        age: { type: Number },
        gender: { type: String },
        emergencyContact: {
            name: { type: String },
            phone: { type: String }
        },
        medicalNotes: { type: String }
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
