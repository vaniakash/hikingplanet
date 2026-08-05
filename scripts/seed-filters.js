
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Define Schema for writing
const TrekSchema = new mongoose.Schema({
    title: String,
    slug: { type: String, unique: true },
    description: String,
    shortDescription: String,
    images: [String],
    price: Number,
    difficulty: String,
    duration: Number,
    location: String,
    elevation: String,
    bestTime: [String], // Array of seasons: 'summer', 'winter', etc.
    highlights: [String],
    itinerary: [Object], // Simplified
    included: [String],
    excluded: [String],
}, { timestamps: true });

const Trek = mongoose.models.Trek || mongoose.model('Trek', TrekSchema);

const newTreks = [
    {
        title: "Valley of Flowers",
        slug: "valley-of-flowers",
        description: "A UNESCO World Heritage site known for its meadows of endemic alpine flowers and the variety of flora.",
        shortDescription: "A fairy-tale valley exploding with colors and fragrances.",
        images: ["https://images.unsplash.com/photo-1588392382834-a891154bca4d?q=80&w=2676&auto=format&fit=crop"],
        price: 12500,
        difficulty: "Moderate",
        duration: 6,
        location: "Chamoli, Uttarakhand",
        elevation: "12,000 ft",
        bestTime: ["summer", "monsoon"],
        highlights: ["Rare Himalayan Flora", "Hemkund Sahib"],
        itinerary: [],
        included: [],
        excluded: []
    },
    {
        title: "Roopkund Trek",
        slug: "roopkund-trek",
        description: "Famous for the mysterious skeletal remains found at the edge of the lake.",
        shortDescription: "The mystery lake trek with breathtaking views of Trishul.",
        images: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2670&auto=format&fit=crop"],
        price: 14999,
        difficulty: "Difficult",
        duration: 8,
        location: "Lohajung, Uttarakhand",
        elevation: "15,750 ft",
        bestTime: ["summer", "autumn"],
        highlights: ["Mystery Lake", "Ali Bugyal Meadows"],
        itinerary: [],
        included: [],
        excluded: []
    },
    {
        title: "Har Ki Dun Trek",
        slug: "har-ki-dun",
        description: "A beautiful cradle-shaped hanging valley in the Garhwal Himalayas.",
        shortDescription: "Walk through ancient villages and pristine pine forests.",
        images: ["https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2670&auto=format&fit=crop"],
        price: 10500,
        difficulty: "Moderate",
        duration: 7,
        location: "Sankri, Uttarakhand",
        elevation: "11,800 ft",
        bestTime: ["summer", "autumn", "winter"],
        highlights: ["Ancient Culture", "Swargarohini Peak View"],
        itinerary: [],
        included: [],
        excluded: []
    },
    {
        title: "Brahmatal Trek",
        slug: "brahmatal-trek",
        description: "A classic winter trek providing a panoramic view of Mt. Trishul and Nanda Ghunti.",
        shortDescription: "Best winter trek with frozen lake views.",
        images: ["https://images.unsplash.com/photo-1548588627-f978862b85e1?q=80&w=2672&auto=format&fit=crop"],
        price: 8500,
        difficulty: "Easy",
        duration: 5,
        location: "Lohajung, Uttarakhand",
        elevation: "12,250 ft",
        bestTime: ["winter", "spring"],
        highlights: ["Frozen Lake", "Mt. Trishul Views"],
        itinerary: [],
        included: [],
        excluded: []
    }
];

async function seedFilters() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected.');

        // 1. Update existing treks
        console.log('Updating existing Kedarkantha...');
        await Trek.updateOne(
            { title: { $regex: 'Kedarkantha', $options: 'i' } },
            {
                $set: {
                    bestTime: ['winter', 'spring'],
                    shortDescription: "The most popular winter summit trek in India.",
                    elevation: "12,500 ft"
                }
            }
        );

        console.log('Updating existing Dayara Bugyal...');
        await Trek.updateOne(
            { title: { $regex: 'Dayara', $options: 'i' } },
            {
                $set: {
                    bestTime: ['winter', 'spring', 'summer', 'autumn'],
                    shortDescription: "India's most beautiful high altitude meadow.",
                    elevation: "11,181 ft"
                }
            }
        );

        // 2. Add new dummy treks if they don't exist
        for (const trek of newTreks) {
            const exists = await Trek.findOne({ slug: trek.slug });
            if (!exists) {
                console.log(`Creating ${trek.title}...`);
                await Trek.create(trek);
            } else {
                console.log(`${trek.title} already exists. Updating...`);
                await Trek.updateOne({ slug: trek.slug }, { $set: trek });
            }
        }

        console.log('Seeding complete.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seedFilters();
