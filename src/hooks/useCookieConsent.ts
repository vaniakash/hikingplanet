'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    loadConsent,
    saveConsent,
    hasConsented,
    buildAcceptAll,
    buildRejectOptional,
    buildCustom,
    type CookieConsentState,
    type CookiePreferences,
} from '@/lib/cookieConsent';

export function useCookieConsent() {
    const [consent, setConsent] = useState<CookieConsentState | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!hasConsented()) {
            setShowBanner(true);
        } else {
            setConsent(loadConsent());
        }
    }, []);

    const _persist = useCallback((state: CookieConsentState) => {
        saveConsent(state);
        setConsent(state);
        setShowBanner(false);
    }, []);

    const acceptAll = useCallback(() => _persist(buildAcceptAll()), [_persist]);
    const rejectOptional = useCallback(() => _persist(buildRejectOptional()), [_persist]);
    const saveCustom = useCallback(
        (prefs: Omit<CookiePreferences, 'necessary'>) => _persist(buildCustom(prefs)),
        [_persist]
    );
    const openSettings = useCallback(() => setShowBanner(true), []);

    const analyticsAllowed = consent?.preferences.analytics ?? false;
    const marketingAllowed = consent?.preferences.marketing ?? false;
    const functionalAllowed = consent?.preferences.functional ?? false;

    return {
        mounted,
        showBanner,
        consent,
        analyticsAllowed,
        marketingAllowed,
        functionalAllowed,
        acceptAll,
        rejectOptional,
        saveCustom,
        openSettings,
    };
}

