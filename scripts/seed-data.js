const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Define Schemas locally to avoid TS compilation issues in script
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
});

const trekSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    shortDescription: { type: String },
    location: { type: String },
    duration: { type: Number },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Difficult', 'Expert'] }, // Added Enum here to match Main Model
    price: { type: Number },
    originalPrice: { type: Number },
    images: [String],
    itinerary: [{ day: Number, title: String, description: String }],
    inclusions: [String],
    exclusions: [String],
});

const tripSchema = new mongoose.Schema({
    trek: { type: mongoose.Schema.Types.ObjectId, ref: 'Trek' },
    startDate: Date,
    endDate: Date,
    capacity: Number,
    seatsBooked: { type: Number, default: 0 },
    status: { type: String, default: 'open' },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Trek = mongoose.models.Trek || mongoose.model('Trek', trekSchema);
const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);

const sampleTreks = [
    {
        title: 'Kedarkantha Trek',
        slug: 'kedarkantha-trek',
        description: `Kedarkantha is one of the most popular winter treks in Uttarakhand. It offers a perfect blend of scenic beauty and adventure.
        
        The trek takes you through dense pine forests, vast meadows, and offers a panoramic view of the Himalayan peaks like Swargarohini, Bandarpoonch, and Black Peak from the summit.`,
        shortDescription: 'The best winter trekking experience in the Himalayas.',
        location: 'Sankri, Uttarakhand',
        duration: 6,
        difficulty: 'Moderate', // FIXED: Was 'Easy-Moderate'
        price: 8500,
        originalPrice: 10500,
        images: ['https://images.unsplash.com/photo-1548679847-1d4ff346d037?q=80&w=2600&auto=format&fit=crop'], // FIXED: New URL (Snowy Peak)
        inclusions: ['Accommodation', 'Meals', 'Guide', 'Permits'],
        exclusions: ['Personal Expenses', 'Travel to Base Camp'],
        itinerary: [
            { day: 1, title: 'Arrival at Sankri', description: 'Drive from Dehradun to Sankri (10 hours).' },
            { day: 2, title: 'Sankri to Juda Ka Talab', description: 'Trek through pine forests to reach the frozen lake.' },
            { day: 3, title: 'Juda Ka Talab to Base Camp', description: 'Short trek to the base camp with stunning views.' },
            { day: 4, title: 'Summit Day', description: 'Climb to the peak (12,500ft) and descend.' }
        ]
    },
    {
        title: 'Rupin Pass Trek',
        slug: 'rupin-pass-trek',
        description: 'A crossover trek from Uttarakhand to Himachal Pradesh. Known for its changing scenery and the famous three-stage waterfall.',
        shortDescription: 'A classic crossover trek full of surprises.',
        location: 'Dhaula, Uttarakhand',
        duration: 8,
        difficulty: 'Difficult', // Valid
        price: 14500,
        originalPrice: 16000,
        images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2600&auto=format&fit=crop'], // FIXED: Working Mountain URL
        inclusions: ['All Meals', 'Tents', 'Expert Guide'],
        exclusions: ['Backpack Offloading', 'Insurance'],
        itinerary: [
            { day: 1, title: 'Arrival', description: 'Reach Dhaula.' },
            { day: 8, title: 'Completion', description: 'Reach Sangla.' }
        ]
    }
];

async function seed() {
    if (!process.env.MONGODB_URI) {
        console.error('❌ MONGODB_URI is missing in .env.local');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // 1. Seed Admin
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({ username: 'admin', password: hashedPassword, role: 'admin' });
            console.log('✅ Admin user created: admin / admin123');
        } else {
            console.log('ℹ️ Admin user already exists');
        }

        // 2. Seed Treks (Upsert Logic)
        for (const data of sampleTreks) {
            // Use findOneAndUpdate with upsert: true to Create OR Update
            const trek = await Trek.findOneAndUpdate(
                { slug: data.slug },
                { $set: data },
                { upsert: true, new: true, runValidators: true }
            );
            console.log(`✅ Upserted Trek: ${trek.title}`);

            // 3. Seed Trips for this Trek (Only if none exist, to avoid duplicates on re-run)
            const tripCount = await Trip.countDocuments({ trek: trek._id });
            if (tripCount === 0) {
                const today = new Date();
                const trip1 = new Date(today); trip1.setDate(today.getDate() + 10);
                const trip1End = new Date(trip1); trip1End.setDate(trip1.getDate() + data.duration);

                const trip2 = new Date(today); trip2.setDate(today.getDate() + 25);
                const trip2End = new Date(trip2); trip2End.setDate(trip2.getDate() + data.duration);

                await Trip.create([
                    { trek: trek._id, startDate: trip1, endDate: trip1End, capacity: 20 },
                    { trek: trek._id, startDate: trip2, endDate: trip2End, capacity: 15 }
                ]);
                console.log(`   Detailed 2 trips for ${trek.title}`);
            } else {
                console.log(`   Trips already exist for ${trek.title}, skipping trip creation.`);
            }
        }

        console.log('🎉 Seeding / Fixing complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seed Error:', error);
        process.exit(1);
    }
}

seed();
