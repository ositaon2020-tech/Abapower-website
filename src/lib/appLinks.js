/**
 * Nkeanyi App store links and device detection.
 *
 * Shared by the "Download Nkeanyi App" button, the "Get Nkeanyi App" banner
 * and the QR-code redirect page, so a store listing only ever needs updating in
 * one place.
 */

/** Google Play listing for the Android build. */
export const PLAY_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.aple.customer&pcampaignid=web_share';

/** Apple App Store listing for the iOS build. */
export const APP_STORE_URL =
    'https://apps.apple.com/ng/app/abapower-nkeanyi/id6795852912';

/**
 * Best-effort platform sniff for the current browser.
 *
 * Returns 'ios', 'android' or 'other'. Modern iPadOS reports itself as a
 * desktop "Macintosh", so touch-capable Macs are additionally treated as iOS.
 */
export function detectPlatform() {
    if (typeof navigator === 'undefined') return 'other';

    const ua = (navigator.userAgent || '').toLowerCase();
    const platform = (navigator.platform || '').toLowerCase();
    const maxTouchPoints = navigator.maxTouchPoints || 0;

    const isIOS =
        /iphone|ipad|ipod/.test(ua) ||
        (platform === 'macintel' && maxTouchPoints > 1);

    if (isIOS) return 'ios';
    if (/android/.test(ua)) return 'android';
    return 'other';
}

/**
 * Pick the store URL that matches the visitor's device. Anything that is not a
 * recognised phone or tablet (i.e. a desktop) falls back to Google Play.
 */
export function getAppStoreUrl() {
    return detectPlatform() === 'ios' ? APP_STORE_URL : PLAY_STORE_URL;
}

/** Smart-link page (in /public) that forwards scanners to the right store. */
export const SMART_APP_PATH = 'get-app.html';

/**
 * Absolute URL of the smart-link page for the *current* site.
 *
 * Deriving this from the live origin (and Vite's BASE_URL) instead of
 * hard-coding a production domain keeps the QR code working everywhere the
 * site is served from — localhost, preview/staging URLs, a GitHub Pages
 * sub-path and the final production domain — so a scanned code never points
 * at a host that doesn't actually serve the redirect page.
 */
export function getSmartAppUrl() {
    if (typeof window === 'undefined' || !window.location?.origin) {
        return `/${SMART_APP_PATH}`;
    }

    // Respect a configured base (e.g. "/Abapower-website/" on GitHub Pages)
    // while keeping the path root-relative to the current origin.
    const base = (import.meta?.env?.BASE_URL || '/').replace(/\/+$/, '');
    return `${window.location.origin}${base}/${SMART_APP_PATH}`;
}
