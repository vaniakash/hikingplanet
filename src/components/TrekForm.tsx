'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';
import { Loader2, MapPin, AlignLeft, Image as ImageIcon, Camera, BookOpen, Plus, Trash2 } from 'lucide-react';

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

    const addSection = () => setInfoSections(prev => [...prev, { ...emptySection }]);
    const removeSection = (i: number) => setInfoSections(prev => prev.filter((_, idx) => idx !== i));
    const updateSection = (i: number, field: 'title' | 'subtitle' | 'content' | 'imageUrl', value: string) =>
        setInfoSections(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));

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

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, infoIntro, infoSections: validInfoSections }),
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
                <ImageUpload value={formData.images} onChange={handleImagesChange} disabled={loading} />
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
