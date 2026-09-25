/**
 * Customer Service content.
 *
 * Static, presentation-ready copy for the "Customer Service" navbar group and
 * the pages it links to:
 *   #/customer-service                     -> overview of every service topic
 *   #/customer-service/<slug>              -> a single topic in detail
 *
 * The group's sub-menu also points at a few Metering pages that already exist
 * (#/metering/application, #/metering/new-connection, #/metering/portal) and
 * opens the support / payment modals for tills that have no page of their own.
 * Keep the copy here so the page component stays presentational.
 */

export const CUSTOMER_SERVICE_ROUTE_BASE = '/customer-service';

/** SmartPowerBilling customer support desk. Tickets are raised here and the
    portal login lets customers track them. */
export const SUPPORT_TICKET_URL =
    'https://admin.smartpowerbilling.com/support/ticket/submit';
export const SUPPORT_LOGIN_URL = 'https://admin.smartpowerbilling.com/web/login';

/** Standalone page that hosts the downloadable new connection application form. */
export const NEW_CONNECTION_ROUTE_BASE = '/new-connection';

/** Smart Power billing portal the E-Billing entry logs in to. */
export const E_BILLING_LOGIN_URL = 'https://admin.smartpowerbilling.com/web/login';

/**
 * New Connection Request page. Hosts the official Aba Power new service
 * connection form so a new customer can download it, fill it in and return it
 * to management for processing.
 */
export const NEW_CONNECTION_PAGE = {
    badge: 'NEW CONNECTION REQUEST',
    title: 'Apply for a new',
    titleAccent: 'electricity connection',
    subtitle:
        'New customers can apply for supply on the Aba ring-fenced network by filling out our service connection form. Download the form below, complete every section and return it to Aba Power management for processing.',
    formFile: 'APLE-NEW-SERVICE-CONNECTION-FORM-1-1.pdf',
    formSize: 'PDF',
    stats: [
        { value: '1 form', label: 'Download and complete' },
        { value: '5 days', label: 'Typical review time' },
        { value: 'Free', label: 'To download' },
        { value: 'Email', label: 'Or hand-deliver to management' },
    ],
    steps: [
        {
            title: 'Download the form',
            body: 'Get the official Aba Power new service connection form as a PDF. Keep a copy to print or fill on screen.',
        },
        {
            title: 'Complete every section',
            body: 'Enter your name, address of the premises, the load you need and your contact details. Incomplete forms slow the review down.',
        },
        {
            title: 'Attach your documents',
            body: 'Include proof of ownership or occupancy and a valid means of identification for the applicant.',
        },
        {
            title: 'Return it to management',
            body: 'Send the completed form and attachments to the Aba Power team by email or drop it at our office for processing.',
        },
        {
            title: 'Survey and quotation',
            body: 'Our engineers survey the premises and prepare the connection plan and cost.',
        },
        {
            title: 'Metering and connection',
            body: 'Once approved, the connection is made and your meter is installed, initialized and commissioned.',
        },
    ],
    requirements: [
        'Completed Aba Power new service connection form.',
        'Proof of ownership or a valid tenancy agreement for the premises.',
        'A valid means of identification for the applicant.',
        'Your preferred contact phone number and email address.',
        'Details of the load or equipment you intend to connect.',
    ],
    submit: {
        email: 'info@abapower.com',
        phone: '0700-APL-POWER',
        note: 'Return the completed form to Aba Power management by email or at the customer service desk.',
    },
};

export function getCustomerServiceTopicBySlug(slug) {
    if (!slug) return null;
    return CUSTOMER_SERVICE_TOPICS.find((topic) => topic.slug === slug) || null;
}

/** Route helper: '#/customer-service/<slug>'. */
export function customerServiceTopicHref(slug) {
    return slug
        ? `${CUSTOMER_SERVICE_ROUTE_BASE}/${slug}`
        : CUSTOMER_SERVICE_ROUTE_BASE;
}

export const CUSTOMER_SERVICE_HERO = {
    badge: 'CUSTOMER SERVICE',
    title: 'Customer service at',
    titleAccent: 'Aba Power',
    subtitle:
        'Everything you need in one place: pay your bill with E-Billing to pay, track your MAP metering status, apply for a meter or a new connection, read the APLE FAQs, review tariffs and reach a support officer who can help.',
    stats: [
        { value: '24/7', label: 'E-Billing and portal access' },
        { value: '5 days', label: 'MAP application review' },
        { value: '100%', label: 'Ring-fenced Aba network' },
        { value: '0700', label: 'APL POWER hotline' },
    ],
};

