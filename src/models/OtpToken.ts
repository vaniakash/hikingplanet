import mongoose, { Schema, Model } from 'mongoose';

export interface IOtpToken {
    email: string;
    otp: string;
    createdAt: Date;
}

const OtpTokenSchema = new Schema<IOtpToken>({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 } // TTL 10 minutes (600 seconds)
});

// The expires option tells MongoDB to automatically delete the document after the specified time

const OtpToken: Model<IOtpToken> = mongoose.models.OtpToken || mongoose.model<IOtpToken>('OtpToken', OtpTokenSchema);

export default OtpToken;
