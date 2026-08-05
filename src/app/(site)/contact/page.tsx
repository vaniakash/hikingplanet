import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact Us | Plan Your Himalayan Trek',
    description:
        'Get in touch with HikingPlanet. Plan your Himalayan expedition with our expert trek leaders based in Uttarkashi. We respond within 12 hours.',
    alternates: { canonical: 'https://www.hikingplanet.in/contact' },
    openGraph: {
        type: 'website',
        url: 'https://www.hikingplanet.in/contact',
        title: 'Contact HikingPlanet — Plan Your Himalayan Trek',
        description:
            'Reach our expert trek leaders in Uttarkashi. Ask about treks, bookings, or custom expeditions. We respond within 12 hours.',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Contact HikingPlanet' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact HikingPlanet — Plan Your Himalayan Trek',
        description: 'Reach our expert trek leaders in Uttarkashi. Response within 12 hours.',
        images: ['/og-image.jpg'],
    },
};

export default function ContactPage() {
    return <ContactClient />;
}
