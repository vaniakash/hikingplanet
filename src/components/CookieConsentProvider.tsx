'use client';

import { useState, useEffect, createContext, useContext, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ShieldCheck,
    ChartBar,
    Megaphone,
    Gear,
    X,
    CheckCircle,
    Lock,
    CaretRight,
} from '@phosphor-icons/react';
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

// ─── Context ──────────────────────────────────────────────────────────────────

interface CookieConsentCtx {
    consent: CookieConsentState | null;
    analyticsAllowed: boolean;
    marketingAllowed: boolean;
    functionalAllowed: boolean;
    openSettings: () => void;
}

const Ctx = createContext<CookieConsentCtx>({
    consent: null,
    analyticsAllowed: false,
    marketingAllowed: false,
    functionalAllowed: false,
    openSettings: () => {},
});

export function useCookieConsentCtx() {
    return useContext(Ctx);
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({
    checked,
    onChange,
    disabled = false,
    id,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    disabled?: boolean;
    id: string;
}) {
    return (
        <button
            role="switch"
            aria-checked={checked}
            aria-label={id}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${checked ? 'bg-red-600' : 'bg-gray-300'}
      `}
        >
            <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out mt-0.5
          ${checked ? 'translate-x-5' : 'translate-x-0.5'}`}
            />
        </button>
    );
}

// ─── Category Row ─────────────────────────────────────────────────────────────

function CategoryRow({
    icon,
    title,
    description,
    checked,
    onChange,
    disabled,
    id,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    disabled?: boolean;
    id: string;
}) {
    return (
        <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-bold text-gray-900">{title}</p>
                    {disabled && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                            <Lock className="w-2.5 h-2.5" /> Always On
                        </span>
                    )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
            </div>
            <div className="flex-shrink-0 mt-1">
                <Toggle id={id} checked={checked} onChange={onChange} disabled={disabled} />
            </div>
        </div>
    );
}

// ─── Main Banner / Provider ───────────────────────────────────────────────────

