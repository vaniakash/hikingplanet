import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IWishlist {
    user: Types.ObjectId;
    trek: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const WishlistSchema = new Schema<IWishlist>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        trek: { type: Schema.Types.ObjectId, ref: 'Trek', required: true },
    },
    { timestamps: true }
);

WishlistSchema.index({ user: 1, trek: 1 }, { unique: true }); // Prevent duplicates

const Wishlist: Model<IWishlist> = mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistSchema);

export default Wishlist;
