import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Cloud data-access layer for the admin CMS.
 *
 * Every read the public site performs and every write the admin dashboard
 * performs goes through this module, so there is exactly one place that knows
 * the shape of the Supabase schema.
 *
 * Tables (see `supabase/schema.sql`):
 *   cms_collections  (key, items jsonb, updated_at, updated_by)
 *   cms_settings     (key, value jsonb, updated_at, updated_by)
 *   cms_activity     (id, action, detail, actor_email, created_at)
 *   analytics_events (id, type, visitor_id, page, keyword, label, source, device, hour, created_at)
 *
 * Storage:
 *   cms-media        public bucket for images/video uploaded by admins
 *
 * All functions are written to *fail soft*: when the backend is not configured
 * or a request errors, they return null/[] and the caller keeps working from
 * its local cache. Nothing here ever throws into a React render.
 */

export const COLLECTIONS_TABLE = 'cms_collections';
export const SETTINGS_TABLE = 'cms_settings';
export const ACTIVITY_TABLE = 'cms_activity';
export const ANALYTICS_TABLE = 'analytics_events';

/** Public storage bucket that holds every admin-uploaded asset. */
export const MEDIA_BUCKET = import.meta.env.VITE_SUPABASE_MEDIA_BUCKET || 'cms-media';

/** A settings resource key is `settings.hero`; the table row key is `hero`. */
export const settingsRowKey = (resourceKey = '') =>
    resourceKey.startsWith('settings.') ? resourceKey.slice('settings.'.length) : resourceKey;

const isReady = () => isSupabaseConfigured && Boolean(supabase);

/* ============================================================================
 *  CONTENT READS
 * ==========================================================================*/

/**
 * Load the entire CMS document from Supabase in two queries.
 * Returns `{ collections, settings }` or `null` when nothing could be read.
 */
export async function fetchContent() {
    if (!isReady()) return null;
    try {
        const [collectionsRes, settingsRes] = await Promise.all([
            supabase.from(COLLECTIONS_TABLE).select('key, items'),
            supabase.from(SETTINGS_TABLE).select('key, value'),
        ]);

        if (collectionsRes.error) throw collectionsRes.error;
        if (settingsRes.error) throw settingsRes.error;

        const collections = {};
        for (const row of collectionsRes.data || []) {
            collections[row.key] = Array.isArray(row.items) ? row.items : [];
        }

        const settings = {};
        for (const row of settingsRes.data || []) {
            settings[row.key] = row.value && typeof row.value === 'object' ? row.value : {};
        }

        return { collections, settings };
    } catch (error) {
        console.warn('[cmsApi] fetchContent failed', error);
        return null;
    }
}

/* ============================================================================
 *  COLLECTION WRITES
 * ==========================================================================*/

/** Upsert one collection (its full ordered array) and record who changed it. */
export async function saveCollection(key, items, actorEmail) {
    if (!isReady()) return { ok: false, error: 'Supabase is not configured' };
    try {
        const { error } = await supabase.from(COLLECTIONS_TABLE).upsert(
            {
                key,
                items: Array.isArray(items) ? items : [],
                updated_at: new Date().toISOString(),
                updated_by: actorEmail || null,
            },
            { onConflict: 'key' },
        );
        if (error) throw error;
        return { ok: true };
    } catch (error) {
        console.warn('[cmsApi] saveCollection failed', error);
        return { ok: false, error: error.message || String(error) };
    }
}

/* ============================================================================
 *  SETTINGS WRITES
 * ==========================================================================*/

/** Upsert one settings group (hero / newsroom / branding). */
export async function saveSettings(key, value, actorEmail) {
    if (!isReady()) return { ok: false, error: 'Supabase is not configured' };
    try {
        const { error } = await supabase.from(SETTINGS_TABLE).upsert(
            {
                key: settingsRowKey(key),
                value: value && typeof value === 'object' ? value : {},
                updated_at: new Date().toISOString(),
                updated_by: actorEmail || null,
            },
            { onConflict: 'key' },
        );
        if (error) throw error;
        return { ok: true };
    } catch (error) {
        console.warn('[cmsApi] saveSettings failed', error);
        return { ok: false, error: error.message || String(error) };
    }
}

