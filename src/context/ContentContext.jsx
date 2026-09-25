import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { seedContent } from '../data/cms/seed';
import { isSupabaseConfigured } from '../lib/supabase';
import {
    fetchContent,
    fetchActivity,
    recordActivity,
    replaceAllContent,
    saveCollection,
    saveSettings,
} from '../lib/cmsApi';
import { useAuth } from './AuthContext';

/**
 * Where the CMS document is cached in this browser.
 *
 * Supabase is now the source of truth: this key only holds the last copy we
 * saw so the site can paint instantly on load and keep working if the network
 * (or the whole backend) is unavailable. It is *not* the authority — every
 * edit is written straight through to the cloud.
 */
const STORAGE_KEY = 'abapower.cms.content.v1';

/**
 * How the in-memory document relates to the cloud right now. Kept module-local
 * (not exported) so this file still satisfies React Fast Refresh's rule that a
 * component module only exports components.
 */
const SYNC_STATUS = {
    LOCAL: 'local', // no backend configured — running on the local cache
    SYNCING: 'syncing', // a cloud read/write is in flight
    CLOUD: 'cloud', // last operation succeeded against Supabase
    OFFLINE: 'offline', // last cloud operation failed; serving the cache
};

const clone = (value) => JSON.parse(JSON.stringify(value));

/** Read the local cache, merged over a fresh seed so new keys still appear. */
function loadCachedContent() {
    const fresh = seedContent();
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return fresh;
        const parsed = JSON.parse(raw);
        return {
            version: fresh.version,
            collections: { ...fresh.collections, ...(parsed.collections || {}) },
            settings: { ...fresh.settings, ...(parsed.settings || {}) },
        };
    } catch {
        return fresh;
    }
}

