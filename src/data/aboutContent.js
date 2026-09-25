/**
 * About Us content.
 *
 * Mirrors the copy published on abapower.com so the standalone #/about-us
 * page reads like the official site. Kept as plain data so the page component
 * stays presentational and the copy is easy to edit in one place.
 */

// Bundled locally (rather than a remote URL) so the section image is visible in
// every environment, matching the pattern used by the leadership portraits.
import polePng from '../assets/polee.png';

/** Hash route that opens the dedicated About Us page. */
export const ABOUT_ROUTE_BASE = '/about-us';

/** Hash route that opens the dedicated Leadership page. */
export const LEADERSHIP_ROUTE_BASE = '/leadership';

export const ABOUT_HERO = {
    badge: 'ABOUT US',
    title: 'Powering Aba, one connection at a time',
    subtitle:
        'Aba Power Limited (APL) is a pioneer private-sector electricity distribution licensee of the Nigerian Electricity Regulatory Commission (NERC), delivering reliable power across the Aba ring-fenced area.',
    imageUrl:
        'https://thesouthernexaminer.com/21-04-2023-05-22-54-am-411344.jpg',
    stats: [
        { value: '188MW', caption: 'Embedded generation capacity' },
        { value: '9 LGAs', caption: 'Ring-fenced service area' },
        { value: '2800+', caption: 'Distribution substations' },
        { value: '37,000+', caption: 'Businesses electrified' },
    ],
};

/** The story / who-we-are block. */
export const ABOUT_INTRO = {
    eyebrow: 'WHO WE ARE',
    title: 'A pioneer of private power distribution in Nigeria',
    paragraphs: [
        'APL Electric Company Limited (APLE) is a special purpose vehicle of the Aba Integrated Power Project, established to distribute electricity to consumers within its ring-fenced Aba metropolis.',
        'We are a pioneer private sector licensee of the Nigerian Electricity Regulatory Commission (NERC) for electricity distribution in Nigeria. From generation through to the last mile, we own and operate the infrastructure that keeps homes, businesses and industries powered.',
        'Through state-of-the-art technology and distribution expertise, Aba Power supports reliable power delivery to customers, industries and communities across Abia State — improving lives, enabling enterprise and driving industrial growth.',
    ],
    /* Distribution pole on the Aba network — the "who we are" distribution story. */
    imageUrl: polePng,
    highlights: [
        'Pioneer NERC-licensed private distribution utility',
        'Integrated generation, distribution and metering',
        'Ring-fenced Aba service area covering 9 LGAs',
        'Dedicated 27km Owaza gas pipeline supply',
    ],
};

/** Mission, Vision and Values cards. */
export const ABOUT_PILLARS = [
    {
        key: 'mission',
        label: 'Our Mission',
        iconKey: 'zap',
        body: 'To deliver safe, reliable and affordable electricity that powers enterprise, improves quality of life and drives industrial growth across the Aba ring-fenced area.',
    },
    {
        key: 'vision',
        label: 'Our Vision',
        iconKey: 'activity',
        body: 'To be the most reliable and customer-centric power distribution company in Nigeria — a benchmark for private-sector utility excellence.',
    },
    {
        key: 'values',
        label: 'Our Values',
        iconKey: 'shield',
        body: 'Safety first, integrity, customer focus and innovation. We act responsibly toward our people, our customers and the communities we serve.',
    },
];

/**
 * The INSPIRED values.
 *
 * The acronym spells out the six commitments that guide how Aba Power works.
 * Each entry keeps its letter(s) so the UI can set them apart typographically.
 */
export const ABOUT_INSPIRED = {
    eyebrow: 'OUR INSPIRED VALUES',
    title: 'The values that inspire us',
    intro:
        'INSPIRED is more than an acronym — it is the standard our people apply to every wire strung, every meter installed and every customer served.',
    values: [
        {
            key: 'in',
            letter: 'IN',
            label: 'Integrity',
            body: 'Business conducted with honesty, transparency, and accountability.',
        },
        {
            key: 's',
            letter: 'S',
            label: 'Social Responsibility',
            body: 'Commitment to employee safety and community wellbeing.',
        },
        {
            key: 'p',
            letter: 'P',
            label: 'Professionalism',
            body: 'Technical expertise and ethical conduct guide operations.',
        },
        {
            key: 'i',
            letter: 'I',
            label: 'Innovation',
            body: 'Continuous improvement through modern technology.',
        },
        {
            key: 're',
            letter: 'RE',
            label: 'Reliability',
            body: 'Infrastructure investment ensures stable power delivery.',
        },
        {
            key: 'd',
            letter: 'D',
            label: 'Dynamic',
            body: 'Adaptable strategies responding to an evolving energy sector.',
        },
    ],
};

