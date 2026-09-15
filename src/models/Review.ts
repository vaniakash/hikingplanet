import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IReview {
    user: Types.ObjectId;
    trek: Types.ObjectId;
    rating: number;
    reviewText: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        trek: { type: Schema.Types.ObjectId, ref: 'Trek', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        reviewText: { type: String, required: true },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    },
    { timestamps: true }
);

ReviewSchema.index({ user: 1, trek: 1 }, { unique: true }); // A user can review a trek only once

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
