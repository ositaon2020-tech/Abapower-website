import React from 'react';
import {
    IconZap,
    IconGrid,
    IconCreditCard,
    IconActivity,
    IconFactory,
    IconCalculator,
    IconDocument,
    IconCheckCircle,
    IconArrowRight,
    IconPhone,
    IconLock,
    IconMessageSquare,
} from './Icons';
import { useContent } from '../context/ContentContext';
import {
    METERING_ROUTE_BASE,
    METERING_HERO,
    METERING_TOPICS,
    MAP_APPLICATION_URL,
    getMeteringTopicBySlug,
    meteringTopicHref,
} from '../data/meteringContent';

/**
 * MeteringPage
 * Dedicated Metering (MAP) pages reached from the "Our Operations" sub-menu:
 *   #/metering              -> overview of every metering topic
 *   #/metering/<slug>       -> a single topic in detail
 *
 * Rendered by App.jsx when the hash route starts with METERING_ROUTE_BASE.
 * Styling follows the abapower.com look: deep navy PageBanner with brand
 * glows, a light blue gradient body, white rounded cards and blue/gold accents.
 */
const ICONS = {
    document: IconDocument,
    grid: IconGrid,
    creditCard: IconCreditCard,
    activity: IconActivity,
    zap: IconZap,
    calculator: IconCalculator,
    factory: IconFactory,
};

const TONES = {
    blue: {
        iconWrap: 'bg-[#0072CE]/15 border-[#0072CE]/30 text-[#0072CE]',
        accent: 'text-[#0072CE]',
        chip: 'bg-[#0072CE]/10 text-[#0072CE]',
    },
    gold: {
        iconWrap: 'bg-[#F5B800]/20 border-[#F5B800]/40 text-[#b07d00]',
        accent: 'text-[#b07d00]',
        chip: 'bg-[#F5B800]/20 text-[#8a6200]',
    },
    dark: {
        iconWrap: 'bg-[#0b2a4a]/12 border-[#0b2a4a]/25 text-[#0b2a4a]',
        accent: 'text-[#0b2a4a]',
        chip: 'bg-[#0b2a4a]/10 text-[#0b2a4a]',
    },
};

/* The MAP Application topic is replaced by the APLE meter-request portal, so it
   resolves to an external URL. External destinations open in a new tab. */
const isExternalHref = (href) => /^https?:\/\//i.test(href || '');
const externalLinkProps = (href) =>
    isExternalHref(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
const topicHref = (slug) =>
    slug === 'application' ? MAP_APPLICATION_URL : `#${METERING_ROUTE_BASE}/${slug}`;

function PageBanner({ children }) {
    return (
        <div className="relative pt-36 pb-14 sm:pt-40 sm:pb-16 overflow-hidden bg-gradient-to-br from-[#0b2440] via-[#062542] to-[#030f1e]">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0072CE]/25 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F5B800]/15 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="absolute inset-0 blue-grid-overlay opacity-20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        </div>
    );
}

function Breadcrumb({ topic }) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/70 mb-5"
        >
            <a href="#hero" className="hover:text-[#F5B800] transition-colors">
                Home
            </a>
            <span aria-hidden="true">/</span>
            <a
                href={`#${METERING_ROUTE_BASE}`}
                className={topic ? 'hover:text-[#F5B800] transition-colors' : 'text-[#F5B800] font-semibold'}
            >
                Metering
            </a>
            {topic && (
                <>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#F5B800] font-semibold">{topic.title}</span>
                </>
            )}
        </nav>
    );
}

