'use client';

/**
 * ConditionalAnalytics
 *
 * Loads Google Analytics (GA4) ONLY after the user has consented to analytics cookies.
 * This component reads from the cookie consent store and injects the GA scripts
 * dynamically when analyticsAllowed becomes true — never before.
 *
 * Also handles Google AdSense conditionally (marketing consent).
 */

import { useEffect } from 'react';
import Script from 'next/script';
import { useCookieConsentCtx } from '@/components/CookieConsentProvider';

const GA_ID = 'G-Z9CW4VK4KX';
const ADSENSE_ID = 'ca-pub-4692600238249678';

let gaLoaded = false;
let adsenseLoaded = false;

export default function ConditionalAnalytics() {
    const { analyticsAllowed, marketingAllowed } = useCookieConsentCtx();

    // ── Load Google Analytics after analytics consent ──
    useEffect(() => {
        if (!analyticsAllowed || gaLoaded) return;
        gaLoaded = true;

        // GA gtag script
        const gtagScript = document.createElement('script');
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        gtagScript.async = true;
        document.head.appendChild(gtagScript);

        // GA init inline
        const inlineScript = document.createElement('script');
        inlineScript.id = 'google-analytics-init';
        inlineScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
        `;
        document.head.appendChild(inlineScript);
    }, [analyticsAllowed]);

    // ── Load Google AdSense after marketing consent ──
    useEffect(() => {
        if (!marketingAllowed || adsenseLoaded) return;
        adsenseLoaded = true;

        const adsScript = document.createElement('script');
        adsScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
        adsScript.async = true;
        adsScript.crossOrigin = 'anonymous';
        document.head.appendChild(adsScript);
    }, [marketingAllowed]);

    // ── Revoke consent signals when consent is withdrawn ──
    useEffect(() => {
        if (typeof window === 'undefined' || !(window as any).gtag) return;

        (window as any).gtag('consent', 'update', {
            analytics_storage: analyticsAllowed ? 'granted' : 'denied',
            ad_storage: marketingAllowed ? 'granted' : 'denied',
            ad_user_data: marketingAllowed ? 'granted' : 'denied',
            ad_personalization: marketingAllowed ? 'granted' : 'denied',
        });
    }, [analyticsAllowed, marketingAllowed]);

    return null;
}

