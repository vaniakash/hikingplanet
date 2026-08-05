
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Define minimal Trek Schema for reading
const TrekSchema = new mongoose.Schema({
    title: String,
    difficulty: String,
    duration: Number,
    price: Number,
    location: String,
    bestTime: [String],
});

const Trek = mongoose.models.Trek || mongoose.model('Trek', TrekSchema);

async function debugTreks() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected.');

        const treks = await Trek.find({});
        console.log(`Found ${treks.length} treks.`);

        treks.forEach(trek => {
            console.log(`\nTitle: ${trek.title}`);
            console.log(`Difficulty: ${trek.difficulty} (Filter: ${['Easy', 'Moderate', 'Difficult'].includes(trek.difficulty) ? 'OK' : 'MISMATCH'})`);
            console.log(`Duration: ${trek.duration} (Filter: ${trek.duration <= 4 ? 'Short' : trek.duration <= 8 ? 'Medium' : 'Long'})`);
            console.log(`Price: ${trek.price}`);
            console.log(`Location: ${trek.location}`);
            console.log(`BestTime (Season): ${JSON.stringify(trek.bestTime)}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

debugTreks();
