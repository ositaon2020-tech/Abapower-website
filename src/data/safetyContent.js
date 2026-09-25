/**
 * Health & Safety helpers.
 *
 * The topic content itself now lives in the CMS (see data/cms/seed.js →
 * collections.safetyTopics) and is edited from the admin dashboard. This module
 * only provides the route constant plus helpers that decorate the stored topics
 * with their icon component so the public pages and navbar can render them.
 */
import { SAFETY_ICONS } from '../components/admin/AdminIcons';

export const SAFETY_ROUTE_BASE = '/health-safety';

/** Attach the resolved icon component to each stored topic. */
export function decorateTopics(topics = []) {
    return topics.map((topic) => ({
        ...topic,
        icon: SAFETY_ICONS[topic.iconKey] || SAFETY_ICONS.document,
    }));
}

export function getSafetyTopicBySlug(topics = [], slug) {
    const found = topics.find((topic) => topic.slug === slug);
    return found ? { ...found, icon: SAFETY_ICONS[found.iconKey] || SAFETY_ICONS.document } : null;
}

/** Route helper: '#/health-safety/<slug>'. */
export function safetyTopicHref(slug) {
    return `#${SAFETY_ROUTE_BASE}/${slug}`;
}

export default SAFETY_ROUTE_BASE;