function HeroStats({ stats }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 max-w-4xl" data-reveal-stagger>
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm"
                >
                    <span className="block text-xl sm:text-2xl font-extrabold heading-font text-white">
                        {stat.value}
                    </span>
                    <span className="block text-[11px] sm:text-xs font-semibold text-white/65 mt-1 leading-snug">
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

function TopicOverview({ topic }) {
    const tone = TONES[topic.tone] || TONES.blue;
    const Icon = ICONS[topic.iconKey] || IconDocument;

    return (
        <a
            href={topicHref(topic.slug)}
            {...externalLinkProps(topicHref(topic.slug))}
            className="group bg-white rounded-3xl p-7 sm:p-8 shadow-lg border border-[#cfe2f5] flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
            {topic.image ? (
                <div className="mb-5 -mt-1 overflow-hidden rounded-2xl border border-[#cfe2f5] bg-[#e2eefb]">
                    <img
                        src={topic.image}
                        alt={topic.imageAlt || topic.title}
                        loading="lazy"
                        className="h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </div>
            ) : null}
            <div
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${tone.iconWrap}`}
            >
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-2">
                {topic.title}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed mb-6">
                {topic.tagline}
            </p>
            <span className={`mt-auto inline-flex items-center gap-2 font-bold text-sm ${tone.accent}`}>
                <span>Read more</span>
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
        </a>
    );
}

function TopicDetail({ topic, topics }) {
    const tone = TONES[topic.tone] || TONES.blue;
    const HeroIcon = ICONS[topic.iconKey] || IconDocument;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar: every metering topic */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
                <div className="bg-white rounded-3xl p-3 shadow-lg border border-[#cfe2f5]">
                    <span className="block px-4 pt-3 pb-2 text-[11px] font-bold tracking-[0.14em] uppercase text-slate-500">
                        Metering
                    </span>
                    <nav className="flex flex-col">
                        {topics.map((t) => {
                            const isActive = t.slug === topic.slug;
                            const RowIcon = ICONS[t.iconKey] || IconDocument;
                            return (
                                <a
                                    key={t.slug}
                                    href={topicHref(t.slug)}
                                    {...externalLinkProps(topicHref(t.slug))}
                                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${isActive ? 'bg-[#0072CE] text-white' : 'text-[#0b2a4a] hover:bg-[#e8f3fc]'
                                        }`}
                                >
                                    <RowIcon
                                        className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#F5B800]' : 'text-[#0072CE]'}`}
                                    />
                                    <span>{t.title}</span>
                                </a>
                            );
                        })}
                    </nav>
                </div>

                <a
                    href="#customer-service"
                    className="mt-4 flex items-center justify-between gap-3 bg-gradient-to-br from-[#F5B800] to-[#d99e00] rounded-3xl px-5 py-4 text-[#0b2a4a] shadow-lg hover:shadow-xl transition-all"
                >
                    <span className="text-sm font-extrabold heading-font leading-tight">
                        Talk to the metering desk
                    </span>
                    <IconArrowRight className="w-4 h-4 flex-shrink-0" />
                </a>

                <a
                    href="#customer-service"
                    className="mt-3 flex items-center justify-between gap-3 bg-white rounded-3xl border border-[#cfe2f5] px-5 py-4 text-[#0b2a4a] shadow-sm hover:shadow-md transition-all"
                >
                    <span className="text-sm font-extrabold heading-font leading-tight">
                        Pay / buy a TID token
                    </span>
                    <IconCreditCard className="w-4 h-4 flex-shrink-0 text-[#0072CE]" />
                </a>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-8">
                <article className="bg-white rounded-3xl p-7 sm:p-10 shadow-xl border border-[#cfe2f5]">
                    <div className="flex items-start gap-4 mb-6">
                        <div
                            className={`hidden sm:flex w-14 h-14 rounded-2xl border items-center justify-center flex-shrink-0 ${tone.iconWrap}`}
                        >
                            <HeroIcon className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold heading-font text-[#0b2a4a] tracking-tight leading-tight">
                                {topic.title}
                            </h2>
                            <p className={`text-sm font-semibold mt-1 ${tone.accent}`}>{topic.tagline}</p>
                        </div>
                    </div>

                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-8">{topic.intro}</p>

                    {topic.heroStat && (
                        <div className="flex flex-wrap gap-4 mb-10">
                            <div className="rounded-2xl border border-[#cfe2f5] bg-[#f4f9fe] px-6 py-4 min-w-[160px]">
                                <span
                                    className={`block text-2xl font-extrabold heading-font ${tone.accent}`}
                                >
                                    {topic.heroStat.value}
                                </span>
                                <span className="block text-[11px] font-bold tracking-wide uppercase text-slate-500 mt-1">
                                    {topic.heroStat.label}
                                </span>
                            </div>
                        </div>
                    )}

                    {topic.image ? (
                        <figure className="mb-10 overflow-hidden rounded-3xl border border-[#cfe2f5] shadow-sm">
                            <img
                                src={topic.image}
                                alt={topic.imageAlt || topic.title}
                                loading="lazy"
                                className="h-auto w-full object-contain bg-[#e2eefb]"
                            />
                        </figure>
                    ) : null}

                    <div className="space-y-10">
                        {(topic.sections || []).map((section) => (
                            <div key={section.heading}>
                                <h3 className="text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-4">
                                    {section.heading}
                                </h3>
                                {section.body && (
                                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
                                        {section.body}
                                    </p>
                                )}
                                <ul className="space-y-4">
                                    {(section.bullets || []).map((bullet) => (
                                        <li key={bullet} className="flex items-start gap-3">
                                            <IconCheckCircle className="w-5 h-5 text-[#0072CE] flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700 text-sm sm:text-base leading-relaxed">
                                                {bullet}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {(topic.downloads || []).length > 0 && (
                        <div className="mt-10">
                            <h3 className="text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-4">
                                Downloads
                            </h3>
                            <div className="space-y-4">
                                {topic.downloads.map((file) => (
                                    <a
                                        key={file.href}
                                        href={file.href}
                                        download={file.fileName}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-start gap-4 rounded-3xl border border-[#cfe2f5] bg-[#f4f9fe] p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                                    >
                                        <span className="flex w-12 h-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#0072CE]/30 bg-[#0072CE]/10 text-[#0072CE]">
                                            <IconDocument className="w-6 h-6" />
                                        </span>
                                        <span className="flex-1">
                                            <span className="flex flex-wrap items-center gap-2">
                                                <span className="text-base sm:text-lg font-extrabold heading-font text-[#0b2a4a]">
                                                    {file.label}
                                                </span>
                                                {file.kind && (
                                                    <span className="inline-flex items-center rounded-full bg-[#F5B800]/20 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.12em] uppercase text-[#8a6200]">
                                                        {file.kind}
                                                    </span>
                                                )}
                                            </span>
                                            {file.description && (
                                                <span className="mt-1 block text-slate-600 text-sm leading-relaxed">
                                                    {file.description}
                                                </span>
                                            )}
                                            <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#0072CE]">
                                                <span>Download</span>
                                                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {topic.cta && (
                        <div className="mt-10 rounded-3xl bg-gradient-to-br from-[#0b2440] via-[#062542] to-[#030f1e] p-6 sm:p-8">
                            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-[#F5B800] mb-3">
                                <IconLock className="w-3.5 h-3.5" />
                                <span>Next step</span>
                            </span>
                            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5">
                                {topic.cta.note}
                            </p>
                            <a
                                href={topic.cta.href}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5B800] text-[#0b2a4a] font-extrabold text-sm hover:bg-[#ffcb2b] transition-all shadow-lg"
                            >
                                <IconArrowRight className="w-4 h-4" />
                                <span>{topic.cta.label}</span>
                            </a>
                        </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-[#e2eefb] flex flex-wrap gap-3">
                        <a
                            href={`#${METERING_ROUTE_BASE}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0b2a4a]/30 text-[#0b2a4a] font-bold text-sm hover:bg-[#0b2a4a] hover:text-white transition-all"
                        >
                            <span>All Metering topics</span>
                        </a>
                        <a
                            href="#customer-service"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0072CE] text-white font-bold text-sm hover:bg-[#005fb3] transition-all"
                        >
                            <IconPhone className="w-4 h-4" />
                            <span>Contact the metering desk</span>
                        </a>
                    </div>
                </article>
            </div>
        </div>
    );
}

function SupportStrip({ branding }) {
    const phone = branding?.phone || '0700-APL-POWER';
    const email = branding?.email || 'info@abapower.com';

    return (
        <section className="pb-16 sm:pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="bg-white rounded-3xl shadow-xl border border-[#cfe2f5] p-7 sm:p-9 grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
                    data-reveal="up"
                >
                    <div className="md:col-span-1">
                        <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-[#0072CE] mb-2">
                            <IconMessageSquare className="w-3.5 h-3.5" />
                            <span>Need help?</span>
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight">
                            The metering desk is ready
                        </h3>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a
                            href={`tel:${String(phone).replace(/\s/g, '')}`}
                            className="rounded-2xl border border-[#cfe2f5] bg-[#f4f9fe] px-5 py-4 hover:shadow-md transition-all"
                        >
                            <span className="block text-[11px] font-bold tracking-[0.14em] uppercase text-slate-500 mb-1">
                                Call
                            </span>
                            <span className="block text-lg font-extrabold heading-font text-[#0b2a4a]">
                                {phone}
                            </span>
                        </a>
                        <a
                            href={`mailto:${email}`}
                            className="rounded-2xl border border-[#cfe2f5] bg-[#f4f9fe] px-5 py-4 hover:shadow-md transition-all"
                        >
                            <span className="block text-[11px] font-bold tracking-[0.14em] uppercase text-slate-500 mb-1">
                                Email
                            </span>
                            <span className="block text-lg font-extrabold heading-font text-[#0b2a4a] break-all">
                                {email}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function MeteringPage({ slug = null }) {
    const { getSettings } = useContent();
    const branding = getSettings ? getSettings('branding') : {};

    const topic = getMeteringTopicBySlug(slug);
    const isDetail = Boolean(topic);

    return (
        <div id="metering" className="bg-gradient-to-br from-[#eef5fc] via-[#e2eefb] to-[#d3e6fa]">
            <PageBanner>
                <Breadcrumb topic={isDetail ? topic : null} />

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/5 text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-5">
                    <IconZap className="w-3.5 h-3.5 text-[#F5B800]" />
                    <span>{METERING_HERO.badge}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white heading-font tracking-tight leading-[1.1] max-w-4xl">
                    {isDetail ? (
                        topic.title
                    ) : (
                        <>
                            {METERING_HERO.title}{' '}
                            <span className="text-[#F5B800]">{METERING_HERO.titleAccent}</span>
                        </>
                    )}
                </h1>

                <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6 max-w-3xl">
                    {isDetail ? topic.tagline : METERING_HERO.subtitle}
                </p>

                {!isDetail && <HeroStats stats={METERING_HERO.stats} />}
            </PageBanner>

            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {isDetail ? (
                        <TopicDetail topic={topic} topics={METERING_TOPICS} />
                    ) : (
                        <>
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                data-reveal-stagger
                            >
                                {METERING_TOPICS.map((t) => (
                                    <TopicOverview key={t.slug} topic={t} />
                                ))}
                            </div>

                            <div
                                className="mt-12 bg-white rounded-3xl shadow-lg border border-[#cfe2f5] p-7 sm:p-9"
                                data-reveal="up"
                            >
                                <h2 className="text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-3">
                                    About the MAP programme
                                </h2>
                                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                                    Under the Meter Asset Provider regulation, Aba Power funds, installs,
                                    owns and maintains the meter while the customer pays only for the energy
                                    consumed. Metering on the Aba ring-fenced network is accurate,
                                    transparent and remotely managed, so every customer can see their usage,
                                    vend securely with a TID token and resolve metering questions quickly.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <SupportStrip branding={branding} />
        </div>
    );
}
