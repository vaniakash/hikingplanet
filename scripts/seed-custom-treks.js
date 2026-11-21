const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

// Define Trek Schema matching src/models/Trek.ts
const TrekSchema = new mongoose.Schema(
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
        bestTime: [{ type: String }],
        images: [{ type: String }],
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
        feeDetails: [{
            name: { type: String },
            amount: { type: Number, default: 0 },
            type: { type: String, default: 'fixed' }
        }],
        addOns: [{
            name: { type: String },
            price: { type: Number },
            description: { type: String },
            mandatory: { type: Boolean, default: false }
        }],
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
        trekReviews: [
            {
                reviewerName: { type: String },
                trekGroup: { type: String },
                title: { type: String },
                content: { type: String }
            }
        ],
    },
    { timestamps: true }
);

const Trek = mongoose.models.Trek || mongoose.model('Trek', TrekSchema);

const commonInclusions = [
    'All wholesome vegetarian meals (breakfast, packed lunch, evening tea & snacks, hot dinner) from basecamp to summit',
    'High-grade alpine dome tents, warm sleeping bags (-10°C rated), fleece liners, and insulated foam mattresses',
    'Certified Wilderness First Responder (WFR) trek leaders and licensed local mountain guides (1:6 guide-to-trekker ratio)',
    'Safety & mountaineering equipment: microspikes, snow gaiters, safety ropes, walkie-talkies, and ice axes as required',
    'Comprehensive medical kit with pulse oximeter, blood pressure monitor, and emergency portable oxygen cylinders',
    'All forest permits, entry fees, environmental cess, and camping charges'
];

const commonExclusions = [
    'Transportation from major transit hub to basecamp and back (available as affordable group add-on)',
    'Personal porter / mule support for offloading personal rucksacks (available on advance request)',
    'Personal trekking gear such as trekking boots, poles, rain ponchos, and thermal wear (rentals available)',
    'Personal expenses, tips, laundry, and meals purchased during road transit',
    'Personal travel/medical insurance and unforeseen emergency helicopter evacuation costs'
];

