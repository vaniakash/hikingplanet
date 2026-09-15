import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IUser {
    email: string;
    password?: string;
    name?: string;
    profilePicture?: string;
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
    preferences?: {
        difficulty: string[];
        regions: string[];
        duration: string[];
        seasons: string[];
    };
    rewards?: {
        points: number;
        totalTreksCompleted: number;
    };
    referralCode?: string;
    referredBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, select: false },
        name: { type: String },
        profilePicture: { type: String },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        isVerified: { type: Boolean, default: false },
        profileComplete: { type: Boolean, default: false },
        age: { type: Number },
        gender: { type: String },
        emergencyContact: {
            name: { type: String },
            phone: { type: String }
        },
        medicalNotes: { type: String },
        preferences: {
            difficulty: [{ type: String }],
            regions: [{ type: String }],
            duration: [{ type: String }],
            seasons: [{ type: String }]
        },
        rewards: {
            points: { type: Number, default: 0 },
            totalTreksCompleted: { type: Number, default: 0 }
        },
        referralCode: { type: String, unique: true, sparse: true },
        referredBy: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
