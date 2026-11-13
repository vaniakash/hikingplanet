import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

await mongoose.connect(process.env.MONGODB_URI);
const Trip = mongoose.model('Trip', new mongoose.Schema({}, { strict: false }), 'trips');
const result = await Trip.updateMany(
  { 'label': /Batch .* · Nov–Dec 2026/ },
  { $set: { status: 'open' } }
);
console.log(`✅ Updated ${result.modifiedCount} batches → open`);
await mongoose.disconnect();

