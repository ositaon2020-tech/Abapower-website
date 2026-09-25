/**
 * Analytics data layer for the Aba Power content studio.
 *
 * The public site is a static bundle, so there is no server to collect hits.
 * This module models a realistic, *deterministic* analytics history and then
 * layers any real interactions captured in the visitor's browser on top:
 *
 *   1. Synthetic history — 90 days of day-buckets generated from a seeded
 *      PRNG (same date always yields the same numbers, so the graphs are
 *      stable across reloads and on every machine).
 *   2. Live capture — `trackView` / `trackClick` / `trackSearch` append raw
 *      events to localStorage; those events are folded into the same day
 *      buckets so today's totals move as people browse.
 *
 * Everything the dashboard renders is derived from one array of day buckets,
 * which keeps the aggregation code in a single, testable place.
 */

export const ANALYTICS_VERSION = 1;
export const EVENTS_KEY = 'abapower.analytics.events.v1';
export const VISITOR_KEY = 'abapower.analytics.visitor.v1';

/** Selectable reporting windows (days). */
export const RANGES = [
    { key: '7d', label: 'Last 7 days', days: 7 },
    { key: '30d', label: 'Last 30 days', days: 30 },
    { key: '90d', label: 'Last 90 days', days: 90 },
];

const HISTORY_DAYS = 90;
const MAX_EVENTS = 3000;

/* --------------------------------------------------------------- helpers */

