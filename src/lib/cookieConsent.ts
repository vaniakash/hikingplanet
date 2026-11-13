'use client';

export interface CookiePreferences {
    necessary: true;       // Always true, cannot be disabled
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
}

export type ConsentStatus = 'pending' | 'accepted_all' | 'rejected_optional' | 'customized';

export interface CookieConsentState {
    status: ConsentStatus;
    preferences: CookiePreferences;
    savedAt: string; // ISO timestamp
}

const STORAGE_KEY = 'hp_cookie_consent';

export const DEFAULT_PREFS: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
};

export function loadConsent(): CookieConsentState | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as CookieConsentState;
    } catch {
        return null;
    }
}

export function saveConsent(state: CookieConsentState): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearConsent(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
}

/** Returns true if user has already made a consent decision (banner should NOT show) */
export function hasConsented(): boolean {
    const c = loadConsent();
    return c !== null && c.status !== 'pending';
}

export function buildAcceptAll(): CookieConsentState {
    return {
        status: 'accepted_all',
        preferences: { necessary: true, analytics: true, marketing: true, functional: true },
        savedAt: new Date().toISOString(),
    };
}

export function buildRejectOptional(): CookieConsentState {
    return {
        status: 'rejected_optional',
        preferences: { necessary: true, analytics: false, marketing: false, functional: false },
        savedAt: new Date().toISOString(),
    };
}

export function buildCustom(prefs: Omit<CookiePreferences, 'necessary'>): CookieConsentState {
    return {
        status: 'customized',
        preferences: { necessary: true, ...prefs },
        savedAt: new Date().toISOString(),
    };
}