/** Headline figures shown in the "by the numbers" band. */
export const ABOUT_STATS = [
    { value: '188MW', caption: 'Installed generation capacity' },
    { value: '110km+', caption: 'Overhead distribution lines' },
    { value: '11', caption: '33KV feeders' },
    { value: '35', caption: '11KV feeders' },
    { value: '2800+', caption: 'Distribution substations' },
    { value: '11', caption: 'Injection substations' },
    { value: '9 LGAs', caption: 'Aba ring-fenced area' },
    { value: '1538', caption: 'Maximum demand customers' },
];

/** What we do — service capability cards. */
export const ABOUT_SERVICES = [
    {
        iconKey: 'activity',
        title: 'Generation',
        body: 'The integrated 188MW gas-fired plant, fed by the dedicated 27km Owaza gas pipeline, secures uninterrupted power for the network.',
    },
    {
        iconKey: 'grid',
        title: 'Distribution',
        body: 'Over 110km of overhead lines, 33KV and 11KV feeders and 2,800+ substations deliver power across the ring-fenced area.',
    },
    {
        iconKey: 'creditCard',
        title: 'Metering & Vending',
        body: 'STS-compliant smart prepaid metering and the Nkeanyi App bring accurate, transparent billing to every customer.',
    },
    {
        iconKey: 'factory',
        title: 'Industrial Supply',
        body: 'Dedicated feeders and maximum-demand supply keep factories, SMEs and the Enyimba Economic City cluster running.',
    },
];

/** Milestones timeline. */
export const ABOUT_MILESTONES = [
    {
        year: '2012',
        title: 'Aba Integrated Power Project',
        body: 'APLE is incorporated as the special purpose vehicle for electricity distribution within the Aba ring-fenced area.',
    },
    {
        year: '2013',
        title: 'NERC Distribution Licence',
        body: 'Aba Power becomes a pioneer private-sector distribution licensee, taking over the Aba electricity network.',
    },
    {
        year: '2020',
        title: '27km Owaza Gas Pipeline',
        body: 'A dedicated gas supply line is completed, securing reliable fuel for embedded generation.',
    },
    {
        year: '2024',
        title: '188MW Generation & Expansion',
        body: 'Full commercial generation begins and partnership on the Quad Power expansion (+375MW) strengthens grid resilience.',
    },
];

/** Why Aba Power matters — impact points. */
export const ABOUT_IMPACT = [
    {
        title: 'Reliable supply',
        body: 'A modern, well-maintained network that keeps the lights on for homes and businesses.',
    },
    {
        title: 'Industrial growth',
        body: 'Powering 37,000+ businesses and the industries that drive the Abia State economy.',
    },
    {
        title: 'Community impact',
        body: 'Community sensitisation, safety programmes and local employment across the 9 LGAs.',
    },
    {
        title: 'Customer service',
        body: 'A 24/7 rapid-response desk, outage tracker and digital vending for fast, transparent service.',
    },
];

/**
 * Leadership page copy and the executive team.
 *
 * Each member carries a portrait, the office they hold and a short biography
 * that is revealed inside the "Read Bio" disclosure on the Leadership page.
 */
export const LEADERSHIP_INTRO = {
    badge: 'LEADERSHIP',
    title: 'Leadership',
    subtitle:
        'Guided by seasoned industry expertise, Aba Power’s executive leadership is focused on building a resilient, world-class energy network for our city. Meet The Team',
};