/**
 * Each topic feeds both the overview grid and the detail page:
 *   slug        -> hash route segment
 *   title       -> menu label + page heading
 *   tagline     -> short menu/overview description
 *   iconKey     -> key in the page ICONS map (see CustomerServicePage.jsx)
 *   tone        -> 'blue' | 'gold' | 'dark'
 *   heroStat    -> { value, label } optional highlight
 *   intro       -> lead paragraph on the detail page
 *   sections[]  -> { heading, body?, bullets[] }
 *   cta         -> { label, href, note } action card
 */
export const CUSTOMER_SERVICE_TOPICS = [
    {
        slug: 'e-billing',
        title: 'E-Billing',
        tagline: 'Pay and manage your electricity bill online.',
        iconKey: 'creditCard',
        tone: 'blue',
        heroStat: { value: '24/7', label: 'Pay from anywhere' },
        intro:
            'E-Billing lets Aba Power customers see and settle their electricity bill electronically. Instead of travelling to a payment point or waiting for a paper notice, you can review what you owe, buy a TID token for your prepaid meter and keep a receipt for every payment — all from your phone or computer on the Aba ring-fenced network.',
        sections: [
            {
                heading: 'What you can do with E-Billing',
                bullets: [
                    'Check your current balance, last payment and outstanding amount.',
                    'Buy a TID token for your prepaid meter and receive it instantly.',
                    'Download or store a receipt for every transaction.',
                    'Keep a vending history that makes reconciliation simple.',
                    'Confirm that a payment has reached your meter or account.',
                ],
            },
            {
                heading: 'How to get started',
                bullets: [
                    'Have your meter number or Aba Power account number ready.',
                    'Open the TID Token page from the navigation bar or the button below.',
                    'Enter the meter number exactly as it appears on your meter or bill.',
                    'Complete the payment and load the token on your meter in the order purchased.',
                ],
            },
            {
                heading: 'Payments and receipts',
                bullets: [
                    'Approved payment channels credit your meter or account directly.',
                    'Always keep the receipt until the token or payment reflects.',
                    'Tokens that are not loaded in sequence may be rejected by the meter — always load in order of purchase.',
                    'If a payment does not reflect, contact the vending desk with your receipt.',
                ],
            },
        ],
        cta: {
            label: 'Log in to E-Billing',
            href: E_BILLING_LOGIN_URL,
            external: true,
            note: 'Sign in to the billing portal to review and settle your account',
        },
    },
    {
        slug: 'metering-status',
        title: 'MAP Metering Status',
        tagline: 'Get to know of your MAP metering status.',
        iconKey: 'activity',
        tone: 'gold',
        heroStat: { value: 'Live', label: 'Application tracking' },
        intro:
            'The MAP metering status shows exactly where your meter application has reached under the Meter Asset Provider programme — from the moment you apply, through survey and procurement, to installation, initialization and commissioning. Use it to know what happens next and when a team is expected at your premises.',
        sections: [
            {
                heading: 'The status stages',
                bullets: [
                    'Application received — your request is logged against your account.',
                    'Verification — your premises, connection and load details are confirmed.',
                    'Survey complete — the installation route and meter type are decided.',
                    'Meter assigned — your meter asset is procured and queued for installation.',
                    'Installation scheduled — a date and team are allocated to your premises.',
                    'Initialized and commissioned — the meter is live and billing consumption.',
                ],
            },
            {
                heading: 'How to check your status',
                bullets: [
                    'Sign in to the MAP Customer Portal to see the current stage and history.',
                    'Have your account number or meter number ready when you check.',
                    'Call the metering desk if you need the stage explained in detail.',
                    'Watch for SMS or email updates whenever your status changes.',
                ],
            },
            {
                heading: 'If your application is stuck',
                bullets: [
                    'Confirm that your identification and premises documents were accepted.',
                    'Check that access to the meter position is clear for the installation team.',
                    'Report any missing or incorrect detail so the record can be corrected.',
                    'Ask the metering desk to re-verify the status if it has not moved in five working days.',
                ],
            },
        ],
        cta: {
            label: 'Track on the MAP portal',
            href: '#/metering/portal',
            note: 'See your meter, consumption and application progress in one place',
        },
    },
    {
        slug: 'faqs',
        title: 'APLE FAQs',
        tagline: 'Get answers and information on your meter usage.',
        iconKey: 'messageSquare',
        tone: 'dark',
        heroStat: { value: 'Top 10', label: 'Customer questions' },
        intro:
            'These are the questions Aba Power customers ask most often about metering, tokens, bills and the ring-fenced Aba network. If your question is not answered here, the customer support desk is always ready to help.',
        sections: [
            {
                heading: 'Metering and the MAP programme',
                bullets: [
                    'What is MAP? The Meter Asset Provider regulation lets Aba Power fund, install, own and maintain your meter.',
                    'Do I pay for the meter upfront? For eligible customers the asset is provider-funded and recovered gradually through the energy charge.',
                    'How long does it take? Applications are typically reviewed within five working days.',
                    'Can I be metered if I am not yet connected? Yes — request a new connection and metering is planned as part of it.',
                ],
            },
            {
                heading: 'Tokens and vending',
                bullets: [
                    'Why was my token rejected? Load recharge tokens strictly in the order they were purchased.',
                    'Where do I buy a token? Use the TID Token page or an approved vending channel.',
                    'What if my meter will not accept a token? It may need re-initialization — report it to the metering desk.',
                    'Are my tokens secure? Every token is unique to your meter and its secure keys.',
                ],
            },
            {
                heading: 'Bills, tariffs and refunds',
                bullets: [
                    'How is my bill calculated? Your bill follows the regulator-approved tariff for your customer class and band.',
                    'Can a tariff change? Yes — tariff reviews are published whenever the regulator approves a change.',
                    'Do I qualify for a meter refund? Customers who previously paid directly for a meter may be entitled to a refund under MAP.',
                    'Who do I ask about a disputed charge? Contact customer support with your account number and the period in question.',
                ],
            },
        ],
        cta: {
            label: 'Ask customer support',
            href: '#customer-service',
            note: 'Speak to an officer about your meter, bill or token',
        },
    },
    {
        slug: 'tariff-information',
        title: 'Tariff Information',
        tagline: 'Learn more about the Mass Metering programme.',
        iconKey: 'calculator',
        tone: 'blue',
        heroStat: { value: 'NERC', label: 'Approved tariffs' },
        intro:
            'The Mass Metering programme is a national drive to close the metering gap — and tariff information sits at its centre. Understand how your customer class and band are set, what drives the rate you pay, and why metering is the foundation of a fair, transparent and sustainable electricity supply on the Aba ring-fenced network.',
        sections: [
            {
                heading: 'How tariff information works',
                bullets: [
                    'Every customer is placed in a class — residential, commercial or industrial.',
                    'A service band reflects the supply hours you reliably receive.',
                    'The regulator approves the rates and any review before they apply to you.',
                    'Your class and band are stated on your bill so you can verify what you pay.',
                ],
            },
            {
                heading: 'Why Mass Metering matters',
                bullets: [
                    'Metering removes estimated billing and charging on guesswork.',
                    'Accurate measurement protects you as much as it protects the network.',
                    'Metered customers can see and control their consumption.',
                    'The programme is funded so that cost is not a barrier to being metered.',
                ],
            },
            {
                heading: 'Where to get the details',
                bullets: [
                    'Read the tariff schedule to see current rates for your class.',
                    'Use the tariff calculator for an indicative cost based on your usage.',
                    'Request a written breakdown of any charge that is unclear.',
                    'Ask customer support to confirm the band applied to your premises.',
                ],
            },
        ],
        cta: {
            label: 'See current tariffs',
            href: '#stats',
            note: 'Review the ratings, bands and current rates published for the network',
        },
    },
    {
        slug: 'tariff-review',
        title: 'Tariff Review Application',
        tagline: 'A Commitment to Sustainable and Efficient Power Supply',
        iconKey: 'document',
        tone: 'gold',
        heroStat: { value: 'NERC', label: 'Application submitted' },
        intro:
            'APL Electric Company Ltd is committed to ensuring that the residents and businesses of Aba continue to enjoy reliable and sustainable electricity. In alignment with this commitment APLE has officially applied for a tariff review to the Nigerian Electricity Regulatory Commission (NERC).',
        body: [
            'This tariff review is a significant step towards achieving several key objectives including enhancing major infrastructure development, ensuring cost reflectivity and improving service delivery.',
            'APLE values the input and feedback of all our stakeholders, and as part of the tariff review process, we will be engaging with the customers through public consultations. These sessions will provide an opportunity for our customers to understand the necessity of the tariff revision, its benefits, and to voice any concerns. Dates and venues for these consultations will be announced shortly on our website and through local media.',
            'Aba Power understands that any change in tariffs affects many stakeholders, particularly our valued customers. We are committed to implementing this tariff review responsibly, aiming to balance the need for critical infrastructure improvements with the economic realities faced by our customers.',
            'We thank you for your continued trust and support in our efforts to enhance the power infrastructure and service quality in Aba.',
        ],
        sections: [],
        cta: {
            label: 'Read the latest updates',
            href: '#/media',
            note: 'Dates and venues for the public consultations will be announced on our website and through local media',
        },
    },
];

/** Order used by the overview grid and the page sidebar. */
export const CUSTOMER_SERVICE_MENU = CUSTOMER_SERVICE_TOPICS.map(
    ({ slug, title, tagline }) => ({
        slug,
        label: title,
        tagline,
        href: customerServiceTopicHref(slug),
    }),
);

export default CUSTOMER_SERVICE_TOPICS;
