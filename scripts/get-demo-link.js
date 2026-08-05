const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const trekSchema = new mongoose.Schema({ slug: String });
const tripSchema = new mongoose.Schema({ trek: mongoose.Schema.Types.ObjectId, startDate: Date });

const Trek = mongoose.models.Trek || mongoose.model('Trek', trekSchema);
const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);

async function getLink() {
    if (!process.env.MONGODB_URI) return console.log('No Mongo URI');
    await mongoose.connect(process.env.MONGODB_URI);

    const trek = await Trek.findOne({ slug: 'payment-demo-2-inr' });
    if (!trek) return console.log('Trek not found');

    const trip = await Trip.findOne({ trek: trek._id });
    if (!trip) return console.log('Trip not found');

    console.log(`URL: http://localhost:3000/book/${trip._id}`);
    process.exit(0);
}

getLink();
