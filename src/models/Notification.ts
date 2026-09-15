import mongoose, { Schema, Model, Types } from 'mongoose';

export interface INotification {
    user: Types.ObjectId;
    title: string;
    message: string;
    type: 'booking' | 'payment' | 'reminder' | 'system';
    read: boolean;
    relatedId?: Types.ObjectId; // E.g. Booking ID or Trek ID
    createdAt: Date;
    updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        message: { type: String, required: true },
        type: { type: String, enum: ['booking', 'payment', 'reminder', 'system'], default: 'system' },
        read: { type: Boolean, default: false },
        relatedId: { type: Schema.Types.ObjectId },
    },
    { timestamps: true }
);

const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
