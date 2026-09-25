import React, { useCallback, useMemo, useState } from 'react';
import {
    IconSearch,
    IconAlertCircle,
    IconCopy,
    IconPhone,
    IconShield,
    IconArrowRight,
} from './Icons';
import { lookupMeterRecord } from '../lib/meterApi';
import {
    TID_NOTICE,
    TID_GUIDANCE,
    TID_SUPPORT,
    formatMeterNumber,
    normalizeMeterNumber,
} from '../data/tidTokenContent';

/**
 * TidTokenPage
 * Standalone TID rollover notice + meter lookup, reached from the navbar
 * "TID Token" button:
 *   #/tid-token
 *
 * Layout mirrors the official Aba Power (APLE) TID rollover notice: the two
 * regulatory paragraphs, a centred prompt, a "SEARCH" form that takes a meter
 * number, and the red "Load recharge tokens in order of purchase." reminder.
 *
 * When a visitor submits a meter number the page calls `lookupMeterRecord`,
 * which reads the customer's row from Supabase — the `tid_meters` table with
 * columns ID | Meter No | KCT1 | KCT2 (with a `<meter>.json` storage-bucket
 * fallback) — and renders the two key change tokens KCT1 and KCT2.
 */

/** Turn a raw token string into display groups of four. */
function groupToken(value = '') {
    const clean = normalizeMeterNumber(value);
    return clean.replace(/(.{4})/g, '$1 ').trim();
}

/* ------------------------------------------------------------------ banner */
function PageBanner() {
    return (
        <div className="relative pt-36 pb-14 sm:pt-40 sm:pb-16 overflow-hidden bg-gradient-to-br from-[#0b2440] via-[#062542] to-[#030f1e]">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0072CE]/25 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F5B800]/15 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="absolute inset-0 blue-grid-overlay opacity-20"></div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-reveal="up">
                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/70 mb-5"
                >
                    <a href="#hero" className="hover:text-[#F5B800] transition-colors">
                        Home
                    </a>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#F5B800] font-semibold">TID Token</span>
                </nav>

                <span className="inline-flex items-center gap-2 rounded-full bg-[#F5B800]/15 border border-[#F5B800]/40 px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] uppercase text-[#F5B800]">
                    <IconShield className="w-3.5 h-3.5" />
                    {TID_NOTICE.badge}
                </span>

                <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold heading-font text-white leading-tight tracking-tight">
                    {TID_NOTICE.title}{' '}
                    <span className="text-[#F5B800]">{TID_NOTICE.titleAccent}</span>
                </h1>
                <p className="mt-4 text-sm sm:text-base text-slate-300 font-medium max-w-2xl leading-relaxed">
                    {TID_NOTICE.subtitle}
                </p>
            </div>
        </div>
    );
}

/* --------------------------------------------------------- lookup section */
function LookupPanel({ onSearch, loading, meter, onMeterChange }) {
    return (
        <div className="bg-white rounded-3xl shadow-xl border border-[#cfe2f5] p-6 sm:p-10" data-reveal="up">
            {/* The official notice copy */}
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                {TID_NOTICE.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
            </div>

            {/* Centred prompt */}
            <p className="mt-8 text-center text-[#0b2a4a] text-base sm:text-lg font-bold">
                {TID_NOTICE.prompt}
            </p>

            {/* Meter number + SEARCH */}
            <form onSubmit={onSearch} className="mt-5">
                <div className="flex flex-col sm:flex-row sm:items-stretch gap-3 sm:gap-0 max-w-2xl mx-auto">
                    <input
                        type="text"
                        inputMode="numeric"
                        value={meter}
                        onChange={(e) => onMeterChange(e.target.value)}
                        aria-label={TID_NOTICE.inputLabel}
                        placeholder={TID_NOTICE.inputPlaceholder}
                        className="flex-1 rounded-xl sm:rounded-r-none border border-slate-300 bg-slate-50 px-5 py-4 text-base sm:text-lg font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0072CE] focus:ring-2 focus:ring-[#0072CE]/20"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-l-none bg-[#3E7C9B] hover:bg-[#356f8c] disabled:opacity-70 px-7 py-4 text-sm sm:text-base font-extrabold tracking-[0.14em] uppercase text-white shadow-md transition-colors"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            <>
                                <IconSearch className="w-4 h-4" />
                                {TID_NOTICE.ctaLabel}
                            </>
                        )}
                    </button>
                </div>
                <p className="mt-2 text-center text-xs text-slate-500">
                    {TID_NOTICE.inputNote}
                </p>
            </form>

            {/* Red reminder from the notice */}
            <p className="mt-6 text-center text-sm sm:text-base font-bold text-red-600">
                {TID_NOTICE.reminder}
            </p>
        </div>
    );
}