const treksToSeed = [
    // 1. Nag Tibba Trek
    {
        title: 'Nag Tibba Trek',
        slug: 'nag-tibba-trek',
        location: 'Pantwari, Mussoorie, Uttarakhand',
        elevation: '9,915 ft',
        difficulty: 'Easy',
        duration: 2,
        price: 3499,
        originalPrice: 4999,
        bestTime: ['winter', 'spring', 'autumn'],
        images: [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80'
        ],
        shortDescription: 'The highest peak in the lesser Garhwal Himalayas offering sweeping views of Bandarpoonch, Swargarohini, and Gangotri ranges.',
        description: 'Nag Tibba (Serpent’s Peak) is the highest summit in the lesser Himalayan range of Garhwal at 9,915 ft. Located near Mussoorie, it is the ultimate weekend trek that packs dense oak and rhododendron forests, mountain village culture, and an astounding 180-degree view of Himalayan giants. In winter, Nag Tibba transforms into a snow paradise accessible to beginners and families.',
        ageRequirement: '6+ Years',
        startingPoint: 'Pantwari Village (near Mussoorie)',
        accommodationType: 'Alpine Tents',
        fitnessBenchmark: '5 KM jog in 40 Minutes',
        assemblyPoint: 'Dehradun Railway Station – 6:30 AM',
        returnPoint: 'Dehradun Railway Station – 7:30 PM',
        gearSupport: 'Rental Available',
        storageFacility: 'Cloakroom at Basecamp',
        backpackAssist: 'Offloading Available',
        isFeatured: true,
        isActive: true,
        highlights: [
            {
                title: 'Summit Panorama from 9,915 ft',
                description: 'Unobstructed 180-degree vista of Bandarpoonch, Swargarohini, Gangotri, Kedarnath, and Doon Valley.'
            },
            {
                title: 'Ancient Nag Devta Temple',
                description: 'Sacred mountain shrine deeply revered by the local Jaunpur Garhwali shepherds and villagers.'
            },
            {
                title: 'Enchanted Oak & Rhododendron Woods',
                description: 'Walk through pristine sun-dappled Himalayan forests ablaze with scarlet flowers in spring and laden with snow in winter.'
            }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Dehradun to Pantwari & Trek to Nag Tibba Basecamp',
                description: 'Drive 85 km from Dehradun through Mussoorie and Nainbagh to Pantwari. Begin a gentle 4.5 km ascent through rural terraces and oak forests to Nag Tibba Basecamp. Enjoy spectacular sunset over the Shivalik ridges.',
                distance: '85 km drive | 4.5 km trek',
                durationInfo: '3.5 hrs drive | 4 hrs trek'
            },
            {
                day: 2,
                title: 'Basecamp to Nag Tibba Summit & Descent to Pantwari, Drive to Dehradun',
                description: 'Early morning summit push to Nag Devta temple and Nag Tibba top (9,915 ft). Soak in the sunrise across the snow-capped Great Himalayan peaks. Descend back to Pantwari and drive to Dehradun.',
                distance: '7.5 km trek | 85 km drive',
                durationInfo: '5.5 hrs trek | 3.5 hrs drive'
            }
        ],
        detailedItinerary: [
            {
                day: 1,
                title: 'Dehradun to Pantwari (4,640 ft) & Trek to Basecamp (7,627 ft)',
                driveDuration: '3.5 to 4 Hours',
                trekDuration: '3.5 to 4.5 Hours',
                trekDistance: '4.5 KM',
                altitude: '7,627 ft',
                ascent: '2,987 ft gain',
                waterSources: 'Natural water spring near Goat Village trail junction',
                description: 'The journey kicks off with a scenic drive along the Yamuna river valley past Kempty Falls to Pantwari village. The trail begins with stony paths through rural settlements before delving into tranquil oak woods, reaching the open clearing of Nag Tibba base camp for sunset tea.'
            },
            {
                day: 2,
                title: 'Basecamp to Nag Tibba Top (9,915 ft), Descend to Pantwari & Drive to Dehradun',
                driveDuration: '3.5 Hours',
                trekDuration: '5.5 to 6 Hours',
                trekDistance: '7.5 KM',
                altitude: '9,915 ft',
                ascent: '2,288 ft ascent & 5,275 ft descent',
                waterSources: 'None on ridge; carry 2 litres from basecamp',
                description: 'A pre-dawn push takes you past the ancient stone shrine of Nag Devta. The final steep ridge climb through dense trees reveals the summit marker with staggering views of Swargarohini, Bandarpoonch, Srikantha, and Kedarnath. After photos and hot snacks, descend to Pantwari for your evening drive.'
            }
        ],
        difficultyDetails: {
            level: 'Easy',
            description: 'Perfect beginner-friendly weekend trek with gradual trails and moderate elevation gain.',
            terrain: '• Well-marked dirt and rocky mountain paths\n• Gentle to moderate forest switchbacks\n• Final ridge trail with short steep incline to summit\n• Packed snow patches during peak winter (Dec-Feb)',
            weather: '• Spring/Summer: 12°C to 24°C daytime, cool night (4°C to 10°C)\n• Winter: -3°C to 12°C with crisp sun and frosty nights',
            altitude: '• Basecamp: 7,627 ft | Summit: 9,915 ft\n• Very low risk of Acute Mountain Sickness (AMS)',
            safety: '• Clear trails with regular checkpoints\n• Fully guided with local mountain leads and first-aid kits'
        },
        bestSeasonDetails: [
            {
                seasonName: 'Winter Snow (December – March)',
                temperature: '-3°C to 12°C',
                weather: 'Crisp sunny days with fresh snowfall and magical white ridges.',
                warmLayers: '3 warm layers + windproof jacket',
                description: 'One of the closest and most accessible snow treks from Delhi and Dehradun with snow-covered camping clearings.'
            },
            {
                seasonName: 'Spring & Autumn (April – June & Sept – Nov)',
                temperature: '6°C to 22°C',
                weather: 'Crystal clear visibility, blooming rhododendrons, and fiery golden sunsets.',
                warmLayers: '2 warm layers',
                description: 'Pleasant weather and optimum clarity of the high Garhwal Himalayan peaks on the horizon.'
            }
        ],
        inclusions: commonInclusions,
        exclusions: commonExclusions
    },

    // 2. Valley of Flowers Trek
    {
        title: 'Valley of Flowers Trek',
        slug: 'valley-of-flowers-trek',
        location: 'Chamoli, Uttarakhand',
        elevation: '14,400 ft',
        difficulty: 'Moderate',
        duration: 6,
        price: 11999,
        originalPrice: 15999,
        bestTime: ['summer', 'monsoon', 'autumn'],
        images: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80'
        ],
        shortDescription: 'UNESCO World Heritage wonderland carpeted with 500+ species of wild alpine blooms, alongside the holy emerald Hemkund Sahib lake.',
        description: 'Valley of Flowers National Park in Chamoli is one of India’s most revered UNESCO World Heritage Sites. Discovered by mountaineer Frank Smythe in 1931, this high-altitude glacial basin comes alive in the monsoon with a kaleidoscopic carpet of over 500 wildflower varieties, including the rare Blue Poppy and Brahma Kamal. Paired with the spiritual ascent to Hemkund Sahib (14,400 ft), it is a bucket-list Himalayan journey.',
        ageRequirement: '10+ Years',
        startingPoint: 'Govindghat / Poolna',
        accommodationType: 'Hotels / Guesthouses in Ghangaria',
        fitnessBenchmark: '5 KM in 35 Minutes',
        assemblyPoint: 'Rishikesh Railway Station / Bus Stand – 6:00 AM',
        returnPoint: 'Rishikesh – 7:30 PM',
        gearSupport: 'Rental Available',
        storageFacility: 'Cloakroom in Govindghat',
        backpackAssist: 'Pony / Porter Available',
        isFeatured: true,
        isActive: true,
        highlights: [
            {
                title: 'UNESCO World Heritage Floral Basin',
                description: 'Endless meadows of orchids, anemones, poppies, and primulas framed by towering snow-clad peaks.'
            },
            {
                title: 'Sacred Hemkund Sahib & Glacial Lake',
                description: 'High-altitude gurudwara perched beside a pristine, glass-like glacial tarn guarded by seven peaks.'
            },
            {
                title: 'Pushpawati River Gorge',
                description: 'Walk across wooden cantilever bridges over gushing alpine cascades and thunderous torrents.'
            }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Rishikesh to Govindghat (Drive: 275 km)',
                description: 'Drive along the sacred Alaknanda and Bhagirathi rivers through Devprayag and Joshimath to Govindghat.',
                distance: '275 km drive',
                durationInfo: '10 hrs'
            },
            {
                day: 2,
                title: 'Govindghat to Poolna (Drive: 4 km) & Trek to Ghangaria (9,800 ft)',
                description: 'Trek along the Lakshman Ganga on a well-paved stone trail under thick pine and birch canopies to Ghangaria.',
                distance: '4 km drive | 9 km trek',
                durationInfo: '5-6 hrs'
            },
            {
                day: 3,
                title: 'Ghangaria to Valley of Flowers (11,500 ft) & Return',
                description: 'Enter the national park. Spend the day admiring hundreds of rare flower species up to the grave of botanist Joan Margaret Legge.',
                distance: '8 km round trek',
                durationInfo: '6-7 hrs'
            },
            {
                day: 4,
                title: 'Ghangaria to Hemkund Sahib (14,400 ft) & Return',
                description: 'Challenging steep climb up zig-zagging stone stairs to the sacred gurudwara and crystal-clear lake surrounded by Brahma Kamal.',
                distance: '12 km round trek',
                durationInfo: '7-8 hrs'
            },
            {
                day: 5,
                title: 'Ghangaria to Govindghat & Excursion to Badrinath / Mana',
                description: 'Descend to Poolna and drive to Govindghat. Optional afternoon excursion to Badrinath Temple and Mana, the last Indian village.',
                distance: '9 km trek | 30 km drive',
                durationInfo: '4 hrs trek | 1.5 hrs drive'
            },
            {
                day: 6,
                title: 'Govindghat to Rishikesh',
                description: 'Departure drive back through the Panch Prayag confluences to reach Rishikesh by late evening.',
                distance: '275 km drive',
                durationInfo: '10 hrs'
            }
        ],
        detailedItinerary: [
            {
                day: 1,
                title: 'Rishikesh to Govindghat via Devprayag & Rudraprayag',
                driveDuration: '9 to 10 Hours',
                altitude: '5,997 ft',
                description: 'A grand Himalayan highway drive alongside holy river confluences with mountain halts for breakfast and lunch.'
            },
            {
                day: 2,
                title: 'Govindghat to Poolna & Trek to Ghangaria',
                driveDuration: '20 mins',
                trekDuration: '5 to 6 Hours',
                trekDistance: '9 KM',
                altitude: '9,842 ft',
                ascent: '3,845 ft gain',
                waterSources: 'Multiple clean water taps and dhabas along the pilgrim path',
                description: 'Well-paved, scenic trail following the roaring Lakshman Ganga river with views of towering waterfalls.'
            },
            {
                day: 3,
                title: 'Exploration of the UNESCO Valley of Flowers',
                trekDuration: '6 to 7 Hours',
                trekDistance: '8 KM',
                altitude: '11,500 ft',
                ascent: '1,658 ft gain & loss',
                waterSources: 'Stream water inside the valley (pack bottles)',
                description: 'Enter the pristine floral paradise through iron bridges, wandering deep into vibrant meadows framed by Mount Rataban and Gauri Parbat.'
            },
            {
                day: 4,
                title: 'Pilgrimage Ascent to Hemkund Sahib & Glacial Tarn',
                trekDuration: '7 to 8 Hours',
                trekDistance: '12 KM',
                altitude: '14,400 ft',
                ascent: '4,558 ft gain & loss',
                waterSources: 'Tea stalls and clean water posts along stone trail',
                description: 'Steep zig-zag trail with views of cascading waterfalls. At the top, the holy sarovar mirrors the seven towering peaks.'
            },
            {
                day: 5,
                title: 'Descent to Govindghat & Mana Village Visit',
                trekDuration: '4 Hours',
                trekDistance: '9 KM',
                altitude: '5,997 ft',
                description: 'Gentle downward journey returning to basecamp with relaxation and sacred temple visits.'
            },
            {
                day: 6,
                title: 'Govindghat to Rishikesh Departure Drive',
                driveDuration: '9 to 10 Hours',
                description: 'Scenic return journey concluding at Rishikesh.'
            }
        ],
        difficultyDetails: {
            level: 'Moderate',
            description: 'Paved paths throughout; requires endurance for the steep altitude climb to Hemkund Sahib.',
            terrain: '• Broad stone-cobbled pilgrimage trail\n• Well-maintained forest park pathways\n• Steep stone switchbacks on Hemkund day',
            weather: '• Monsoon showers, misty clouds, cool temperatures (7°C to 18°C)',
            altitude: '• Basecamp: 5,997 ft | Hemkund: 14,400 ft',
            safety: '• Dedicated forest rangers and emergency medical camps along the trail'
        },
        bestSeasonDetails: [
            {
                seasonName: 'Peak Monsoon Bloom (July – August)',
                temperature: '8°C to 18°C',
                weather: 'Intermittent mountain rains, dramatic cloud play, maximum wildflower blossom.',
                warmLayers: '2 warm layers + heavy duty raincoat/poncho',
                description: 'The definitive window when the entire valley transforms into an explosion of vibrant wild colors.'
            },
            {
                seasonName: 'Post-Monsoon Autumn (September)',
                temperature: '4°C to 16°C',
                weather: 'Crisp clear skies, golden alpine flora, and crystal-clear mountain views.',
                warmLayers: '2–3 warm layers',
                description: 'Ideal for trekkers seeking clearer weather and stunning unobstructed vistas.'
            }
        ],
        inclusions: commonInclusions,
        exclusions: commonExclusions
    },

    // 3. Bali Pass Trek
    {
        title: 'Bali Pass Trek',
        slug: 'bali-pass-trek',
        location: 'Sankri to Janki Chatti, Uttarakhand',
        elevation: '16,207 ft',
        difficulty: 'Difficult',
        duration: 8,
        price: 23999,
        originalPrice: 28999,
        bestTime: ['spring', 'summer', 'autumn'],
        images: [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80'
        ],
        shortDescription: 'A technical high-altitude pass crossing connecting Har Ki Dun and Ruinsara Lake to the sacred shrine of Yamunotri at 16,207 ft.',
        description: 'Bali Pass is one of the most adventurous crossover expeditions in the Garhwal Himalayas. The trail traverses through the ancient wooden hamlets of the Har Ki Dun valley, past the serene glacial jewel of Ruinsara Tal, and climbs over a dramatic, knife-edge alpine pass at 16,207 ft before descending steeply into Yamunotri. It offers jaw-dropping proximity to Swargarohini, Bandarpoonch, and Kalanag (Black Peak).',
        ageRequirement: '15+ Years',
        startingPoint: 'Sankri Village, Uttarkashi',
        accommodationType: 'Alpine Expedition Tents',
        fitnessBenchmark: '5 KM in 28-30 Minutes with 10 kg backpack',
        assemblyPoint: 'Dehradun Railway Station – 6:30 AM',
        returnPoint: 'Dehradun – 8:00 PM',
        gearSupport: 'Technical Equipment Provided (Ropes, Harness, Crampons)',
        storageFacility: 'Available at Sankri Basecamp',
        backpackAssist: 'Mule/Porter Available',
        isFeatured: true,
        isActive: true,
        highlights: [
            {
                title: 'High-Altitude Pass Crossing at 16,207 ft',
                description: 'Thrilling alpine ridge traverse with 360-degree vistas of the Bandarpoonch massif, Swargarohini, and Kalanag.'
            },
            {
                title: 'Enchanted Ruinsara Glacial Lake',
                description: 'Camping beside the sacred, mirror-like lake surrounded by alpine birch and alpine pastures.'
            },
            {
                title: 'Direct Descent into Sacred Yamunotri',
                description: 'Conclude the high-altitude expedition at the hot thermal springs and holy temple of Goddess Yamuna.'
            }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Dehradun to Sankri (Drive: 210 km)',
                description: 'Scenic drive through Mussoorie, Naugaon, and the Govind Pashu Vihar National Park along the Tons river.',
                distance: '210 km drive',
                durationInfo: '8-9 hrs'
            },
            {
                day: 2,
                title: 'Sankri to Taluka (Drive: 12 km) & Trek to Seema (8,530 ft)',
                description: 'Drive along the Supin river to Taluka and trek through dense walnut and chestnut forests to Seema village.',
                distance: '12 km drive | 12 km trek',
                durationInfo: '6 hrs'
            },
            {
                day: 3,
                title: 'Seema to Rainbasera (10,170 ft)',
                description: 'Trek along the Supin river gorge before climbing towards the confluence of Ruinsara and Supin streams.',
                distance: '9 km trek',
                durationInfo: '6 hrs'
            },
            {
                day: 4,
                title: 'Rainbasera to Ruinsara Tal (11,800 ft)',
                description: 'Gradual ascent through rhododendron meadows to the pristine, glacial Ruinsara lake beneath Mount Swargarohini.',
                distance: '8 km trek',
                durationInfo: '5 hrs'
            },
            {
                day: 5,
                title: 'Ruinsara Tal to Odari (13,100 ft)',
                description: 'Short day to aid acclimatization. Trek towards the rock cave shelter of Odari with technical training on ropes and snow-gear.',
                distance: '5 km trek',
                durationInfo: '4 hrs'
            },
            {
                day: 6,
                title: 'Odari to Bali Pass (16,207 ft) & Descent to Upper Damini (13,120 ft)',
                description: 'Summit day. Navigate moraines and steep snow ridges to conquer Bali Pass, followed by an exhilarating technical descent on fixed ropes.',
                distance: '14 km trek',
                durationInfo: '10-12 hrs'
            },
            {
                day: 7,
                title: 'Upper Damini to Yamunotri & Janki Chatti (8,700 ft)',
                description: 'Descend through alpine woods to the hot sulphur springs and Yamunotri temple, then walk down to Janki Chatti.',
                distance: '8 km trek',
                durationInfo: '5 hrs'
            },
            {
                day: 8,
                title: 'Janki Chatti to Dehradun (Drive: 180 km)',
                description: 'Drive through Barkot and Mussoorie to reach Dehradun by evening.',
                distance: '180 km drive',
                durationInfo: '7 hrs'
            }
        ],
        difficultyDetails: {
            level: 'Difficult',
            description: 'Strenuous expedition requiring prior high-altitude trek experience and strong endurance.',
            terrain: '• Rocky moraines, boulder scree, and glacier snowpack\n• Knife-edge exposed ridge traverse at pass summit\n• Steep descent requiring rope assists',
            weather: '• Sub-zero night temperatures at Odari and pass camps (-5°C to -10°C)',
            altitude: '• Pass Elevation: 16,207 ft',
            safety: '• Fixed rope installation on pass descent; crampons, ice axes, and oxygen cylinders mandatory'
        },
        bestSeasonDetails: [
            {
                seasonName: 'Pre-Monsoon (May – June)',
                temperature: '-5°C to 15°C',
                weather: 'Snowy pass crossing with firm snow bridges and clear skies.',
                warmLayers: '4 warm layers + mountaineering boots',
                description: 'Best for snow lovers looking for an authentic alpine mountaineering experience.'
            },
            {
                seasonName: 'Post-Monsoon (September – October)',
                temperature: '-7°C to 12°C',
                weather: 'Crisp mountain air, minimal snow on lower trails, and stellar clarity of towering summits.',
                warmLayers: '4 warm layers',
                description: 'Preferred for clearer views and solid footing across alpine scree slopes.'
            }
        ],
        inclusions: commonInclusions,
        exclusions: commonExclusions
    },

    // 4. Bhrigu Lake Trek
    {
        title: 'Bhrigu Lake Trek',
        slug: 'bhrigu-lake-trek',
        location: 'Manali, Kullu Valley, Himachal Pradesh',
        elevation: '14,100 ft',
        difficulty: 'Moderate',
        duration: 4,
        price: 6999,
        originalPrice: 9499,
        bestTime: ['spring', 'summer', 'autumn'],
        images: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80'
        ],
        shortDescription: 'High-altitude alpine meadows starting right from day one, leading to a mystic glacial lake that never completely freezes.',
        description: 'Bhrigu Lake is unique in the Himalayas because its lush green alpine meadows (thach) begin on the very first day of the trek. Located high above Manali in the Kullu valley, this sacred tarn sits at 14,100 ft. According to Hindu mythology, Maharishi Bhrigu meditated here, and locals believe the lake never freezes completely even in harsh winter. The trek offers front-row views of Hanuman Tibba, Friendship Peak, and the Seven Sisters.',
        ageRequirement: '10+ Years',
        startingPoint: 'Gulaba, Manali',
        accommodationType: 'Alpine Meadow Tents',
        fitnessBenchmark: '5 KM in 35 Minutes',
        assemblyPoint: 'Manali Mall Road / Private Bus Stand – 8:00 AM',
        returnPoint: 'Manali – 5:30 PM',
        gearSupport: 'Rental Available',
        storageFacility: 'Cloakroom in Manali Base',
        backpackAssist: 'Offloading Available',
        isFeatured: true,
        isActive: true,
        highlights: [
            {
                title: 'High-Altitude Meadows (Thach)',
                description: 'Endless carpets of emerald grasslands beginning above the tree-line on day one.'
            },
            {
                title: 'Mystic Alpine Lake at 14,100 ft',
                description: 'A shape-shifting glacial tarn that changes shades from emerald green to deep azure depending on the sun.'
            },
            {
                title: '360° Panorama of Pir Panjal & Dhauladhar Ranges',
                description: 'Unrivaled views of Hanuman Tibba, Ladakhi Peak, Friendship Peak, and Manali valley.'
            }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Manali to Gulaba (Drive: 22 km) & Trek to Jonker Thach (10,300 ft)',
                description: 'Drive along the Rohtang highway to Gulaba. Trek through silver fir and birch trees to the meadow clearing of Jonker Thach.',
                distance: '22 km drive | 3 km trek',
                durationInfo: '1 hr drive | 3 hrs trek'
            },
            {
                day: 2,
                title: 'Jonker Thach to Rola Kholi (12,500 ft)',
                description: 'Climb above the tree line into boundless green pastures. Camp beside a glacial stream at Rola Kholi under towering peaks.',
                distance: '5 km trek',
                durationInfo: '4 hrs'
            },
            {
                day: 3,
                title: 'Rola Kholi to Bhrigu Lake (14,100 ft) & Return to Rola Kholi / Pandu Ropa',
                description: 'Summit day. Ascend over rocky moraines and snow patches to reach the sacred Bhrigu Lake. Soak in the solitude and descend.',
                distance: '10 km trek',
                durationInfo: '6-7 hrs'
            },
            {
                day: 4,
                title: 'Camp to Gulaba & Drive to Manali',
                description: 'Scenic downhill walk through wildflower meadows to Gulaba roadhead and drive back to Manali by afternoon.',
                distance: '7 km trek | 22 km drive',
                durationInfo: '3.5 hrs trek | 1 hr drive'
            }
        ],
        difficultyDetails: {
            level: 'Moderate',
            description: 'Steep continuous ascent from day one; well suited for fit beginners and experienced hikers.',
            terrain: '• Rolling meadows with soft turf\n• Boulder scree and rocky trails near the lake\n• Snowfields in May and June',
            weather: '• Day: 10°C to 18°C | Night: -2°C to 5°C',
            altitude: '• Rapid altitude gain from 6,725 ft (Manali) to 14,100 ft',
            safety: '• Trek leaders conduct regular pulse and oxygen monitoring for AMS'
        },
        bestSeasonDetails: [
            {
                seasonName: 'Summer & Snow (May – June)',
                temperature: '0°C to 15°C',
                weather: 'Frozen or partially thawed lake surrounded by glistening snowfields.',
                warmLayers: '3 warm layers',
                description: 'Exciting snow trekking experience with snowfields directly leading to the lake rim.'
            },
            {
                seasonName: 'Monsoon & Autumn (July – October)',
                temperature: '2°C to 18°C',
                weather: 'Lush green velvety meadows blooming with wildflowers, followed by autumn clarity.',
                warmLayers: '2–3 warm layers',
                description: 'Incomparable mountain greenery and crystal-clear reflections in the lake water.'
            }
        ],
        inclusions: commonInclusions,
        exclusions: commonExclusions
    },

    // 5. Sar Pass Trek
    {
        title: 'Sar Pass Trek',
        slug: 'sar-pass-trek',
        location: 'Kasol, Parvati Valley, Himachal Pradesh',
        elevation: '13,799 ft',
        difficulty: 'Moderate',
        duration: 5,
        price: 8999,
        originalPrice: 12499,
        bestTime: ['spring', 'summer', 'autumn'],
        images: [
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80'
        ],
        shortDescription: 'Crown jewel of Parvati Valley featuring traditional wooden villages, expansive pine glades, the frozen Sar lake, and a thrilling 1 km snow slide.',
        description: 'Sar Pass is Himachal Pradesh’s most iconic mid-altitude trek, famous for its incredible variety of terrains. Starting from the bohemian haven of Kasol in Parvati Valley, the route winds through ancient deodar forests to the secluded wooden hamlet of Grahan. From the sheer cliff camps of Nagaru, trekkers summit over the snow-covered Sar Pass (13,799 ft) and celebrate with a world-famous 1 km natural snow glissade down into Biskeri Thach.',
        ageRequirement: '12+ Years',
        startingPoint: 'Kasol, Parvati Valley',
        accommodationType: 'Alpine Tents & Village Homestay',
        fitnessBenchmark: '5 KM in 33 Minutes',
        assemblyPoint: 'Kasol Basecamp / Market – 8:30 AM',
        returnPoint: 'Kasol – 4:30 PM',
        gearSupport: 'Rental Available',
        storageFacility: 'Available at Kasol Base',
        backpackAssist: 'Offloading Available',
        isFeatured: true,
        isActive: true,
        highlights: [
            {
                title: 'The Legendary 1 KM Snow Slide',
                description: 'Slide down a natural snow chute from the pass summit down towards Biskeri Thach with immense safety and thrill.'
            },
            {
                title: 'Ancient Heritage Village of Grahan',
                description: 'A 500-year-old preserved Himalayan village of hand-carved deodar wood and timeless traditions.'
            },
            {
                title: 'Cliff-edge Camp at Nagaru',
                description: 'Perched high above the clouds at 12,500 ft with front-row sunset views across Parvati Valley.'
            }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Kasol (5,180 ft) to Grahan Village (7,700 ft)',
                description: 'Trek along Grahan Nullah through aromatic pine and deodar forests, crossing wooden bridges to Grahan village.',
                distance: '10 km trek',
                durationInfo: '5 hrs'
            },
            {
                day: 2,
                title: 'Grahan to Min Thach (10,700 ft)',
                description: 'Steep climb through dense rhododendron groves opening into the grazing pastures of Min Thach beneath snowy crags.',
                distance: '7 km trek',
                durationInfo: '4.5 hrs'
            },
            {
                day: 3,
                title: 'Min Thach to Nagaru (12,500 ft)',
                description: 'Steep ascent over rocky ridges to Nagaru, a cliff campsite perched high above the clouds with sub-zero winds.',
                distance: '6 km trek',
                durationInfo: '4 hrs'
            },
            {
                day: 4,
                title: 'Nagaru to Sar Pass (13,799 ft) & Descent to Biskeri Thach (11,000 ft)',
                description: 'Early morning snow summit to Sar Pass. Marvel at the white expanses before enjoying the thrilling 1 km snow slide to Biskeri Thach.',
                distance: '14 km trek',
                durationInfo: '7-8 hrs'
            },
            {
                day: 5,
                title: 'Biskeri Thach to Barshaini (Trek: 10 km) & Drive to Kasol',
                description: 'Descend through alpine pines past Pulga and Tulga villages to Barshaini roadhead. Drive back to Kasol.',
                distance: '10 km trek | 18 km drive',
                durationInfo: '4 hrs trek | 1 hr drive'
            }
        ],
        difficultyDetails: {
            level: 'Moderate',
            description: 'Moderate trek with a steep ridge climb to Nagaru and high-altitude snow crossing.',
            terrain: '• Forest trails, boulders, and steep ridge switchbacks\n• High-altitude snowfields at Sar Pass',
            weather: '• Bitter cold winds at Nagaru (-5°C to 0°C); pleasant daytime in lower forests',
            altitude: '• Max altitude: 13,799 ft',
            safety: '• Microspikes and gaiters provided for secure snow grip'
        },
        bestSeasonDetails: [
            {
                seasonName: 'Spring & Early Summer (May – June)',
                temperature: '-4°C to 15°C',
                weather: 'Abundant snow cover on pass, exhilarating snow slides, and warm sunshine.',
                warmLayers: '3 warm layers',
                description: 'The golden period for Sar Pass to experience the famous snow glissades.'
            },
            {
                seasonName: 'Autumn (September – October)',
                temperature: '0°C to 18°C',
                weather: 'Clear azure skies, crisp breezes, and colorful autumn foliage in Grahan.',
                warmLayers: '3 warm layers',
                description: 'Ideal for trekkers seeking clearer skies and less snow.'
            }
        ],
        inclusions: commonInclusions,
        exclusions: commonExclusions
    },

    // 6. Hampta Pass Trek
    {
        title: 'Hampta Pass Trek',
        slug: 'hampta-pass-trek',
        location: 'Manali to Spiti Valley, Himachal Pradesh',
        elevation: '14,065 ft',
        difficulty: 'Moderate',
        duration: 5,
        price: 10499,
        originalPrice: 14999,
        bestTime: ['summer', 'monsoon', 'autumn'],
        images: [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80'
        ],
        shortDescription: 'Dramatic crossover from the lush emerald valley of Kullu to the stark, arid moonscape of Lahaul & Spiti, paired with Chandratal Lake.',
        description: 'Hampta Pass is the ultimate crossover adventure in Himachal Pradesh. In just five days, the trail takes you from the hyper-green pine forests, waterfalls, and blooming meadows of Kullu right across a high mountain col into the barren, rock-strewn desert mountains of Lahaul and Spiti. The expedition culminates with a scenic excursion drive to the legendary crescent-shaped Chandratal (Moon Lake).',
        ageRequirement: '10+ Years',
        startingPoint: 'Jobra, Manali',
        accommodationType: 'Alpine Riverside Tents',
        fitnessBenchmark: '5 KM in 34 Minutes',
        assemblyPoint: 'Manali Government Bus Stand – 9:00 AM',
        returnPoint: 'Manali Mall Road – 6:00 PM',
        gearSupport: 'Rental Available',
        storageFacility: 'Available at Manali Base',
        backpackAssist: 'Offloading Available',
        isFeatured: true,
        isActive: true,
        highlights: [
            {
                title: 'Dramatic Landscapes Contrast',
                description: 'Experience lush green forests of Kullu on one side and the stark, extraterrestrial moonscapes of Lahaul on the other.'
            },
            {
                title: 'Challenging Glacial River Crossings',
                description: 'Wade across icy Himalayan torrents linked arm-in-arm at Balu Ka Ghera and Shea Goru.'
            },
            {
                title: 'Excursion to Chandratal (Moon Lake)',
                description: 'Camp or visit the world-renowned turquoise-blue alpine lake resting at 14,000 ft in Spiti Valley.'
            }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Manali to Jobra (Drive: 18 km) & Trek to Chika (10,100 ft)',
                description: 'Drive along 40 hairpin bends to Jobra. Begin an easy 2-hour walk through maple and birch woods along the Rani Nullah to Chika.',
                distance: '18 km drive | 3 km trek',
                durationInfo: '1.5 hrs drive | 2.5 hrs trek'
            },
            {
                day: 2,
                title: 'Chika to Balu Ka Ghera (11,900 ft)',
                description: 'Trek along the riverbed through wildflower meadows and over boulders to the sandy river delta of Balu Ka Ghera.',
                distance: '8 km trek',
                durationInfo: '5 hrs'
            },
            {
                day: 3,
                title: 'Balu Ka Ghera to Hampta Pass (14,065 ft) & Descent to Shea Goru (12,900 ft)',
                description: 'Steep climb over moraines and snow patches to the top of Hampta Pass. Gaze into the arid valley of Lahaul before descending to Shea Goru.',
                distance: '9 km trek',
                durationInfo: '7-8 hrs'
            },
            {
                day: 4,
                title: 'Shea Goru to Chhatru & Drive to Chandratal Lake',
                description: 'Cross the freezing Shea Goru stream and trek down to Chhatru roadhead. Drive along the Chandra river to the breathtaking Chandratal Lake.',
                distance: '5 km trek | 70 km drive',
                durationInfo: '3.5 hrs trek | 3.5 hrs drive'
            },
            {
                day: 5,
                title: 'Chhatru to Manali via Atal Tunnel (Drive: 80 km)',
                description: 'Scenic mountain highway drive through the engineering marvel of Atal Tunnel back into Manali by early evening.',
                distance: '80 km drive',
                durationInfo: '4 hrs'
            }
        ],
        difficultyDetails: {
            level: 'Moderate',
            description: 'Moderate crossover trek involving glacial stream wading and boulder moraines.',
            terrain: '• Riverbeds, alpine meadows, boulder fields, and snow patches at the pass',
            weather: '• Pleasant in Kullu; cold, windy, and dry in Lahaul (-2°C to 16°C)',
            altitude: '• Pass elevation: 14,065 ft | Chandratal: 14,100 ft',
            safety: '• River crossings conducted under experienced rope and guide supervision'
        },
        bestSeasonDetails: [
            {
                seasonName: 'Mid-Summer & Monsoon (June – September)',
                temperature: '-2°C to 16°C',
                weather: 'Lahaul stays in the rain-shadow region; open mountain passes and accessible Chandratal.',
                warmLayers: '3 warm layers',
                description: 'The premier summer trek in India when most other Himalayan trails face heavy monsoon.'
            },
            {
                seasonName: 'Autumn (October)',
                temperature: '-6°C to 12°C',
                weather: 'Golden-orange autumn foliage, crystalline blue skies, and frosty nights.',
                warmLayers: '3–4 warm layers',
                description: 'Sharp mountain clarity and minimal crowds.'
            }
        ],
        inclusions: commonInclusions,
        exclusions: commonExclusions
    },

    // 7. Buran Ghati Trek
    {
        title: 'Buran Ghati Trek',
        slug: 'buran-ghati-trek',
        location: 'Janglik to Barua, Himachal Pradesh',
        elevation: '15,000 ft',
        difficulty: 'Difficult',
        duration: 7,
        price: 17499,
        originalPrice: 22499,
        bestTime: ['spring', 'summer', 'autumn'],
        images: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80'
        ],
        shortDescription: 'The quintessential all-rounder Himalayan trek with heritage wooden villages, pristine Chandranahan glacial lake, and a thrilling 400 ft snow-wall rappel.',
        description: 'Buran Ghati in Himachal Pradesh is widely celebrated as India’s finest complete Himalayan trek. It starts in the heritage wooden architectural marvel of Janglik village, weaves through dense pine forests, emerges into the sprawling Dayara meadows, and visits the sacred Chandranahan glacial tarns. The climax is an adrenaline-pumping 400 ft technical rope rappel down an ice wall from Buran Pass (15,000 ft) into the apple orchards of Barua in Kinnaur.',
        ageRequirement: '13+ Years',
        startingPoint: 'Janglik Village, Rohru',
        accommodationType: 'Alpine Tents & Heritage Homestay',
        fitnessBenchmark: '5 KM in 30 Minutes',
        assemblyPoint: 'Old Bus Stand, Shimla – 6:30 AM',
        returnPoint: 'Shimla – 8:00 PM',
        gearSupport: 'Ropes, Harness, Carabiners & Ice Axes Included',
        storageFacility: 'Available at Basecamp',
        backpackAssist: 'Offloading Available',
        isFeatured: true,
        isActive: true,
        highlights: [
            {
                title: 'The 400 ft Vertical Snow-Wall Rappel',
                description: 'Rappel down a near-vertical wall of ice and snow from the summit of Buran Pass under technical rope guidance.'
            },
            {
                title: 'Sacred Chandranahan Glacial Lakes',
                description: 'A cluster of seven glacial tarns nestled in high rock amphitheatres that feed the Pabbar river.'
            },
            {
                title: 'Janglik Heritage Village',
                description: 'Centuries-old wooden houses, handcrafted slate roofs, and preserved Himachali culture.'
            }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Shimla to Janglik (Drive: 150 km)',
                description: 'Drive along the Pabbar river through Kufri, Rohru, and Chirgaon to reach the secluded heritage village of Janglik.',
                distance: '150 km drive',
                durationInfo: '8-9 hrs'
            },
            {
                day: 2,
                title: 'Janglik to Dayara Thach (11,075 ft)',
                description: 'Climb through historic wooden farms and deep cedar and birch forests opening onto the immense meadows of Dayara.',
                distance: '8 km trek',
                durationInfo: '5 hrs'
            },
            {
                day: 3,
                title: 'Dayara Thach to Litham (11,737 ft)',
                description: 'Trek along the gushing Pabbar river through wildflower clearings, crossing streams to camp at Litham.',
                distance: '6 km trek',
                durationInfo: '4 hrs'
            },
            {
                day: 4,
                title: 'Excursion to Chandranahan Lake (13,900 ft) & Back to Litham',
                description: 'Acclimatization trek up a steep mountain ridge to the sacred glacial tarns of Chandranahan before returning to Litham.',
                distance: '7 km round trek',
                durationInfo: '6 hrs'
            },
            {
                day: 5,
                title: 'Litham to Dhunda (13,365 ft)',
                description: 'Ascend above the tree line along glacial moraines towards the high-altitude pass basecamp of Dhunda.',
                distance: '5 km trek',
                durationInfo: '4 hrs'
            },
            {
                day: 6,
                title: 'Dhunda to Buran Pass (15,000 ft) & Rappel Descent to River Camp (11,800 ft)',
                description: 'Summit push to Buran Pass with breathtaking views of the Kinnaur peaks. Rappel down the 400 ft snow wall to River Camp.',
                distance: '10 km trek',
                durationInfo: '9-10 hrs'
            },
            {
                day: 7,
                title: 'River Camp to Barua Village (Trek: 6 km) & Drive to Shimla',
                description: 'Descend through dense pine woods and apple orchards to Barua village in Kinnaur. Board vehicles for Shimla.',
                distance: '6 km trek | 200 km drive',
                durationInfo: '3 hrs trek | 8 hrs drive'
            }
        ],
        difficultyDetails: {
            level: 'Difficult',
            description: 'Demanding high-altitude pass trek involving steep climbs, moraines, and a mandatory rope rappel.',
            terrain: '• Forest tracks, broad meadows, high alpine moraines, and a steep snow wall',
            weather: '• Cold sub-zero nights at Dhunda and River Camp (-5°C to 12°C)',
            altitude: '• Pass elevation: 15,000 ft',
            safety: '• Anchored technical fixed ropes with harnesses and helmets provided'
        },
        bestSeasonDetails: [
            {
                seasonName: 'Spring & Early Summer (May – June)',
                temperature: '-4°C to 15°C',
                weather: 'Maximum snow on the pass wall for the famous rope rappel and glissades.',
                warmLayers: '3–4 warm layers',
                description: 'The preferred window for high adrenaline snow mountaineering.'
            },
            {
                seasonName: 'Autumn (September – October)',
                temperature: '-6°C to 14°C',
                weather: 'Crisp azure skies, golden meadows, and red apple orchards in Barua.',
                warmLayers: '3–4 warm layers',
                description: 'Crisp visibility of Kinnaur Kailash and peaceful trails.'
            }
        ],
        inclusions: commonInclusions,
        exclusions: commonExclusions
    },

    // 8. Pin Bhaba Pass Trek
    {
        title: 'Pin Bhaba Pass Trek',
        slug: 'pin-bhaba-pass-trek',
        location: 'Kinnaur to Spiti Valley, Himachal Pradesh',
        elevation: '16,105 ft',
        difficulty: 'Difficult',
        duration: 8,
        price: 21999,
        originalPrice: 26999,
        bestTime: ['summer', 'monsoon', 'autumn'],
        images: [
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80'
        ],
        shortDescription: 'The grandest crossover in India: traversing from the lush, mossy pine forests of Kinnaur into the Martian, pastel-colored moonscape of Pin Valley, Spiti.',
        description: 'Pin Bhaba Pass is the most dramatic crossover trek in India. Starting from the green, river-fed apple valley of Kafnu in Kinnaur, you trek through ancient pine woodlands and emerald grasslands at Mulling and Kara. Crossing over the 16,105 ft pass, you step into another world: the barren, pink, purple, and ochre desert mountains of Pin Valley in Spiti, ending at the iconic white-washed village of Mudh.',
        ageRequirement: '14+ Years',
        startingPoint: 'Kafnu Village, Kinnaur',
        accommodationType: 'Alpine Expedition Tents',
        fitnessBenchmark: '5 KM in 30 Minutes with 8-10 kg load',
        assemblyPoint: 'Old Bus Stand, Shimla – 6:00 AM',
        returnPoint: 'Kaza / Manali – 6:00 PM',
        gearSupport: 'Technical Equipment (Crampons/Gaiters) Included',
        storageFacility: 'Available at Basecamp',
        backpackAssist: 'Offloading Available',
        isFeatured: true,
        isActive: true,
        highlights: [
            {
                title: 'Total Ecological Transformation',
                description: 'Witness a mind-boggling change in scenery from rainforest-like greenery in Kinnaur to dry, purple alien mountains in Spiti.'
            },
            {
                title: 'Breathtaking High Camps at Mulling & Kara',
                description: 'Camp in sprawling meadows with meandering rivers and cascading waterfalls dropping from sheer cliffs.'
            },
            {
                title: 'The High Col Crossing at 16,105 ft',
                description: 'Stand on a razor-sharp mountain pass dividing two of Himachal’s most culturally and geographically distinct regions.'
            }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Shimla to Kafnu (Drive: 200 km)',
                description: 'Drive along the Sutlej river highway into Kinnaur to the picturesque hydropower village of Kafnu.',
                distance: '200 km drive',
                durationInfo: '8-9 hrs'
            },
            {
                day: 2,
                title: 'Kafnu to Mulling (10,637 ft)',
                description: 'Trek along the Bhaba river through silver birch and deodar groves, ascending to the broad meadows of Mulling.',
                distance: '10 km trek',
                durationInfo: '6 hrs'
            },
            {
                day: 3,
                title: 'Mulling to Kara (11,660 ft)',
                description: 'Walk through vibrant grasslands, crossing streams and natural stone bridges to the expansive pasture of Kara.',
                distance: '6 km trek',
                durationInfo: '4 hrs'
            },
            {
                day: 4,
                title: 'Kara to Phutsirang / Base Camp (13,474 ft)',
                description: 'Short, steep ascent towards the glacial moraine basecamp of Phutsirang with views of Pin Bhaba Pass.',
                distance: '5 km trek',
                durationInfo: '3.5 hrs'
            },
            {
                day: 5,
                title: 'Acclimatization & Rest Day at Phutsirang',
                description: 'Acclimatize with a short ridge climb, practice snow techniques, and rest for the grueling pass day.',
                distance: '2 km walk',
                durationInfo: '2 hrs'
            },
            {
                day: 6,
                title: 'Phutsirang over Pin Bhaba Pass (16,105 ft) to Mangrungse (13,674 ft)',
                description: 'Pre-dawn climb over snowfields and scree to Pin Bhaba Pass. Descend into the dramatic pink and ochre landscape of Spiti.',
                distance: '12 km trek',
                durationInfo: '9-10 hrs'
            },
            {
                day: 7,
                title: 'Mangrungse to Mudh Village (12,283 ft) & Drive to Kaza',
                description: 'Gentle walk through the wide gravel plains of Pin river to the Tibetan village of Mudh. Drive to Kaza for hot showers.',
                distance: '8 km trek | 50 km drive',
                durationInfo: '4 hrs trek | 2 hrs drive'
            },
            {
                day: 8,
                title: 'Kaza to Manali via Kunzum Pass & Atal Tunnel (Drive: 180 km)',
                description: 'Epic Himalayan road trip across Kunzum Pass (15,060 ft) and Rohtang/Atal Tunnel back to Manali.',
                distance: '180 km drive',
                durationInfo: '8 hrs'
            }
        ],
        difficultyDetails: {
            level: 'Difficult',
            description: 'Long trekking days, steep scree ascent, snow on the pass, and freezing river crossings.',
            terrain: '• Alpine grass, moraines, scree, snowfields, and rocky riverbeds',
            weather: '• Kinnaur side pleasant with occasional showers; Spiti side dry, dusty, and cold (-5°C to 16°C)',
            altitude: '• Pass elevation: 16,105 ft',
            safety: '• Guide-assisted glacier crossing with safety ropes and crampons'
        },
        bestSeasonDetails: [
            {
                seasonName: 'Summer & Monsoon (July – September)',
                temperature: '-4°C to 16°C',
                weather: 'Pass is open, snow bridges stable, and Spiti valley is warm and dry.',
                warmLayers: '4 warm layers',
                description: 'The prime window for crossover when wildflowers carpet Kinnaur and Spiti is bathed in sunshine.'
            },
            {
                seasonName: 'Autumn (October)',
                temperature: '-8°C to 12°C',
                weather: 'Crisp freezing nights, crystal clear views, and striking golden tones.',
                warmLayers: '4 warm layers + down jacket',
                description: 'For experienced high-altitude trekkers seeking utter solitude.'
            }
        ],
        inclusions: commonInclusions,
        exclusions: commonExclusions
    },

    // 9. Pin Parvati Pass Trek
    {
        title: 'Pin Parvati Pass Trek',
        slug: 'pin-parvati-pass-trek',
        location: 'Parvati Valley to Pin Valley, Himachal Pradesh',
        elevation: '17,450 ft',
        difficulty: 'Expert',
        duration: 11,
        price: 36999,
        originalPrice: 44999,
        bestTime: ['summer', 'monsoon', 'autumn'],
        images: [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80'
        ],
        shortDescription: 'The holy grail of Indian trekking: an expedition across the Great Himalayan divide, traversing immense glaciers and Mantalai Lake at 17,450 ft.',
        description: 'Pin Parvati Pass is one of the most formidable and revered trans-Himalayan expeditions on Earth. Spanning 11 intense days, the trek links the hyper-lush Parvati Valley to the remote, cold desert of Spiti. The trail follows the raging Parvati River past hot sulphur springs, dense pine jungles, and boulder-strewn gorges to reach the sacred glacial lake of Mantalai. Beyond lies a massive, crevassed icefield leading to the formidable 17,450 ft pass.',
        ageRequirement: '18+ Years',
        startingPoint: 'Barshaini, Parvati Valley',
        accommodationType: 'High-Altitude Mountaineering Tents',
        fitnessBenchmark: '5 KM in 26-28 Minutes with prior 15,000+ ft trek experience',
        assemblyPoint: 'Kasol / Bhuntar – 7:00 AM',
        returnPoint: 'Manali – 7:00 PM',
        gearSupport: 'Full Mountaineering Gear (Harness, Ropes, Crampons, Ice Axes)',
        storageFacility: 'Available at Basecamp',
        backpackAssist: 'Portage Available on Request',
        isFeatured: true,
        isActive: true,
        highlights: [
            {
                title: 'Conquer the 17,450 ft Great Himalayan Col',
                description: 'One of the highest and most challenging pass traverses in India across heavily crevassed glaciers.'
            },
            {
                title: 'Sacred Mantalai Glacial Lake',
                description: 'The mystical high-altitude glacial source of the Parvati River adorned with Shiva trishuls and stone cairns.'
            },
            {
                title: 'Epic 11-Day Wilderness Expedition',
                description: 'Complete isolation with no human settlements for over a week through pristine Himalayan wilderness.'
            }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Kasol to Barshaini (Drive: 18 km) & Trek to Kheerganga (9,700 ft)',
                description: 'Drive to Barshaini and trek through pine woods past Nakthan village to the natural hot sulphur springs of Kheerganga.',
                distance: '18 km drive | 10 km trek',
                durationInfo: '1 hr drive | 5 hrs trek'
            },
            {
                day: 2,
                title: 'Kheerganga to Tunda Bhuj (10,800 ft)',
                description: 'Walk through birch forests and sheer gorge trails, crossing natural rock bridges over gushing cascades.',
                distance: '12 km trek',
                durationInfo: '6 hrs'
            },
            {
                day: 3,
                title: 'Tunda Bhuj to Thakur Kuan (11,800 ft)',
                description: 'Challenging section with precarious cable car pulleys and rock scrambles above the raging Parvati River.',
                distance: '11 km trek',
                durationInfo: '6-7 hrs'
            },
            {
                day: 4,
                title: 'Thakur Kuan to Odi Thach (12,800 ft)',
                description: 'Cross the natural rock boulder bridge of Pandu Pul into the high alpine valley of Odi Thach surrounded by waterfalls.',
                distance: '9 km trek',
                durationInfo: '5 hrs'
            },
            {
                day: 5,
                title: 'Odi Thach to Mantalai Lake (13,400 ft)',
                description: 'Trek over moraines and river beds to reach the sacred glacial lake of Mantalai, the origin of the Parvati River.',
                distance: '11 km trek',
                durationInfo: '6 hrs'
            },
            {
                day: 6,
                title: 'Acclimatization & Rest Day at Mantalai Lake',
                description: 'Crucial rest and acclimatization day. Explore the sacred lake, worship at the Shiva shrine, and review technical glacier gear.',
                distance: '3 km walk',
                durationInfo: '2 hrs'
            },
            {
                day: 7,
                title: 'Mantalai Lake to Parvati Side Base Camp (15,900 ft)',
                description: 'Steep, grueling climb up a massive boulder ridge onto the lateral moraine of the Parvati Glacier.',
                distance: '8 km trek',
                durationInfo: '6-7 hrs'
            },
            {
                day: 8,
                title: 'Parvati Base Camp over Pin Parvati Pass (17,450 ft) to Pin Side Base Camp (15,300 ft)',
                description: 'Midnight/early morning push. Navigate crevasses in roped teams to conquer the 17,450 ft pass. Descend onto the barren Pin Glacier.',
                distance: '12 km trek',
                durationInfo: '10-12 hrs'
            },
            {
                day: 9,
                title: 'Pin Base Camp to Tiya (13,800 ft)',
                description: 'Trek along the Pin River through red and purple sedimentary mountains into the desolate expanse of Spiti.',
                distance: '11 km trek',
                durationInfo: '6 hrs'
            },
            {
                day: 10,
                title: 'Tiya to Mudh Village (12,283 ft) & Drive to Kaza',
                description: 'Final trek through the dramatic canyon to Mudh village. Board private vehicles for a hot shower in Kaza.',
                distance: '12 km trek | 50 km drive',
                durationInfo: '5 hrs trek | 2 hrs drive'
            },
            {
                day: 11,
                title: 'Kaza to Manali (Drive: 180 km)',
                description: 'Spectacular return road trip across Kunzum Pass and Atal Tunnel concluding at Manali by evening.',
                distance: '180 km drive',
                durationInfo: '8 hrs'
            }
        ],
        difficultyDetails: {
            level: 'Expert',
            description: 'One of the most strenuous expeditions in the Himalayas; requires advanced fitness and glacier acclimatization.',
            terrain: '• Sheer gorge trails, boulder fields, natural rock bridges, and crevassed icefields',
            weather: '• Extreme cold at high camps (-10°C to -15°C) with gale-force winds',
            altitude: '• Summit Pass: 17,450 ft',
            safety: '• Mandatory roped team movement on glacier with microspikes, ice axes, and backup satellite communication'
        },
        bestSeasonDetails: [
            {
                seasonName: 'Peak Monsoon (July – September)',
                temperature: '-10°C to 14°C',
                weather: 'Only viable window when high glaciers are passable and snow bridges over torrents have settled.',
                warmLayers: '4–5 warm layers + down feather expedition suit/jacket',
                description: 'The exclusive window when this supreme Himalayan crossover can be safely attempted.'
            }
        ],
        inclusions: commonInclusions,
        exclusions: commonExclusions
    }
];

async function seedCustomTreks() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected successfully.\n');

        for (const trekData of treksToSeed) {
            console.log(`Processing: ${trekData.title} (${trekData.slug})...`);
            const updated = await Trek.findOneAndUpdate(
                { slug: trekData.slug },
                { $set: trekData },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            console.log(`✓ Saved ${updated.title} | ${updated.difficulty} | ${updated.duration} Days | ₹${updated.price} | ${updated.location}`);
        }

        console.log('\n===========================================');
        console.log(`All ${treksToSeed.length} treks seeded / updated successfully!`);
        console.log('===========================================');

        // Verification query
        const total = await Trek.countDocuments();
        console.log(`Total treks in database now: ${total}`);

    } catch (error) {
        console.error('Error seeding treks:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Database connection closed.');
    }
}

seedCustomTreks();
