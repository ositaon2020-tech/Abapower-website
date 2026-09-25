/**
 * Terms and Conditions content for the Nkeanyi App.
 *
 * Static, presentation-ready copy for the standalone Terms page reached from
 * the footer ("Terms & Conditions"):
 *   #/terms   -> the full Terms and Conditions document
 *
 * Keep the wording verbatim and edit it here so the page component stays
 * presentational.
 */

export const TERMS_ROUTE_BASE = '/terms';

export const TERMS_META = {
    badge: 'LEGAL',
    title: 'Terms and Conditions',
    titleAccent: 'Nkeanyi App',
    appName: 'Nkeanyi App',
    provider: 'APL Electric',
    lastUpdated: '29/01/2025',
    intro:
        'Welcome to Nkeanyi App (the \u201cApp\u201d), a mobile application provided by APL Electric (\u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d), located at Suite 300, Aba Power Plaza, No. 2 Geometric Power Road, Osisioma-Aba, Abia State, Nigeria. By downloading, accessing, or using the App, you agree to be bound by these Terms and Conditions (\u201cTerms\u201d). If you do not agree to these Terms, please do not use the App.',
    closing:
        'By using the Nkeanyi App, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.',
    thanks: 'Thank you for choosing Nkeanyi App.',
    address: [
        'APL Electric',
        'Suite 300, Aba Power Plaza,',
        'No. 2 Geometric Power Road,',
        'Osisioma-Aba, Abia State, Nigeria.',
    ],
    email: 'customercare@abapower.com',
    phone: '09162788075',
};

/**
 * Each section renders as a numbered block:
 *   heading    -> section title
 *   paragraphs -> lead paragraph(s)
 *   items[]    -> optional { label, text } feature list (App Features)
 *   bullets[]  -> optional plain bullet list
 *   contact    -> optional contact block (Contact Us)
 */
export const TERMS_SECTIONS = [
    {
        heading: '1. Acceptance of Terms',
        paragraphs: [
            'By using the Nkeanyi App, you confirm that you are at least 18 years old or have the legal capacity to enter into a binding agreement. You agree to comply with these Terms and all applicable laws and regulations.',
        ],
    },
    {
        heading: '2. App Features',
        paragraphs: ['The Nkeanyi App provides the following features:'],
        items: [
            {
                label: 'Wallet Management',
                text: 'Create and view your wallet. Accumulate bonuses in your wallet.',
            },
            {
                label: 'Wallet Funding',
                text: 'Fund your wallet using VFD or Hydrogen (the switch agent of Access Bank Nigeria).',
            },
            {
                label: 'Bill Payments',
                text: 'Pay your electricity bills directly through the App.',
            },
            {
                label: 'Arrears Viewing',
                text: 'View any outstanding arrears on your account.',
            },
            {
                label: 'Transaction History',
                text: 'View recent transactions and access your transaction history.',
            },
            {
                label: 'Account Status and Complaints',
                text: 'View your account status and submit complaints through the App.',
            },
            {
                label: 'Notifications',
                text: 'Receive notifications regarding your account, transactions, and other relevant updates.',
            },
        ],
    },
    {
        heading: '3. Account Registration and Security',
        bullets: [
            'To use the App, you must register and create an account. You agree to provide accurate and complete information during registration.',
            'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
            'Notify us immediately of any unauthorized use of your account or any other security breach.',
        ],
    },
    {
        heading: '4. Wallet and Payments',
        bullets: [
            'The wallet feature allows you to store funds for electricity bill payments and other transactions.',
            'Funds in your wallet are non-transferable and can only be used for transactions within the App.',
            'APL Electric reserves the right to deduct any arrears or outstanding balances from your wallet.',
            'All payments made through the App are final and non-refundable, except as required by law or at our discretion.',
        ],
    },
    {
        heading: '5. Complaints and Dispute Resolution',
        bullets: [
            'Complaints submitted through the App will be addressed in accordance with APL Electric\u2019s internal policies.',
            'We aim to resolve complaints within a reasonable time frame. Resolution times may vary depending on the nature of the complaint.',
        ],
    },
    {
        heading: '6. Notifications',
        bullets: [
            'By using the App, you consent to receive notifications, including transactional alerts, promotional messages, and service updates.',
            'You can manage your notification preferences in the App settings.',
        ],
    },
    {
        heading: '7. Prohibited Activities',
        paragraphs: ['You agree not to:'],
        bullets: [
            'Use the App for any illegal or unauthorized purpose.',
            'Attempt to gain unauthorized access to the App or its systems.',
            'Interfere with or disrupt the App\u2019s functionality or servers.',
            'Use the App to harass, defame, or harm others.',
        ],
    },
    {
        heading: '8. Intellectual Property',
        bullets: [
            'The Nkeanyi App and all its content, including logos, designs, and software, are the property of APL Electric and are protected by intellectual property laws.',
            'You may not copy, modify, or distribute any part of the App without prior written consent from APL Electric.',
        ],
    },
    {
        heading: '9. Limitation of Liability',
        bullets: [
            'APL Electric shall not be liable for any indirect, incidental, or consequential damages arising from your use of the App.',
            'We do not guarantee that the App will be error-free or uninterrupted.',
        ],
    },
    {
        heading: '10. Termination',
        bullets: [
            'We reserve the right to suspend or terminate your access to the App at any time, with or without notice, for any reason, including violation of these Terms.',
            'Upon termination, your right to use the App will immediately cease.',
        ],
    },
    {
        heading: '11. Changes to Terms',
        paragraphs: [
            'We may update these Terms from time to time. Any changes will be posted on the App. Continued use of the App constitutes acceptance of the revised Terms.',
        ],
    },
    {
        heading: '12. Governing Law',
        paragraphs: [
            'These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from your use of the App shall be resolved in the courts of Abia State, Nigeria.',
        ],
    },
    {
        heading: '13. Contact Us',
        paragraphs: [
            'If you have any questions or concerns about these Terms or the App, please contact us at:',
        ],
        contact: true,
    },
];

export default TERMS_SECTIONS;
