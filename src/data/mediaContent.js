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

/** Banner (hero) copy for the Media & Events page. */
export const MEDIA_HERO = {
    badge: 'MEDIA & EVENTS',
    title: 'Stories, moments and milestones from Aba Power',
    subtitle:
        'A single home for our newsroom and a gallery of the events, community outreaches, safety drives and commissioning ceremonies shaping power across the Aba ring-fenced area.',
    stats: [
        { value: '6+', caption: 'Latest news stories' },
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
    MEDIA_HERO,
    MEDIA_NEWSROOM,
    MEDIA_GALLERY,
    MEDIA_CATEGORIES,
    DEFAULT_EVENTS,
};
