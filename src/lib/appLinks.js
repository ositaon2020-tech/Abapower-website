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
