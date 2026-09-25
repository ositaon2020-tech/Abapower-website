import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { RESOURCES } from '../../data/cms/resources';
import { deleteMedia, listMedia, MEDIA_BUCKET } from '../../lib/cmsApi';
import {
    IconDownload,
    IconUpload,
    IconRefresh,
    IconDatabase,
    IconTrash,
    IconCloud,
} from './AdminIcons';

function formatDate(iso) {
    try {
        return new Date(iso).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return iso;
    }
}

function formatBytes(bytes = 0) {
    if (!bytes) return '—';
    const units = ['B', 'KB', 'MB', 'GB'];
    let value = bytes;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
        value /= 1024;
        unit += 1;
    }
    return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}

/** Small colour-coded pill describing how content relates to the cloud. */
function SyncBadge({ status }) {
    const map = {
        cloud: { text: 'In sync with Supabase', dot: 'bg-emerald-500', tone: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
        syncing: { text: 'Syncing…', dot: 'bg-amber-500 animate-pulse', tone: 'text-amber-700 bg-amber-50 border-amber-200' },
        offline: { text: 'Offline — using local cache', dot: 'bg-rose-500', tone: 'text-rose-700 bg-rose-50 border-rose-200' },
        local: { text: 'Local only (Supabase not configured)', dot: 'bg-slate-400', tone: 'text-slate-600 bg-slate-50 border-slate-200' },
    };
    const cfg = map[status] || map.local;
    return (
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${cfg.tone}`}>
            <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
            {cfg.text}
        </span>
    );
}

export default function DataPanel() {
    const {
        content,
        exportContent,
        importContent,
        resetAll,
        activity,
        syncStatus,
        syncError,
        lastSyncedAt,
        isCloudConfigured,
        refresh,
    } = useContent();

    const fileRef = useRef(null);
    const [message, setMessage] = useState('');
    const [confirmReset, setConfirmReset] = useState(false);
    const [media, setMedia] = useState([]);
    const [mediaError, setMediaError] = useState('');
    // Start in the loading state when a backend exists, so the first read does
    // not need to flip state synchronously from inside an effect.
    const [loadingMedia, setLoadingMedia] = useState(isCloudConfigured);

    const flash = (text) => {
        setMessage(text);
        setTimeout(() => setMessage(''), 2400);
    };

    const loadMedia = useCallback(async () => {
        if (!isCloudConfigured) return;
        // Both reads are awaited first so no state is set synchronously.
        const [items, nested] = await Promise.all([listMedia(''), listMedia('images')]);
        if (items === null && nested === null) {
            setMediaError('Could not read the media bucket.');
            setMedia([]);
        } else {
            setMediaError('');
            setMedia([...(items || []), ...(nested || [])]);
        }
        setLoadingMedia(false);
    }, [isCloudConfigured]);

    // Read the bucket as soon as the panel mounts (when a backend exists). State
    // is only touched inside the promise callback so no render is triggered
    // synchronously from the effect body.
    useEffect(() => {
        if (!isCloudConfigured) return;
        let active = true;
        Promise.all([listMedia(''), listMedia('images')]).then(([items, nested]) => {
            if (!active) return;
            if (items === null && nested === null) {
                setMediaError('Could not read the media bucket.');
                setMedia([]);
            } else {
                setMediaError('');
                setMedia([...(items || []), ...(nested || [])]);
            }
            setLoadingMedia(false);
        });
        return () => {
            active = false;
        };
    }, [isCloudConfigured]);

    const handleExport = () => {
        const data = JSON.stringify(exportContent(), null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `abapower-content-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        flash('Backup downloaded');
    };

    const handleImportFile = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const parsed = JSON.parse(reader.result);
                await importContent(parsed);
                flash('Content imported and pushed to Supabase');
            } catch {
                flash('That file is not valid JSON');
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const handleRefresh = async () => {
        setLoadingMedia(true);
        await refresh();
        await loadMedia();
        flash('Re-synced with Supabase');
    };

    const handleDeleteMedia = async (item) => {
        const res = await deleteMedia(item.path);
        if (res.ok) {
            setMedia((prev) => prev.filter((entry) => entry.path !== item.path));
            flash('Asset deleted from the bucket');
        } else {
            flash(res.error || 'Could not delete that asset');
        }
    };

    const counts = RESOURCES.filter((r) => r.kind === 'collection').map((r) => ({
        label: r.label,
        count: (content.collections[r.key] || []).length,
    }));

    return (
        <div className="max-w-4xl">
            <div className="flex items-start gap-4 mb-7">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#0072CE]/12 text-[#0072CE]">
                    <IconDatabase className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight">
                        Data & Backups
                    </h2>
                    <p className="text-sm text-slate-500 max-w-xl">
                        Every collection, setting and upload is stored in Supabase. This browser keeps a cache so
                        the site loads instantly and survives an outage; the database remains the source of truth.
                    </p>
                </div>
            </div>

            {/* Cloud status */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0072CE]/12 text-[#0072CE]">
                            <IconCloud />
                        </span>
                        <div>
                            <p className="font-extrabold text-[#0b2a4a]">Supabase backend</p>
                            <p className="text-xs text-slate-500">
                                {lastSyncedAt
                                    ? `Last synced ${formatDate(lastSyncedAt)}`
                                    : 'Waiting for the first sync'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <SyncBadge status={syncStatus} />
                        <button
                            type="button"
                            onClick={handleRefresh}
                            disabled={!isCloudConfigured}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <IconRefresh className="w-4 h-4" /> Sync now
                        </button>
                    </div>
                </div>

                {syncError && (
                    <p className="mt-3 rounded-xl bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-600">
                        {syncError}
                    </p>
                )}

                {!isCloudConfigured && (
                    <p className="mt-3 rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs font-semibold text-amber-700">
                        VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not set, so content is only cached in
                        this browser and nothing is shared with other devices.
                    </p>
                )}

                {isCloudConfigured && syncStatus === 'offline' && (
                    <p className="mt-3 rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs text-slate-600">
                        If you have not set the backend up yet, run{' '}
                        <code className="text-[#0072CE]">supabase/schema.sql</code> in the Supabase SQL Editor.
                    </p>
                )}
            </div>

            {/* Collection counts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {counts.map((c) => (
                    <div key={c.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <p className="text-2xl font-extrabold heading-font text-[#0b2a4a]">{c.count}</p>
                        <p className="text-xs font-semibold text-slate-500">{c.label}</p>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <button
                    type="button"
                    onClick={handleExport}
                    className="flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-left hover:border-[#0072CE]/40 hover:shadow-md transition-all"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0072CE]/12 text-[#0072CE]">
                        <IconDownload />
                    </span>
                    <span>
                        <span className="block font-extrabold text-[#0b2a4a]">Export JSON</span>
                        <span className="block text-xs text-slate-500">Download a full backup.</span>
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-left hover:border-[#0072CE]/40 hover:shadow-md transition-all"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                        <IconUpload />
                    </span>
                    <span>
                        <span className="block font-extrabold text-[#0b2a4a]">Import JSON</span>
                        <span className="block text-xs text-slate-500">Restore and push to Supabase.</span>
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setConfirmReset(true)}
                    className="flex flex-col items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/50 p-5 text-left hover:border-rose-300 hover:shadow-md transition-all"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                        <IconRefresh />
                    </span>
                    <span>
                        <span className="block font-extrabold text-rose-700">Reset content</span>
                        <span className="block text-xs text-rose-500">Restore the original seed data.</span>
                    </span>
                </button>
            </div>

            <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                onChange={handleImportFile}
                className="hidden"
            />

            {/* Media library */}
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden mb-6">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <div>
                        <h3 className="font-extrabold text-[#0b2a4a]">Media library</h3>
                        <p className="text-xs text-slate-400">
                            Files in the <code>{MEDIA_BUCKET}</code> storage bucket
                        </p>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                        {loadingMedia ? 'Loading…' : `${media.length} assets`}
                    </span>
                </div>

                {mediaError && (
                    <p className="px-6 py-4 text-sm text-rose-600">{mediaError}</p>
                )}

                {!mediaError && media.length === 0 && !loadingMedia && (
                    <p className="px-6 py-8 text-sm text-slate-400">
                        No uploads yet. Use an image field in any editor to add one.
                    </p>
                )}

                {media.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
                        {media.map((item) => (
                            <div key={item.path} className="group rounded-2xl border border-slate-200 overflow-hidden">
                                <div className="h-24 w-full bg-slate-100">
                                    <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-2.5">
                                    <p className="truncate text-xs font-semibold text-[#0b2a4a]" title={item.name}>
                                        {item.name}
                                    </p>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-[10px] text-slate-400">{formatBytes(item.size)}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteMedia(item)}
                                            className="text-[10px] font-bold text-rose-500 hover:text-rose-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Activity log */}
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <h3 className="font-extrabold text-[#0b2a4a]">Recent activity</h3>
                    <span className="text-xs font-semibold text-slate-400">
                        {activity.length} events · stored in Supabase
                    </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {activity.length === 0 && (
                        <p className="px-6 py-8 text-sm text-slate-400">No changes recorded yet.</p>
                    )}
                    {activity.map((entry) => (
                        <div key={entry.id} className="flex items-center gap-4 px-6 py-3">
                            <span
                                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold uppercase ${entry.action === 'delete'
                                    ? 'bg-rose-100 text-rose-600'
                                    : entry.action === 'create'
                                        ? 'bg-emerald-100 text-emerald-600'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}
                            >
                                {entry.action.slice(0, 3)}
                            </span>
                            <span className="flex-1 text-sm text-[#0b2a4a]">{entry.detail}</span>
                            <span className="text-xs text-slate-400 whitespace-nowrap">{entry.by}</span>
                            <span className="text-xs text-slate-400 whitespace-nowrap">{formatDate(entry.at)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reset confirm */}
            {confirmReset && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <button
                        type="button"
                        aria-label="Cancel"
                        onClick={() => setConfirmReset(false)}
                        className="absolute inset-0 bg-[#030f1e]/60 backdrop-blur-sm"
                    />
                    <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4">
                            <IconTrash />
                        </span>
                        <h3 className="text-xl font-extrabold heading-font text-[#0b2a4a] mb-2">
                            Reset all content?
                        </h3>
                        <p className="text-sm text-slate-500 mb-6">
                            Every edit, new article and settings change will be discarded and the original site
                            content restored — in Supabase and in this browser. Export a backup first if you may
                            need it.
                        </p>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={async () => {
                                    setConfirmReset(false);
                                    await resetAll();
                                    flash('Content reset to seed data');
                                }}
                                className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-bold text-white hover:bg-rose-700"
                            >
                                Yes, reset everything
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirmReset(false)}
                                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {message && (
                <div className="fixed bottom-6 right-6 z-[70] rounded-2xl bg-[#0b2a4a] px-5 py-3.5 text-sm font-bold text-white shadow-2xl">
                    {message}
                </div>
            )}
        </div>
    );
}
