import React from 'react';
import {
    IconShield,
    IconCheckCircle,
    IconArrowRight,
    IconPhone,
} from './Icons';
import { useContent } from '../context/ContentContext';
import {
    SAFETY_ROUTE_BASE,
    decorateTopics,
    getSafetyTopicBySlug,
} from '../data/safetyContent';

/**
 * HealthSafetyPage
 * Dedicated Health & Safety pages reached from the navbar sub-menu:
 *   #/health-safety                        -> overview of every topic
 *   #/health-safety/<slug>                 -> a single topic in detail
 *
 * Topics come from the CMS store, so edits in the dashboard appear here.
 * Rendered by App.jsx when the hash route starts with SAFETY_ROUTE_BASE.
 */
const TONES = {
    blue: {
        iconWrap: 'bg-[#0072CE]/15 border-[#0072CE]/30 text-[#0072CE]',
        accent: 'text-[#0072CE]',
    },
    gold: {
        iconWrap: 'bg-[#F5B800]/20 border-[#F5B800]/40 text-[#b07d00]',
        accent: 'text-[#b07d00]',
    },
    dark: {
        iconWrap: 'bg-[#0b2a4a]/12 border-[#0b2a4a]/25 text-[#0b2a4a]',
        accent: 'text-[#0b2a4a]',
    },
};

const topicHref = (slug) => `#${SAFETY_ROUTE_BASE}/${slug}`;

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
                href={`#${SAFETY_ROUTE_BASE}`}
                className={topic ? 'hover:text-[#F5B800] transition-colors' : 'text-[#F5B800] font-semibold'}
            >
                Health & Safety
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

function TopicOverview({ topic }) {
    const tone = TONES[topic.tone] || TONES.blue;
    const Icon = topic.icon;

    return (
        <a
            href={topicHref(topic.slug)}
            className="group bg-white rounded-3xl p-7 sm:p-8 shadow-lg border border-[#cfe2f5] flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
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

function ContactCard({ contact }) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#cfe2f5]">
            <span className="block text-[11px] font-bold tracking-[0.14em] uppercase text-slate-500 mb-1">
                {contact.label}
            </span>
            {contact.tel ? (
                <a
                    href={`tel:${contact.tel}`}
                    className="block text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a] hover:text-[#0072CE] transition-colors"
                >
                    {contact.value}
                </a>
            ) : (
                <span className="block text-lg sm:text-xl font-extrabold heading-font text-[#0b2a4a]">
                    {contact.value}
                </span>
            )}
            <span className="block text-xs sm:text-sm font-medium text-slate-500 mt-1">
                {contact.note}
            </span>
        </div>
    );
}

function TopicDetail({ topic, topics }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar: all topics */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
                <div className="bg-white rounded-3xl p-3 shadow-lg border border-[#cfe2f5]">
                    <span className="block px-4 pt-3 pb-2 text-[11px] font-bold tracking-[0.14em] uppercase text-slate-500">
                        Health & Safety
                    </span>
                    <nav className="flex flex-col">
                        {topics.map((t) => {
                            const isActive = t.slug === topic.slug;
                            return (
                                <a
                                    key={t.slug}
                                    href={topicHref(t.slug)}
                                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${isActive ? 'bg-[#0072CE] text-white' : 'text-[#0b2a4a] hover:bg-[#e8f3fc]'
                                        }`}
                                >
                                    <t.icon
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
                        Report a safety concern
                    </span>
                    <IconArrowRight className="w-4 h-4 flex-shrink-0" />
                </a>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-8">
                <article className="bg-white rounded-3xl p-7 sm:p-10 shadow-xl border border-[#cfe2f5]">
                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-8">{topic.intro}</p>

                    {topic.contacts?.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {topic.contacts.map((c) => (
                                <ContactCard key={c.label} contact={c} />
                            ))}
                        </div>
                    )}

                    <div className="space-y-10">
                        {(topic.sections || []).map((section) => (
                            <div key={section.heading}>
                                <h3 className="text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-4">
                                    {section.heading}
                                </h3>
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

                    <div className="mt-10 pt-8 border-t border-[#e2eefb] flex flex-wrap gap-3">
                        <a
                            href={`#${SAFETY_ROUTE_BASE}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0b2a4a]/30 text-[#0b2a4a] font-bold text-sm hover:bg-[#0b2a4a] hover:text-white transition-all"
                        >
                            <span>All Health & Safety topics</span>
                        </a>
                        <a
                            href="#customer-service"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0072CE] text-white font-bold text-sm hover:bg-[#005fb3] transition-all"
                        >
                            <IconPhone className="w-4 h-4" />
                            <span>Contact our safety desk</span>
                        </a>
                    </div>
                </article>
            </div>
        </div>
    );
}

export default function HealthSafetyPage({ slug = null }) {
    const { getCollection } = useContent();
    const topics = decorateTopics(getCollection('safetyTopics'));

    const topic = slug ? getSafetyTopicBySlug(topics, slug) : null;
    const isDetail = Boolean(topic);

    return (
        <div id="health-safety" className="bg-gradient-to-br from-[#eef5fc] via-[#e2eefb] to-[#d3e6fa]">
            <PageBanner>
                <Breadcrumb topic={isDetail ? topic : null} />

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/5 text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-5">
                    <IconShield className="w-3.5 h-3.5 text-[#F5B800]" />
                    <span>HEALTH & SAFETY</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white heading-font tracking-tight leading-[1.1] max-w-4xl">
                    {isDetail ? (
                        topic.title
                    ) : (
                        <>
                            Safety first — for our people,
                            <br className="hidden sm:inline" /> customers and{' '}
                            <span className="text-[#F5B800]">communities</span>
                        </>
                    )}
                </h1>

                <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6 max-w-3xl">
                    {isDetail
                        ? topic.tagline
                        : 'Aba Power is committed to delivering power safely. Explore our Covid-19 guidance, domestic and child safety advice, emergency hotlines, safety policy and public safety commitments for the Aba ring-fenced network.'}
                </p>
            </PageBanner>

            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {isDetail ? (
                        <TopicDetail topic={topic} topics={topics} />
                    ) : (
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            data-reveal-stagger
                        >
                            {topics.map((t) => (
                                <TopicOverview key={t.slug} topic={t} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