/* ------------------------------------------------------------ result card */
function DetailRow({ label, value }) {
    if (value === undefined || value === null || value === '') return null;
    return (
        <div className="flex items-start justify-between gap-4 py-2.5 border-b border-slate-100 last:border-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {label}
            </span>
            <span className="text-sm font-semibold text-[#0b2a4a] text-right">{value}</span>
        </div>
    );
}

/** A single key change token (KCT) with copy-to-clipboard. */
function TokenBox({ title, subtitle, token }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        if (!token) return;
        try {
            navigator.clipboard?.writeText(normalizeMeterNumber(token));
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (err) {
            /* clipboard unavailable — the token is still selectable */
        }
    };

    return (
        <div className="rounded-2xl border-2 border-[#F5B800] bg-[#030f1e] p-5 text-center shadow-lg">
            <span className="block text-[11px] font-bold tracking-[0.16em] uppercase text-slate-400">
                {title}
            </span>
            {subtitle && (
                <span className="mb-2 block text-[11px] text-slate-500">{subtitle}</span>
            )}
            <div className="text-lg sm:text-2xl font-extrabold font-mono tracking-widest text-[#F5B800] select-all">
                {token ? groupToken(token) : '\u2014'}
            </div>
            <button
                type="button"
                onClick={copy}
                disabled={!token}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#0072CE]/50 bg-[#0072CE]/30 hover:bg-[#0072CE]/50 disabled:opacity-40 px-4 py-2 text-xs font-bold text-white transition-colors"
            >
                <IconCopy className="w-4 h-4 text-[#F5B800]" />
                <span>{copied ? 'Copied to clipboard!' : 'Copy token'}</span>
            </button>
        </div>
    );
}

function MeterResult({ record }) {
    if (!record) return null;

    const hasExtras =
        record.customerName ||
        record.address ||
        record.feeder ||
        record.businessUnit ||
        record.meterType ||
        record.tariffBand;

    return (
        <div className="space-y-6" data-reveal="up">
            {/* Heading */}
            <div>
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0072CE]">
                    Meter record found
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a]">
                    {record.customerName || `Meter ${record.meterNumber}`}
                </h2>
            </div>

            {/* Core table columns: ID | Meter No | KCT1 | KCT2 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3">
                <DetailRow label="ID" value={record.id} />
                <DetailRow label="Meter No" value={record.meterNumber} />
            </div>

            {hasExtras && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3">
                    <DetailRow label="Customer name" value={record.customerName} />
                    <DetailRow label="Address" value={record.address} />
                    <DetailRow label="Feeder" value={record.feeder} />
                    <DetailRow label="Business unit" value={record.businessUnit} />
                    <DetailRow label="Meter type" value={record.meterType} />
                    <DetailRow label="Tariff band" value={record.tariffBand} />
                </div>
            )}

            {/* Key change tokens */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Key change tokens
                </h3>
                <p className="text-sm font-bold text-red-600">
                    {TID_NOTICE.reminder}
                </p>
                <div className="grid gap-4 sm:grid-cols-2" data-reveal-stagger>
                    <TokenBox
                        title="KCT1"
                        subtitle="Load this on the meter first"
                        token={record.kct1}
                    />
                    <TokenBox
                        title="KCT2"
                        subtitle="Load this after KCT1"
                        token={record.kct2}
                    />
                </div>
            </div>
        </div>
    );
}

