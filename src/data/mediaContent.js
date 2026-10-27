/**
 * Media & Events content.
 *
 * Backing copy for the standalone #/media page — the Newsroom plus the gallery
 * of events hosted by Aba Power. The gallery mirrors the `events` CMS
 * collection; the array below is the fallback used before/without a CMS so the
 * page always renders something meaningful. Kept as plain data so the page
 * component stays presentational and the copy is easy to edit in one place.
 */

/** Hash route that opens the dedicated Media & Events page. */
export const MEDIA_ROUTE_BASE = '/media';

/**
 * Hash route that opens a single news article (full story) page.
 *
 * Pass the article id as the slug, e.g. "#/news/nw-1". The id is used instead
 * of a text slug so a card can always deep-link to the exact CMS record.
 */
export const NEWS_ROUTE_BASE = '/news';

/** Turn any id/slug into a URL-safe token (used for both reading + writing). */
export function newsSlug(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/** Build the hash path for a news article, e.g. newsArticlePath('nw-1'). */
export function newsArticlePath(id) {
    return `${NEWS_ROUTE_BASE}/${encodeURIComponent(newsSlug(id))}`;
}

/**
 * Turn a human date like 'February 2024' into a sortable timestamp.
 * Anything unparseable sorts last (timestamp 0).
 */
export function newsTimestamp(value) {
    const time = Date.parse(String(value ?? ''));
    return Number.isNaN(time) ? 0 : time;
}

/**
 * Return a copy of the list ordered newest-first (most recent date first).
 * Used by the home newsroom, the Media & Events grid and the related-stories
 * block so every news surface shares one ordering.
 */
export function sortNewsByDateDesc(list = []) {
    return [...list].sort((a, b) => newsTimestamp(b.date) - newsTimestamp(a.date));
}

/** Banner (hero) copy for the Media & Events page. */
export const MEDIA_HERO = {
    badge: 'MEDIA & EVENTS',
    title: 'Stories, moments and milestones from Aba Power',
    subtitle:
        'A single home for our newsroom and a gallery of the events, community outreaches, safety drives and commissioning ceremonies shaping power across the Aba ring-fenced area.',
    stats: [
        { value: '12+', caption: 'Latest news stories' },
        { value: '12+', caption: 'Events in the gallery' },
        { value: '9 LGAs', caption: 'Communities reached' },
        { value: '24/7', caption: 'Newsroom updates' },
    ],
};

/** Copy for the newsroom block on this page. */
export const MEDIA_NEWSROOM = {
    eyebrow: 'NEWSROOM',
    title: 'Latest news from Aba Power',
    subtitle:
        'Press releases, company milestones, infrastructure projects and customer updates — straight from the Aba Power newsroom.',
};

/** Copy for the events gallery block on this page. */
export const MEDIA_GALLERY = {
    eyebrow: 'EVENTS GALLERY',
    title: 'Moments from events at Aba Power',
    subtitle:
        'Browse photos from commissioning ceremonies, community engagements, safety campaigns, industrial summits and staff events hosted across our network.',
};

/** Filter chips shown above the gallery (matched against an event's `category`). */
export const MEDIA_CATEGORIES = [
    'All',
    'Community',
    'Commissioning',
    'Safety',
    'Industry',
    'Corporate',
];

/**
 * Fallback newsroom stories.
 *
 * Mirrors the shape of items in the CMS `news` collection:
 *   id, title, category, date, readTime, image, summary, body, published
 * Used by <NewsRoom/> and the single-article page before/without a CMS so the
 * newsroom always renders. `body` is optional; when absent the `summary` is
 * used as the article lead.
 */
export const DEFAULT_NEWS = [
    {
        id: 'n-1',
        title: 'APL Electric Commissions 188MW Gas Plant',
        category: 'Company Milestone',
        date: 'February 2024',
        readTime: '4 min read',
        image:
            'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
        summary:
            'The integrated 188MW plant begins full commercial generation for the Aba network.',
        published: true,
    },
    {
        id: 'n-2',
        title: 'Aba Power Reaches 37,000+ Electrified Businesses',
        category: 'Industrial Growth',
        date: 'March 2024',
        readTime: '3 min read',
        image:
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
        summary:
            'Small and medium enterprises across the ring-fenced area are now connected to reliable supply.',
        published: true,
    },
    {
        id: 'n-3',
        title: '27km Owaza Gas Pipeline Delivers Reliable Fuel',
        category: 'Infrastructure',
        date: 'April 2024',
        readTime: '5 min read',
        image:
            'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80',
        summary:
            'Dedicated gas supply secures uninterrupted generation for the utility.',
        published: true,
    },
    {
        id: 'n-4',
        title: 'Smart Prepaid Metering Expands Across 9 LGAs',
        category: 'Customer Service',
        date: 'May 2024',
        readTime: '3 min read',
        image:
            'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
        summary:
            'STS-compliant meters bring accurate, transparent billing to more customers.',
        published: true,
    },
    {
        id: 'n-5',
        title: 'Enyimba Economic City Secures Dedicated Power Feed',
        category: 'Special Economic Zone',
        date: 'June 2024',
        readTime: '4 min read',
        image:
            'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&w=1200&q=80',
        summary:
            'A dedicated feeder now serves the industrial cluster at Enyimba Economic City.',
        published: true,
    },
    {
        id: 'n-6',
        title: 'APL Electric Partners on Quad Power Expansion (+375MW)',
        category: 'Future Energy',
        date: 'July 2024',
        readTime: '4 min read',
        image:
            'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
        summary:
            'The expansion raises combined capacity and strengthens grid resilience.',
        published: true,
    },
    {
        id: 'n-7',
        title: 'Aba Power Commissions New 33kV Injection Substation',
        category: 'Infrastructure',
        date: 'August 2024',
        readTime: '4 min read',
        image:
            'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
        summary:
            'The new substation strengthens voltage stability and adds headroom for growing industrial demand.',
        published: true,
    },
    {
        id: 'n-8',
        title: '24/7 Customer Care Centre Opens in Aba',
        category: 'Customer Service',
        date: 'September 2024',
        readTime: '3 min read',
        image:
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
        summary:
            'Dedicated agents now handle billing, metering and outage enquiries around the clock.',
        published: true,
    },
    {
        id: 'n-9',
        title: 'Aba Power Flags Off Industrial Cluster Metering Drive',
        category: 'Industrial Growth',
        date: 'October 2024',
        readTime: '4 min read',
        image:
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
        summary:
            'Factories and workshops across the ring-fenced area receive smart meters to sharpen billing accuracy.',
        published: true,
    },
    {
        id: 'n-10',
        title: 'APL Electric Trains 250 Youths in Power Sector Skills',
        category: 'Community',
        date: 'November 2024',
        readTime: '3 min read',
        image:
            'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
        summary:
            'The skills programme equips young people for careers across generation, distribution and safety.',
        published: true,
    },
    {
        id: 'n-11',
        title: 'Grid Resilience: Aba Power Rehabilitates 40km of Lines',
        category: 'Infrastructure',
        date: 'December 2024',
        readTime: '5 min read',
        image:
            'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1200&q=80',
        summary:
            'Reconductoring and pole replacement cut losses and improve supply reliability across the network.',
        published: true,
    },
    {
        id: 'n-12',
        title: 'Aba Power Marks 10,000 New Prepaid Meter Installations',
        category: 'Customer Service',
        date: 'January 2025',
        readTime: '3 min read',
        image:
            'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1200&q=80',
        summary:
            'The milestone brings transparent, prepaid billing to thousands more households and businesses.',
        published: true,
    },
];

/**
 * Fallback events gallery.
 *
 * Mirrors the shape of items in the CMS `events` collection:
 *   id, title, category, date, location, image, caption, published
 */
export const DEFAULT_EVENTS = [
    {
        id: 'ev-1',
        title: '188MW Gas Plant Commissioning Ceremony',
        category: 'Commissioning',
        date: 'February 2024',
        location: 'Osisioma, Aba',
        image:
            'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
        caption:
            'Executives cut the ribbon as the integrated 188MW gas-fired plant begins full commercial generation for the Aba network.',
        published: true,
    },
    {
        id: 'ev-2',
        title: 'Industrial Customers Power Summit',
        category: 'Industry',
        date: 'March 2024',
        location: 'Enyimba Economic City',
        image:
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        caption:
            'Manufacturers and maximum-demand customers meet to discuss reliable supply and industrial growth in Abia State.',
        published: true,
    },
    {
        id: 'ev-3',
        title: 'Community Electrification Sensitisation',
        category: 'Community',
        date: 'April 2024',
        location: 'Aba North LGA',
        image:
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
        caption:
            'Residents learn about safe electricity use and the new connections rolling out across the ring-fenced area.',
        published: true,
    },
    {
        id: 'ev-4',
        title: 'Safety First Field Crews Workshop',
        category: 'Safety',
        date: 'May 2024',
        location: 'Aba Power Training Centre',
        image:
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
        caption:
            'Field engineers and linesmen complete a refresher on PPE, safe isolation and emergency response.',
        published: true,
    },
    {
        id: 'ev-5',
        title: 'Smart Meter Rollout Launch',
        category: 'Commissioning',
        date: 'May 2024',
        location: 'Aba South LGA',
        image:
            'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
        caption:
            'STS-compliant prepaid meters begin installation, bringing accurate and transparent billing to more customers.',
        published: true,
    },
    {
        id: 'ev-6',
        title: 'Nkeanyi App Customer Clinic',
        category: 'Community',
        date: 'June 2024',
        location: 'Aba Power Service Centre',
        image:
            'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
        caption:
            'Customers are guided through digital vending, token purchase and outage reporting on the Nkeanyi App.',
        published: true,
    },
    {
        id: 'ev-7',
        title: 'Quarterly Stakeholders Forum',
        category: 'Corporate',
        date: 'June 2024',
        location: 'Aba Power Headquarters',
        image:
            'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
        caption:
            'Regulators, community leaders and customers review service performance and network expansion plans.',
        published: true,
    },
    {
        id: 'ev-8',
        title: 'Apprentice Electricians Graduation',
        category: 'Corporate',
        date: 'July 2024',
        location: 'Aba Power Training Centre',
        image:
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
        caption:
            'Local youths complete a skills programme in electrical installation, supporting jobs across the nine LGAs.',
        published: true,
    },
    {
        id: 'ev-9',
        title: 'Fallen Conductor Emergency Drill',
        category: 'Safety',
        date: 'July 2024',
        location: 'Osisioma Industrial Layout',
        image:
            'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
        caption:
            'The 24/7 rapid-response desk and crews rehearse isolating faults and restoring supply safely.',
        published: true,
    },
    {
        id: 'ev-10',
        title: 'Quad Power Expansion Groundbreaking',
        category: 'Commissioning',
        date: 'August 2024',
        location: 'Aba Generation Site',
        image:
            'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
        caption:
            'Partners break ground on the +375MW expansion that strengthens grid resilience for the region.',
        published: true,
    },
    {
        id: 'ev-11',
        title: 'Schools Electrical Safety Outreach',
        category: 'Safety',
        date: 'September 2024',
        location: 'Aba, Abia State',
        image:
            'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        caption:
            'Pupils learn to spot electrical hazards and stay safe around poles, transformers and appliances.',
        published: true,
    },
    {
        id: 'ev-12',
        title: 'Annual Staff Awards & Family Day',
        category: 'Corporate',
        date: 'October 2024',
        location: 'Aba Power Campus',
        image:
            'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
        caption:
            'Staff and families celebrate a year of service milestones, safety records and customer wins.',
        published: true,
    },
];

export default {
    MEDIA_ROUTE_BASE,
    NEWS_ROUTE_BASE,
    newsSlug,
    newsArticlePath,
    MEDIA_HERO,
    MEDIA_NEWSROOM,
    MEDIA_GALLERY,
    MEDIA_CATEGORIES,
    DEFAULT_NEWS,
    DEFAULT_EVENTS,
};
