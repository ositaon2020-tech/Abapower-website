import React from 'react';
import {
    IconAplSunburst,
    IconActivity,
    IconArrowRight,
    IconCreditCard,
    IconFactory,
    IconGrid,
    IconShield,
    IconZap,
} from './Icons';
import {
    ABOUT_HERO,
    ABOUT_IMPACT,
    ABOUT_INSPIRED,
    ABOUT_INTRO,
    ABOUT_PILLARS,
} from '../data/aboutContent';

/**
 * AboutUsPage
 * Dedicated, standalone "About Us" page reached from the navbar Company menu:
 *   #/about-us
 *
 * Mirrors the structure and copy of abapower.com's About section — hero,
 * who-we-are story, mission/vision/values, impact and a closing call to action.
 * Rendered by App.jsx when the hash route starts with ABOUT_ROUTE_BASE.
 */

/** Map the data layer's icon keys to the shared icon components. */
const ICONS = {
    zap: IconZap,
    activity: IconActivity,
    shield: IconShield,
    grid: IconGrid,
    creditCard: IconCreditCard,
    factory: IconFactory,
};

function PageBanner() {
    return (
        <div className="relative pt-36 pb-14 sm:pt-40 sm:pb-16 overflow-hidden bg-gradient-to-br from-[#0b2440] via-[#062542] to-[#030f1e]">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0072CE]/25 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F5B800]/15 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="absolute inset-0 blue-grid-overlay opacity-20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/70 mb-5"
                >
                    <a href="#hero" className="hover:text-[#F5B800] transition-colors">
                        Home
                    </a>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#F5B800] font-semibold">About Us</span>
                </nav>
            </div>
        </div>
    );
}

function IntroSection() {
    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Copy */}
                    <div data-reveal="left">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b2a4a] text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-6">
                            <IconActivity className="w-3.5 h-3.5 text-[#F5B800]" />
                            <span>{ABOUT_INTRO.eyebrow}</span>
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2a4a] heading-font tracking-tight leading-[1.12] mb-6">
                            {ABOUT_INTRO.title}
                        </h2>
                        <div className="space-y-4">
                            {ABOUT_INTRO.paragraphs.map((paragraph) => (
                                <p
                                    key={paragraph}
                                    className="text-slate-700 text-base leading-relaxed"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative" data-reveal="right">
                        <div className="absolute -inset-3 bg-gradient-to-br from-[#0072CE]/20 to-[#F5B800]/20 rounded-[28px] blur-xl"></div>
                        <img
                            src={ABOUT_INTRO.imageUrl}
                            alt="Aba Power distribution pole and overhead lines on the Aba network"
                            className="relative rounded-3xl w-full h-[320px] sm:h-[440px] object-cover shadow-2xl border border-white/40"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function PillarsSection() {
    return (
        <section className="py-16 sm:py-20 bg-white border-y border-[#0072CE]/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-reveal-stagger>
                    {ABOUT_PILLARS.map((pillar) => {
                        const Icon = ICONS[pillar.iconKey] || IconZap;
                        return (
                            <article
                                key={pillar.key}
                                className="bg-gradient-to-br from-[#eef5fc] to-[#dceafb] rounded-3xl p-8 border border-[#cfe2f5] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[#0072CE]/12 border border-[#0072CE]/30 text-[#0072CE] flex items-center justify-center mb-5">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-3">
                                    {pillar.label}
                                </h3>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    {pillar.body}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/**
 * Our INSPIRED values — the acronym expanded into six commitment cards.
 * Sits directly after the mission/vision pillars.
 */
function InspiredValuesSection() {
    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 max-w-3xl" data-reveal="up">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b2a4a] text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-6">
                        <IconShield className="w-3.5 h-3.5 text-[#F5B800]" />
                        <span>{ABOUT_INSPIRED.eyebrow}</span>
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2a4a] heading-font tracking-tight leading-[1.12]">
                        {ABOUT_INSPIRED.title}
                    </h2>
                    <p className="text-slate-600 text-base leading-relaxed mt-4">
                        {ABOUT_INSPIRED.intro}
                    </p>
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-reveal-stagger
                >
                    {ABOUT_INSPIRED.values.map((value) => (
                        <article
                            key={value.key}
                            className="group relative bg-white rounded-3xl p-7 border border-[#cfe2f5] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#0072CE] to-[#F5B800] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="flex items-center gap-4 mb-5">
                                <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0072CE] to-[#00518f] text-white flex items-center justify-center text-xl font-extrabold heading-font tracking-tight shadow-md">
                                    {value.letter}
                                </span>
                                <h3 className="text-lg sm:text-xl font-extrabold heading-font text-[#0b2a4a] tracking-tight">
                                    {value.label}
                                </h3>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {value.body}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ImpactSection() {
    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 max-w-3xl" data-reveal="up">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b2a4a] text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-6">
                        <IconShield className="w-3.5 h-3.5 text-[#F5B800]" />
                        <span>OUR IMPACT</span>
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2a4a] heading-font tracking-tight leading-[1.12]">
                        Why reliable power matters
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-reveal-stagger>
                    {ABOUT_IMPACT.map((item) => (
                        <div
                            key={item.title}
                            className="bg-gradient-to-br from-[#eef5fc] to-[#dceafb] rounded-3xl p-7 border border-[#cfe2f5] shadow-lg flex items-start gap-4"
                        >
                            <span className="w-9 h-9 rounded-full bg-[#0072CE] text-white flex items-center justify-center flex-shrink-0 font-extrabold heading-font">
                                <IconArrowRight className="w-4 h-4" />
                            </span>
                            <div>
                                <h3 className="text-lg font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function AboutUsPage() {
    return (
        <div id="about-us" className="bg-gradient-to-br from-[#eef5fc] via-[#e2eefb] to-[#d3e6fa]">
            <PageBanner />
            <IntroSection />
            <PillarsSection />
            <InspiredValuesSection />
            <ImpactSection />
        </div>
    );
}
