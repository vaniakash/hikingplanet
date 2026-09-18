import mongoose, { Schema, Model } from 'mongoose';

export interface ITrek {
    title: string;
    slug: string; // URL friendly ID
    location: string;
    description: string;
    shortDescription?: string;
    highlights?: { title: string; description: string }[];
    difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Expert';
    duration: number; // Days
    price: number;
    originalPrice?: number; // For strikethrough/discount
    elevation?: string; // Max altitude
    bestTime?: string[]; // Array of months
    images: string[];
    itinerary: { day: number; title: string; description: string; distance?: string; durationInfo?: string }[];
    detailedItinerary?: { day: number; title: string; driveDuration?: string; trekDuration?: string; trekDistance?: string; altitude?: string; ascent?: string; waterSources?: string; description?: string; images?: string[] }[];
    inclusions?: string[];
    exclusions?: string[];
    feeDetails?: { name: string; amount: number; type: 'fixed' | 'percent' }[];
    addOns?: { name: string; price: number; description: string; mandatory: boolean }[];
    routeMap?: string;
    // Snapshot Fields
    ageRequirement?: string;
    startingPoint?: string;
    accommodationType?: string;
    fitnessBenchmark?: string;
    assemblyPoint?: string;
    returnPoint?: string;
    gearSupport?: string;
    storageFacility?: string;
    backpackAssist?: string;
    isFeatured?: boolean;
    isActive?: boolean;
    // Complete Trek Information accordions (indiahikes-style)
    infoIntro?: string; // Admin-editable intro paragraph
    infoSections?: { title: string; subtitle: string; content: string; imageUrl?: string }[];
    difficultyDetails?: {
        level: string;
        description: string;
        terrain?: string;
        weather?: string;
        altitude?: string;
        safety?: string;
    };
    bestSeasonDetails?: {
        seasonName: string;
        temperature: string;
        weather: string;
        warmLayers: string;
        description: string;
    }[];
}

const TrekSchema = new Schema<ITrek>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        shortDescription: { type: String },
        highlights: [
            {
                title: { type: String },
                description: { type: String },
            }
        ],
        difficulty: { type: String, enum: ['Easy', 'Moderate', 'Difficult', 'Expert'], required: true },
        duration: { type: Number, required: true },
        price: { type: Number, required: true },
        originalPrice: { type: Number },
        elevation: { type: String },
        bestTime: [{ type: String }], // e.g. ["May", "June"]
        images: [{ type: String }],
        // Structured Itinerary
        itinerary: [
            {
                day: { type: Number },
                title: { type: String },
                description: { type: String },
                distance: { type: String },
                durationInfo: { type: String },
            },
        ],
        detailedItinerary: [
            {
                day: { type: Number },
                title: { type: String },
                driveDuration: { type: String },
                trekDuration: { type: String },
                trekDistance: { type: String },
                altitude: { type: String },
                ascent: { type: String },
                waterSources: { type: String },
                description: { type: String },
                images: [{ type: String }],
            },
        ],
        routeMap: { type: String },
        inclusions: [{ type: String }],
        exclusions: [{ type: String }],
        // Pricing Details
        feeDetails: [{
            name: { type: String },
            amount: { type: Number, default: 0 },
            type: { type: String, default: 'fixed' } // fixed, percent
        }],
        addOns: [{
            name: { type: String },
            price: { type: Number },
            description: { type: String },
            mandatory: { type: Boolean, default: false }
        }],

        // Snapshot Fields
        ageRequirement: { type: String },
        startingPoint: { type: String },
        accommodationType: { type: String },
        fitnessBenchmark: { type: String },
        assemblyPoint: { type: String },
        returnPoint: { type: String },
        gearSupport: { type: String },
        storageFacility: { type: String },
        backpackAssist: { type: String },

        isFeatured: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        // Complete Trek Information
        infoIntro: { type: String, default: '' },
        infoSections: [
            {
                title: { type: String, required: true },
                subtitle: { type: String, default: '' },
                content: { type: String, default: '' },
                imageUrl: { type: String, default: '' },
            },
        ],
        difficultyDetails: {
            level: { type: String },
            description: { type: String },
            terrain: { type: String },
            weather: { type: String },
            altitude: { type: String },
            safety: { type: String },
        },
        bestSeasonDetails: [
            {
                seasonName: { type: String },
                temperature: { type: String },
                weather: { type: String },
                warmLayers: { type: String },
                description: { type: String },
            }
        ],
    },
    { timestamps: true }
);

// Prevent Mongoose OverwriteModelError in development (Hot Reload fix)
if (process.env.NODE_ENV !== 'production') {
    delete mongoose.models.Trek;
}

const Trek: Model<ITrek> = mongoose.models.Trek || mongoose.model<ITrek>('Trek', TrekSchema);

export default Trek;
