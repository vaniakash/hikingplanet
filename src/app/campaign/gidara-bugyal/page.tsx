'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mountain, CheckCircle2, ArrowRight, MapPin, Calendar, Users, HeartPulse, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GidaraBugyalCampaign() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    age: '',
    city: '',
    month: '', // Preferred Trek Date
    trekkers: '', // Number of people
    hasTrekBefore: '',
    experience: '', // Trek Experience / Fitness
    medicalCondition: '',
    source: '', // How did you hear
    helpNeeded: [] as string[],
    trek: 'Gidara Bugyal',
    // We send a custom source to the API so we know where it came from
    campaignSource: 'gidara-bugyal-ad' 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, helpNeeded: [...prev.helpNeeded, value] };
      } else {
        return { ...prev, helpNeeded: prev.helpNeeded.filter(h => h !== value) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...formData,
            source: formData.campaignSource, // override source for backend email routing
            message: `Instagram Lead. Source: ${formData.source}`, // Store original source in message
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Error submitting request.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="bg-[#111] border border-gray-800 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
          <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">You're on the list!</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Our trek team will contact you on WhatsApp shortly with availability, trek details and next steps.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-gray-800 transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const inputStyles = "w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all outline-none";
  const labelStyles = "block text-sm font-medium text-gray-300 mb-2";
  const sectionStyles = "mb-8 bg-[#111] p-6 rounded-2xl border border-gray-800/50 shadow-xl relative overflow-hidden";
  const iconWrapperStyles = "w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center mb-4";

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 selection:bg-violet-500/30 font-sans pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] z-10"></div>
        {/* You would normally use next/image here with a real URL */}
        <div className="absolute inset-0 bg-[url('/campaign/gidara5.webp')] bg-cover bg-center opacity-40"></div>
        
        <div className="relative z-20 p-6 md:p-12 w-full max-w-2xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-semibold mb-4 backdrop-blur-md">
            Limited Slots Available
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Gidara Bugyal
          </h1>
          <p className="text-lg text-gray-400">Join the ultimate high-altitude meadow trek. Register your interest below.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-30 -mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Personal Info */}
          <div className={sectionStyles}>
            <div className={iconWrapperStyles}><Users className="w-5 h-5 text-violet-400" /></div>
            <h3 className="text-xl font-semibold text-white mb-6">1. Personal Information</h3>
            
            <div className="space-y-5">
              <div>
                <label className={labelStyles}>Full Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className={inputStyles} />
              </div>
              <div>
                <label className={labelStyles}>WhatsApp Number *</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-800 bg-[#222] text-gray-400">+91</span>
                  <input required type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="XXXXX XXXXX" className={`${inputStyles} rounded-l-none`} />
                </div>
              </div>
              <div>
                <label className={labelStyles}>Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className={inputStyles} />
              </div>
              <div>
                <label className={labelStyles}>Age *</label>
                <div className="grid grid-cols-2 gap-3">
                  {['18–25', '26–35', '36–45', '46+'].map(age => (
                    <label key={age} className={`border rounded-xl px-4 py-3 cursor-pointer transition-all text-center ${formData.age === age ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-gray-800 bg-[#1a1a1a] text-gray-400 hover:border-gray-600'}`}>
                      <input type="radio" name="age" value={age} onChange={handleChange} className="hidden" required />
                      {age}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelStyles}>Where are you travelling from? *</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City / State" className={inputStyles} />
              </div>
            </div>
          </div>

          {/* Section 2: Trek Details */}
          <div className={sectionStyles}>
            <div className={iconWrapperStyles}><Calendar className="w-5 h-5 text-blue-400" /></div>
            <h3 className="text-xl font-semibold text-white mb-6">2. Trek Details</h3>
            
            <div className="space-y-5">
              <div>
                <label className={labelStyles}>Preferred Trek Date *</label>
                <select required name="month" value={formData.month} onChange={handleChange} className={inputStyles}>
                  <option value="" disabled>Select a date</option>
                  <option value="19 September 2026">19 September 2026</option>
                  <option value="Other / Future Batch">Other / Future Batch</option>
                </select>
              </div>
              <div>
                <label className={labelStyles}>Number of People *</label>
                <div className="flex gap-2">
                  {['1', '2', '3', '4', '5+'].map(num => (
                    <label key={num} className={`flex-1 border rounded-xl py-3 cursor-pointer transition-all text-center ${formData.trekkers === num ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-gray-800 bg-[#1a1a1a] text-gray-400 hover:border-gray-600'}`}>
                      <input type="radio" name="trekkers" value={num} onChange={handleChange} className="hidden" required />
                      {num}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Experience & Health */}
          <div className={sectionStyles}>
            <div className={iconWrapperStyles}><HeartPulse className="w-5 h-5 text-rose-400" /></div>
            <h3 className="text-xl font-semibold text-white mb-6">3. Experience & Fitness</h3>
            
            <div className="space-y-6">
              <div>
                <label className={labelStyles}>Have you done a trek before? *</label>
                <div className="space-y-3">
                  {[
                    { val: 'Yes, multiple treks', label: 'Yes, multiple treks' },
                    { val: 'Yes, 1-2 treks', label: 'Yes, 1–2 treks' },
                    { val: 'No, first trek', label: 'No, this will be my first trek' }
                  ].map(opt => (
                    <label key={opt.val} className={`block border rounded-xl px-4 py-4 cursor-pointer transition-all ${formData.hasTrekBefore === opt.val ? 'border-rose-500 bg-rose-500/10 text-white' : 'border-gray-800 bg-[#1a1a1a] text-gray-400 hover:border-gray-600'}`}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${formData.hasTrekBefore === opt.val ? 'border-rose-500' : 'border-gray-600'}`}>
                          {formData.hasTrekBefore === opt.val && <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />}
                        </div>
                        <input type="radio" name="hasTrekBefore" value={opt.val} onChange={handleChange} className="hidden" required />
                        {opt.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelStyles}>Trek Experience / Fitness Level *</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Beginner', 'Moderate', 'Experienced'].map(level => (
                    <label key={level} className={`border rounded-xl py-3 cursor-pointer transition-all text-center ${formData.experience === level ? 'border-rose-500 bg-rose-500/10 text-white' : 'border-gray-800 bg-[#1a1a1a] text-gray-400 hover:border-gray-600'}`}>
                      <input type="radio" name="experience" value={level} onChange={handleChange} className="hidden" required />
                      {level}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelStyles}>Any medical condition or important health info?</label>
                <textarea 
                  name="medicalCondition" 
                  value={formData.medicalCondition} 
                  onChange={handleChange} 
                  placeholder="Optional — Please mention if applicable." 
                  className={`${inputStyles} min-h-[100px] resize-y`} 
                />
              </div>
            </div>
          </div>

          {/* Section 4: Final Details */}
          <div className={sectionStyles}>
            <div className={iconWrapperStyles}><MapPin className="w-5 h-5 text-emerald-400" /></div>
            <h3 className="text-xl font-semibold text-white mb-6">4. Final Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className={labelStyles}>How did you hear about this trek? *</label>
                <select required name="source" value={formData.source} onChange={handleChange} className={inputStyles}>
                  <option value="" disabled>Select an option</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Friend/Family">Friend/Family</option>
                  <option value="Google">Google</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelStyles}>What would you like help with? (Select all that apply)</label>
                <div className="space-y-3">
                  {['Trek details', 'Availability', 'Pricing & payment', 'Travel/transport', 'What to pack', 'Other'].map(item => (
                    <label key={item} className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${formData.helpNeeded.includes(item) ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-800 bg-[#1a1a1a] hover:border-gray-600'}`}>
                      <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 border ${formData.helpNeeded.includes(item) ? 'bg-emerald-500 border-emerald-500' : 'border-gray-500'}`}>
                        {formData.helpNeeded.includes(item) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        value={item} 
                        checked={formData.helpNeeded.includes(item)}
                        onChange={handleCheckboxChange} 
                        className="hidden" 
                      />
                      <span className={formData.helpNeeded.includes(item) ? 'text-white' : 'text-gray-400'}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-lg shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="animate-pulse">Submitting...</span>
            ) : (
              <>
                Submit Registration Request
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            Your information is secure. We will only use this to contact you regarding the trek.
          </p>

        </form>
      </div>
    </div>
  );
}
