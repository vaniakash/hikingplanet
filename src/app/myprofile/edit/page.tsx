'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDashboard } from '../layout';
import { Loader2, Save, Camera } from 'lucide-react';

export default function EditProfilePage() {
    const { user, fetchUser } = useDashboard();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        medicalNotes: '',
        profilePicture: ''
    });
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                age: user.age ? user.age.toString() : '',
                gender: user.gender || '',
                emergencyContactName: user.emergencyContact?.name || '',
                emergencyContactPhone: user.emergencyContact?.phone || '',
                medicalNotes: user.medicalNotes || '',
                profilePicture: user.profilePicture || ''
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
            
            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            
            if (data.secure_url) {
                setFormData(prev => ({ ...prev, profilePicture: data.secure_url }));
                setMessage({ type: 'success', text: 'Profile picture uploaded! Remember to save changes.' });
            }
        } catch (error) {
            console.error('Image upload failed', error);
            setMessage({ type: 'error', text: 'Failed to upload image.' });
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/consumer/dashboard/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                await fetchUser(); // Refresh user data in context
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to update profile.' });
            }
        } catch (error) {
            console.error('Update profile error:', error);
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
            <h2 className="text-xl font-black text-slate-900 mb-6">Edit Profile</h2>

            {message.text && (
                <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Profile Picture Upload Section */}
                <div className="flex flex-col items-center mb-8">
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="relative w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors overflow-hidden group"
                    >
                        {uploadingImage ? (
                            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                        ) : formData.profilePicture ? (
                            <>
                                <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center text-slate-400 group-hover:text-slate-600 transition-colors">
                                <Camera className="w-8 h-8 mb-1" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Upload</span>
                            </div>
                        )}
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        accept="image/*" 
                    />
                    <p className="text-xs text-slate-500 mt-3 font-medium">Click to upload or change profile picture</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Emergency Contact</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Contact Name</label>
                            <input
                                type="text"
                                name="emergencyContactName"
                                value={formData.emergencyContactName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Contact Phone</label>
                            <input
                                type="tel"
                                name="emergencyContactPhone"
                                value={formData.emergencyContactPhone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Medical Notes</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-2">Any pre-existing medical conditions or allergies we should know about?</label>
                        <textarea
                            name="medicalNotes"
                            value={formData.medicalNotes}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all resize-none"
                        ></textarea>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={saving || uploadingImage}
                        className="flex items-center gap-2 px-6 py-3 bg-[#e30613] text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-70"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
