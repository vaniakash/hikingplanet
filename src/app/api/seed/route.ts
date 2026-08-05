import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Trek from '@/models/Trek';
import Trip from '@/models/Trip';

export async function GET() {
    await dbConnect();

    // 1. Clear existing data
    await Trek.deleteMany({});
    await Trip.deleteMany({});

    // 2. Define new treks data
    const newTreks = [
        {
            title: "Dayara Bugyal Trek",
            slug: "dayara-bugyal-trek",
            location: "Uttarkashi, Uttarakhand",
            description: "One of the most beautiful alpine meadows in India. Perfect for beginners and families.",
            difficulty: "Easy",
            duration: 6,
            price: 9500,
            originalPrice: 12000,
            elevation: "11,181 ft",
            bestTime: ["May", "June", "September", "October"],
            images: ["https://images.unsplash.com/photo-1518098268026-4e1877a1c7d0?w=800&q=80"],
            feeDetails: [
                { name: "GST", amount: 5, type: "percent" },
                { name: "Trek Insurance", amount: 300, type: "fixed" }
            ],
            addOns: [
                { name: "Indiahikes Shield", price: 750, description: "Cancel anytime protection" },
                { name: "Backpack Offloading", price: 2200, description: "Let mules carry your bag" },
                { name: "Rental Gear", price: 1500, description: "Shoes, Jacket, Pole" }
            ],
            itinerary: [
                { day: 1, title: "Arrival in Barsu", description: "Drive from Dehradun to Barsu village." },
                { day: 2, title: "Barsu to Barnala", description: "Trek through oak forests to Barnala Bugyal." },
                { day: 3, title: "Barnala to Dayara Top", description: "Summit day with panoramic views." },
                { day: 4, title: "Explore Dayara", description: "Leisure day exploring the vast meadows." },
                { day: 5, title: "Dayara to Barsu", description: "Descend back to Barsu." },
                { day: 6, title: "Departure", description: "Drive back to Dehradun." }
            ]
        },
        {
            title: "Kyarki Bugyal Trek",
            slug: "kyarki-bugyal-trek",
            location: "Uttarkashi, Uttarakhand",
            description: "A pristine and less crowded meadow trek offering stunning views of Draupadi Ka Danda.",
            difficulty: "Moderate",
            duration: 7,
            price: 10500,
            originalPrice: 13000,
            elevation: "12,500 ft",
            bestTime: ["June", "September", "October"],
            images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"],
            itinerary: [
                { day: 1, title: "Dehradun to Uttarkashi", description: "Scenic drive to Uttarkashi." },
                { day: 2, title: "Trek start", description: "Begin ascent." }
            ]
        },
        {
            title: "Kushkalyan Bugyal Trek",
            slug: "kushkalyan-bugyal-trek",
            location: "Uttarkashi, Uttarakhand",
            description: "A hidden gem known for its vast grassy slopes and views of the Gangotri range.",
            difficulty: "Moderate",
            duration: 9,
            price: 14000,
            originalPrice: 16000,
            elevation: "11,500 ft",
            bestTime: ["May", "June", "September"],
            images: ["https://images.unsplash.com/photo-1483728642387-9c3be6d4e9fd?w=800&q=80"],
            itinerary: [{ day: 1, title: "Dehradun to Malla", description: "Drive to base camp." }]
        },
        {
            title: "Gomukh Tapovan Trek",
            slug: "gomukh-tapovan-trek",
            location: "Gangotri, Uttarakhand",
            description: "A spiritual and adventurous journey to the source of the Ganges and the base of Mt. Shivling.",
            difficulty: "Difficult",
            duration: 8,
            price: 15500,
            originalPrice: 18000,
            elevation: "14,600 ft",
            bestTime: ["May", "June", "September", "October"],
            images: ["https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=80"],
            itinerary: [{ day: 1, title: "Dehradun to Gangotri", description: "Drive to the holy town." }]
        },
        {
            title: "Sat Tal Trek",
            slug: "sat-tal-trek",
            location: "Harsil, Uttarakhand",
            description: "A beautiful trek exploring seven mysterious high-altitude lakes near Harsil Valley.",
            difficulty: "Easy",
            duration: 5,
            price: 8500,
            originalPrice: 10000,
            elevation: "9,800 ft",
            bestTime: ["April", "May", "June", "September", "October", "November"],
            images: ["https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"],
            itinerary: [{ day: 1, title: "Dehradun to Harsil", description: "Drive to the beautiful Harsil valley." }]
        }
    ];

    // 3. Insert new treks
    const createdTreks = await Trek.insertMany(newTreks);

    // 4. Create dummy dates (Trip) for each trek
    const today = new Date();
    const trips = [];

    for (const trek of createdTreks) {
        // Create 2 batches for next month
        const batch1Start = new Date(today.getFullYear(), today.getMonth() + 1, 10);
        const batch1End = new Date(batch1Start);
        batch1End.setDate(batch1End.getDate() + trek.duration);

        const batch2Start = new Date(today.getFullYear(), today.getMonth() + 2, 15);
        const batch2End = new Date(batch2Start);
        batch2End.setDate(batch2End.getDate() + trek.duration);

        trips.push({
            trek: trek._id,
            startDate: batch1Start,
            endDate: batch1End,
            capacity: 15,
            seatsBooked: 2,
            status: 'open'
        });

        trips.push({
            trek: trek._id,
            startDate: batch2Start,
            endDate: batch2End,
            capacity: 15,
            seatsBooked: 0,
            status: 'open'
        });
    }

    await Trip.insertMany(trips);

    return NextResponse.json({
        message: 'Database reset and seeded successfully',
        treks: createdTreks.length,
        trips: trips.length
    });
}
