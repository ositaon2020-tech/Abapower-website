/**
 * Metering (MAP) content.
 *
 * Static, presentation-ready copy for the Metering programme reached from the
 * navbar sub-menu:
 *   #/metering                -> overview of every metering topic
 *   #/metering/<slug>         -> a single topic in detail
 *
 * The MAP (Meter Asset Provider) programme is the metering arm of the Aba
 * ring-fenced network: it funds, installs, owns and maintains the meters, while
 * Aba Power handles supply and billing. Copy mirrors the abapower.com Metering
 * section; keep edits here so the page component stays presentational.
 */

// Importing the asset (instead of a public path) keeps the download working in
// every environment, matching the pattern used by the customer-service forms.
import NEMSA_REQUIREMENTS_PDF from '../assets/NEMSA REQUIREMENTS.pdf';

export const METERING_ROUTE_BASE = '/metering';

/** The MAP Application now runs on the APLE meter-request portal. The navbar
    entry hands off to this external destination instead of an internal page. */
export const MAP_APPLICATION_URL =
    'https://aple.meterrequest.smartpowerbilling.com/#/about';

/** Attach the resolved icon component to each topic (called by the page). */
export function decorateMeteringTopics(topics = []) {
    return topics.map((topic) => ({ ...topic }));
}

export function getMeteringTopicBySlug(slug) {
    if (!slug) return null;
    return METERING_TOPICS.find((topic) => topic.slug === slug) || null;
}

/** Route helper: '#/metering/<slug>'. */
export function meteringTopicHref(slug) {
    return slug ? `${METERING_ROUTE_BASE}/${slug}` : METERING_ROUTE_BASE;
}

export const METERING_HERO = {
    badge: 'METERING',
    title: 'Metering under the',
    titleAccent: 'MAP programme',
    subtitle:
        'The Meter Asset Provider (MAP) regulation lets Aba Power fund, install and maintain meters for customers on the ring-fenced Aba network. Apply to get metered, track your portal, compare meter prices and specifications, and understand initialization and refunds.',
    stats: [
        { value: 'MAP', label: 'Asset provider funded' },
        { value: '0%', label: 'Upfront for eligible band' },
        { value: '5', label: 'Working days application review' },
        { value: '24/7', label: 'Portal access' },
    ],
};

/**
 * Each topic feeds both the overview grid and the detail page:
 *   slug        -> hash route segment
 *   title       -> menu label + page heading
 *   tagline     -> short menu/overview description
 *   iconKey     -> key in the page ICONS map (see MeteringPage.jsx)
 *   tone        -> 'blue' | 'gold' | 'dark' accent
 *   heroStat    -> { value, label } optional highlight
 *   intro       -> lead paragraph on the detail page
 *   sections[]  -> { heading, body?, bullets[] }
 *   downloads[] -> optional { label, description?, href, fileName, kind? } files
 *   checklist[] -> optional "what you will need" list
 *   cta         -> { label, href, note } action card
 */