export const LEADERSHIP_MEMBERS = [
    {
        key: 'opiegbe',
        name: 'Barr. Ugochukwu Opiegbe',
        role: 'MD, APL Electric Company Limited',
        image:
            '/Users/apple/.gemini/antigravity/scratch/abapower-website/src/assets/Ugo Opiegebe.jpeg?auto=format&fit=crop&w=900&q=80',
        bio: 'Ugochukwu Opiegbe is the Managing Director of APL Electric Company Limited, leading Aba Power’s distribution business across the Aba ring-fenced area. A legal practitioner and seasoned business executive, he oversees commercial strategy, regulatory compliance and customer operations — driving the company’s mission to deliver reliable, affordable power to homes, businesses and industries across Abia State.',
    },
    {
        key: 'siddi',
        name: 'Engr. Omeh Abdullahi Siddi',
        role: 'CTA, APL Electric Company Limited',
        image:
            '/Users/apple/.gemini/antigravity/scratch/abapower-website/src/assets/Omeh Abdullahi.jpeg?auto=format&fit=crop&w=900&q=80',
        bio: 'Engr. Omeh Abdullahi Siddi serves as Chief Technical Adviser at APL Electric Company Limited. A chartered engineer with decades of experience in power generation and distribution, he provides technical leadership across the network — from the 188MW embedded generation plant to the 2,800+ distribution substations that keep Aba powered.',
    },
    {
        key: 'nmaram',
        name: 'Engr. Livinus Nwaoha Nmaram',
        role: 'DL&D, Geometric Power Training Institute',
        image:
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
        bio: 'Engr. Livinus Nwaoha Nmaram is Director of Learning & Development at the Geometric Power Training Institute. He leads capability building for the group’s engineering and technical workforce, ensuring the skills, safety culture and standards required to operate and grow a modern, resilient electricity network.',
    },
    {
        key: 'ngwoke',
        name: 'Engr. Emeka Victor Ngwoke',
        role: 'DCO, APL Electric Company Limited',
        image:
            '/Users/apple/.gemini/antigravity/scratch/abapower-website/src/assets/Emeka Victor.jpeg?auto=format&fit=crop&w=900&q=80',
        bio: 'Engr. Emeka Victor Ngwoke is the Distribution Control Officer at APL Electric Company Limited. He oversees real-time network operations — load management, switching and fault restoration — coordinating field crews to keep supply stable across the Aba ring-fenced area.',
    },
    {
        key: 'okonji',
        name: 'Chigozie Okonji',
        role: 'HHR, Geometric Power Group',
        image:
            '/Users/apple/.gemini/antigravity/scratch/abapower-website/src/assets/Chigozie Okonji.jpeg?auto=format&fit=crop&w=900&q=80',
        bio: 'Chigozie Okonji leads Human Resources for the Geometric Power Group. She is responsible for talent acquisition, employee engagement, performance management and the people policies that build a capable, motivated workforce for the group’s energy businesses.',
    },
    {
        key: 'agbo',
        name: 'Stephen Chijioke Agbo',
        role: 'HF&A, APL Electric Company Limited',
        image:
            '/Users/apple/.gemini/antigravity/scratch/abapower-website/src/assets/Stephen Agbo.jpeg?auto=format&fit=crop&w=900&q=80',
        // Framed centrally so the portrait sits inside the card cover instead of
        // being cropped to the top edge.
        imagePosition: 'object-center',
        bio: 'Stephen Chijioke Agbo is Head of Finance & Accounts at APL Electric Company Limited. He manages financial reporting, treasury, budgeting and internal controls, ensuring the utility remains financially disciplined, transparent and able to invest in network reliability.',
    },
    {
        key: 'akpata',
        name: 'Simon Akpata',
        role: 'Head Tech, APL Electric Company Limited',
        image:
            '/Users/apple/.gemini/antigravity/scratch/abapower-website/src/assets/Simon Akpata.jpeg?auto=format&fit=crop&w=900&q=80',
        bio: 'Simon Akpata is Head of Technology at APL Electric Company Limited. He leads the utility’s technical function — network planning, asset management and maintenance — ensuring the Aba distribution infrastructure is upgraded, safe and operated to modern engineering standards.',
    },
];

export default {
    ABOUT_ROUTE_BASE,
    ABOUT_HERO,
    ABOUT_INTRO,
    ABOUT_PILLARS,
    ABOUT_STATS,
    ABOUT_SERVICES,
    ABOUT_MILESTONES,
    ABOUT_IMPACT,
    ABOUT_INSPIRED,
    LEADERSHIP_ROUTE_BASE,
    LEADERSHIP_INTRO,
    LEADERSHIP_MEMBERS,
};
