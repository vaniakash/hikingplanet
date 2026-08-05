const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

// Minimal User Schema for script
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true, sparse: true }, // Added to satisfy legacy index
    password: { type: String, required: true },
    name: String,
    role: { type: String, default: 'user' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'trekplanet.official@gmail.com';
        const password = 'admin123'; // Change this in production!
        const name = 'Super Admin';
        const username = 'trekplanet_admin'; // Unique username

        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            console.log('Admin user already exists.');

            // Optional: Update password
            const hashedPassword = await bcrypt.hash(password, 10);
            existingAdmin.password = hashedPassword;
            existingAdmin.role = 'admin'; // Ensure role is admin
            await existingAdmin.save();
            console.log('Admin password/role updated.');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                email,
                username,
                password: hashedPassword,
                name,
                role: 'admin',
            });
            console.log('Admin user created successfully.');
        }

        console.log(`Credentials: ${email} / ${password}`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();