function NotFound({ meter }) {
    return (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center" data-reveal="zoom">
            <div className="w-14 h-14 rounded-full bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center mx-auto mb-4">
                <IconAlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-extrabold heading-font text-[#0b2a4a]">
                No record found for {formatMeterNumber(meter)}
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
                We could not find that meter in the TID rollover register. Check the
                number on your meter or last vending receipt, then try again. If it
                still is not found, contact the vending desk so we can migrate your
                meter before the deadline.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                    href="#customer-service"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0072CE] px-5 py-3 text-sm font-bold text-white hover:bg-[#005aa3] transition-colors"
                >
                    Contact customer service
                    <IconArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}

function SupportStrip() {
    return (
        <div className="grid gap-4 sm:grid-cols-3" data-reveal-stagger>
            {TID_SUPPORT.map((item) => (
                <a
                    key={item.label}
                    href={item.href}
                    className="group rounded-2xl border border-[#cfe2f5] bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                        <IconPhone className="w-3.5 h-3.5 text-[#0072CE]" />
                        {item.label}
                    </span>
                    <span className="mt-2 block text-sm font-bold text-[#0b2a4a] group-hover:text-[#0072CE] transition-colors">
                        {item.value}
                    </span>
                </a>
            ))}
        </div>
    );
}

function Guidance() {
    return (
        <div className="grid gap-5 sm:grid-cols-3" data-reveal-stagger>
            {TID_GUIDANCE.map((item) => (
                <div
                    key={item.title}
                    className="rounded-2xl border border-[#cfe2f5] bg-white p-6 shadow-sm"
                >
                    <h3 className="text-sm font-extrabold heading-font text-[#0b2a4a] mb-2">
                        {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                </div>
            ))}
        </div>
    );
}

/* --------------------------------------------------------------- the page */
export default function TidTokenPage() {
    const [meter, setMeter] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [searchedMeter, setSearchedMeter] = useState('');

    const handleSearch = useCallback(
        async (event) => {
            event.preventDefault();
            const normalized = normalizeMeterNumber(meter);
            if (!normalized) return;

            setLoading(true);
            setSearchedMeter(normalized);
            setResult(null);

            try {
                const res = await lookupMeterRecord(normalized);
                // `res` is null when Supabase is not configured; `res.record`
                // is null when configured but nothing matched.
                setResult({
                    record: res?.record || null,
                    source: res?.source || null,
                    configured: res !== null,
                });
            } catch (err) {
                setResult({ record: null, source: null, configured: true });
            } finally {
                setLoading(false);
            }
        },
        [meter],
    );

    const hasSearched = result !== null;
    const record = result?.record || null;
    const notFound = hasSearched && !record;
    const configured = result?.configured !== false;
    const idle = !hasSearched;

    const resultBlock = useMemo(() => {
        if (loading) {
            return (
                <div className="rounded-3xl border border-[#cfe2f5] bg-white p-10 text-center shadow-sm">
                    <span className="mx-auto mb-4 block w-10 h-10 border-4 border-[#0072CE]/30 border-t-[#0072CE] rounded-full animate-spin"></span>
                    <p className="text-sm font-semibold text-slate-600">
                        Fetching your meter details…
                    </p>
                </div>
            );
        }

        if (notFound && !configured) {
            return (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-300 text-slate-500 flex items-center justify-center mx-auto mb-4">
                        <IconAlertCircle className="w-7 h-7" />
                    </div>
                    <h2 className="text-lg font-extrabold heading-font text-[#0b2a4a]">
                        Meter records are not connected yet
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
                        The TID token register is not configured for this environment.
                        Add your Supabase credentials and apply
                        <span className="font-mono"> supabase/tid-token.sql</span> to
                        enable lookups.
                    </p>
                </div>
            );
        }

        if (notFound) return <NotFound meter={searchedMeter} />;
        if (record) return <MeterResult record={record} />;
        return null;
    }, [loading, notFound, configured, record, searchedMeter]);

    return (
        <div className="bg-[#f4f8fc]">
            <PageBanner />

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
                <LookupPanel
                    onSearch={handleSearch}
                    loading={loading}
                    meter={meter}
                    onMeterChange={setMeter}
                />

                {resultBlock}

                {idle && <Guidance />}

                <SupportStrip />
            </section>
        </div>
    );
}
