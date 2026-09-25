import { useCallback, useEffect, useRef, useState } from 'react';
import {
    EVENTS_KEY,
    getVisitorId,
    readEvents,
    writeEvents,
} from '../data/cms/analytics';
import { isSupabaseConfigured } from '../lib/supabase';
import {
    clearAnalyticsEvents,
    fetchAnalyticsEvents,
    recordAnalyticsEvent,
} from '../lib/cmsApi';
import { useAuth } from '../context/AuthContext';

/**
 * Lightweight first-party analytics capture.
 *
 * Records four kinds of interaction:
 *   - a `visit`   once per browser session (unique visitor + session)
 *   - a `view`    when the routed page changes
 *   - a `click`   for interactive elements tagged with `data-track="..."`
 *   - a `search`  when the visitor runs a site search
 *
 * Every event is written twice:
 *   1. to localStorage — instant, offline-safe, and used when the backend is
 *      not configured;
 *   2. to the Supabase `analytics_events` table — the shared record that the
 *      admin dashboard actually reports from, so numbers are consistent for
 *      every operator rather than per-browser.
 *
 * `useAnalytics()` is the read side used by the admin panel: it prefers the
 * cloud record and falls back to the local log.
 */

const SESSION_FLAG = 'abapower.analytics.counted.v1';

function inferSource() {
    if (typeof document === 'undefined') return 'Direct';
    const ref = document.referrer || '';
    if (!ref) return 'Direct';
    try {
        const host = new URL(ref).hostname.replace(/^www\./, '');
        if (host === window.location.hostname) return 'Direct';
        if (/google|bing|duckduckgo|yahoo|ecosia/i.test(host)) return 'Organic search';
        if (/facebook|instagram|twitter|x\.com|linkedin|tiktok|threads/i.test(host)) return 'Social';
        if (/mail|outlook|gmail/i.test(host)) return 'Email';
        return 'Referral';
    } catch {
        return 'Direct';
    }
}

function inferDevice() {
    if (typeof navigator === 'undefined') return 'Desktop';
    const ua = navigator.userAgent || '';
    if (/iPad|Tablet/i.test(ua)) return 'Tablet';
    if (/Mobi|Android|iPhone/i.test(ua)) return 'Mobile';
    return 'Desktop';
}

/** Append an event locally, keeping the stored log bounded. */
export function recordEvent(event) {
    const events = readEvents();
    events.push({ id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ...event });
    writeEvents(events);

    // Mirror to Supabase so the dashboard aggregates across all visitors, not
    // just this browser. Best-effort: a failure never blocks the page.
    if (isSupabaseConfigured) {
        recordAnalyticsEvent(event).catch(() => {
            /* analytics is best-effort by design */
        });
    }
}

/** Called once per page load from the app shell. */
export function startVisit() {
    if (typeof window === 'undefined') return;
    let alreadyCounted = false;
    try {
        alreadyCounted = sessionStorage.getItem(SESSION_FLAG) === '1';
    } catch {
        alreadyCounted = false;
    }

    if (!alreadyCounted) {
        recordEvent({
            type: 'visit',
            at: new Date().toISOString(),
            visitorId: getVisitorId(),
            source: inferSource(),
            device: inferDevice(),
            hour: new Date().getHours(),
        });
        try {
            sessionStorage.setItem(SESSION_FLAG, '1');
        } catch {
            /* private mode — cost is one extra visit event, acceptable */
        }
    }

    // Any click on an element tagged data-track="Label" becomes a click event.
    const onClick = (nativeEvent) => {
        const target = nativeEvent.target?.closest?.('[data-track]');
        if (!target) return;
        recordEvent({
            type: 'click',
            at: new Date().toISOString(),
            visitorId: getVisitorId(),
            label: target.getAttribute('data-track') || 'Unlabelled interaction',
            hour: new Date().getHours(),
        });
    };

    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
}

/** Record a route change (call with the current path). */
export function trackView(path) {
    recordEvent({
        type: 'view',
        at: new Date().toISOString(),
        visitorId: getVisitorId(),
        page: path || '/',
        hour: new Date().getHours(),
    });
}

/** Record a site-search query. */
export function trackSearch(keyword) {
    const term = (keyword || '').trim().toLowerCase();
    if (!term) return;
    recordEvent({
        type: 'search',
        at: new Date().toISOString(),
        visitorId: getVisitorId(),
        keyword: term,
        hour: new Date().getHours(),
    });
}

/**
 * Read side. Prefers the shared Supabase record (when the operator is signed
 * in) and falls back to this browser's local log. Returns the current events
 * plus `refresh` / `clear` controls for the dashboard.
 */
export function useAnalytics() {
    const { isAuthenticated } = useAuth();
    const [events, setEvents] = useState(() => readEvents());
    const [source, setSource] = useState('local');

    const refresh = useCallback(async () => {
        // A signed-in admin reads the aggregated cloud record.
        if (isAuthenticated && isSupabaseConfigured) {
            const cloud = await fetchAnalyticsEvents(90);
            if (cloud) {
                setEvents(cloud);
                setSource('cloud');
                return;
            }
        }
        setEvents(readEvents());
        setSource('local');
    }, [isAuthenticated]);

    // Load the aggregated record as soon as the read side mounts. State is only
    // touched inside the promise callback so no render is triggered mid-effect.
    useEffect(() => {
        let active = true;
        const fromCloud = isAuthenticated && isSupabaseConfigured;

        const load = fromCloud
            ? fetchAnalyticsEvents(90).then((cloud) => ({ next: cloud, from: 'cloud' }))
            : Promise.resolve({ next: readEvents(), from: 'local' });

        load.then(({ next, from }) => {
            if (!active) return;
            if (next) {
                setEvents(next);
                setSource(from);
            } else {
                // Cloud read failed — fall back to this browser's log.
                setEvents(readEvents());
                setSource('local');
            }
        });

        return () => {
            active = false;
        };
    }, [isAuthenticated]);

    const clear = useCallback(async () => {
        writeEvents([]);
        setEvents([]);
        if (isAuthenticated && isSupabaseConfigured) {
            await clearAnalyticsEvents();
        }
    }, [isAuthenticated]);

    // Keep two tabs of the dashboard in sync.
    useEffect(() => {
        const onStorage = (e) => {
            if (!e.key || e.key === EVENTS_KEY) {
                // Only re-read the local log while we are not serving cloud data.
                if (source !== 'cloud') setEvents(readEvents());
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, [source]);

    return { events, refresh, clear, source };
}

/** Convenience hook: fire a view event whenever `path` changes. */
export function usePageViews(path) {
    const last = useRef(null);
    useEffect(() => {
        if (last.current === path) return;
        last.current = path;
        trackView(path);
    }, [path]);
}
