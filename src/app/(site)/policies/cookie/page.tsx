import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy | HikingPlanet',
    description: 'Learn how HikingPlanet uses cookies and similar technologies, and how you can manage your preferences.',
    alternates: { canonical: 'https://www.hikingplanet.in/policies/cookie' },
};

export default function CookiePolicy() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-6 pt-32 text-gray-800">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900">Cookie Policy</h1>
            <p className="text-sm text-gray-500 mb-10">Last updated: November 2026</p>

            <div className="space-y-8 text-base leading-relaxed text-gray-700">
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">1. What Are Cookies?</h2>
                    <p>
                        Cookies are small text files placed on your device when you visit our website. They help us ensure basic functionality, remember your preferences, and understand how visitors interact with our pages to improve our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">2. Types of Cookies We Use</h2>
                    <div className="space-y-4 mt-3">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-gray-900">Necessary Cookies (Always Active)</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Essential for site navigation, secure logins, booking submissions, and storing your cookie preferences. Without these, core features cannot operate.
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-gray-900">Analytics Cookies</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                We use services like Google Analytics (with anonymised IP tracking) to understand visitor traffic, popular trails, and page load speeds.
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-gray-900">Marketing Cookies</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Help deliver relevant trek suggestions and evaluate the performance of our announcements and campaigns.
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-gray-900">Functional Cookies</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Remember custom preferences such as your preferred currency, filter settings, and recently viewed expeditions.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">3. Managing Your Preferences</h2>
                    <p>
                        You can update your cookie preferences at any time by clicking the <strong>Cookie Settings</strong> link located in the footer of every page on our website. You can also adjust your browser settings to reject or delete cookies.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">4. Contact Us</h2>
                    <p>
                        If you have any questions regarding this policy or our data practices, reach out to us at{' '}
                        <a href="mailto:hikingplanet.official@gmail.com" className="text-red-600 underline">
                            hikingplanet.official@gmail.com
                        </a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
