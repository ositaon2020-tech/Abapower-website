/**
 * TID Token (TID Rollover Key Change Token) content.
 *
 * Static, presentation-ready copy for the standalone TID Token page reached
 * from the navbar "TID Token" button:
 *   #/tid-token   -> the TID rollover notice + meter lookup
 *
 * The TID (Token Identifier) rollover is a Nigerian Electricity Regulatory
 * Commission (NERC) directive: every STS prepayment meter must be migrated
 * with a key change token before the deadline or it will stop vending.
 * Copy mirrors the official Aba Power (APLE) customer notice; keep edits
 * here so the page component stays presentational.
 */

export const TID_TOKEN_ROUTE_BASE = '/tid-token';

/** Public Supabase storage bucket that holds the customer meter records. */
export const TID_METER_BUCKET =
    import.meta.env.VITE_SUPABASE_TID_BUCKET || 'tid-meter-records';

export const TID_NOTICE = {
    badge: 'METER MIGRATION NOTICE',
    title: 'TID Rollover',
    titleAccent: 'Key Change Token',
    subtitle:
        'Generate the TID rollover key change token for your prepayment meter before the migration deadline to keep vending.',
    paragraphs: [
        'The management of the Aba Power Electric Company Limited, APLE wishes to inform customers that the Nigerian Electricity Regulatory Commission has directed APLE to migrate all prepayment meters with a TID ROLLOVER KEY CHANGE TOKEN on or before November 2024.',
        'Any meter not migrated with the TID rollover key change token before the deadline will not vend.',
    ],
    prompt: 'Enter your meter number below to generate TID token.',
    /** The red instruction shown under the search form. */
    reminder: 'Load recharge tokens in order of purchase.',
    ctaLabel: 'SEARCH',
    inputLabel: 'Meter number',
    inputPlaceholder: 'Enter meter number',
    inputNote:
        'Use the meter number printed on your meter or your last vending receipt.',
};

/**
 * Guidance shown while the visitor has not searched yet, and the fallback
 * details rendered when no cloud record matches the meter number.
 */
export const TID_GUIDANCE = [
    {
        title: 'Who this applies to',
        body: 'Every STS prepayment meter on the Aba ring-fenced network — residential, commercial and industrial.',
    },
    {
        title: 'What the tokens do',
        body: 'KCT1 and KCT2 are the key change tokens that upgrade your meter to the new STS standard so it keeps accepting recharge tokens after the rollover.',
    },
    {
        title: 'How to load them',
        body: 'Enter KCT1 on your meter keypad first, then KCT2, exactly as shown, then load any recharge tokens in order of purchase.',
    },
];

/** Support channels surfaced beneath the lookup result. */
export const TID_SUPPORT = [
    { label: 'Customer Service', value: '0812 000 0000', href: 'tel:08120000000' },
    { label: 'Email', value: 'customercare@abapower.com', href: 'mailto:customercare@abapower.com' },
    { label: 'WhatsApp', value: 'Chat with the vending desk', href: '#customer-service' },
];

/**
 * Normalise a user-typed meter number so lookups are tolerant of spaces,
 * dashes and dots (e.g. "4501 9823-1102" -> "450198231102").
 */
export function normalizeMeterNumber(value = '') {
    return String(value).replace(/[^0-9a-z]/gi, '').toUpperCase();
}

/** Render a normalised meter number back into 4-digit groups for display. */
export function formatMeterNumber(value = '') {
    return normalizeMeterNumber(value).replace(/(.{4})/g, '$1 ').trim();
}
