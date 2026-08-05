export const metadata = {
    title: 'Privacy Policy',
    description: 'Read the HikingPlanet Privacy Policy to understand how we collect, use, and protect your personal information.',
    alternates: { canonical: 'https://www.hikingplanet.in/policies/privacy' },
    robots: { index: false, follow: false },
};

export default function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose prose-blue max-w-none text-gray-600">
                <p>Last updated: January 2026</p>

                <h3>1. Information We Collect</h3>
                <p>We collect information that you provide directly to us, such as when you create an account, make a booking, or contact us.</p>

                <h3>2. How We Use Your Information</h3>
                <p>We use the information we collect to facilitate your bookings, send you confirmations, and provide customer support.</p>

                <h3>3. Data Security</h3>
                <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access.</p>

                <h3>4. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at privacy@boundlesspath.com.</p>
            </div>
        </div>
    );
}
