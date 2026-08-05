'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react/dist/ssr';

export default function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasStartedForm, setHasStartedForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    trek: '',
    month: '',
    trekkers: '',
    experience: '',
    message: '',
  });

  useEffect(() => {
    // Check if user has seen the popup recently (within 24 hours)
    const lastSeen = localStorage.getItem('hikingPlanetLeadPopupClosed');
    if (lastSeen) {
      const timeSinceClosed = Date.now() - parseInt(lastSeen, 10);
      if (timeSinceClosed < 24 * 60 * 60 * 1000) {
        return; // Don't show if closed within 24 hours
      }
    }

    // Show after 8 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              campaignId: 'global-lead-capture',
              eventName: 'popup_view'
          })
      }).catch(console.error);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hikingPlanetLeadPopupClosed', Date.now().toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              campaignId: 'global-lead-capture',
              eventName: 'popup_form_started'
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
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setIsSubmitted(true);
      fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              campaignId: 'global-lead-capture',
              eventName: 'popup_form_submitted'
          })
      }).catch(console.error);
      // Still set the localStorage so it doesn't bother them again after submitting
      localStorage.setItem('hikingPlanetLeadPopupClosed', Date.now().toString());
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition-colors z-10"
                aria-label="Close"
              >
                <X weight="bold" size={20} />
              </button>

              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                {isSubmitted ? (
                  <div className="text-center py-10">
                    <h3 className="text-2xl font-black text-slate-800 mb-4">Thank you! 🎉</h3>
                    <p className="text-slate-600 leading-relaxed">
                      We've received your enquiry. Our trekking expert will contact you shortly to help plan your Himalayan adventure.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-8 px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded hover:bg-slate-200 transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">🏔️ Plan Your Himalayan Adventure</h2>
                    <p className="text-sm text-slate-500 mb-6 font-medium">
                      Tell us where you'd like to trek, and our team will help you plan the perfect Himalayan experience.
                    </p>

                    {error && (
                      <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-md border border-red-100">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                          <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-sm text-slate-900"
                            placeholder="Rahul Sharma"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Number *</label>
                          <input
                            required
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-sm text-slate-900"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-sm text-slate-900"
                          placeholder="rahul@example.com"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred Trek</label>
                          <select
                            name="trek"
                            value={formData.trek}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-sm text-slate-900 bg-white"
                          >
                            <option value="">Select a trek...</option>
                            <option value="Dayara Bugyal">Dayara Bugyal</option>
                            <option value="Kedarkantha">Kedarkantha</option>
                            <option value="Brahmatal">Brahmatal</option>
                            <option value="Har Ki Dun">Har Ki Dun</option>
                            <option value="Pin Bhaba Pass">Pin Bhaba Pass</option>
                            <option value="Other / Not Sure">Other / Not Sure</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred Month</label>
                          <select
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-sm text-slate-900 bg-white"
                          >
                            <option value="">Select month...</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Number of Trekkers</label>
                          <input
                            type="number"
                            name="trekkers"
                            value={formData.trekkers}
                            onChange={handleChange}
                            min="1"
                            className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-sm text-slate-900"
                            placeholder="e.g. 2"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Experience Level</label>
                          <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-sm text-slate-900 bg-white"
                          >
                            <option value="">Select experience...</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Experienced">Experienced</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Additional Message (Optional)</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-colors text-sm text-slate-900 resize-none"
                          placeholder="Any specific requests or questions?"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-[#e30613] hover:bg-[#c10510] text-white font-black rounded transition-colors disabled:opacity-70 flex items-center justify-center uppercase tracking-wider text-sm mt-2"
                      >
                        {isLoading ? (
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                          'Plan My Trek'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
