import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Butter Festival 2026 | Anduri Utsav Dayara Bugyal',
  description:
    'Experience the famous Anduri Utsav (Butter Festival) at Dayara Bugyal, Uttarakhand. Join HikingPlanet for a unique Himalayan cultural trek with breathtaking meadows, local traditions, and unforgettable memories.',
  alternates: {
    canonical: 'https://www.hikingplanet.in/butter-festival',
  },
  openGraph: {
    title: 'Butter Festival 2026 | Anduri Utsav Dayara Bugyal | HikingPlanet',
    description:
      'Experience the famous Anduri Utsav (Butter Festival) at Dayara Bugyal, Uttarakhand. Join HikingPlanet for a unique Himalayan cultural trek with breathtaking meadows, local traditions, and unforgettable memories.',
    url: 'https://www.hikingplanet.in/butter-festival',
    type: 'website',
    images: [
      {
        url: '/butter-festival/Butter-Festival_2026.webp',
        width: 1200,
        height: 630,
        alt: 'Butter Festival Dayara Bugyal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Butter Festival 2026 | Anduri Utsav Dayara Bugyal',
    description:
      'Experience the famous Anduri Utsav (Butter Festival) at Dayara Bugyal, Uttarakhand.',
    images: ['/butter-festival/Butter-Festival_2026.webp'],
  },
};

export default function ButterFestivalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
