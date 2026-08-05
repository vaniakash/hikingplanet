'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { CalendarBlank, MapPin, Mountains, Info } from '@phosphor-icons/react/dist/ssr';

export default function ButterFestivalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [hasStartedForm, setHasStartedForm] = useState(false);

  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaignId: 'butter-festival-2026',
        eventName: 'page_view'
      })
    }).catch(console.error);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    trekkers: '',
    month: '',
    experience: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              campaignId: 'butter-festival-2026',
              eventName: 'form_started'
          })
      }).catch(console.error);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          trek: 'Butter Festival 2026',
          source: 'butter-festival',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit registration');
      }

      setIsSubmitted(true);
      fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              campaignId: 'butter-festival-2026',
              eventName: 'form_submitted'
          })
      }).catch(console.error);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-slate-50 flex flex-col">
        {/* ── Hero Section ── */}
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Reusing a hero image as background placeholder */}
            <Image
              src="/butter-festival/butter_festival_2026_aug_17.webp"
              alt="Dayara Bugyal Butter Festival"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
              August 16–17, 2026
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-lg">
              Butter Festival 2026<br/>
              <span className="text-[#e30613] text-stroke-white text-shadow-sm">Anduri Utsav</span> at Dayara Bugyal
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Celebrate Uttarakhand's most unique Himalayan festival where butter, culture, and mountains come together at 12,000 ft.
            </p>
          </div>
        </section>

        {/* ── Main Content Area ── */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Info weight="fill" className="text-[#e30613] w-6 h-6" />
                Festival Details
              </h2>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl text-orange-600 flex-shrink-0">
                    <span className="text-xl">🧈</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Festival</p>
                    <p className="text-slate-900 font-semibold text-lg">Anduri Utsav (Butter Festival)</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600 flex-shrink-0">
                    <CalendarBlank weight="fill" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date</p>
                    <p className="text-slate-900 font-semibold text-lg">August 16–17, 2026</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-xl text-green-600 flex-shrink-0">
                    <MapPin weight="fill" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-slate-900 font-semibold text-lg">Dayara Bugyal & Raithal Village, Uttarkashi</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-xl text-slate-600 flex-shrink-0">
                    <Mountains weight="fill" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Altitude</p>
                    <p className="text-slate-900 font-semibold text-lg">~12,000 ft</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#1C2B39] rounded-2xl shadow-lg text-white relative overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/butter-festival/butter_festival.jpeg"
                  alt="Butter Festival Experience"
                  fill
                  className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                />
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none z-10">
                 <Mountains weight="fill" size={120} />
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3 className="text-xl font-bold mb-4">Why Join Us?</h3>
                <p className="text-slate-200 leading-relaxed drop-shadow-md font-medium">
                  Experience the raw, unfiltered beauty of Himalayan culture. Play with butter instead of colors in the rolling meadows of Dayara Bugyal. Our expert local guides ensure a safe, authentic, and deeply memorable journey.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-6 sm:p-8 text-center border-b-[4px] border-[#e30613]">
                <h2 className="text-2xl sm:text-3xl font-black text-white">Register for Butter Festival</h2>
                <p className="text-slate-400 mt-2 font-medium">Secure your spot for the 2026 Anduri Utsav</p>
              </div>

              <div className="p-6 sm:p-8">
                {isSubmitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-4">Thank You!</h3>
                    <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
                      Thank you for your interest in the Dayara Bugyal Trek. Our trekking expert will contact you soon with details and available batches.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="p-4 bg-red-50 text-red-600 text-sm font-semibold rounded-lg border border-red-100">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Full Name *</label>
                        <input
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-slate-900 bg-slate-50 focus:bg-white"
                          placeholder="Rahul Sharma"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Mobile Number *</label>
                        <input
                          required
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-slate-900 bg-slate-50 focus:bg-white"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email Address *</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-slate-900 bg-slate-50 focus:bg-white"
                          placeholder="rahul@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-slate-900 bg-slate-50 focus:bg-white"
                          placeholder="Mumbai"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Number of Travellers</label>
                        <input
                          type="number"
                          name="trekkers"
                          value={formData.trekkers}
                          onChange={handleChange}
                          min="1"
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-slate-900 bg-slate-50 focus:bg-white"
                          placeholder="2"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Preferred Travel Date</label>
                        <select
                          name="month"
                          value={formData.month}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-slate-900 bg-slate-50 focus:bg-white"
                        >
                          <option value="">Select date...</option>
                          <option value="August 15">August 15 (Arrival)</option>
                          <option value="August 16">August 16 (Directly for Festival)</option>
                          <option value="Flexible">Flexible around these dates</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Trek Experience</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-slate-900 bg-slate-50 focus:bg-white"
                      >
                        <option value="">Select experience...</option>
                        <option value="Beginner">Beginner (First Time)</option>
                        <option value="Intermediate">Intermediate (Done 1-3 treks)</option>
                        <option value="Experienced">Experienced (Done 3+ treks)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Additional Message (Optional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-slate-900 bg-slate-50 focus:bg-white resize-none"
                        placeholder="Any specific requests or questions?"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 px-6 bg-[#e30613] hover:bg-[#c10510] text-white font-black rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center uppercase tracking-widest text-sm shadow-lg shadow-red-500/30 hover:shadow-red-500/50 mt-4"
                    >
                      {isLoading ? (
                        <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        'Register for Butter Festival'
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-500 mt-4">
                      By submitting this form, you agree to our privacy policy. Your data is secure.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

        </section>

        {/* ── About the Festival (SEO Content) ── */}
        <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">About the Butter Festival</h2>
            <div className="w-20 h-1 bg-[#e30613] mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl font-medium text-slate-700 text-center mb-12 leading-relaxed">
              The Butter Festival, known locally as <strong>Anduri Utsav</strong> or <strong>Makhan Mahotsav</strong>, is a unique high-altitude festival celebrated annually in the alpine meadow of Dayara Bugyal in Uttarkashi, Uttarakhand. Villagers and visitors celebrate by playing a joyful game of "Holi" using fresh butter, milk, and buttermilk instead of colored powders.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#e30613]">Significance & Tradition</h3>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <span className="text-[#e30613] mr-3 mt-1 font-bold">✦</span>
                    <div>
                      <strong className="block text-slate-900 text-[15px] mb-1">Gratitude to Nature</strong>
                      <span className="text-slate-600 text-sm leading-relaxed block">Celebrated during Bhado Sankranti (mid-August), it marks the end of the high-altitude grazing season.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e30613] mr-3 mt-1 font-bold">✦</span>
                    <div>
                      <strong className="block text-slate-900 text-[15px] mb-1">Safe Return of Livestock</strong>
                      <span className="text-slate-600 text-sm leading-relaxed block">Herders and villagers thank Mother Nature and local deities for keeping their cattle safe and healthy during the summer months on the lush green meadows.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e30613] mr-3 mt-1 font-bold">✦</span>
                    <div>
                      <strong className="block text-slate-900 text-[15px] mb-1">The Butter Play</strong>
                      <span className="text-slate-600 text-sm leading-relaxed block">Hundreds of locals smear fresh butter, milk, and buttermilk on each other’s faces amidst singing and dancing.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#e30613]">Festival Highlights</h3>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <span className="text-[#e30613] mr-3 mt-1 font-bold">✦</span>
                    <div>
                      <strong className="block text-slate-900 text-[15px] mb-1">Buttermilk Holi</strong>
                      <span className="text-slate-600 text-sm leading-relaxed block">Villagers engage in a playful splash of buttermilk across the open grass slopes.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e30613] mr-3 mt-1 font-bold">✦</span>
                    <div>
                      <strong className="block text-slate-900 text-[15px] mb-1">Music and Dance</strong>
                      <span className="text-slate-600 text-sm leading-relaxed block">Traditional Garhwali folk dances like Jhora and Barada Nati are performed to the beats of local instruments like the Dhol-Damau.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e30613] mr-3 mt-1 font-bold">✦</span>
                    <div>
                      <strong className="block text-slate-900 text-[15px] mb-1">Cultural Skits</strong>
                      <span className="text-slate-600 text-sm leading-relaxed block">Children dress up in costumes and perform lively acts depicting stories of Lord Krishna.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e30613] mr-3 mt-1 font-bold">✦</span>
                    <div>
                      <strong className="block text-slate-900 text-[15px] mb-1">Trekking Attraction</strong>
                      <span className="text-slate-600 text-sm leading-relaxed block">The event draws adventure lovers and travellers who hike up to 11,000–12,000 feet to experience this rare Himalayan tradition.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Image Gallery ── */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900">Glimpses of the Festival</h2>
            <p className="text-slate-500 mt-2 font-medium">A sneak peek into the vibrant celebrations at Dayara Bugyal.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md group">
              <Image src="/butter-festival/butter_festival_2026_aug_17.webp" alt="Butter Festival" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md group">
              <Image src="/butter-festival/butter_festival.jpeg" alt="Butter Festival" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md group">
              <Image src="/butter-festival/Butter-Festival_2026.webp" alt="Butter Festival" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