/* ============================================================================
 *  ACTIVITY LOG
 * ==========================================================================*/

/** Persist a single admin action. Fire-and-forget friendly (never throws). */
export async function recordActivity(action, detail, actorEmail) {
    if (!isReady()) return { ok: false, error: 'Supabase is not configured' };
    try {
        const { error } = await supabase.from(ACTIVITY_TABLE).insert({
            action,
            detail: detail || null,
            actor_email: actorEmail || null,
        });
        if (error) throw error;
        return { ok: true };
    } catch (error) {
        console.warn('[cmsApi] recordActivity failed', error);
        return { ok: false, error: error.message || String(error) };
    }
}

/** Read the most recent admin actions, newest first. */
export async function fetchActivity(limit = 50) {
    if (!isReady()) return null;
    try {
        const { data, error } = await supabase
            .from(ACTIVITY_TABLE)
            .select('id, action, detail, actor_email, created_at')
            .order('created_at', { ascending: false })
            .limit(limit);
        if (error) throw error;
        return (data || []).map((row) => ({
            id: row.id,
            action: row.action,
            detail: row.detail,
            at: row.created_at,
            by: row.actor_email || 'system',
        }));
    } catch (error) {
        console.warn('[cmsApi] fetchActivity failed', error);
        return null;
    }
}

/* ============================================================================
 *  ANALYTICS
 * ==========================================================================*/

/** Normalise an in-app event object to the `analytics_events` row shape. */
function toEventRow(event = {}) {
    return {
        type: event.type || 'view',
        visitor_id: event.visitorId || event.visitor_id || null,
        page: event.page || null,
        keyword: event.keyword || null,
        label: event.label || null,
        source: event.source || null,
        device: event.device || null,
        hour: event.hour != null ? event.hour : null,
        created_at: event.at || new Date().toISOString(),
    };
}

/** Persist a single visitor event (visit / view / click / search). */
export async function recordAnalyticsEvent(event) {
    if (!isReady()) return { ok: false, error: 'Supabase is not configured' };
    try {
        const { error } = await supabase.from(ANALYTICS_TABLE).insert(toEventRow(event));
        if (error) throw error;
        return { ok: true };
    } catch (error) {
        // Analytics is best-effort and must never disturb the visitor.
        console.warn('[cmsApi] recordAnalyticsEvent failed', error);
        return { ok: false, error: error.message || String(error) };
    }
}

/**
 * Fetch analytics events for the admin dashboard.
 * @param {number} days how far back to look
 */
export async function fetchAnalyticsEvents(days = 90) {
    if (!isReady()) return null;
    try {
        const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
        const { data, error } = await supabase
            .from(ANALYTICS_TABLE)
            .select('id, type, visitor_id, page, keyword, label, source, device, hour, created_at')
            .gte('created_at', since)
            .order('created_at', { ascending: true })
            .limit(5000);
        if (error) throw error;
        return (data || []).map((row) => ({
            id: row.id,
            type: row.type,
            at: row.created_at,
            visitorId: row.visitor_id,
            page: row.page,
            keyword: row.keyword,
            label: row.label,
            source: row.source,
            device: row.device,
            hour: row.hour,
        }));
    } catch (error) {
        console.warn('[cmsApi] fetchAnalyticsEvents failed', error);
        return null;
    }
}

/** Remove every stored analytics event (admin-only, enforced by RLS). */
export async function clearAnalyticsEvents() {
    if (!isReady()) return { ok: false, error: 'Supabase is not configured' };
    try {
        const { error } = await supabase
            .from(ANALYTICS_TABLE)
            .delete()
            .not('id', 'is', null);
        if (error) throw error;
        return { ok: true };
    } catch (error) {
        console.warn('[cmsApi] clearAnalyticsEvents failed', error);
        return { ok: false, error: error.message || String(error) };
    }
}

