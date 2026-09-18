'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';
import { Loader2, MapPin, AlignLeft, Image as ImageIcon, Camera, BookOpen, Plus, Trash2 } from 'lucide-react';
import { Mountains, CloudSun } from '@phosphor-icons/react';

interface TrekFormProps {
    initialData?: any;
}

export default function TrekForm({ initialData }: TrekFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        location: initialData?.location || '',
        description: initialData?.description || '',
        difficulty: initialData?.difficulty || 'Moderate',
        duration: initialData?.duration || 3,
        price: initialData?.price || 0,
        elevation: initialData?.elevation || '',
        images: initialData?.images || [],
        // Snapshot Fields
        ageRequirement: initialData?.ageRequirement || '',
        startingPoint: initialData?.startingPoint || '',
        accommodationType: initialData?.accommodationType || '',
        fitnessBenchmark: initialData?.fitnessBenchmark || '',
        assemblyPoint: initialData?.assemblyPoint || '',
        returnPoint: initialData?.returnPoint || '',
        gearSupport: initialData?.gearSupport || '',
        storageFacility: initialData?.storageFacility || '',
        backpackAssist: initialData?.backpackAssist || '',
    });

    // Info Sections (accordion items)
    const emptySection = { title: '', subtitle: '', content: '', imageUrl: '' };
    const [infoIntro, setInfoIntro] = useState<string>(initialData?.infoIntro || '');
    const [infoSections, setInfoSections] = useState<{ title: string; subtitle: string; content: string; imageUrl: string }[]>(
        (initialData?.infoSections || []).map((s: any) => ({
            title: s.title || '', subtitle: s.subtitle || '', content: s.content || '', imageUrl: s.imageUrl || ''
        }))
    );
    const [difficultyDetails, setDifficultyDetails] = useState<{ level: string; description: string; terrain: string; weather: string; altitude: string; safety: string }>({
        level: initialData?.difficultyDetails?.level || 'Moderate',
        description: initialData?.difficultyDetails?.description || '',
        terrain: initialData?.difficultyDetails?.terrain || '',
        weather: initialData?.difficultyDetails?.weather || '',
        altitude: initialData?.difficultyDetails?.altitude || '',
        safety: initialData?.difficultyDetails?.safety || '',
    });

    const emptyBestSeason = { seasonName: '', temperature: '', weather: '', warmLayers: '', description: '' };
    const [bestSeasonDetails, setBestSeasonDetails] = useState<{ seasonName: string; temperature: string; weather: string; warmLayers: string; description: string }[]>(
        (initialData?.bestSeasonDetails || []).map((s: any) => ({
            seasonName: s.seasonName || '', temperature: s.temperature || '', weather: s.weather || '', warmLayers: s.warmLayers || '', description: s.description || ''
        }))
    );
    const addBestSeason = () => setBestSeasonDetails(prev => [...prev, { ...emptyBestSeason }]);
    const removeBestSeason = (i: number) => setBestSeasonDetails(prev => prev.filter((_, idx) => idx !== i));
    const updateBestSeason = (i: number, field: 'seasonName' | 'temperature' | 'weather' | 'warmLayers' | 'description', value: string) =>
        setBestSeasonDetails(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));


    const addSection = () => setInfoSections(prev => [...prev, { ...emptySection }]);
    const removeSection = (i: number) => setInfoSections(prev => prev.filter((_, idx) => idx !== i));
    const updateSection = (i: number, field: 'title' | 'subtitle' | 'content' | 'imageUrl', value: string) =>
        setInfoSections(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));

    // Trail Highlights (timeline items)
    const emptyHighlight = { title: '', description: '' };
    const [highlights, setHighlights] = useState<{ title: string; description: string }[]>(
        (initialData?.highlights || []).map((h: any) => ({
            title: h.title || '', description: h.description || ''
        }))
    );
    const addHighlight = () => setHighlights(prev => [...prev, { ...emptyHighlight }]);
    const removeHighlight = (i: number) => setHighlights(prev => prev.filter((_, idx) => idx !== i));
    const updateHighlight = (i: number, field: 'title' | 'description', value: string) =>
        setHighlights(prev => prev.map((h, idx) => idx === i ? { ...h, [field]: value } : h));

    const emptyItinerary = { day: 1, title: '', description: '', distance: '', durationInfo: '' };
    const [itinerary, setItinerary] = useState<{ day: number; title: string; description: string; distance: string; durationInfo: string }[]>(
        (initialData?.itinerary || []).map((i: any) => ({
            day: i.day || 1, title: i.title || '', description: i.description || '', distance: i.distance || '', durationInfo: i.durationInfo || ''
        }))
    );
    const emptyDetailedItinerary = { day: 1, title: '', driveDuration: '', trekDuration: '', trekDistance: '', altitude: '', ascent: '', waterSources: '', description: '', images: [] };
    const [detailedItinerary, setDetailedItinerary] = useState<{ day: number; title: string; driveDuration?: string; trekDuration?: string; trekDistance?: string; altitude?: string; ascent?: string; waterSources?: string; description?: string; images?: string[] }[]>(
        (initialData?.detailedItinerary || []).map((i: any) => ({
            day: i.day || 1, title: i.title || '', driveDuration: i.driveDuration || '', trekDuration: i.trekDuration || '', trekDistance: i.trekDistance || '', altitude: i.altitude || '', ascent: i.ascent || '', waterSources: i.waterSources || '', description: i.description || '', images: i.images || []
        }))
    );

    const [routeMap, setRouteMap] = useState<string>(initialData?.routeMap || '');
    
    // Quick Itinerary Handlers
    const addItineraryDay = () => setItinerary(prev => [...prev, { ...emptyItinerary, day: prev.length + 1 }]);
    const removeItineraryDay = (i: number) => setItinerary(prev => prev.filter((_, idx) => idx !== i).map((item, idx) => ({ ...item, day: idx + 1 })));
    const updateItineraryDay = (i: number, field: string, value: string | number) =>
        setItinerary(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

    // Detailed Itinerary Handlers
    const addDetailedDay = () => setDetailedItinerary(prev => [...prev, { ...emptyDetailedItinerary, day: prev.length + 1 }]);
    const removeDetailedDay = (i: number) => setDetailedItinerary(prev => prev.filter((_, idx) => idx !== i).map((item, idx) => ({ ...item, day: idx + 1 })));
    const updateDetailedDay = (i: number, field: string, value: string | number | string[]) =>
        setDetailedItinerary(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImagesChange = (urls: string[]) => {
        setFormData((prev) => ({ ...prev, images: urls }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const url = initialData ? `/api/treks/${initialData._id}` : '/api/treks';
            const method = initialData ? 'PUT' : 'POST';

            // Filter out empty sections to avoid Mongoose validation errors
            const validInfoSections = infoSections.filter(sec => sec.title && sec.title.trim() !== '');
            const validHighlights = highlights.filter(h => h.title && h.title.trim() !== '');
            const validItinerary = itinerary.filter(i => i.title && i.title.trim() !== '');
            const validDetailedItinerary = detailedItinerary.filter(i => i.title && i.title.trim() !== '');

            const validBestSeasonDetails = bestSeasonDetails.filter(s => s.seasonName);

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, difficultyDetails, bestSeasonDetails: validBestSeasonDetails, infoIntro, infoSections: validInfoSections, highlights: validHighlights, itinerary: validItinerary, detailedItinerary: validDetailedItinerary, routeMap }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Something went wrong');
            }

            // Redirect back to admin list or detail
            router.push('/admin/treks');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Shared input style classes
    const inputClasses = "mt-1 block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:border-[#4b2e83] focus:ring-2 focus:ring-[#4b2e83]/20 focus:outline-none transition-all placeholder:text-gray-400";
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">

            {/* Main Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <AlignLeft className="w-5 h-5 text-[#4b2e83]" />
                    Basic Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>Trek Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Kedarkantha Trek"
                            className={inputClasses}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Slug (URL Friendly)</label>
                        <input
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="e.g. kedarkantha-trek"
                            className={inputClasses}
                        />
                    </div>
                </div>
            </div>

            {/* Logistics Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    Logistics & Pricing
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>Location</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Sankri, Uttarakhand"
                            className={inputClasses}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Price (₹)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={`${inputClasses} pl-10`}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className={labelClasses}>Difficulty</label>
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className={inputClasses}
                        >
                            <option value="Easy">Easy (Beginner)</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Difficult">Difficult</option>
                            <option value="Expert">Expert (Technical)</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClasses}>Duration (Days)</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Max Elevation</label>
                        <input
                            name="elevation"
                            value={formData.elevation}
                            onChange={handleChange}
                            placeholder="e.g. 12,500 ft"
                            className={inputClasses}
                        />
                    </div>
                </div>
            </div>

            {/* Snapshot Details Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-orange-500" />
                    Trek Snapshot Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelClasses}>Age Requirement</label>
                        <input
                            name="ageRequirement"
                            value={formData.ageRequirement}
                            onChange={handleChange}
                            placeholder="e.g. 8+ Years"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Starting Point</label>
                        <input
                            name="startingPoint"
                            value={formData.startingPoint}
                            onChange={handleChange}
                            placeholder="e.g. Kotgaon / Sankri"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Stay Type</label>
                        <input
                            name="accommodationType"
                            value={formData.accommodationType}
                            onChange={handleChange}
                            placeholder="e.g. Mountain Tents"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Fitness Benchmark</label>
                        <input
                            name="fitnessBenchmark"
                            value={formData.fitnessBenchmark}
                            onChange={handleChange}
                            placeholder="e.g. 5 KM in 38 Mins"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Assembly Point</label>
                        <input
                            name="assemblyPoint"
                            value={formData.assemblyPoint}
                            onChange={handleChange}
                            placeholder="e.g. Dehradun - 6:30 AM"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Return Point</label>
                        <input
                            name="returnPoint"
                            value={formData.returnPoint}
                            onChange={handleChange}
                            placeholder="e.g. Dehradun - 6:00 PM"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Gear Support</label>
                        <input
                            name="gearSupport"
                            value={formData.gearSupport}
                            onChange={handleChange}
                            placeholder="e.g. Rental Available"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Storage Facility</label>
                        <input
                            name="storageFacility"
                            value={formData.storageFacility}
                            onChange={handleChange}
                            placeholder="e.g. Cloakroom Available"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Backpack Assist</label>
                        <input
                            name="backpackAssist"
                            value={formData.backpackAssist}
                            onChange={handleChange}
                            placeholder="e.g. Offloading Available"
                            className={inputClasses}
                        />
                    </div>
                </div>
            </div>

            {/* Description Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Description</h3>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe the trek experience..."
                    className={inputClasses}
                    required
                />
            </div>

            {/* Images Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-green-500" />
                    Media Gallery
                </h3>
                <ImageUpload value={formData.images} onChange={handleImagesChange} disabled={loading} maxImages={15} />
            </div>

            {/* Trail Highlights Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-rose-500" />
                        Trail Highlights
                        <span className="text-sm font-normal text-gray-400 ml-1">(timeline list)</span>
                    </h3>
                    <button
                        type="button"
                        onClick={addHighlight}
                        className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40 transition text-sm font-medium border border-rose-200 dark:border-rose-800"
                    >
                        <Plus className="w-4 h-4" /> Add Highlight
                    </button>
                </div>

                {highlights.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 dark:bg-gray-900/30 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                        <MapPin className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">No highlights yet</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Click "Add Highlight" to create timeline items</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {highlights.map((h, i) => (
                            <div key={i} className="flex gap-4 items-start bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <label className={labelClasses}>Highlight Title *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Starting Your Trek at Gangotri"
                                            value={h.title}
                                            onChange={e => updateHighlight(i, 'title', e.target.value)}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Highlight Description</label>
                                        <textarea
                                            rows={2}
                                            placeholder="e.g. At 10,000 ft, Gangotri is one of the highest starting points..."
                                            value={h.description}
                                            onChange={e => updateHighlight(i, 'description', e.target.value)}
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeHighlight(i)}
                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition shrink-0 mt-7"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Itinerary Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-indigo-500" />
                        Quick Itinerary
                    </h3>
                    <button
                        type="button"
                        onClick={addItineraryDay}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition text-sm font-medium border border-indigo-200 dark:border-indigo-800"
                    >
                        <Plus className="w-4 h-4" /> Add Day
                    </button>
                </div>

                <div className="mb-6">
                    <label className={labelClasses}>Trek Route Map <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
                    <ImageUpload
                        value={routeMap ? [routeMap] : []}
                        onChange={(urls: string[]) => setRouteMap(urls[0] || '')}
                        disabled={loading}
                    />
                </div>

                {itinerary.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 dark:bg-gray-900/30 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                        <MapPin className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">No itinerary yet</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Click "Add Day" to create itinerary days</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {itinerary.map((item, i) => (
                            <div key={i} className="flex gap-4 items-start bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <div className="w-16 shrink-0 mt-8 text-center font-bold text-indigo-600 dark:text-indigo-400">
                                    DAY {item.day}
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <label className={labelClasses}>Day Title *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Trek from Gangotri to Chirbasa"
                                            value={item.title}
                                            onChange={e => updateItineraryDay(i, 'title', e.target.value)}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClasses}>Distance</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 10 km"
                                                value={item.distance}
                                                onChange={e => updateItineraryDay(i, 'distance', e.target.value)}
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Duration</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 6 hours"
                                                value={item.durationInfo}
                                                onChange={e => updateItineraryDay(i, 'durationInfo', e.target.value)}
                                                className={inputClasses}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Description</label>
                                        <textarea
                                            rows={2}
                                            placeholder="e.g. Moderate. Initial 300 m steep ascent..."
                                            value={item.description}
                                            onChange={e => updateItineraryDay(i, 'description', e.target.value)}
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeItineraryDay(i)}
                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition shrink-0 mt-7"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Journey Breakdown Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-red-500" />
                        Journey Breakdown
                    </h3>
                    <button
                        type="button"
                        onClick={addDetailedDay}
                        className="text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                    >
                        + Add Day
                    </button>
                </div>

                {detailedItinerary.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 dark:bg-gray-900/30 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                        <MapPin className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">No journey breakdown yet</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Click "Add Day" to create journey breakdown days</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {detailedItinerary.map((item, i) => (
                            <div key={i} className="flex gap-4 items-start bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <div className="w-16 shrink-0 mt-8 text-center font-bold text-red-600 dark:text-red-400">
                                    DAY {item.day}
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <label className={labelClasses}>Day Title *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Day 1: Reach Gangotri"
                                            value={item.title}
                                            onChange={e => updateDetailedDay(i, 'title', e.target.value)}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClasses}>Drive Duration</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 10-12 hours drive from Dehradun"
                                                value={item.driveDuration || ''}
                                                onChange={e => updateDetailedDay(i, 'driveDuration', e.target.value)}
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Trek Duration</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 6-7 hours"
                                                value={item.trekDuration || ''}
                                                onChange={e => updateDetailedDay(i, 'trekDuration', e.target.value)}
                                                className={inputClasses}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClasses}>Trek Distance</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 8 km"
                                                value={item.trekDistance || ''}
                                                onChange={e => updateDetailedDay(i, 'trekDistance', e.target.value)}
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Altitude (or Altitude Gain)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 11,630 ft to 12,415 ft (3,789 m)"
                                                value={item.altitude || ''}
                                                onChange={e => updateDetailedDay(i, 'altitude', e.target.value)}
                                                className={inputClasses}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClasses}>Terrain / Ascent</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Moderate. Initial 100 m ascent..."
                                                value={item.ascent || ''}
                                                onChange={e => updateDetailedDay(i, 'ascent', e.target.value)}
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Water Sources</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. None. Carry 2 litres of water"
                                                value={item.waterSources || ''}
                                                onChange={e => updateDetailedDay(i, 'waterSources', e.target.value)}
                                                className={inputClasses}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Detailed Description</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Detailed paragraphs explaining the day in depth..."
                                            value={item.description || ''}
                                            onChange={e => updateDetailedDay(i, 'description', e.target.value)}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Day Images <span className="text-gray-400 font-normal normal-case">(up to 4 images for masonry grid)</span></label>
                                        <ImageUpload
                                            value={item.images || []}
                                            onChange={(urls: string[]) => updateDetailedDay(i, 'images', urls)}
                                            disabled={loading}
                                            maxImages={4}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeDetailedDay(i)}
                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition shrink-0 mt-7"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Difficulty Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#4b2e83]/10 p-2 rounded-lg">
                        <Mountains className="w-6 h-6 text-[#4b2e83]" weight="duotone" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Difficulty Details</h2>
                        <p className="text-sm text-gray-500">Provide detailed breakdown of the trek's difficulty</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClasses}>Difficulty Level for Graphic</label>
                            <select
                                value={difficultyDetails.level}
                                onChange={e => setDifficultyDetails({ ...difficultyDetails, level: e.target.value })}
                                className={inputClasses}
                            >
                                <option value="Easy">Easy</option>
                                <option value="Easy-Moderate">Easy-Moderate</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Moderate-Difficult">Moderate-Difficult</option>
                                <option value="Difficult">Difficult</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClasses}>Graphic Subtitle (e.g., "Suitable for experienced trekkers")</label>
                            <input
                                type="text"
                                value={difficultyDetails.description}
                                onChange={e => setDifficultyDetails({ ...difficultyDetails, description: e.target.value })}
                                className={inputClasses}
                                placeholder="Subtitle text..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>Terrain</label>
                        <textarea
                            value={difficultyDetails.terrain}
                            onChange={e => setDifficultyDetails({ ...difficultyDetails, terrain: e.target.value })}
                            className={inputClasses}
                            rows={3}
                            placeholder="Describe the terrain... Use • for bullet points."
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Weather</label>
                        <textarea
                            value={difficultyDetails.weather}
                            onChange={e => setDifficultyDetails({ ...difficultyDetails, weather: e.target.value })}
                            className={inputClasses}
                            rows={3}
                            placeholder="Describe the weather... Use • for bullet points."
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Altitude</label>
                        <textarea
                            value={difficultyDetails.altitude}
                            onChange={e => setDifficultyDetails({ ...difficultyDetails, altitude: e.target.value })}
                            className={inputClasses}
                            rows={3}
                            placeholder="Describe altitude details... Use • for bullet points."
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Safety</label>
                        <textarea
                            value={difficultyDetails.safety}
                            onChange={e => setDifficultyDetails({ ...difficultyDetails, safety: e.target.value })}
                            className={inputClasses}
                            rows={3}
                            placeholder="Describe safety aspects... Use • for bullet points."
                        />
                    </div>
                </div>
            </div>

            {/* Best Season Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#4b2e83]/10 p-2 rounded-lg">
                            <CloudSun className="w-6 h-6 text-[#4b2e83]" weight="duotone" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Best Seasons Details</h2>
                            <p className="text-sm text-gray-500">Add detailed season-by-season breakdown for best time to visit.</p>
                        </div>
                    </div>
                    <button type="button" onClick={addBestSeason} className="flex items-center gap-2 px-4 py-2 bg-[#4b2e83]/10 text-[#4b2e83] rounded-lg hover:bg-[#4b2e83]/20 transition-colors font-medium text-sm">
                        <Plus className="w-4 h-4" /> Add Season
                    </button>
                </div>

                <div className="space-y-6">
                    {bestSeasonDetails.map((season, idx) => (
                        <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl relative group">
                            <button
                                type="button"
                                onClick={() => removeBestSeason(idx)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                            
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pr-12">Season {idx + 1}</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className={labelClasses}>Season Name (e.g., "Summer (mid-May to end-June)")</label>
                                    <input
                                        type="text"
                                        value={season.seasonName}
                                        onChange={e => updateBestSeason(idx, 'seasonName', e.target.value)}
                                        className={inputClasses}
                                        placeholder="Enter season name..."
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className={labelClasses}>Temperature Info</label>
                                        <textarea
                                            value={season.temperature}
                                            onChange={e => updateBestSeason(idx, 'temperature', e.target.value)}
                                            className={inputClasses}
                                            rows={2}
                                            placeholder="Day: 15°C to 20°C | Night: drops to 0°C"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Weather / Snow</label>
                                        <textarea
                                            value={season.weather}
                                            onChange={e => updateBestSeason(idx, 'weather', e.target.value)}
                                            className={inputClasses}
                                            rows={2}
                                            placeholder="Receding snow on the trail..."
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Warm Layers Recommended</label>
                                        <textarea
                                            value={season.warmLayers}
                                            onChange={e => updateBestSeason(idx, 'warmLayers', e.target.value)}
                                            className={inputClasses}
                                            rows={2}
                                            placeholder="3 warm layers"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClasses}>Description</label>
                                    <textarea
                                        value={season.description}
                                        onChange={e => updateBestSeason(idx, 'description', e.target.value)}
                                        className={inputClasses}
                                        rows={4}
                                        placeholder="Detailed description of the trek during this season..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {bestSeasonDetails.length === 0 && (
                        <div className="text-center py-8 text-gray-500 bg-gray-50 dark:bg-gray-900/30 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            No season details added. Click "Add Season" to begin.
                        </div>
                    )}
                </div>
            </div>

            {/* Complete Trek Info Accordion Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-500" />
                        Complete Trek Information
                        <span className="text-sm font-normal text-gray-400 ml-1">(accordion sections)</span>
                    </h3>
                    <button
                        type="button"
                        onClick={addSection}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/40 transition text-sm font-medium border border-amber-200 dark:border-amber-800"
                    >
                        <Plus className="w-4 h-4" /> Add Section
                    </button>
                </div>

                {/* Intro paragraph — admin editable */}
                <div className="mb-6">
                    <label className={labelClasses}>Intro Paragraph <span className="text-gray-400 font-normal normal-case">(shown above the accordion)</span></label>
                    <textarea
                        rows={3}
                        placeholder="e.g. We have always wanted trekkers to be well-informed before they go on a Himalayan trek..."
                        value={infoIntro}
                        onChange={e => setInfoIntro(e.target.value)}
                        className={inputClasses}
                    />
                </div>

                {infoSections.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 dark:bg-gray-900/30 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                        <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">No sections yet</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Click "Add Section" to create accordion items</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {infoSections.map((sec, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Section {i + 1}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSection(i)}
                                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className={labelClasses}>Section Title *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. How Difficult is the Trek"
                                            value={sec.title}
                                            onChange={e => updateSection(i, 'title', e.target.value)}
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Subtitle</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. What to Expect in terms of Terrain"
                                            value={sec.subtitle}
                                            onChange={e => updateSection(i, 'subtitle', e.target.value)}
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className={labelClasses}>Content (shown when expanded)</label>
                                    <textarea
                                        rows={5}
                                        placeholder="Write the full content for this section..."
                                        value={sec.content}
                                        onChange={e => updateSection(i, 'content', e.target.value)}
                                        className={inputClasses}
                                    />
                                </div>

                                {/* Per-section image (map, route, etc.) */}
                                <div>
                                    <label className={labelClasses}>Section Image <span className="text-gray-400 font-normal normal-case">(map, route or any image)</span></label>
                                    <ImageUpload
                                        value={sec.imageUrl ? [sec.imageUrl] : []}
                                        onChange={(urls: string[]) => updateSection(i, 'imageUrl', urls[0] || '')}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Error & Submit */}
            {
                error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                        ℹ️ {error}
                    </div>
                )
            }

            <div className="flex justify-end gap-4 sticky bottom-8 pt-4 pb-0 z-10">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-[#4b2e83] hover:bg-[#3b2368] text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all font-bold disabled:opacity-70 disabled:hover:translate-y-0"
                >
                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : null}
                    {initialData ? 'Save Changes' : 'Create Trek'}
                </button>
            </div>
        </form>
    );
}