/** Merge a cloud document over a fresh seed, preserving local-only keys. */
function mergeContent(cloud) {
    const fresh = seedContent();
    if (!cloud) return fresh;
    return {
        version: fresh.version,
        collections: { ...fresh.collections, ...(cloud.collections || {}) },
        settings: { ...fresh.settings, ...(cloud.settings || {}) },
    };
}

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
    // Authentication is owned by AuthProvider (Supabase-backed). This CMS layer
    // only consumes the resolved session; it never validates credentials itself.
    const { session, isAuthenticated, authReady, login, logout } = useAuth();

    const [content, setContent] = useState(loadCachedContent);
    const [activity, setActivity] = useState([]);
    const [syncStatus, setSyncStatus] = useState(
        isSupabaseConfigured ? SYNC_STATUS.SYNCING : SYNC_STATUS.LOCAL,
    );
    const [lastSyncedAt, setLastSyncedAt] = useState(null);
    const [syncError, setSyncError] = useState('');

    const actorEmail = session?.email || null;

    /* --------------------------------------------------------- cache write */
    // Always keep a local copy — it is what makes the next load instant and
    // keeps the public site rendering when the network is down.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
        } catch {
            /* storage full or unavailable — keep running with in-memory state */
        }
    }, [content]);

    /* -------------------------------------------------------- cloud hydrate */
    const pullFromCloud = useCallback(async () => {
        if (!isSupabaseConfigured) {
            setSyncStatus(SYNC_STATUS.LOCAL);
            return { ok: false, error: 'Supabase is not configured' };
        }

        setSyncStatus(SYNC_STATUS.SYNCING);
        const cloud = await fetchContent();

        if (!cloud) {
            // Backend reachable but unreadable (e.g. schema not applied yet).
            setSyncStatus(SYNC_STATUS.OFFLINE);
            setSyncError('Could not reach the content database. Serving the local cache.');
            return { ok: false, error: 'offline' };
        }

        setContent(mergeContent(cloud));
        setSyncStatus(SYNC_STATUS.CLOUD);
        setSyncError('');
        setLastSyncedAt(new Date().toISOString());
        return { ok: true };
    }, []);

    // Initial hydration happens whether or not someone is signed in: the public
    // site must be able to read published content with the anon key.
    useEffect(() => {
        if (!isSupabaseConfigured) return undefined;
        let active = true;
        (async () => {
            const cloud = await fetchContent();
            if (!active) return;
            if (!cloud) {
                setSyncStatus(SYNC_STATUS.OFFLINE);
                setSyncError('Could not reach the content database. Serving the local cache.');
                return;
            }
            setContent(mergeContent(cloud));
            setSyncStatus(SYNC_STATUS.CLOUD);
            setSyncError('');
            setLastSyncedAt(new Date().toISOString());
        })();
        return () => {
            active = false;
        };
    }, []);

    // The activity feed is admin-only (RLS), so it is fetched once a session
    // exists rather than on the public load.
    useEffect(() => {
        if (!isAuthenticated || !isSupabaseConfigured) return undefined;
        let active = true;
        (async () => {
            const entries = await fetchActivity(50);
            if (active && entries) setActivity(entries);
        })();
        return () => {
            active = false;
        };
    }, [isAuthenticated]);

    /* --------------------------------------------------------------- log */
    const log = useCallback(
        (action, detail) => {
            const optimistic = {
                id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                action,
                detail,
                at: new Date().toISOString(),
                by: actorEmail || 'system',
            };

            // Show it immediately…
            setActivity((prev) => [optimistic, ...prev].slice(0, 50));

            // …then persist it to the cloud so the trail survives the session.
            if (isSupabaseConfigured && isAuthenticated) {
                recordActivity(action, detail, actorEmail).then((res) => {
                    if (!res?.ok) console.warn('[cms] activity not synced:', res?.error);
                });
            }
        },
        [actorEmail, isAuthenticated],
    );

    /* --------------------------------------------------- write-through ops */
    /** Persist one collection, flipping the sync badge to reflect the result. */
    const pushCollection = useCallback(
        async (key, items) => {
            if (!isSupabaseConfigured) return;
            setSyncStatus(SYNC_STATUS.SYNCING);
            const res = await saveCollection(key, items, actorEmail);
            if (res.ok) {
                setSyncStatus(SYNC_STATUS.CLOUD);
                setSyncError('');
                setLastSyncedAt(new Date().toISOString());
            } else {
                setSyncStatus(SYNC_STATUS.OFFLINE);
                setSyncError(res.error || 'Could not save to the cloud.');
            }
        },
        [actorEmail],
    );

    const pushSettings = useCallback(
        async (key, value) => {
            if (!isSupabaseConfigured) return;
            setSyncStatus(SYNC_STATUS.SYNCING);
            const res = await saveSettings(key, value, actorEmail);
            if (res.ok) {
                setSyncStatus(SYNC_STATUS.CLOUD);
                setSyncError('');
                setLastSyncedAt(new Date().toISOString());
            } else {
                setSyncStatus(SYNC_STATUS.OFFLINE);
                setSyncError(res.error || 'Could not save to the cloud.');
            }
        },
        [actorEmail],
    );

    /* ------------------------------------------------------ collection CRUD */
    const getCollection = useCallback(
        (key) => content.collections[key] || [],
        [content.collections],
    );

    const createItem = useCallback(
        (key, item) => {
            const id = `${key}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
            const created = { ...item, id };
            const nextItems = [...(content.collections[key] || []), created];
            setContent((prev) => ({
                ...prev,
                collections: { ...prev.collections, [key]: nextItems },
            }));
            pushCollection(key, nextItems);
            return created;
        },
        [content.collections, pushCollection],
    );

    const updateItem = useCallback(
        (key, id, patch) => {
            const nextItems = (content.collections[key] || []).map((item) =>
                item.id === id ? { ...item, ...patch } : item,
            );
            setContent((prev) => ({
                ...prev,
                collections: { ...prev.collections, [key]: nextItems },
            }));
            pushCollection(key, nextItems);
        },
        [content.collections, pushCollection],
    );

    const deleteItem = useCallback(
        (key, id) => {
            const nextItems = (content.collections[key] || []).filter((item) => item.id !== id);
            setContent((prev) => ({
                ...prev,
                collections: { ...prev.collections, [key]: nextItems },
            }));
            pushCollection(key, nextItems);
        },
        [content.collections, pushCollection],
    );

    const duplicateItem = useCallback(
        (key, id) => {
            const list = content.collections[key] || [];
            const index = list.findIndex((item) => item.id === id);
            if (index === -1) return;
            const copy = {
                ...clone(list[index]),
                id: `${key}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            };
            const nextItems = [...list];
            nextItems.splice(index + 1, 0, copy);
            setContent((prev) => ({
                ...prev,
                collections: { ...prev.collections, [key]: nextItems },
            }));
            pushCollection(key, nextItems);
        },
        [content.collections, pushCollection],
    );

    /** Move an item by delta (-1 up, +1 down). Returns true if it moved. */
    const moveItem = useCallback(
        (key, id, delta) => {
            const list = content.collections[key] || [];
            const index = list.findIndex((item) => item.id === id);
            const target = index + delta;
            if (index === -1 || target < 0 || target >= list.length) return false;
            const nextItems = [...list];
            const [removed] = nextItems.splice(index, 1);
            nextItems.splice(target, 0, removed);
            setContent((prev) => ({
                ...prev,
                collections: { ...prev.collections, [key]: nextItems },
            }));
            pushCollection(key, nextItems);
            return true;
        },
        [content.collections, pushCollection],
    );

    const replaceCollection = useCallback(
        (key, items) => {
            setContent((prev) => ({
                ...prev,
                collections: { ...prev.collections, [key]: items },
            }));
            pushCollection(key, items);
        },
        [pushCollection],
    );

    /* ---------------------------------------------------- singleton CRUD */
    const getSettings = useCallback(
        (key) => content.settings[key] || {},
        [content.settings],
    );

    const updateSettings = useCallback(
        (key, patch) => {
            const nextValue = { ...(content.settings[key] || {}), ...patch };
            setContent((prev) => ({
                ...prev,
                settings: { ...prev.settings, [key]: nextValue },
            }));
            pushSettings(key, nextValue);
        },
        [content.settings, pushSettings],
    );

    /* ------------------------------------------------------ whole-content */
    const resetAll = useCallback(async () => {
        const fresh = seedContent();
        setContent(fresh);
        log('reset', 'Restored seed content for all collections and settings');

        if (isSupabaseConfigured) {
            setSyncStatus(SYNC_STATUS.SYNCING);
            const res = await replaceAllContent(fresh, actorEmail);
            setSyncStatus(res.ok ? SYNC_STATUS.CLOUD : SYNC_STATUS.OFFLINE);
            if (!res.ok) setSyncError(res.error || 'Could not push the reset to the cloud.');
            else setLastSyncedAt(new Date().toISOString());
        }
    }, [log, actorEmail]);

    const importContent = useCallback(
        async (json) => {
            const fresh = seedContent();
            const nextContent = {
                version: fresh.version,
                collections: { ...fresh.collections, ...(json.collections || {}) },
                settings: { ...fresh.settings, ...(json.settings || {}) },
            };
            setContent(nextContent);
            log('import', 'Imported content from a JSON backup');

            if (isSupabaseConfigured) {
                setSyncStatus(SYNC_STATUS.SYNCING);
                const res = await replaceAllContent(nextContent, actorEmail);
                setSyncStatus(res.ok ? SYNC_STATUS.CLOUD : SYNC_STATUS.OFFLINE);
                if (!res.ok) setSyncError(res.error || 'Could not push the import to the cloud.');
                else setLastSyncedAt(new Date().toISOString());
            }
        },
        [log, actorEmail],
    );

    const exportContent = useCallback(() => clone(content), [content]);

    const value = useMemo(
        () => ({
            content,
            activity,
            log,
            session,
            isAuthenticated,
            authReady,
            login,
            logout,
            getCollection,
            createItem,
            updateItem,
            deleteItem,
            duplicateItem,
            moveItem,
            replaceCollection,
            getSettings,
            updateSettings,
            resetAll,
            importContent,
            exportContent,
            // Cloud sync surface
            syncStatus,
            syncError,
            lastSyncedAt,
            isCloud: syncStatus === SYNC_STATUS.CLOUD,
            isCloudConfigured: isSupabaseConfigured,
            refresh: pullFromCloud,
        }),
        [
            content,
            activity,
            log,
            session,
            isAuthenticated,
            authReady,
            login,
            logout,
            getCollection,
            createItem,
            updateItem,
            deleteItem,
            duplicateItem,
            moveItem,
            replaceCollection,
            getSettings,
            updateSettings,
            resetAll,
            importContent,
            exportContent,
            syncStatus,
            syncError,
            lastSyncedAt,
            pullFromCloud,
        ],
    );

    return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
    const ctx = useContext(ContentContext);
    if (!ctx) throw new Error('useContent must be used within a ContentProvider');
    return ctx;
}

export default ContentContext;
