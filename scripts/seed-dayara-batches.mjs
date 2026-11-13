/**
 * seed-dayara-batches.mjs
 *
 * One-time script to insert 6 Nov–Dec 2026 batches for the Dayara Bugyal Trek.
 * Batches are created with status: 'cancelled' (hidden from booking UI) so that
 * the admin can flip each one to 'open' individually once guides/campsites are confirmed.
 *
 * Run from project root:
 *   node scripts/seed-dayara-batches.mjs
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('❌  MONGODB_URI not found in .env.local');
    process.exit(1);
}

// ── Schema definitions (mirror src/models) ──────────────────────────────────

const TrekSchema = new mongoose.Schema({ title: String, slug: String }, { strict: false });
const Trek = mongoose.models.Trek || mongoose.model('Trek', TrekSchema);

const TripSchema = new mongoose.Schema(
    {
        trek:         { type: mongoose.Schema.Types.ObjectId, ref: 'Trek', required: true },
        startDate:    { type: Date, required: true },
        endDate:      { type: Date, required: true },
        capacity:     { type: Number, default: 15 },
        seatsBooked:  { type: Number, default: 0 },
        waitlistCount:{ type: Number, default: 0 },
        status:       { type: String, enum: ['open','full','completed','cancelled'], default: 'cancelled' },
        priceOverride:{ type: Number },
        label:        { type: String },
    },
    { timestamps: true }
);
TripSchema.index({ trek: 1, startDate: 1 });
const Trip = mongoose.models.Trip || mongoose.model('Trip', TripSchema);

// ── Batch data ───────────────────────────────────────────────────────────────

const BATCHES = [
    { batch: '01', start: '2026-11-20', end: '2026-11-25' },
    { batch: '02', start: '2026-11-27', end: '2026-12-02' },
    { batch: '03', start: '2026-12-04', end: '2026-12-09' },
    { batch: '04', start: '2026-12-11', end: '2026-12-16' },
    { batch: '05', start: '2026-12-18', end: '2026-12-23' },
    { batch: '06', start: '2026-12-25', end: '2026-12-30' },
];

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log('🔗  Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log('✅  Connected.\n');

    // 1. Find the Dayara Bugyal trek
    const trek = await Trek.findOne({ slug: 'dayara-bugyal-trek' }).select('_id title slug').lean();
    if (!trek) {
        console.error('❌  Trek with slug "dayara-bugyal-trek" not found in DB.\n    Run /api/seed first to populate treks.');
        process.exit(1);
    }
    console.log(`🏔️   Found trek: "${trek.title}" (${trek._id})\n`);

    let created = 0;
    let skipped = 0;

    for (const b of BATCHES) {
        const startDate = new Date(b.start + 'T00:00:00.000Z');
        const endDate   = new Date(b.end   + 'T00:00:00.000Z');

        // Duplicate guard — skip if a trip already exists for this trek + startDate
        const existing = await Trip.findOne({ trek: trek._id, startDate }).lean();
        if (existing) {
            console.log(`⚠️   Batch ${b.batch} (${b.start}) already exists — skipped.`);
            skipped++;
            continue;
        }

        await Trip.create({
            trek:          trek._id,
            startDate,
            endDate,
            capacity:      15,
            seatsBooked:   0,
            waitlistCount: 0,
            status:        'cancelled',   // ← hidden until operationally confirmed
            label:         `Batch ${b.batch} · Nov–Dec 2026`,
        });

        console.log(`✅  Created Batch ${b.batch}: ${b.start} → ${b.end}  [status: cancelled]`);
        created++;
    }

    console.log(`\n📊  Summary: ${created} created, ${skipped} skipped (duplicates).`);
    console.log('\n💡  To make batches bookable: go to Admin → Treks → Dayara Bugyal → Edit,');
    console.log('     scroll to "Scheduled Batches", and change each batch status from');
    console.log('     "Cancelled" → "Open" once guides and campsites are confirmed.\n');

    await mongoose.disconnect();
    console.log('🔌  Disconnected. Done.');
}

main().catch((err) => {
    console.error('❌  Fatal error:', err);
    process.exit(1);
});

