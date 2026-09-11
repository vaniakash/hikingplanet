'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        let eventName = 'unknown_page_view';
        let metadata: any = { path: pathname };

        if (pathname === '/') {
          eventName = 'home_page_view';
        } else if (pathname.startsWith('/treks/')) {
          eventName = 'trek_page_view';
          metadata.trekSlug = pathname.replace('/treks/', '');
        } else {
          return; // Ignore other pages for now as requested
        }

        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            campaignId: 'global',
            eventName,
            metadata,
          }),
        });
      } catch (err) {
        console.error('Error tracking page view', err);
      }
    };

    trackPageView();
  }, [pathname]);

  return null;
}
