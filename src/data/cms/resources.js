/**
 * Resource schemas for the Aba Power CMS.
 *
 * The admin dashboard is schema-driven: every collection/singleton below
 * describes its fields once, and the generic list + form editors render
 * themselves from that description. Adding a field here is all it takes
 * for it to appear in the dashboard.
 *
 * Field types: text | textarea | number | select | checkbox | url | image |
 *              color | list (array of strings) | contacts | sections
 */
export const RESOURCES = [
    /* ------------------------------------------------------ Landing: Hero */
    {
        key: 'heroStats',
        label: 'Hero Stat Cards',
        group: 'Home Page',
        icon: 'grid',
        kind: 'collection',
        description: 'The five stat tiles shown over the video on the hero section.',
        titleField: 'value',
        subtitleField: 'caption',
        fields: [
            { name: 'label', label: 'Label', type: 'text', required: true, placeholder: 'NETWORK' },
            { name: 'value', label: 'Value', type: 'text', required: true, placeholder: '110km+' },
            { name: 'caption', label: 'Caption', type: 'text', required: true, placeholder: 'Overhead lines' },
        ],
    },

    /* ------------------------------------------------ Landing: News ticker */
    {
        key: 'marquee',
        label: 'Scrolling Ticker',
        group: 'Home Page',
        icon: 'activity',
        kind: 'collection',
        description: 'Headline phrases in the blue marquee strip beneath the hero.',
        titleField: 'text',
        fields: [
            { name: 'text', label: 'Text', type: 'text', required: true, placeholder: '188MW GENERATION CAPACITY' },
            { name: 'visible', label: 'Show on site', type: 'checkbox', default: true },
        ],
    },

    /* ------------------------------------------------ Landing: Power stats */
    {
        key: 'powerStats',
        label: 'Power Stats (Bento Grid)',
        group: 'Home Page',
        icon: 'grid',
        kind: 'collection',
        description: '"Aba Power by the numbers" cards. The first card is the tall image card.',
        titleField: 'value',
        subtitleField: 'caption',
        fields: [
            { name: 'value', label: 'Value', type: 'text', required: true, placeholder: '11' },
            { name: 'caption', label: 'Caption', type: 'text', required: true, placeholder: '33 KV Feeders' },
            { name: 'description', label: 'Description', type: 'textarea', rows: 2 },
            {
                name: 'variant',
                label: 'Card style',
                type: 'select',
                default: 'white',
                options: [
                    { value: 'image', label: 'Tall image card' },
                    { value: 'blue', label: 'Blue gradient' },
                    { value: 'accent', label: 'Light accent' },
                    { value: 'white', label: 'White' },
                    { value: 'navy', label: 'Deep navy' },
                ],
            },
            { name: 'image', label: 'Image URL', type: 'image', showWhen: { field: 'variant', equals: 'image' } },
        ],
    },

    /* --------------------------------------------------------- Newsroom */
    {
        key: 'news',
        label: 'Newsroom Articles',
        group: 'Newsroom',
        icon: 'newspaper',
        kind: 'collection',
        description: 'News cards for the auto-sliding newsroom carousel.',
        titleField: 'title',
        subtitleField: 'category',
        badgeField: 'published',
        fields: [
            { name: 'title', label: 'Headline', type: 'text', required: true, placeholder: 'APL Electric Commissions 188MW Gas Plant' },
            { name: 'category', label: 'Category', type: 'text', required: true, placeholder: 'Company Milestone' },
            { name: 'date', label: 'Date label', type: 'text', required: true, placeholder: 'February 2024' },
            { name: 'readTime', label: 'Read time', type: 'text', placeholder: '4 min read' },
            { name: 'image', label: 'Cover image URL', type: 'image' },
            { name: 'summary', label: 'Summary', type: 'textarea', rows: 3 },
            { name: 'link', label: 'Link', type: 'url', placeholder: '#newsroom' },
            { name: 'published', label: 'Published', type: 'checkbox', default: true },
        ],
    },

    /* ------------------------------------------------ Events Gallery */
    {
        key: 'events',
        label: 'Events Gallery',
        group: 'Newsroom',
        icon: 'camera',
        kind: 'collection',
        description: 'Photo moments from events, outreaches and ceremonies at Aba Power.',
        titleField: 'title',
        subtitleField: 'category',
        badgeField: 'published',
        fields: [
            { name: 'title', label: 'Event title', type: 'text', required: true, placeholder: 'Commissioning of the Osisioma Feeder Upgrade' },
            {
                name: 'category',
                label: 'Category',
                type: 'select',
                default: 'Corporate',
                options: [
                    { value: 'Community', label: 'Community' },
                    { value: 'Commissioning', label: 'Commissioning' },
                    { value: 'Safety', label: 'Safety' },
                    { value: 'Industry', label: 'Industry' },
                    { value: 'Corporate', label: 'Corporate' },
                ],
            },
            { name: 'date', label: 'Date label', type: 'text', placeholder: 'March 2024' },
            { name: 'location', label: 'Location', type: 'text', placeholder: 'Aba, Abia State' },
            { name: 'image', label: 'Image URL', type: 'image' },
            { name: 'caption', label: 'Caption', type: 'textarea', rows: 3 },
            { name: 'published', label: 'Published', type: 'checkbox', default: true },
        ],
    },

    /* -------------------------------------------------- Health & Safety */
    {
        key: 'safetyTopics',
        label: 'Health & Safety Topics',
        group: 'Health & Safety',
        icon: 'shield',
        kind: 'collection',
        description:
            'Each topic becomes its own page at #/health-safety/<slug> and appears in the navbar sub-menu.',
        titleField: 'title',
        subtitleField: 'slug',
        badgeField: 'tone',
        fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            {
                name: 'slug',
                label: 'URL slug',
                type: 'slug',
                required: true,
                source: 'title',
                help: 'e.g. covid19-safety → #/health-safety/covid19-safety',
            },
            { name: 'tagline', label: 'Tagline', type: 'text', required: true },
            {
                name: 'iconKey',
                label: 'Icon',
                type: 'select',
                default: 'document',
                options: [
                    { value: 'shield', label: 'Shield' },
                    { value: 'alert', label: 'Alert circle' },
                    { value: 'home', label: 'Home' },
                    { value: 'phone', label: 'Phone' },
                    { value: 'community', label: 'Community (users)' },
                    { value: 'document', label: 'Document' },
                    { value: 'zap', label: 'Bolt' },
                ],
            },
            {
                name: 'tone',
                label: 'Accent colour',
                type: 'select',
                default: 'blue',
                options: [
                    { value: 'blue', label: 'Brand blue' },
                    { value: 'gold', label: 'Brand gold' },
                    { value: 'dark', label: 'Navy' },
                ],
            },
            { name: 'intro', label: 'Intro paragraph', type: 'textarea', rows: 3 },
            { name: 'sections', label: 'Content sections', type: 'sections' },
            { name: 'contacts', label: 'Contact cards', type: 'contacts' },
        ],
    },

    /* --------------------------------------------------------- Support */
    {
        key: 'faqs',
        label: 'Support FAQs',
        group: 'Support',
        icon: 'message',
        kind: 'collection',
        description: 'Frequently asked questions used by the support desk.',
        titleField: 'question',
        subtitleField: 'category',
        fields: [
            { name: 'question', label: 'Question', type: 'text', required: true },
            { name: 'answer', label: 'Answer', type: 'textarea', rows: 3, required: true },
            { name: 'category', label: 'Category', type: 'text', placeholder: 'Billing' },
        ],
    },

    /* ---------------------------------------------- About: INSPIRED values */
    {
        key: 'inspiredValues',
        label: 'INSPIRED Values',
        group: 'About Page',
        icon: 'shield',
        kind: 'collection',
        description: 'The "Our INSPIRED Values" cards (IN / S / P / I / RE / D) on the About Us page.',
        titleField: 'label',
        subtitleField: 'letter',
        fields: [
            { name: 'letter', label: 'Letter(s)', type: 'text', required: true, placeholder: 'IN' },
            { name: 'label', label: 'Value', type: 'text', required: true, placeholder: 'Integrity' },
            { name: 'body', label: 'Description', type: 'textarea', rows: 3 },
        ],
    },

    /* ------------------------------------------------------- Leadership */
    {
        key: 'leadership',
        label: 'Leadership Team',
        group: 'About Page',
        icon: 'users',
        kind: 'collection',
        description: 'Executive team cards shown on the Leadership page (#/leadership).',
        titleField: 'name',
        subtitleField: 'role',
        fields: [
            { name: 'name', label: 'Full name', type: 'text', required: true, placeholder: 'Barr. Ugochukwu Opiegbe' },
            { name: 'role', label: 'Role / Office', type: 'text', required: true, placeholder: 'MD, APL Electric Company Limited' },
            { name: 'image', label: 'Portrait URL', type: 'image' },
            { name: 'bio', label: 'Biography', type: 'textarea', rows: 4 },
            {
                name: 'key',
                label: 'Portrait key',
                type: 'text',
                help: 'Matches a bundled portrait, e.g. opiegbe, siddi, nmaram, ngwoke, okonji, agbo, akpata.',
            },
        ],
    },

    /* ------------------------------------------------ Settings: Hero/Cinema */
    {
        key: 'settings.hero',
        label: 'Hero Section',
        group: 'Settings',
        icon: 'zap',
        kind: 'singleton',
        description: 'Background media, badge and headline text for the hero.',
        fields: [
            { name: 'badge', label: 'Badge text', type: 'text' },
            { name: 'title', label: 'Headline', type: 'textarea', rows: 2 },
            { name: 'subtitle', label: 'Sub-headline', type: 'textarea', rows: 3 },
            { name: 'videoUrl', label: 'Background video URL', type: 'url', help: 'Files in /public are served from the site root, e.g. /aba-power-corporate.mp4' },
            { name: 'imageUrl', label: 'Poster / fallback image URL', type: 'image' },
            { name: 'marqueeVisible', label: 'Show scrolling ticker', type: 'checkbox', default: true },
        ],
    },

    /* ----------------------------------------------- Settings: Newsroom */
    {
        key: 'settings.newsroom',
        label: 'Newsroom Section',
        group: 'Settings',
        icon: 'newspaper',
        kind: 'singleton',
        description: 'Heading and carousel behaviour for the newsroom.',
        fields: [
            { name: 'badge', label: 'Badge text', type: 'text' },
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'titleAccent', label: 'Title accent words', type: 'text' },
            { name: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 3 },
            { name: 'autoplay', label: 'Auto-advance slides', type: 'checkbox', default: true },
            { name: 'speedMs', label: 'Slide interval (ms)', type: 'number', min: 1000, step: 500 },
        ],
    },

    /* ------------------------------------------------- Settings: Media */
    {
        key: 'settings.media',
        label: 'Media & Events Page',
        group: 'Settings',
        icon: 'camera',
        kind: 'singleton',
        description: 'Banner, newsroom intro and gallery headings for the Media & Events page.',
        fields: [
            { name: 'badge', label: 'Banner badge', type: 'text' },
            { name: 'title', label: 'Banner headline', type: 'textarea', rows: 2 },
            { name: 'subtitle', label: 'Banner sub-headline', type: 'textarea', rows: 3 },
            { name: 'newsroomEyebrow', label: 'Newsroom eyebrow', type: 'text' },
            { name: 'newsroomTitle', label: 'Newsroom heading', type: 'text' },
            { name: 'galleryEyebrow', label: 'Gallery eyebrow', type: 'text' },
            { name: 'galleryTitle', label: 'Gallery heading', type: 'text' },
        ],
    },

    /* ----------------------------------------------- Settings: Branding */
    {
        key: 'settings.branding',
        label: 'Brand & Contact',
        group: 'Settings',
        icon: 'phone',
        kind: 'singleton',
        description: 'Company identity, contact details and social links.',
        fields: [
            { name: 'siteName', label: 'Site name', type: 'text' },
            { name: 'legalName', label: 'Legal name', type: 'text' },
            { name: 'phone', label: 'Hotline', type: 'text' },
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'address', label: 'Address', type: 'textarea', rows: 2 },
            { name: 'facebook', label: 'Facebook URL', type: 'url' },
            { name: 'twitter', label: 'Twitter / X URL', type: 'url' },
            { name: 'instagram', label: 'Instagram URL', type: 'url' },
            { name: 'linkedin', label: 'LinkedIn URL', type: 'url' },
        ],
    },
];

export function getResource(key) {
    return RESOURCES.find((r) => r.key === key) || null;
}

export function resourcesByGroup() {
    return RESOURCES.reduce((acc, resource) => {
        acc[resource.group] = acc[resource.group] || [];
        acc[resource.group].push(resource);
        return acc;
    }, {});
}

export default RESOURCES;
