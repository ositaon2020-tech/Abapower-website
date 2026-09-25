import React, { useId, useMemo, useState } from 'react';

/**
 * Dependency-free chart primitives.
 *
 * The project ships with only React, so rather than pull in a charting library
 * these tiny SVG components cover everything the analytics panel needs:
 *   LineArea  — visitors / clicks over time (with hover crosshair + tooltip)
 *   Bars      — grouped vertical bars for range comparisons
 *   Donut     — share-of-total (traffic sources, devices)
 *   HBar      — ranked horizontal bars (top pages, top clicks)
 *   HeatBars  — 24-hour traffic distribution
 *
 * All of them are pure and responsive: they render into a viewBox and scale to
 * the width of their container, so no resize listeners are required.
 */

const BLUE = '#0072CE';
const GOLD = '#F5B800';
const NAVY = '#0b2a4a';
const GRID = '#e2e8f0';

const niceMax = (value) => {
    if (!value || value <= 0) return 10;
    const magnitude = 10 ** Math.floor(Math.log10(value));
    const normalized = value / magnitude;
    const step = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
    return step * magnitude;
};

const compact = (value) => {
    if (value == null) return '—';
    if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(value >= 10_000 ? 0 : 1)}k`;
    return `${value}`;
};

/* --------------------------------------------------------- Line / area */

/**
 * Smooth-ish area chart with an optional second series and hover readout.
 *
 * @param {{label:string,date?:string}[]} labels x-axis points
 * @param {{key:string,name:string,color?:string,fill?:boolean,total?:number}[]} series
 */
export function LineArea({
    labels = [],
    series = [],
    height = 240,
    yFormat = compact,
    ariaLabel = 'Trend chart',
}) {
    const uid = useId().replace(/:/g, '');
    const [hover, setHover] = useState(null);

    const W = 720;
    const H = height;
    const pad = { top: 16, right: 14, bottom: 26, left: 42 };
    const innerW = W - pad.left - pad.right;
    const innerH = H - pad.top - pad.bottom;

    const max = useMemo(() => {
        const peak = Math.max(
            1,
            ...series.flatMap((s) => s.total ?? s.values ?? []),
        );
        return niceMax(peak);
    }, [series]);

    if (!labels.length || !series.length) {
        return <EmptyChart height={height} />;
    }

    const n = labels.length;
    const x = (i) => pad.left + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW);
    const y = (v) => pad.top + innerH - (Math.max(0, v) / max) * innerH;

    // Thin out x labels so they never collide on dense ranges.
    const labelStep = Math.max(1, Math.ceil(n / 7));
    const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({ value: max * t, y: y(max * t) }));

    const linePath = (values) =>
        values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(' ');

    const areaPath = (values) =>
        `${linePath(values)} L${x(n - 1).toFixed(2)},${(pad.top + innerH).toFixed(2)} L${x(0).toFixed(2)},${(pad.top + innerH).toFixed(2)} Z`;

    const handleMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const ratio = (event.clientX - rect.left) / rect.width;
        const svgX = ratio * W;
        const idx = Math.round(((svgX - pad.left) / innerW) * (n - 1));
        setHover(Math.min(n - 1, Math.max(0, idx)));
    };

    return (
        <div className="relative">
            <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full"
                style={{ height }}
                role="img"
                aria-label={ariaLabel}
                onMouseMove={handleMove}
                onMouseLeave={() => setHover(null)}
            >
                <defs>
                    {series.map((s, si) => (
                        <linearGradient key={s.key} id={`grad-${uid}-${si}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={s.color || BLUE} stopOpacity="0.32" />
                            <stop offset="100%" stopColor={s.color || BLUE} stopOpacity="0.02" />
                        </linearGradient>
                    ))}
                </defs>

                {/* horizontal grid + y labels */}
                {ticks.map((tick) => (
                    <g key={tick.value}>
                        <line
                            x1={pad.left}
                            x2={W - pad.right}
                            y1={tick.y}
                            y2={tick.y}
                            stroke={GRID}
                            strokeWidth="1"
                            strokeDasharray="3 5"
                        />
                        <text x={pad.left - 8} y={tick.y + 4} textAnchor="end" fontSize="10" fill="#94a3b8">
                            {yFormat(Math.round(tick.value))}
                        </text>
                    </g>
                ))}

                {/* x labels */}
                {labels.map((label, i) =>
                    i % labelStep === 0 || i === n - 1 ? (
                        <text
                            key={`${label.label}-${i}`}
                            x={x(i)}
                            y={H - 8}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#94a3b8"
                        >
                            {label.label}
                        </text>
                    ) : null,
                )}

                {/* series */}
                {series.map((s, si) => (
                    <g key={s.key}>
                        {s.fill !== false && (
                            <path d={areaPath(s.values)} fill={`url(#grad-${uid}-${si})`} />
                        )}
                        <path
                            d={linePath(s.values)}
                            fill="none"
                            stroke={s.color || BLUE}
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </g>
                ))}

                {/* hover crosshair */}
                {hover != null && (
                    <g>
                        <line
                            x1={x(hover)}
                            x2={x(hover)}
                            y1={pad.top}
                            y2={pad.top + innerH}
                            stroke={NAVY}
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            opacity="0.35"
                        />
                        {series.map((s) => (
                            <circle
                                key={s.key}
                                cx={x(hover)}
                                cy={y(s.values[hover])}
                                r="4.5"
                                fill="#ffffff"
                                stroke={s.color || BLUE}
                                strokeWidth="2.5"
                            />
                        ))}
                    </g>
                )}
            </svg>

            {/* tooltip */}
            {hover != null && (
                <div
                    className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur"
                    style={{ left: `${(x(hover) / W) * 100}%`, top: 8 }}
                >
                    <p className="mb-1 font-bold text-[#0b2a4a]">{labels[hover].label}</p>
                    {series.map((s) => (
                        <p key={s.key} className="flex items-center gap-2 whitespace-nowrap text-slate-600">
                            <span className="h-2 w-2 rounded-full" style={{ background: s.color || BLUE }} />
                            {s.name}: <span className="font-bold text-[#0b2a4a]">{s.values[hover].toLocaleString()}</span>
                        </p>
                    ))}
                </div>
            )}

            <Legend series={series} />
        </div>
    );
}

