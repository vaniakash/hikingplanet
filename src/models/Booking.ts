import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IBooking {
    user?: Types.ObjectId; // Optional if guest checkout allowed
    guestDetails: {
        name: string;
        email: string;
        phone: string;
        age?: number;
        emergencyContact?: string;
    };
    trip: Types.ObjectId;
    trek: Types.ObjectId; // Denormalized for easier querying
    numberOfGuests: number;
    additions: {
        insurance: boolean;
        backpackOffloading: boolean;
    };
    totalAmount: number;
    amountPaid: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'partially_paid';
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
            age: { type: Number },
            emergencyContact: { type: String },
        },
        trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
        trek: { type: Schema.Types.ObjectId, ref: 'Trek', required: true },
        numberOfGuests: { type: Number, required: true, min: 1 },
        additions: {
            insurance: { type: Boolean, default: false },
            backpackOffloading: { type: Boolean, default: false },
        },
        totalAmount: { type: Number, required: true },
        amountPaid: { type: Number, default: 0 },
        status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
        paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'partially_paid'], default: 'pending' },
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
