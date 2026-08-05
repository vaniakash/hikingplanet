const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const trekSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    shortDescription: { type: String },
    location: { type: String },
    duration: { type: Number },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Difficult', 'Expert'] },
    price: { type: Number },
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

const Trek = mongoose.models.Trek || mongoose.model('Trek', trekSchema);
const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);

async function createTestTrek() {
    if (!process.env.MONGODB_URI) {
        console.error('❌ MONGODB_URI is missing');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const testTrekData = {
            title: 'Payment Verification Demo',
            slug: 'payment-demo-2-inr',
            description: 'This is a test trek to verify Razorpay integration with a nominal fee of ₹2.',
            shortDescription: 'Test your payment gateway securely.',
            location: 'Test Location',
            duration: 1,
            difficulty: 'Easy',
            price: 2, // ₹2 ONLY
            images: ['https://images.unsplash.com/photo-1621252179027-94459d27d3ee?auto=format&fit=crop&q=80&w=2600'],
            inclusions: ['Payment Verification'],
            exclusions: ['Refunds'],
            itinerary: [{ day: 1, title: 'Test Day', description: 'Testing payment flow.' }]
        };

        // Upsert Trek
        const trek = await Trek.findOneAndUpdate(
            { slug: testTrekData.slug },
            { $set: testTrekData },
            { upsert: true, new: true }
        );
        console.log(`✅ Created Trek: ${trek.title} (₹${trek.price})`);

        // Create a Trip for Tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfter = new Date(tomorrow);
        dayAfter.setDate(dayAfter.getDate() + 1);

        const trip = await Trip.create({
            trek: trek._id,
            startDate: tomorrow,
            endDate: dayAfter,
            capacity: 100
        });
        console.log('✅ Created Test Trip Date');

        console.log(`\n🔗 DIRECT BOOKING LINK: http://localhost:3000/book/${trip._id}\n`);

        console.log('🎉 Setup Complete. You can now book "Payment Verification Demo" for ₹2.');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

createTestTrek();