/* ------------------------------------------------------------- Bars */

export function Bars({ labels = [], series = [], height = 220, yFormat = compact, ariaLabel = 'Bar chart' }) {
    const [hover, setHover] = useState(null);
    const W = 720;
    const H = height;
    const pad = { top: 14, right: 14, bottom: 26, left: 42 };
    const innerW = W - pad.left - pad.right;
    const innerH = H - pad.top - pad.bottom;

    if (!labels.length || !series.length) return <EmptyChart height={height} />;

    const max = niceMax(Math.max(1, ...series.flatMap((s) => s.values || [])));
    const n = labels.length;
    const slot = innerW / n;
    const groupPad = slot * 0.22;
    const barW = Math.max(2, (slot - groupPad * 2) / series.length);
    const y = (v) => pad.top + innerH - (Math.max(0, v) / max) * innerH;
    const labelStep = Math.max(1, Math.ceil(n / 8));

    return (
        <div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} role="img" aria-label={ariaLabel}>
                {[0, 0.5, 1].map((t) => (
                    <g key={t}>
                        <line
                            x1={pad.left}
                            x2={W - pad.right}
                            y1={y(max * t)}
                            y2={y(max * t)}
                            stroke={GRID}
                            strokeDasharray="3 5"
                        />
                        <text x={pad.left - 8} y={y(max * t) + 4} textAnchor="end" fontSize="10" fill="#94a3b8">
                            {yFormat(Math.round(max * t))}
                        </text>
                    </g>
                ))}

                {labels.map((label, i) => {
                    const groupX = pad.left + i * slot + groupPad;
                    return (
                        <g key={`${label.label}-${i}`} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                            <rect
                                x={pad.left + i * slot}
                                y={pad.top}
                                width={slot}
                                height={innerH}
                                fill={hover === i ? 'rgba(0,114,206,0.05)' : 'transparent'}
                            />
                            {series.map((s, si) => {
                                const value = s.values[i] || 0;
                                const bx = groupX + si * barW;
                                return (
                                    <rect
                                        key={s.key}
                                        x={bx}
                                        y={y(value)}
                                        width={Math.max(1.5, barW - 2)}
                                        height={Math.max(0, pad.top + innerH - y(value))}
                                        rx="2"
                                        fill={s.color || BLUE}
                                        opacity={hover == null || hover === i ? 1 : 0.45}
                                    />
                                );
                            })}
                            {(i % labelStep === 0 || i === n - 1) && (
                                <text x={pad.left + i * slot + slot / 2} y={H - 8} textAnchor="middle" fontSize="10" fill="#94a3b8">
                                    {label.label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {hover != null && (
                <p className="mt-1 text-center text-xs text-slate-500">
                    <span className="font-bold text-[#0b2a4a]">{labels[hover].label}</span>
                    {series.map((s) => (
                        <span key={s.key}>
                            {' · '}
                            {s.name} <span className="font-bold text-[#0b2a4a]">{(s.values[hover] || 0).toLocaleString()}</span>
                        </span>
                    ))}
                </p>
            )}

            <Legend series={series} />
        </div>
    );
}

/* ------------------------------------------------------------ Donut */

export function Donut({ data = [], size = 190, thickness = 22, ariaLabel = 'Donut chart' }) {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    if (!data.length || total <= 0) return <EmptyChart height={size} />;

    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <div className="flex items-center gap-5">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={ariaLabel} className="flex-shrink-0">
                <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
                    <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#eef2f7" strokeWidth={thickness} />
                    {data.map((d, i) => {
                        const fraction = d.value / total;
                        const dash = fraction * circumference;
                        const el = (
                            <circle
                                key={d.label}
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                fill="none"
                                stroke={d.color || DONUT_COLORS[i % DONUT_COLORS.length]}
                                strokeWidth={thickness}
                                strokeDasharray={`${dash} ${circumference - dash}`}
                                strokeDashoffset={-offset}
                                strokeLinecap="butt"
                            />
                        );
                        offset += dash;
                        return el;
                    })}
                </g>
                <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="800" fill={NAVY}>
                    {compact(total)}
                </text>
                <text x="50%" y="60%" textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8">
                    TOTAL
                </text>
            </svg>

            <ul className="min-w-0 flex-1 space-y-2">
                {data.map((d, i) => (
                    <li key={d.label} className="flex items-center gap-2 text-sm">
                        <span
                            className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                            style={{ background: d.color || DONUT_COLORS[i % DONUT_COLORS.length] }}
                        />
                        <span className="min-w-0 flex-1 truncate text-slate-600">{d.label}</span>
                        <span className="font-bold text-[#0b2a4a]">{Math.round((d.value / total) * 100)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const DONUT_COLORS = ['#0072CE', '#F5B800', '#0b2a4a', '#38bdf8', '#94a3b8', '#10b981'];

/* ---------------------------------------------- Ranked horizontal bars */

export function HBar({ data = [], color = BLUE, valueFormat = (v) => v.toLocaleString(), ariaLabel = 'Ranked list' }) {
    if (!data.length) return <p className="py-6 text-center text-sm text-slate-400">No data for this range.</p>;
    const max = Math.max(...data.map((d) => d.value)) || 1;

    return (
        <ul className="space-y-3" aria-label={ariaLabel}>
            {data.map((d, i) => (
                <li key={d.label}>
                    <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                        <span className="flex min-w-0 items-baseline gap-2">
                            <span className="w-4 flex-shrink-0 text-xs font-bold text-slate-300">{i + 1}</span>
                            <span className="truncate font-semibold text-[#0b2a4a]">{d.label}</span>
                        </span>
                        <span className="flex-shrink-0 font-bold text-slate-500">{valueFormat(d.value)}</span>
                    </div>
                    <div className="ml-6 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${(d.value / max) * 100}%`, background: color }}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
}

/* ------------------------------------------------------------- Heat bars */

export function HeatBars({ hours = [], ariaLabel = 'Traffic by hour' }) {
    const max = Math.max(1, ...hours);
    const peak = hours.indexOf(max);

    return (
        <div aria-label={ariaLabel}>
            <div className="flex h-28 items-end gap-[3px]">
                {hours.map((value, h) => (
                    <div key={h} className="group relative flex-1">
                        <div
                            className="w-full rounded-t transition-all group-hover:bg-[#F5B800]"
                            style={{
                                height: `${Math.max(3, (value / max) * 100)}%`,
                                background: h === peak ? GOLD : BLUE,
                                opacity: 0.35 + (value / max) * 0.65,
                            }}
                            title={`${String(h).padStart(2, '0')}:00 — ${value.toLocaleString()} visits`}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-semibold text-slate-400">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:00</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
                Peak hour{' '}
                <span className="font-bold text-[#0b2a4a]">
                    {String(peak).padStart(2, '0')}:00 – {String((peak + 1) % 24).padStart(2, '0')}:00
                </span>
            </p>
        </div>
    );
}

/* --------------------------------------------------------- Sparkline */

export function Sparkline({ values = [], color = BLUE, width = 120, height = 34 }) {
    if (values.length < 2) return null;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const span = max - min || 1;
    const x = (i) => (i / (values.length - 1)) * width;
    const y = (v) => height - 3 - ((v - min) / span) * (height - 6);
    const d = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/* ------------------------------------------------------------- Shared */

function Legend({ series = [] }) {
    if (series.length < 2) return null;
    return (
        <div className="mt-3 flex flex-wrap items-center gap-4">
            {series.map((s) => (
                <span key={s.key} className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color || BLUE }} />
                    {s.name}
                </span>
            ))}
        </div>
    );
}

function EmptyChart({ height = 200 }) {
    return (
        <div
            className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-400"
            style={{ height }}
        >
            No data for this range yet.
        </div>
    );
}

export { compact as formatCompact };