/* ============================================================================
 *  MEDIA / STORAGE
 * ==========================================================================*/

const sanitizeName = (name = 'asset') =>
    name
        .toLowerCase()
        .replace(/[^a-z0-9.-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(-60);

/**
 * Upload a file to the public `cms-media` bucket.
 * @returns `{ ok, url, path, error }`
 */
export async function uploadMedia(file, folder = 'uploads') {
    if (!isReady()) return { ok: false, error: 'Supabase is not configured' };
    if (!file) return { ok: false, error: 'No file selected' };

    try {
        const path = `${folder}/${Date.now()}-${sanitizeName(file.name || 'asset')}`;
        const { error } = await supabase.storage
            .from(MEDIA_BUCKET)
            .upload(path, file, { cacheControl: '3600', upsert: false });
        if (error) throw error;

        const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
        return { ok: true, path, url: data?.publicUrl || '' };
    } catch (error) {
        console.warn('[cmsApi] uploadMedia failed', error);
        return { ok: false, error: error.message || String(error) };
    }
}

/** Permanently remove a previously uploaded asset. */
export async function deleteMedia(path) {
    if (!isReady() || !path) return { ok: false, error: 'Nothing to delete' };
    try {
        const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);
        if (error) throw error;
        return { ok: true };
    } catch (error) {
        console.warn('[cmsApi] deleteMedia failed', error);
        return { ok: false, error: error.message || String(error) };
    }
}

/**
 * List the assets already in the bucket so the Data panel can show usage.
 * @returns array of `{ name, path, url, size, updatedAt }`
 */
export async function listMedia(folder = '') {
    if (!isReady()) return null;
    try {
        const { data, error } = await supabase.storage
            .from(MEDIA_BUCKET)
            .list(folder, { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });
        if (error) throw error;
        return (data || [])
            .filter((item) => item.id) // folders have a null id
            .map((item) => {
                const path = folder ? `${folder}/${item.name}` : item.name;
                const { data: pub } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
                return {
                    name: item.name,
                    path,
                    url: pub?.publicUrl || '',
                    size: item.metadata?.size || 0,
                    updatedAt: item.updated_at || item.created_at,
                };
            });
    } catch (error) {
        console.warn('[cmsApi] listMedia failed', error);
        return null;
    }
}

/** Upload every asset referenced by a whole-content backup (used on import). */
export async function replaceAllContent(content, actorEmail) {
    if (!isReady()) return { ok: false, error: 'Supabase is not configured' };
    try {
        const collections = content?.collections || {};
        const settings = content?.settings || {};

        const collectionRows = Object.entries(collections).map(([key, items]) => ({
            key,
            items: Array.isArray(items) ? items : [],
            updated_at: new Date().toISOString(),
            updated_by: actorEmail || null,
        }));

        const settingsRows = Object.entries(settings).map(([key, value]) => ({
            key: settingsRowKey(key),
            value: value && typeof value === 'object' ? value : {},
            updated_at: new Date().toISOString(),
            updated_by: actorEmail || null,
        }));

        if (collectionRows.length) {
            const { error } = await supabase
                .from(COLLECTIONS_TABLE)
                .upsert(collectionRows, { onConflict: 'key' });
            if (error) throw error;
        }

        if (settingsRows.length) {
            const { error } = await supabase
                .from(SETTINGS_TABLE)
                .upsert(settingsRows, { onConflict: 'key' });
            if (error) throw error;
        }

        return { ok: true };
    } catch (error) {
        console.warn('[cmsApi] replaceAllContent failed', error);
        return { ok: false, error: error.message || String(error) };
    }
}

export default {
    fetchContent,
    saveCollection,
    saveSettings,
    recordActivity,
    fetchActivity,
    recordAnalyticsEvent,
    fetchAnalyticsEvents,
    clearAnalyticsEvents,
    uploadMedia,
    deleteMedia,
    listMedia,
    replaceAllContent,
    MEDIA_BUCKET,
};