export default function CookieConsentProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [showCustomize, setShowCustomize] = useState(false);
    const [consent, setConsent] = useState<CookieConsentState | null>(null);

    // Custom prefs draft
    const [draft, setDraft] = useState<Omit<CookiePreferences, 'necessary'>>({
        analytics: false,
        marketing: false,
        functional: false,
    });

    useEffect(() => {
        setMounted(true);
        if (!hasConsented()) {
            // Small delay so it doesn't flash immediately on page load
            const t = setTimeout(() => setShowBanner(true), 800);
            return () => clearTimeout(t);
        } else {
            setConsent(loadConsent());
        }
    }, []);

    const persist = useCallback((state: CookieConsentState) => {
        saveConsent(state);
        setConsent(state);
        setShowBanner(false);
        setShowCustomize(false);
    }, []);

    const handleAcceptAll = () => persist(buildAcceptAll());
    const handleRejectOptional = () => persist(buildRejectOptional());
    const handleSaveCustom = () => persist(buildCustom(draft));
    const openSettings = useCallback(() => {
        // Populate draft with current prefs if available
        const current = loadConsent();
        if (current) {
            setDraft({
                analytics: current.preferences.analytics,
                marketing: current.preferences.marketing,
                functional: current.preferences.functional,
            });
        }
        setShowCustomize(true);
        setShowBanner(true);
    }, []);

    const ctx: CookieConsentCtx = {
        consent,
        analyticsAllowed: consent?.preferences.analytics ?? false,
        marketingAllowed: consent?.preferences.marketing ?? false,
        functionalAllowed: consent?.preferences.functional ?? false,
        openSettings,
    };

    return (
        <Ctx.Provider value={ctx}>
            {children}

            {/* ── Overlay backdrop (only active when Customize modal is open) ── */}
            <AnimatePresence>
                {mounted && showBanner && showCustomize && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { setShowCustomize(false); setShowBanner(false); }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[9998]"
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* ── Customize Modal ── */}
            <AnimatePresence>
                {mounted && showBanner && showCustomize && (
                    <motion.div
                        key="customize"
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Cookie Preferences"
                        className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto sm:w-[420px] z-[9999] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-200 max-h-[85vh] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                                    <Gear weight="fill" className="w-4 h-4 text-red-600" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-extrabold text-gray-900 tracking-tight">Cookie Preferences</h2>
                                    <p className="text-[11px] text-gray-500">Manage what data we collect</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setShowCustomize(false); setShowBanner(false); }}
                                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                                aria-label="Close preferences"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Categories */}
                        <div className="flex-1 overflow-y-auto px-5 py-1 text-xs">
                            <p className="text-gray-500 py-2.5 leading-relaxed text-[11px]">
                                Choose which cookies you allow us to use. Essential cookies are required to operate the site.
                            </p>
                            <CategoryRow
                                id="necessary"
                                icon={<ShieldCheck weight="fill" className="w-4 h-4 text-emerald-600" />}
                                title="Necessary Cookies"
                                description="Essential for website navigation, booking flows, and authentication. Cannot be disabled."
                                checked={true}
                                onChange={() => {}}
                                disabled
                            />
                            <CategoryRow
                                id="analytics"
                                icon={<ChartBar weight="fill" className="w-4 h-4 text-blue-500" />}
                                title="Analytics Cookies"
                                description="Help us analyze site traffic and improve performance via anonymised metrics."
                                checked={draft.analytics}
                                onChange={(v) => setDraft(d => ({ ...d, analytics: v }))}
                            />
                            <CategoryRow
                                id="marketing"
                                icon={<Megaphone weight="fill" className="w-4 h-4 text-orange-500" />}
                                title="Marketing Cookies"
                                description="Used to deliver relevant trek recommendations and measure marketing campaigns."
                                checked={draft.marketing}
                                onChange={(v) => setDraft(d => ({ ...d, marketing: v }))}
                            />
                            <CategoryRow
                                id="functional"
                                icon={<Gear weight="fill" className="w-4 h-4 text-purple-500" />}
                                title="Functional Cookies"
                                description="Remember preferences like currency, region, and recently viewed treks."
                                checked={draft.functional}
                                onChange={(v) => setDraft(d => ({ ...d, functional: v }))}
                            />
                        </div>

                        {/* Footer Actions */}
                        <div className="px-5 py-3 border-t border-gray-100 flex gap-2 flex-shrink-0 bg-gray-50">
                            <button
                                onClick={handleSaveCustom}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-sm text-center"
                            >
                                Save Preferences
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="flex-1 bg-white hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg font-semibold text-xs border border-gray-200 transition-colors text-center"
                            >
                                Accept All
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Compact Floating Consent Banner ── */}
            <AnimatePresence>
                {mounted && showBanner && !showCustomize && (
                    <motion.div
                        key="banner"
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        role="dialog"
                        aria-modal="false"
                        aria-label="Cookie Consent"
                        className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-5 sm:right-5 sm:w-[390px] max-w-[420px] z-[9999] bg-white rounded-2xl shadow-xl border border-gray-200/90 overflow-hidden"
                    >
                        {/* Top subtle accent line */}
                        <div className="h-0.5 w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-400" />

                        <div className="p-4 sm:p-5">
                            {/* Header */}
                            <div className="flex items-center justify-between gap-3 mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck weight="fill" className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-sm font-bold text-gray-900 tracking-tight">We Value Your Privacy</h2>
                                </div>
                                <button
                                    onClick={handleRejectOptional}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
                                    title="Dismiss (keep essential only)"
                                    aria-label="Dismiss cookie banner"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Body Text */}
                            <p className="text-xs text-gray-600 leading-relaxed mb-3.5">
                                We use cookies to enhance your experience, analyse website traffic, and understand how visitors interact with our trails.
                            </p>

                            {/* Buttons: Side-by-Side Accept All & Reject */}
                            <div className="flex items-center gap-2 mb-2.5">
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow text-center cursor-pointer"
                                >
                                    Accept All
                                </button>
                                <button
                                    onClick={handleRejectOptional}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg font-semibold text-xs transition-colors text-center cursor-pointer"
                                >
                                    Reject Optional
                                </button>
                            </div>

                            {/* Footer links: Customize Preferences + Policies */}
                            <div className="flex items-center justify-between pt-1 text-[11px] text-gray-500">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDraft({ analytics: false, marketing: false, functional: false });
                                        setShowCustomize(true);
                                    }}
                                    className="inline-flex items-center gap-1 font-semibold text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                                >
                                    <Gear className="w-3 h-3" />
                                    Customise
                                    <CaretRight className="w-2.5 h-2.5" />
                                </button>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                    <a href="/policies/cookie" className="hover:underline hover:text-gray-600">Cookie Policy</a>
                                    <span>·</span>
                                    <a href="/policies/privacy" className="hover:underline hover:text-gray-600">Privacy</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Ctx.Provider>
    );
}