export const METERING_TOPICS = [
    {
        slug: 'application',
        title: 'MAP Application',
        tagline: 'Begin your application to getting metered.',
        iconKey: 'document',
        tone: 'blue',
        heroStat: { value: '5 days', label: 'Typical review window' },
        intro:
            'The MAP Application is where every new metering journey starts. Under the Meter Asset Provider regulation, Aba Power funds the meter asset on your behalf, so you only complete a short application and we handle procurement, installation and maintenance on the Aba ring-fenced network.',
        sections: [
            {
                heading: 'Who can apply',
                bullets: [
                    'Residential customers on the Aba ring-fenced network who are not yet metered.',
                    'Commercial and small-business premises connected to the APL distribution grid.',
                    'Industrial customers requiring a dedicated, high-capacity meter and CT set.',
                    'Existing unmetered customers migrating onto the MAP programme.',
                ],
            },
            {
                heading: 'What you will need',
                bullets: [
                    'A valid means of identification (NIN, driver\u2019s licence, voter\u2019s card or passport).',
                    'Proof of ownership or a tenancy agreement for the premises.',
                    'Your Aba Power account number, where one already exists.',
                    'A recent phone number and email address for status updates.',
                ],
            },
            {
                heading: 'How the application works',
                bullets: [
                    'Submit the MAP application form with your details and supporting documents.',
                    'We verify your premises and confirm the connection and load requirements.',
                    'A meter type and installation window are assigned to your account.',
                    'You are notified when the installation team is scheduled to attend.',
                    'The meter is installed, initialized and commissioned on the network.',
                ],
            },
        ],
        cta: {
            label: 'Start your application',
            href: '#customer-service',
            note: 'Speak to the metering desk to begin',
        },
    },
    {
        slug: 'portal',
        title: 'MAP Customer Portal',
        tagline: 'Get answers and information on your meter usage.',
        iconKey: 'grid',
        tone: 'gold',
        heroStat: { value: '24/7', label: 'Self-service access' },
        intro:
            'The MAP Customer Portal is your self-service window into your meter. Track consumption, review vending history, download statements and raise metering requests without visiting an office.',
        sections: [
            {
                heading: 'What the portal shows you',
                bullets: [
                    'Live meter status, last communication and current balance.',
                    'Hourly, daily and monthly consumption trends for your premises.',
                    'Full vending and TID token history for every purchase.',
                    'Payment records and downloadable statements for reconciliation.',
                    'Pending requests, installation appointments and refund progress.',
                ],
            },
            {
                heading: 'Using the portal',
                bullets: [
                    'Sign in with the account number issued when your meter was commissioned.',
                    'Link additional premises or meters to a single login.',
                    'Set balance and consumption alerts so you never run out of credit.',
                    'Monitor your meter health if you suspect a fault or tampering.',
                    'Raise a request directly from any meter or vending record.',
                ],
            },
            {
                heading: 'Support',
                bullets: [
                    'Password resets and account linking are handled by the metering desk.',
                    'Portal data refreshes as meters report across the APL network.',
                    'For urgent meter faults, use the customer service hotline as well.',
                ],
            },
        ],
        cta: {
            label: 'Request portal access',
            href: '#customer-service',
            note: 'Get your login details from support',
        },
    },
    {
        slug: 'prices',
        title: 'Meter Prices',
        tagline: 'Get answers and information on the meter prices.',
        iconKey: 'creditCard',
        tone: 'dark',
        heroStat: { value: 'NERC', label: 'Approved pricing' },
        image: '/meter-prices.jpeg',
        imageAlt:
            'Deregulated meter prices valid till December 2026 for EVE Electric, HAMPOC, KAYZ, KELM, Master Energy and Sabrud single and three phase meters.',
        intro:
            'Meter prices on the MAP programme follow the transparent, regulator-approved schedule. Under the regulation, Aba Power as the Meter Asset Provider funds the meter, and the cost is recovered gradually rather than as a large upfront payment.',
        sections: [
            {
                heading: 'How MAP pricing works',
                bullets: [
                    'The meter cost is set by the regulator and published openly to all customers.',
                    'Aba Power funds the asset, so customers are not required to buy the meter outright.',
                    'Recovery is spread across a defined period as a small element of your energy charge.',
                    'Once fully recovered, no further meter charge applies to that asset.',
                ],
            },
            {
                heading: 'Price schedule',
                bullets: [
                    'Single-phase smart meter \u2014 standard residential premises.',
                    'Three-phase smart meter \u2014 larger homes and commercial premises.',
                    'CT-operated meter \u2014 maximum demand and industrial connections.',
                    'Replacement or repositioning \u2014 quoted where the request is customer-driven.',
                ],
            },
            {
                heading: 'Important notes',
                bullets: [
                    'Indicative rates are confirmed in your application before installation.',
                    'Refunds apply where a customer previously paid directly for a meter.',
                    'You will always receive a written breakdown before any charge applies.',
                ],
            },
        ],
        cta: {
            label: 'Request a price breakdown',
            href: '#customer-service',
            note: 'Get your confirmed meter cost',
        },
    },
    {
        slug: 'specifications',
        title: 'Meter Specifications',
        tagline: 'Get answers and information on the meter specifications.',
        iconKey: 'activity',
        tone: 'blue',
        heroStat: { value: 'Smart', label: 'Two-way enabled' },
        intro:
            'Every meter deployed on the Aba ring-fenced network meets the technical specification required for accurate measurement, remote communication and safe operation within the APL grid.',
        sections: [
            {
                heading: 'General specifications',
                bullets: [
                    'SABS / IEC compliant measurement class for billing accuracy.',
                    'Two-way communication for remote reading, configuration and diagnostics.',
                    'Tamper detection with event logging and outage notification.',
                    'Prepayment functionality with secure TID token acceptance.',
                    'Sealed, weather-rated enclosures suited to the Aba climate.',
                ],
            },
            {
                heading: 'Meter types deployed',
                bullets: [
                    'Single-phase smart prepaid meter \u2014 typical residential connections.',
                    'Three-phase smart prepaid meter \u2014 heavier domestic and small commercial loads.',
                    'CT-operated meter \u2014 industrial and maximum-demand customers.',
                ],
            },
            {
                heading: 'Installation standards',
                bullets: [
                    'Meters are installed by accredited technicians to APL network standards.',
                    'Each installation is tested, sealed and commissioned before energising.',
                    'All fittings are rated for the correct voltage, current and fault level.',
                    'Meter positions are recorded on the network for maintenance and safety.',
                ],
            },
        ],
        cta: {
            label: 'Ask about specifications',
            href: '#customer-service',
            note: 'Match a meter to your load',
        },
    },
    {
        slug: 'initialization',
        title: 'Meter Initialization',
        tagline: 'Get answers and information on the meter initialization.',
        iconKey: 'zap',
        tone: 'gold',
        heroStat: { value: 'Step 3', label: 'Commissioning stage' },
        intro:
            'Initialization is the final step that brings a newly installed meter to life. It links the device to the customer account, loads the tariff configuration and activates secure vending so the meter is ready for use.',
        sections: [
            {
                heading: 'The initialization process',
                bullets: [
                    'The installed meter is registered against your customer account number.',
                    'Network and tariff parameters for your customer class are loaded.',
                    'The secure vending keys and TID token scheme are provisioned.',
                    'The meter performs a self-check and confirms connection to the head-end.',
                    'Commissioning is signed off and the meter begins billing consumption.',
                ],
            },
            {
                heading: 'What you should see afterwards',
                bullets: [
                    'Your meter displays a live balance and accepts TID tokens.',
                    'Consumption appears against your account in the MAP Customer Portal.',
                    'Your first vend confirms the meter is correctly initialized.',
                ],
            },
            {
                heading: 'If something looks wrong',
                bullets: [
                    'A meter that will not accept a token may need re-initialization.',
                    'Report display errors, repeated outages or rejected tokens promptly.',
                    'The metering desk can re-provision a meter remotely where supported.',
                ],
            },
        ],
        downloads: [
            {
                label: 'NEMSA Requirements',
                description:
                    'The Nigerian Electricity Management Services Agency (NEMSA) requirements that apply to meter initialization on the Aba ring-fenced network. Download the document for the full compliance details.',
                href: NEMSA_REQUIREMENTS_PDF,
                fileName: 'NEMSA REQUIREMENTS.pdf',
                kind: 'PDF',
            },
        ],
        cta: {
            label: 'Report an initialization issue',
            href: '#customer-service',
            note: 'We will re-check your meter setup',
        },
    },
    {
        slug: 'refund',
        title: 'MAP Refund Summary',
        tagline: 'Get the refund summary.',
        iconKey: 'calculator',
        tone: 'dark',
        heroStat: { value: 'MAP', label: 'Refund entitlement' },
        intro:
            'The MAP Refund Summary explains the refunds available to customers who previously paid directly for their meter and are now being migrated onto the Meter Asset Provider programme.',
        sections: [
            {
                heading: 'When a refund applies',
                bullets: [
                    'A customer paid for a meter out of pocket before the MAP programme applied.',
                    'A customer-funded meter is being taken over under the MAP arrangement.',
                    'An overpayment or duplicate payment was made for meter equipment.',
                ],
            },
            {
                heading: 'How the refund is calculated',
                bullets: [
                    'The meter price is matched against the regulator-approved schedule.',
                    'Amounts already recovered through energy charges are deducted.',
                    'The net entitlement is confirmed and communicated in writing.',
                    'Approved refunds are credited to your account or paid to the customer.',
                ],
            },
            {
                heading: 'How to claim',
                bullets: [
                    'Provide your meter purchase receipt and account number.',
                    'The metering desk verifies the record against the asset register.',
                    'You receive a refund summary showing the calculation and status.',
                    'Track the refund to completion on the MAP Customer Portal.',
                ],
            },
        ],
        cta: {
            label: 'Check my refund entitlement',
            href: '#customer-service',
            note: 'Request your refund summary',
        },
    },
    {
        slug: 'new-connection',
        title: 'Request New Connection',
        tagline: 'Place your request for a new connection.',
        iconKey: 'factory',
        tone: 'blue',
        heroStat: { value: 'New', label: 'Connection requests' },
        intro:
            'Requesting a new connection starts you on the journey to becoming an Aba Power customer. Submit your request and we will assess the network, design the supply and schedule your metering under the MAP programme.',
        sections: [
            {
                heading: 'Who should apply',
                bullets: [
                    'New homes and buildings within the Aba ring-fenced network.',
                    'Businesses and commercial premises requiring a first-time supply.',
                    'Industrial customers with larger loads or dedicated transformer needs.',
                    'Existing premises that need an additional or upgraded connection.',
                ],
            },
            {
                heading: 'The connection journey',
                bullets: [
                    'Submit the new connection request with your location and load details.',
                    'A site visit confirms the available network and the supply route.',
                    'You receive a connection design, schedule and any applicable charges.',
                    'The connection and metering work is scheduled with you.',
                    'Your meter is installed and initialized, and supply is energised.',
                ],
            },
            {
                heading: 'Prepare for quicker service',
                bullets: [
                    'Have your identification and premises documents ready.',
                    'Provide an accurate description of the load you intend to connect.',
                    'Confirm clear access for the survey and installation teams.',
                ],
            },
        ],
        cta: {
            label: 'Place your request',
            href: '#customer-service',
            note: 'Start a new connection today',
        },
    },
];

/** Order used by the navbar sub-menu and the overview grid. The MAP Application
    entry is replaced by the APLE meter-request portal (external, new tab). */
export const METERING_MENU = METERING_TOPICS.map(({ slug, title, tagline }) => ({
    slug,
    label: title,
    tagline,
    href: slug === 'application' ? MAP_APPLICATION_URL : meteringTopicHref(slug),
}));

export default METERING_TOPICS;
