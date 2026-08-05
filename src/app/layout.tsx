import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hikingplanet.in"),
  alternates: {
    canonical: "https://www.hikingplanet.in",
  },
  title: {
    default: "HikingPlanet",
    template: "%s | HikingPlanet",
  },
  description:
    "Discover the real Himalayas with HikingPlanet. Experience authentic trekking adventures, stunning landscapes, local culture, and unforgettable memories.",
  keywords: [
    "himalayan trek",
    "uttarkashi trek",
    "trekking india",
    "beginner trek himalayas",
    "hikingplanet",
    "trekplanet",
    "uttarakhand trek",
    "himalaya expedition",
    "kedarkantha trek",
    "har ki dun trek",
  ],
  authors: [{ name: "HikingPlanet", url: "https://www.hikingplanet.in" }],
  creator: "HikingPlanet",
  publisher: "HikingPlanet",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },

  // ─── Favicon & App Icons ─────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  // ─── Web App Manifest ────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ─── Theme ───────────────────────────────────────────────────────────────────
  applicationName: "HikingPlanet",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HikingPlanet",
  },
  formatDetection: {
    telephone: false,
  },

  // ─── Open Graph (Facebook, WhatsApp, LinkedIn, Discord, Telegram, etc.) ──────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hikingplanet.in",
    siteName: "HikingPlanet",
    title: "HikingPlanet",
    description:
      "Discover the real Himalayas with HikingPlanet. Experience authentic trekking adventures, stunning landscapes, local culture, and unforgettable memories.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HikingPlanet",
        type: "image/jpeg",
      },
    ],
  },

  // ─── Twitter / X Card ────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@hikingplanet",
    creator: "@hikingplanet",
    title: "HikingPlanet",
    description:
      "Discover the real Himalayas with HikingPlanet. Experience authentic trekking adventures, stunning landscapes, local culture, and unforgettable memories.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HikingPlanet",
      },
    ],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HikingPlanet",
  url: "https://www.hikingplanet.in",
  logo: "https://www.hikingplanet.in/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91 90273 14439",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ganga View Estate, Gyansu",
    addressLocality: "Uttarkashi",
    addressRegion: "Uttarakhand",
    postalCode: "249193",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
