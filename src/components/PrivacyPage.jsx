import React from 'react';
import {
    IconShield,
    IconCheckCircle,
    IconArrowRight,
    IconPhone,
    IconMessageSquare,
    IconMapPin,
} from './Icons';
import { PRIVACY_META, PRIVACY_SECTIONS } from '../data/privacyContent';

/**
 * PrivacyPage
 * Standalone Privacy Policy document for the Nkeanyi App, reached from the
 * footer link ("Privacy") at the hash route "#/privacy".
 *
 * Rendered by App.jsx when the hash route matches PRIVACY_ROUTE_BASE. Styling
 * follows the abapower.com look: deep navy PageBanner with brand glows, a light
 * blue gradient body and white rounded cards with blue/gold accents.
 */
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

function Breadcrumb() {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/70 mb-5"
        >
            <a href="#hero" className="hover:text-[#F5B800] transition-colors">
                Home
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-[#F5B800] font-semibold">Privacy Policy</span>
        </nav>
    );
}

function ContactBlock() {
    return (
        <div className="mt-5 rounded-2xl border border-[#cfe2f5] bg-[#f4f9fe] p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-4">
                <IconMapPin className="w-5 h-5 text-[#F5B800] flex-shrink-0 mt-0.5" />
                <div className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    <span className="block font-extrabold heading-font text-[#0b2a4a]">
                        {PRIVACY_META.address[0]}
                    </span>
                    {PRIVACY_META.address.slice(1).map((line) => (
                        <span key={line} className="block">
                            {line}
                        </span>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                    href={`mailto:${PRIVACY_META.email}`}
                    className="flex items-center gap-3 rounded-2xl border border-[#cfe2f5] bg-white px-4 py-3 hover:shadow-md transition-all"
                >
                    <IconMessageSquare className="w-4 h-4 text-[#0072CE] flex-shrink-0" />
                    <span className="text-sm font-bold text-[#0b2a4a] break-all">
                        {PRIVACY_META.email}
                    </span>
                </a>
                <a
                    href={`tel:${PRIVACY_META.phone}`}
                    className="flex items-center gap-3 rounded-2xl border border-[#cfe2f5] bg-white px-4 py-3 hover:shadow-md transition-all"
                >
                    <IconPhone className="w-4 h-4 text-[#0072CE] flex-shrink-0" />
                    <span className="text-sm font-bold text-[#0b2a4a]">{PRIVACY_META.phone}</span>
                </a>
            </div>
        </div>
    );
}

function PrivacySection({ section }) {
    return (
        <section className="scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-4">
                {section.heading}
            </h2>

            {(section.paragraphs || []).map((paragraph) => (
                <p
                    key={paragraph}
                    className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4"
                >
                    {paragraph}
                </p>
            ))}

            {(section.groups || []).map((group) => (
                <div key={group.heading} className="mb-6 last:mb-0">
                    <h3 className="text-base sm:text-lg font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-3">
                        {group.heading}
                    </h3>
                    <ul className="space-y-4">
                        {group.bullets.map((bullet) => (
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

            {section.items && (
                <ul className="space-y-4">
                    {section.items.map((item) => (
                        <li key={item.label} className="flex items-start gap-3">
                            <IconCheckCircle className="w-5 h-5 text-[#0072CE] flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm sm:text-base leading-relaxed">
                                <span className="font-bold text-[#0b2a4a]">{item.label}:</span>{' '}
                                {item.text}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            {section.bullets && (
                <ul className="space-y-4">
                    {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                            <IconCheckCircle className="w-5 h-5 text-[#0072CE] flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm sm:text-base leading-relaxed">
                                {bullet}
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            {section.note && (
                <p className="mt-4 rounded-2xl border border-[#F5B800]/40 bg-[#F5B800]/10 px-4 py-3 text-[#8a6200] text-sm sm:text-base font-semibold leading-relaxed">
                    {section.note}
                </p>
            )}

            {section.contact && <ContactBlock />}
        </section>
    );
}

export default function PrivacyPage() {
    return (
        <div id="privacy" className="bg-gradient-to-br from-[#eef5fc] via-[#e2eefb] to-[#d3e6fa]">
            <PageBanner>
                <Breadcrumb />

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/5 text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-5">
                    <IconShield className="w-3.5 h-3.5 text-[#F5B800]" />
                    <span>{PRIVACY_META.badge}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white heading-font tracking-tight leading-[1.1] max-w-4xl">
                    {PRIVACY_META.title}{' '}
                    <span className="text-[#F5B800]">{PRIVACY_META.titleAccent}</span>
                </h1>

                <p className="text-white/70 text-sm font-semibold mt-5 uppercase tracking-wide">
                    Effective Date: {PRIVACY_META.effectiveDate}
                </p>
            </PageBanner>

            <section className="py-16 sm:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <article className="bg-white rounded-3xl p-7 sm:p-10 shadow-xl border border-[#cfe2f5]" data-reveal="up">
                        <div className="space-y-10" data-reveal-stagger>
                            {PRIVACY_SECTIONS.map((section) => (
                                <PrivacySection key={section.heading} section={section} />
                            ))}
                        </div>

                        <div className="mt-10 pt-8 border-t border-[#e2eefb]">
                            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3">
                                {PRIVACY_META.closing}
                            </p>
                            <p className="text-[#0b2a4a] font-extrabold heading-font">
                                {PRIVACY_META.thanks}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#hero"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0b2a4a]/30 text-[#0b2a4a] font-bold text-sm hover:bg-[#0b2a4a] hover:text-white transition-all"
                            >
                                <span>Back to home</span>
                            </a>
                            <a
                                href="#customer-service"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0072CE] text-white font-bold text-sm hover:bg-[#005fb3] transition-all"
                            >
                                <IconArrowRight className="w-4 h-4" />
                                <span>Contact customer service</span>
                            </a>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    );
}
