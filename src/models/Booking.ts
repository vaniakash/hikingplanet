import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IBooking {
    user?: Types.ObjectId; // Optional if guest checkout allowed
    guestDetails: {
        name: string;
        email: string;
        phone: string;
    };
    trip: Types.ObjectId;
    trek: Types.ObjectId; // Denormalized for easier querying
    numberOfGuests: number;
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'failed'; // 'refunded' removed as per code edit
    paymentDetails?: {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature?: string;
    };
}

const BookingSchema = new Schema<IBooking>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        guestDetails: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
        },
        trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
        trek: { type: Schema.Types.ObjectId, ref: 'Trek', required: true },
        numberOfGuests: { type: Number, required: true, min: 1 },
        totalAmount: { type: Number, required: true },
        status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
        paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }, // 'refunded' removed as per code edit
        paymentDetails: {
            razorpayOrderId: { type: String },
            razorpayPaymentId: { type: String },
            razorpaySignature: { type: String },
        },
    },
    { timestamps: true }
);

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
