export const metadata = {
    title: 'Terms & Conditions',
    description: 'Read the HikingPlanet Terms & Conditions governing the use of our services and trek bookings.',
    alternates: { canonical: 'https://www.hikingplanet.in/policies/terms' },
    robots: { index: false, follow: false },
};

export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
            <div className="prose prose-blue max-w-none text-gray-600">
                <p>Last updated: January 2026</p>

                <h3>1. Acceptance of Terms</h3>
                <p>By accessing or using our website and services, you agree to be bound by these Terms.</p>

                <h3>2. Bookings & Payments</h3>
                <p>All bookings are subject to availability. A deposit or full payment is required to confirm your spot.</p>

                <h3>3. Cancellations & Refunds</h3>
                <p>Cancellations made 30 days prior to the trip start date are eligible for a partial refund. Please refer to our detailed refund policy.</p>

                <h3>4. Liability</h3>
                <p>Trekking involves inherent risks. BoundlessPath is not liable for injuries or accidents that occur during the expedition, though we take every safety precaution.</p>
            </div>
        </div>
    );
}
