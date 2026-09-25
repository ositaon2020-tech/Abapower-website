import React, { useMemo, useState } from 'react';
import {
    RANGES,
    buildReport,
    formatDayLabel,
} from '../../data/cms/analytics';
import { useAnalytics } from '../../hooks/useAnalyticsTracker';
import {
    LineArea,
    Bars,
    Donut,
    HBar,
    HeatBars,
    Sparkline,
    formatCompact,
} from './Charts';
import {
    IconRefresh,
    IconDownload,
    IconTrash,
    IconSearch,
    IconTrendUp,
    IconTrendDown,
    IconEye,
    IconCursorClick,
    IconChart,
    IconUsers,
} from './AdminIcons';

const TONE = {
    blue: { chip: 'bg-[#0072CE]/12 text-[#0072CE]', stroke: '#0072CE' },
    gold: { chip: 'bg-[#F5B800]/25 text-[#8a6300]', stroke: '#F5B800' },
    navy: { chip: 'bg-[#0b2a4a]/10 text-[#0b2a4a]', stroke: '#0b2a4a' },
    green: { chip: 'bg-emerald-100 text-emerald-600', stroke: '#10b981' },
    slate: { chip: 'bg-slate-100 text-slate-600', stroke: '#94a3b8' },
};

const numberFmt = (value) => (value ?? 0).toLocaleString();

function Delta({ value }) {
    if (value == null || Number.isNaN(value)) return null;
    const up = value >= 0;
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${up ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'
                }`}
        >
            {up ? <IconTrendUp className="w-3 h-3" /> : <IconTrendDown className="w-3 h-3" />}
            {up ? '+' : ''}
            {value}%
        </span>
    );
}

function KpiCard({ label, value, hint, tone = 'blue', delta, spark, Icon }) {
    const t = TONE[tone] || TONE.blue;
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${t.chip}`}>
                    <Icon className="w-4 h-4" />
                </span>
                <Delta value={delta} />
            </div>
            <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#0b2a4a]">
                {typeof value === 'number' ? numberFmt(value) : value}
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>
            <div className="mt-3 flex items-end justify-between gap-2">
                <p className="text-xs text-slate-500">{hint}</p>
                {spark && <Sparkline values={spark} color={t.stroke} width={96} height={30} />}
            </div>
        </div>
    );
}

function Card({ title, subtitle, children, action }) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="font-extrabold text-[#0b2a4a]">{title}</h3>
                    {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
                </div>
                {action}
            </div>
            {children}
        </section>
    );
}

