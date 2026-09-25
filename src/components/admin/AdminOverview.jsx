import React from 'react';
import { useContent } from '../../context/ContentContext';
import { RESOURCES } from '../../data/cms/resources';
import { ResourceIcon, IconArrowRight, IconPlus } from './AdminIcons';

const QUICK_LINKS = [
    { key: 'news', note: 'Publish or edit newsroom cards' },
    { key: 'safetyTopics', note: 'Manage Health & Safety pages' },
    { key: 'settings.hero', note: 'Swap the hero video and headline' },
    { key: 'settings.branding', note: 'Update contact and social details' },
];

export default function AdminOverview({ onNavigate }) {
    const { content, activity, session } = useContent();

    const collections = RESOURCES.filter((r) => r.kind === 'collection');
    const totalItems = collections.reduce(
        (sum, r) => sum + (content.collections[r.key] || []).length,
        0,
    );

    const stats = [
        { label: 'Collections', value: collections.length, tone: 'bg-[#0072CE]/12 text-[#0072CE]' },
        { label: 'Content items', value: totalItems, tone: 'bg-emerald-100 text-emerald-600' },
        { label: 'Settings groups', value: RESOURCES.filter((r) => r.kind === 'singleton').length, tone: 'bg-[#F5B800]/25 text-[#8a6300]' },
        { label: 'Changes this session', value: activity.length, tone: 'bg-slate-100 text-slate-600' },
    ];

    const drafts = (content.collections.news || []).filter((n) => n.published === false);

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0072CE]">
                    Dashboard
                </p>
                <h2 className="mt-1 text-3xl font-extrabold heading-font text-[#0b2a4a] tracking-tight">
                    Welcome back{session?.email ? `, ${session.email.split('@')[0]}` : ''}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    Everything on the public site — the hero, stats, newsroom, Health & Safety pages and
                    support content — is editable here. Changes appear on the site immediately.
                </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold ${s.tone}`}>
                            {s.value}
                        </span>
                        <p className="mt-3 text-xs font-semibold text-slate-500">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick links */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-4 font-extrabold text-[#0b2a4a]">Quick actions</h3>
                    <div className="space-y-2">
                        {QUICK_LINKS.map((link) => {
                            const resource = RESOURCES.find((r) => r.key === link.key);
                            if (!resource) return null;
                            return (
                                <button
                                    key={link.key}
                                    type="button"
                                    onClick={() => onNavigate(link.key)}
                                    className="group flex w-full items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-left transition-all hover:border-[#0072CE]/40 hover:bg-[#f4f9fe]"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0072CE]/12 text-[#0072CE]">
                                        <ResourceIcon name={resource.icon} className="w-4 h-4" />
                                    </span>
                                    <span className="flex-1">
                                        <span className="block text-sm font-bold text-[#0b2a4a]">{resource.label}</span>
                                        <span className="block text-xs text-slate-500">{link.note}</span>
                                    </span>
                                    <IconArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 group-hover:text-[#0072CE] transition-transform" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Recent news + drafts */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-extrabold text-[#0b2a4a]">Latest newsroom items</h3>
                        <button
                            type="button"
                            onClick={() => onNavigate('news')}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#0072CE] hover:underline"
                        >
                            <IconPlus className="w-3.5 h-3.5" /> Add
                        </button>
                    </div>
                    <div className="space-y-2">
                        {(content.collections.news || []).slice(0, 5).map((item) => (
                            <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2.5">
                                <img
                                    src={item.image}
                                    alt=""
                                    className="h-10 w-14 flex-shrink-0 rounded-lg object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-[#0b2a4a]">{item.title}</p>
                                    <p className="truncate text-xs text-slate-500">
                                        {item.category} · {item.date}
                                    </p>
                                </div>
                                {item.published === false && (
                                    <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700">
                                        Draft
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                    {drafts.length > 0 && (
                        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-700">
                            {drafts.length} news item{drafts.length === 1 ? '' : 's'} unpublished. Turn on
                            &ldquo;Published&rdquo; to show them on the site.
                        </p>
                    )}
                </div>
            </div>

            {/* Recent activity */}
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="mb-4 font-extrabold text-[#0b2a4a]">Recent activity</h3>
                {activity.length === 0 ? (
                    <p className="text-sm text-slate-400">No edits yet this session.</p>
                ) : (
                    <ul className="space-y-2">
                        {activity.slice(0, 6).map((entry) => (
                            <li key={entry.id} className="flex items-center gap-3 text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#0072CE]" />
                                <span className="flex-1 text-slate-600">{entry.detail}</span>
                                <span className="text-xs text-slate-400">
                                    {entry.action}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
