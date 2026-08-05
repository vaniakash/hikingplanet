import mongoose, { Schema, Model, Types } from 'mongoose';

export interface ITrip {
    trek: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    capacity: number;
    seatsBooked: number;
    waitlistCount: number;
    status: 'open' | 'full' | 'completed' | 'cancelled';
    priceOverride?: number; // If this specific date has a different price
    label?: string; // Optional badge e.g. "Family Trek with Children"
}

const TripSchema = new Schema<ITrip>(
    {
        trek: { type: Schema.Types.ObjectId, ref: 'Trek', required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        capacity: { type: Number, required: true, default: 15 },
        seatsBooked: { type: Number, default: 0 },
        waitlistCount: { type: Number, default: 0 },
        status: { type: String, enum: ['open', 'full', 'completed', 'cancelled'], default: 'open' },
        priceOverride: { type: Number },
        label: { type: String }, // e.g. "Family Trek with Children"
    },
    { timestamps: true }
);

// Index to find trips for a trek easily
TripSchema.index({ trek: 1, startDate: 1 });

const Trip: Model<ITrip> = mongoose.models.Trip || mongoose.model<ITrip>('Trip', TripSchema);

export default Trip;