export default function AnalyticsPanel() {
    const [rangeKey, setRangeKey] = useState('30d');
    const [trendMode, setTrendMode] = useState('area');
    const { events, refresh, clear } = useAnalytics();

    const range = RANGES.find((r) => r.key === rangeKey) || RANGES[1];

    // Re-derive the whole report whenever the range or the event log changes.
    const report = useMemo(
        () => buildReport(range.days, new Date(), events),
        [range.days, events],
    );

    const { totals, series, topPages, topKeywords, topClicks, sources, devices, hourly } = report;
    const sparkVisitors = series.map((p) => p.visitors);
    const sparkClicks = series.map((p) => p.clicks);
    const sparkViews = series.map((p) => p.pageviews);

    const sessionEvents = events.filter((e) => e.type !== 'visit').slice(-8).reverse();
    const capturedVisits = events.filter((e) => e.type === 'visit').length;

    const exportCsv = () => {
        const header = ['date', 'visitors', 'pageviews', 'clicks', 'searches'];
        const rows = series.map((p) => [p.date, p.visitors, p.pageviews, p.clicks, p.searches]);
        const csv = [header, ...rows].map((row) => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `abapower-analytics-${rangeKey}-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-6xl">
            {/* ---------------------------------------------------------- header */}
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0072CE]">Analytics</p>
                    <h2 className="mt-1 text-3xl font-extrabold heading-font text-[#0b2a4a] tracking-tight">
                        Audience & engagement
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-slate-500">
                        Visitors, page views, click activity and the keywords people search on the site.
                        History is modelled from a 90-day baseline; interactions from this browser are
                        merged in live.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
                        {RANGES.map((r) => (
                            <button
                                key={r.key}
                                type="button"
                                onClick={() => setRangeKey(r.key)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${r.key === rangeKey
                                        ? 'bg-[#0072CE] text-white'
                                        : 'text-slate-500 hover:bg-slate-100 hover:text-[#0b2a4a]'
                                    }`}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={refresh}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                        title="Reload captured events"
                    >
                        <IconRefresh className="w-3.5 h-3.5" /> Refresh
                    </button>
                    <button
                        type="button"
                        onClick={exportCsv}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                        <IconDownload className="w-3.5 h-3.5" /> CSV
                    </button>
                </div>
            </div>

            {/* ------------------------------------------------------------- KPIs */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <KpiCard
                    label="Visitors"
                    value={totals.visitors}
                    hint={`${numberFmt(totals.newVisitors)} new · ${numberFmt(totals.returning)} returning`}
                    tone="blue"
                    delta={totals.visitorsDelta}
                    spark={sparkVisitors}
                    Icon={IconUsers}
                />
                <KpiCard
                    label="Page views"
                    value={totals.pageviews}
                    hint={`${totals.pagesPerSession} pages per session`}
                    tone="navy"
                    spark={sparkViews}
                    Icon={IconEye}
                />
                <KpiCard
                    label="Clicks"
                    value={totals.clicks}
                    hint={`${totals.clickThroughRate}% click-through rate`}
                    tone="gold"
                    delta={totals.clicksDelta}
                    spark={sparkClicks}
                    Icon={IconCursorClick}
                />
                <KpiCard
                    label="Searches"
                    value={totals.searches}
                    hint={`Top: ${topKeywords[0]?.label || '—'}`}
                    tone="green"
                    Icon={IconSearch}
                />
                <KpiCard
                    label="Sessions"
                    value={totals.sessions}
                    hint={`${numberFmt(capturedVisits)} captured in this browser`}
                    tone="slate"
                    Icon={IconChart}
                />
                <KpiCard
                    label="Top page"
                    value={topPages[0] ? formatCompact(topPages[0].value) : '—'}
                    hint={topPages[0]?.label || 'No page views yet'}
                    tone="blue"
                    Icon={IconEye}
                />
            </div>

            {/* ---------------------------------------------------- trend graph */}
            <div className="mb-6">
                <Card
                    title="Traffic trend"
                    subtitle={`Visitors and clicks per day — ${range.label.toLowerCase()}`}
                    action={
                        <div className="inline-flex rounded-xl border border-slate-200 p-1">
                            {[
                                { key: 'area', label: 'Line' },
                                { key: 'bars', label: 'Bars' },
                            ].map((m) => (
                                <button
                                    key={m.key}
                                    type="button"
                                    onClick={() => setTrendMode(m.key)}
                                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${trendMode === m.key
                                            ? 'bg-[#0b2a4a] text-white'
                                            : 'text-slate-500 hover:bg-slate-100'
                                        }`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    }
                >
                    {trendMode === 'area' ? (
                        <LineArea
                            labels={series}
                            series={[
                                { key: 'visitors', name: 'Visitors', color: '#0072CE', values: sparkVisitors },
                                { key: 'clicks', name: 'Clicks', color: '#F5B800', values: sparkClicks },
                            ]}
                            ariaLabel="Visitors and clicks trend"
                            height={260}
                        />
                    ) : (
                        <Bars
                            labels={series}
                            series={[
                                { key: 'visitors', name: 'Visitors', color: '#0072CE', values: sparkVisitors },
                                { key: 'clicks', name: 'Clicks', color: '#F5B800', values: sparkClicks },
                            ]}
                            ariaLabel="Visitors and clicks per day"
                            height={260}
                        />
                    )}
                </Card>
            </div>

            {/* ------------------------------------------- keywords + sources */}
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card
                    title="Most searched keywords"
                    subtitle="What visitors look for in the site search"
                >
                    <HBar data={topKeywords.slice(0, 8)} color="#0072CE" ariaLabel="Top search keywords" />
                </Card>

                <div className="space-y-6">
                    <Card title="Traffic sources" subtitle="Where visitors arrive from">
                        <Donut data={sources} ariaLabel="Traffic sources" />
                    </Card>
                    <Card title="Devices" subtitle="Screen type breakdown">
                        <Donut data={devices} size={170} ariaLabel="Device breakdown" />
                    </Card>
                </div>
            </div>

            {/* --------------------------------------------- pages + clicks */}
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card title="Top pages" subtitle="Most viewed sections of the site">
                    <HBar
                        data={topPages.slice(0, 8).map((p) => ({
                            ...p,
                            label: `${p.label}  ${p.label.startsWith('/') ? '' : ''}`.trim(),
                        }))}
                        color="#0b2a4a"
                        ariaLabel="Top pages"
                    />
                </Card>
                <Card title="Top clicked elements" subtitle="Buttons, links and CTAs people tap">
                    <HBar data={topClicks.slice(0, 8)} color="#F5B800" ariaLabel="Top clicks" />
                </Card>
            </div>

            {/* --------------------------------------------------- hourly heat */}
            <div className="mb-6">
                <Card title="Traffic by hour" subtitle="When visitors are most active (site local time)">
                    <HeatBars hours={hourly} />
                </Card>
            </div>

            {/* ------------------------------------------------ live capture */}
            <Card
                title="Live capture from this browser"
                subtitle="Real interactions recorded since analytics started"
                action={
                    events.length > 0 && (
                        <button
                            type="button"
                            onClick={clear}
                            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100"
                        >
                            <IconTrash className="w-3.5 h-3.5" /> Clear captured data
                        </button>
                    )
                }
            >
                {sessionEvents.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400">
                        Nothing captured yet. Browse the public site, tap a&nbsp;
                        <span className="font-semibold">TID Token</span> or use the site search — events will
                        appear here instantly.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 text-[11px] uppercase tracking-[0.12em] text-slate-400">
                                    <th className="pb-2 pr-4 font-bold">Event</th>
                                    <th className="pb-2 pr-4 font-bold">Detail</th>
                                    <th className="pb-2 pr-4 font-bold">Visitor</th>
                                    <th className="pb-2 font-bold">When</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessionEvents.map((e) => (
                                    <tr key={e.id} className="border-b border-slate-50">
                                        <td className="py-2.5 pr-4">
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${e.type === 'click'
                                                        ? 'bg-[#F5B800]/25 text-[#8a6300]'
                                                        : e.type === 'search'
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-[#0072CE]/12 text-[#0072CE]'
                                                    }`}
                                            >
                                                {e.type}
                                            </span>
                                        </td>
                                        <td className="py-2.5 pr-4 font-semibold text-[#0b2a4a]">
                                            {e.label || e.keyword || e.page || '—'}
                                        </td>
                                        <td className="py-2.5 pr-4 text-xs text-slate-500">{e.visitorId || 'anon'}</td>
                                        <td className="py-2.5 text-xs text-slate-500">
                                            {e.at ? new Date(e.at).toLocaleTimeString('en-GB') : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}
