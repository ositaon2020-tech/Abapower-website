/**
 * Privacy Policy content for the Nkeanyi App.
 *
 * Static, presentation-ready copy for the standalone Privacy page reached from
 * the footer ("Privacy"):
 *   #/privacy   -> the full Privacy Policy document
 *
 * Keep the wording verbatim and edit it here so the page component stays
 * presentational.
 */

export const PRIVACY_ROUTE_BASE = '/privacy';

export const PRIVACY_META = {
    badge: 'LEGAL',
    title: 'Privacy Policy',
    titleAccent: 'Nkeanyi App',
    appName: 'Nkeanyi App',
    provider: 'APL Electric Company Limited',
    effectiveDate: '29/01/2025',
    intro:
        'Welcome to Nkeanyi App (\u201cthe App\u201d), developed and operated by APL Electric (\u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d). APL Electric Company Limited is located at Suite 300, Aba Power Plaza, No. 2 Geometric Power Road, Osisioma-Aba, Abia State. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the App. By using the App, you agree to this Privacy Policy.',
    closing:
        'By using the Nkeanyi App, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.',
    thanks: 'Thank you for trusting APL Electric Company Limited and the Nkeanyi App.',
    address: [
        'APL Electric Company Limited',
        'Suite 300, Aba Power Plaza',
        'No. 2 Geometric Power Road',
        'Osisioma-Aba, Abia State',
    ],
    email: 'customercare@abapower.com',
    phone: '09162788075',
    rightsPhones: '09162788075',
};

/**
 * Each section renders as a titled block:
 *   heading    -> section title
 *   paragraphs -> lead paragraph(s)
 *   groups[]   -> optional { heading, bullets[] } sub-groups
 *   items[]    -> optional { label, text } labelled list
 *   bullets[]  -> optional plain bullet list
 *   note       -> optional closing sentence for the section
 *   contact    -> optional contact block (Contact Us)
 */
export const PRIVACY_SECTIONS = [
    {
        heading: 'Introduction',
        paragraphs: [
            'Welcome to Nkeanyi App (\u201cthe App\u201d), developed and operated by APL Electric (\u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d). APL Electric Company Limited is located at Suite 300, Aba Power Plaza, No. 2 Geometric Power Road, Osisioma-Aba, Abia State. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the App. By using the App, you agree to this Privacy Policy.',
        ],
    },
    {
        heading: 'Information We Collect',
        groups: [
            {
                heading: 'Personal Information',
                bullets: [
                    'Full name',
                    'Contact information such as email address and phone number',
                    'Address and location details',
                    'Wallet information including wallet balance and transaction history',
                    'Payment details such as bank account information and card details',
                    'Electricity account details including meter number and billing history',
                ],
            },
            {
                heading: 'Non-Personal Information',
                bullets: [
                    'Device information such as device type and operating system',
                    'Usage data including app interactions and features used',
                    'Log data such as IP address and access times',
                ],
            },
        ],
    },
    {
        heading: 'How We Use Your Information',
        bullets: [
            'To create and manage your wallet and account',
            'To process payments for electricity bills and wallet funding',
            'To provide customer support and resolve complaints',
            'To send notifications about your account, transactions, and updates',
            'To improve the App functionality and user experience',
            'To comply with legal and regulatory requirements',
        ],
    },
    {
        heading: 'How We Share Your Information',
        items: [
            {
                label: 'Payment Processors',
                text: 'We share payment details with VFD and Hydrogen, Switch Agent of Access Bank Nigeria, to process wallet funding and bill payments.',
            },
            {
                label: 'Service Providers',
                text: 'We share information with third-party providers who assist in operating the App such as hosting and analytics services.',
            },
            {
                label: 'Legal Compliance',
                text: 'We disclose information when required by law or to protect our rights and interests.',
            },
        ],
        note: 'We do not sell or rent your personal information to third parties.',
    },
    {
        heading: 'Data Security',
        paragraphs: [
            'We implement industry standard security measures including encryption, secure servers, and access controls to protect your information.',
        ],
    },
    {
        heading: 'Your Rights',
        items: [
            {
                label: 'Access',
                text: 'You may request a copy of the personal information we hold about you.',
            },
            {
                label: 'Correction',
                text: 'You may update or correct your information through the App or by contacting us.',
            },
            {
                label: 'Deletion',
                text: 'You may request deletion of your account and personal information, subject to legal obligations.',
            },
            {
                label: 'Opt-Out',
                text: 'You may opt out of receiving notifications or marketing communications.',
            },
        ],
        note: `To exercise these rights, contact us at ${PRIVACY_META.rightsPhones}.`,
    },
    {
        heading: 'Retention of Information',
        paragraphs: [
            'We retain personal information as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements.',
        ],
    },
    {
        heading: 'Children\u2019s Privacy',
        paragraphs: [
            'The App is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If such collection is identified, we will delete the information.',
        ],
    },
    {
        heading: 'Changes to This Privacy Policy',
        paragraphs: [
            'We may update this Privacy Policy from time to time. Updates will be posted in the App and the effective date will be revised. Continued use of the App after changes indicates acceptance of the updated policy.',
        ],
    },
    {
        heading: 'Contact Us',
        contact: true,
    },
    {
        heading: 'Consent',
        paragraphs: [
            'By using the Nkeanyi App, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.',
        ],
    },
];

export default PRIVACY_SECTIONS;