/** Fast deterministic PRNG so synthetic data never flickers between loads. */
function mulberry32(seed) {
    let a = seed >>> 0;
    return function next() {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function hashString(value) {
    let h = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
        h ^= value.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

/** Local YYYY-MM-DD (never use toISOString — it shifts by the UTC offset). */
export function toDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function addDays(date, delta) {
    const next = new Date(date);
    next.setDate(next.getDate() + delta);
    return next;
}

/** Weighted pick from `[{ value, weight }]` using a [0,1) sample. */
function weightedPick(entries, sample) {
    const total = entries.reduce((sum, entry) => sum + entry.weight, 0);
    let cursor = sample * total;
    for (const entry of entries) {
        cursor -= entry.weight;
        if (cursor <= 0) return entry.value;
    }
    return entries[entries.length - 1].value;
}

/* --------------------------------------------------- synthetic taxonomies */

/** Section anchors of the single-page site. */
export const PAGE_LABELS = {
    '/': 'Home / Hero',
    '/#stats': 'Aba Power by the numbers',
    '/#media': 'Media & Grid Telemetry',
    '/#nkeanyi-web': 'Nkeanyi Web Concession',
    '/#industrial': 'Industrial Customers',
    '/#customer-service': 'Customer Service',
    '/#newsroom': 'Newsroom',
    '/#health-safety': 'Health & Safety',
};

const PAGE_WEIGHTS = [
    { value: '/', weight: 34 },
    { value: '/#customer-service', weight: 15 },
    { value: '/#stats', weight: 12 },
    { value: '/#newsroom', weight: 11 },
    { value: '/#media', weight: 9 },
    { value: '/#nkeanyi-web', weight: 8 },
    { value: '/#health-safety', weight: 6 },
    { value: '/#industrial', weight: 5 },
];

export const KEYWORD_WEIGHTS = [
    { value: 'power outage today', weight: 13 },
    { value: 'pay electricity bill', weight: 12 },
    { value: 'tid token', weight: 11 },
    { value: 'prepaid meter recharge', weight: 9 },
    { value: 'new connection application', weight: 8 },
    { value: 'electricity tariff 2026', weight: 7 },
    { value: 'meter reading', weight: 7 },
    { value: 'customer service number', weight: 6 },
    { value: 'nkeanyi app download', weight: 6 },
    { value: 'restore my power', weight: 5 },
    { value: 'aba ring fenced area', weight: 5 },
    { value: 'report faulty transformer', weight: 4 },
    { value: 'load shedding schedule', weight: 4 },
    { value: 'contact us', weight: 3 },
];

const SOURCE_WEIGHTS = [
    { value: 'Organic search', weight: 41 },
    { value: 'Direct', weight: 27 },
    { value: 'Social', weight: 16 },
    { value: 'Referral', weight: 10 },
    { value: 'Email', weight: 6 },
];

const DEVICE_WEIGHTS = [
    { value: 'Mobile', weight: 61 },
    { value: 'Desktop', weight: 31 },
    { value: 'Tablet', weight: 8 },
];

const CLICK_WEIGHTS = [
    { value: 'TID Token (pay)', weight: 14 },
    { value: 'Customer Support', weight: 11 },
    { value: 'Customer service / contact', weight: 9 },
    { value: 'Nkeanyi app download', weight: 9 },
    { value: 'Our operations', weight: 8 },
    { value: 'Projects / concession', weight: 7 },
    { value: 'Health & Safety', weight: 6 },
    { value: 'Newsroom article', weight: 6 },
    { value: 'Instagram', weight: 4 },
    { value: 'Facebook', weight: 4 },
    { value: 'X (Twitter)', weight: 3 },
    { value: 'LinkedIn', weight: 3 },
];

/* ------------------------------------------------------ bucket machinery */

function emptyBucket(date, label) {
    return {
        date,
        label,
        visitors: 0,
        sessions: 0,
        pageviews: 0,
        clicks: 0,
        searches: 0,
        newVisitors: 0,
        pages: {},
        keywords: {},
        sources: {},
        devices: {},
        clickLabels: {},
        hours: new Array(24).fill(0),
    };
}

function bump(map, key) {
    if (!key) return;
    map[key] = (map[key] || 0) + 1;
}

/**
 * Build one deterministic day bucket.
 * @param {Date} date
 * @param {number} index 0 = oldest of the seeded window
 */
function seedBucket(date, index, totalDays) {
    const dateKey = toDateKey(date);
    const label = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const bucket = emptyBucket(dateKey, label);

    const rnd = mulberry32(hashString(`${dateKey}:abapower`) >>> 0);

    // Gentle growth curve + weekend dip + per-day noise.
    const dow = date.getDay();
    const growth = 0.62 + (index / Math.max(totalDays - 1, 1)) * 0.8;
    const weekend = dow === 0 ? 0.58 : dow === 6 ? 0.7 : 1;
    const noise = 0.86 + rnd() * 0.28;
    const base = 210 * growth * weekend * noise;

    // A spike mid-window so the graph has a story (a big outage/news day).
    const spike = index === totalDays - 21 ? 1.85 : 1;

    bucket.visitors = Math.max(24, Math.round(base * spike));
    bucket.sessions = Math.round(bucket.visitors * (1.12 + rnd() * 0.22));
    bucket.pageviews = Math.round(bucket.sessions * (1.7 + rnd() * 0.7));
    bucket.clicks = Math.round(bucket.sessions * (0.94 + rnd() * 0.62));
    bucket.searches = Math.round(bucket.sessions * (0.19 + rnd() * 0.14));
    bucket.newVisitors = Math.round(bucket.visitors * (0.42 + rnd() * 0.24));

    for (let i = 0; i < bucket.pageviews; i += 1) {
        bump(bucket.pages, weightedPick(PAGE_WEIGHTS, rnd()));
    }
    for (let i = 0; i < bucket.clicks; i += 1) {
        bump(bucket.clickLabels, weightedPick(CLICK_WEIGHTS, rnd()));
    }
    for (let i = 0; i < bucket.searches; i += 1) {
        bump(bucket.keywords, weightedPick(KEYWORD_WEIGHTS, rnd()));
    }
    for (let i = 0; i < bucket.sessions; i += 1) {
        bump(bucket.sources, weightedPick(SOURCE_WEIGHTS, rnd()));
        bump(bucket.devices, weightedPick(DEVICE_WEIGHTS, rnd()));
    }

    // Traffic by hour: two peaks (mid-morning, evening) + a lunch dip.
    for (let h = 0; h < 24; h += 1) {
        const morning = Math.exp(-((h - 9.5) ** 2) / 9);
        const evening = Math.exp(-((h - 19) ** 2) / 12);
        const shape = 0.06 + morning * 0.9 + evening * 0.8;
        bucket.hours[h] = Math.round(bucket.visitors * shape * (0.7 + rnd() * 0.6) * 0.14);
    }

    return bucket;
}

/* -------------------------------------------------------- localStorage io */

export function readEvents() {
    if (typeof localStorage === 'undefined') return [];
    try {
        const raw = localStorage.getItem(EVENTS_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function writeEvents(events) {
    if (typeof localStorage === 'undefined') return;
    try {
        localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
    } catch {
        /* quota exceeded — analytics is best-effort, never block the UI */
    }
}

/** Stable per-browser visitor id so "unique visitors" means something. */
export function getVisitorId() {
    if (typeof localStorage === 'undefined') return 'anon';
    try {
        const existing = localStorage.getItem(VISITOR_KEY);
        if (existing) return existing;
        const id = `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
        localStorage.setItem(VISITOR_KEY, id);
        return id;
    } catch {
        return 'anon';
    }
}

/* ---------------------------------------------------------- aggregation */

function foldEvent(bucket, event) {
    const type = event.type;
    if (type === 'view') {
        bucket.pageviews += 1;
        bump(bucket.pages, event.page);
    } else if (type === 'click') {
        bucket.clicks += 1;
        bump(bucket.clickLabels, event.label);
    } else if (type === 'search') {
        bucket.searches += 1;
        bump(bucket.keywords, event.keyword);
    } else if (type === 'visit') {
        bucket.visitors += 1;
        bucket.newVisitors += 1;
    }
    if (event.hour != null) bump(bucket.hours, event.hour);
    if (event.source) bump(bucket.sources, event.source);
    if (event.device) bump(bucket.devices, event.device);
}

/**
 * Return the last `days` day-buckets (oldest → newest), merging the synthetic
 * history with any real events captured in this browser.
 */
export function buildDailyBuckets(days = HISTORY_DAYS, now = new Date(), events = readEvents()) {
    const start = addDays(now, -(days - 1));
    const buckets = [];
    const byDate = new Map();

    for (let i = 0; i < days; i += 1) {
        const date = addDays(start, i);
        const bucket = seedBucket(date, i, days);
        buckets.push(bucket);
        byDate.set(bucket.date, bucket);
    }

    // Only count real events that fall inside the requested window.
    for (const event of events) {
        if (!event || !event.at) continue;
        const when = new Date(event.at);
        if (Number.isNaN(when.getTime())) continue;
        const key = toDateKey(when);
        const bucket = byDate.get(key);
        if (!bucket) continue;
        foldEvent(bucket, event);
    }

    return buckets;
}

/** Sum a numeric field across buckets. */
const sumBy = (buckets, field) => buckets.reduce((sum, b) => sum + (b[field] || 0), 0);

/** Merge every `{key: count}` map across buckets, sorted high → low. */
function mergeMaps(buckets, field) {
    const totals = new Map();
    for (const bucket of buckets) {
        for (const [key, value] of Object.entries(bucket[field] || {})) {
            totals.set(key, (totals.get(key) || 0) + value);
        }
    }
    return [...totals.entries()]
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value);
}

function sumHours(buckets) {
    const hours = new Array(24).fill(0);
    for (const bucket of buckets) {
        bucket.hours.forEach((value, index) => {
            hours[index] += value;
        });
    }
    return hours;
}

const percent = (part, whole) => (whole > 0 ? Math.round((part / whole) * 1000) / 10 : 0);

/**
 * Turn day buckets into everything the dashboard needs:
 * KPIs, the two chart series, and the ranked breakdown tables.
 */
export function summarize(buckets) {
    const visitors = sumBy(buckets, 'visitors');
    const sessions = sumBy(buckets, 'sessions');
    const pageviews = sumBy(buckets, 'pageviews');
    const clicks = sumBy(buckets, 'clicks');
    const searches = sumBy(buckets, 'searches');
    const newVisitors = sumBy(buckets, 'newVisitors');

    // Split the window in half to report a period-over-period delta.
    const half = Math.floor(buckets.length / 2) || 1;
    const priorBuckets = buckets.slice(0, half);
    const recentBuckets = buckets.slice(half);
    const priorVisitors = sumBy(priorBuckets, 'visitors') || 1;
    const recentVisitors = sumBy(recentBuckets, 'visitors');
    const visitorsDelta = percent(recentVisitors - priorVisitors, priorVisitors);
    const priorClicks = sumBy(priorBuckets, 'clicks') || 1;
    const clicksDelta = percent(sumBy(recentBuckets, 'clicks') - priorClicks, priorClicks);

    return {
        totals: {
            visitors,
            sessions,
            pageviews,
            clicks,
            searches,
            newVisitors,
            returning: Math.max(visitors - newVisitors, 0),
            pagesPerSession: sessions > 0 ? Math.round((pageviews / sessions) * 100) / 100 : 0,
            clickThroughRate: percent(clicks, pageviews),
            visitorsDelta,
            clicksDelta,
        },
        series: buckets.map((bucket) => ({
            date: bucket.date,
            label: bucket.label,
            visitors: bucket.visitors,
            clicks: bucket.clicks,
            pageviews: bucket.pageviews,
            searches: bucket.searches,
        })),
        topPages: mergeMaps(buckets, 'pages'),
        topKeywords: mergeMaps(buckets, 'keywords'),
        topClicks: mergeMaps(buckets, 'clickLabels'),
        sources: mergeMaps(buckets, 'sources'),
        devices: mergeMaps(buckets, 'devices'),
        hourly: sumHours(buckets),
    };
}

/** Convenience: one call to get the whole report for a window. */
export function buildReport(days, now = new Date(), events = readEvents()) {
    return summarize(buildDailyBuckets(days, now, events));
}

/** Human-friendly "12 Mar 2026" for tooltips and table rows. */
export function formatDayLabel(dateKey) {
    const [y, m, d] = dateKey.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}
