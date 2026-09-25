import React from 'react';
import {
    IconAplSunburst,
    IconActivity,
    IconArrowRight,
    IconCheckCircle,
    IconCreditCard,
    IconFactory,
    IconGrid,
    IconMapPin,
    IconPhone,
    IconShield,
    IconZap,
} from './Icons';
import { useContent } from '../context/ContentContext';
import {
    ABOUT_HERO,
    ABOUT_IMPACT,
    ABOUT_INSPIRED,
    ABOUT_INTRO,
    ABOUT_MILESTONES,
    ABOUT_PILLARS,
    ABOUT_SERVICES,
    ABOUT_STATS,
} from '../data/aboutContent';

/**
 * AboutUsPage
 * Dedicated, standalone "About Us" page reached from the navbar Company menu:
 *   #/about-us
 *
 * Mirrors the structure and copy of abapower.com's About section — hero,
 * who-we-are story, mission/vision/values, by-the-numbers band, what we do,
 * milestones, impact and a closing call to action. Rendered by App.jsx when the
 * hash route starts with ABOUT_ROUTE_BASE.
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

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/5 text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-5">
                    <IconAplSunburst className="w-3.5 h-3.5" />
                    <span>{ABOUT_HERO.badge}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white heading-font tracking-tight leading-[1.1] max-w-4xl">
                    {ABOUT_HERO.title.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="text-[#F5B800]">{ABOUT_HERO.title.split(' ').slice(-1)}</span>
                </h1>

                <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6 max-w-3xl">
                    {ABOUT_HERO.subtitle}
                </p>

                {/* Hero stat strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 max-w-4xl" data-reveal-stagger>
                    {ABOUT_HERO.stats.map((stat) => (
                        <div
                            key={stat.caption}
                            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-md"
                        >
                            <div className="text-2xl sm:text-3xl font-extrabold text-[#F5B800] heading-font tracking-tight">
                                {stat.value}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-white/80 block mt-1">
                                {stat.caption}
                            </span>
                        </div>
                    ))}
                </div>
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

                        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {ABOUT_INTRO.highlights.map((highlight) => (
                                <li key={highlight} className="flex items-start gap-3">
                                    <IconCheckCircle className="w-5 h-5 text-[#0072CE] flex-shrink-0 mt-0.5" />
                                    <span className="text-[#0b2a4a] text-sm font-semibold leading-relaxed">
                                        {highlight}
                                    </span>
                                </li>
                            ))}
                        </ul>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-reveal-stagger>
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
 * Sits directly after the mission/vision/values pillars, whose "Our Values"
 * card introduces it.
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

function StatsBand() {
    return (
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0b2440] via-[#062542] to-[#030f1e] relative overflow-hidden">
            <div className="absolute inset-0 blue-grid-overlay opacity-15"></div>
            <div className="absolute -top-20 right-0 w-80 h-80 bg-[#0072CE]/25 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12" data-reveal="up">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white heading-font tracking-tight">
                        Aba Power by the <span className="text-[#F5B800]">numbers</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5" data-reveal-stagger>
                    {ABOUT_STATS.map((stat) => (
                        <div
                            key={stat.caption}
                            className="rounded-2xl border border-white/12 bg-white/5 px-6 py-6 text-center backdrop-blur-md hover:border-[#F5B800]/50 transition-colors"
                        >
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#F5B800] heading-font tracking-tight mb-2">
                                {stat.value}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-white/80">
                                {stat.caption}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServicesSection() {
    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 max-w-3xl" data-reveal="up">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b2a4a] text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-6">
                        <IconZap className="w-3.5 h-3.5 text-[#F5B800]" />
                        <span>WHAT WE DO</span>
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2a4a] heading-font tracking-tight leading-[1.12]">
                        Integrated power, from generation to your meter
                    </h2>
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    data-reveal-stagger
                >
                    {ABOUT_SERVICES.map((service) => {
                        const Icon = ICONS[service.iconKey] || IconZap;
                        return (
                            <article
                                key={service.title}
                                className="bg-white rounded-3xl p-7 shadow-lg border border-[#cfe2f5] flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[#F5B800]/20 border border-[#F5B800]/40 text-[#b07d00] flex items-center justify-center mb-5">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {service.body}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function MilestonesSection() {
    return (
        <section className="py-16 sm:py-20 bg-white border-y border-[#0072CE]/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 max-w-3xl" data-reveal="up">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b2a4a] text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-6">
                        <IconActivity className="w-3.5 h-3.5 text-[#F5B800]" />
                        <span>OUR JOURNEY</span>
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2a4a] heading-font tracking-tight leading-[1.12]">
                        Milestones that shaped the network
                    </h2>
                </div>

                <ol className="relative border-l-2 border-[#0072CE]/25 ml-4 space-y-10" data-reveal="up">
                    {ABOUT_MILESTONES.map((milestone) => (
                        <li key={milestone.year} className="pl-8 relative">
                            <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-[#0072CE] border-4 border-white shadow-md"></span>
                            <span className="text-sm font-extrabold text-[#b07d00] heading-font tracking-[0.1em]">
                                {milestone.year}
                            </span>
                            <h3 className="text-lg sm:text-xl font-extrabold heading-font text-[#0b2a4a] tracking-tight mt-1 mb-2">
                                {milestone.title}
                            </h3>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                                {milestone.body}
                            </p>
                        </li>
                    ))}
                </ol>
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

function ContactCta() {
    const { getSettings } = useContent();
    const branding = getSettings('branding');

    const address =
        branding.address || 'Osisioma Industrial Layout, Aba, Abia State, Nigeria';
    const phone = branding.phone || '0700-APL-POWER';

    return (
        <section className="pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0072CE] via-[#0066b8] to-[#00518f] px-8 py-12 sm:px-12 sm:py-14 shadow-2xl"
                    data-reveal="zoom"
                >
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#F5B800]/20 rounded-full filter blur-3xl pointer-events-none"></div>
                    <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white heading-font tracking-tight leading-tight mb-3">
                                Partner with Aba Power
                            </h2>
                            <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-2xl">
                                Whether you need a new connection, maximum-demand supply or
                                industrial power, our team is ready to help you get connected.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-white">
                                <IconMapPin className="w-5 h-5 text-[#F5B800] flex-shrink-0 mt-0.5" />
                                <span className="text-sm font-medium leading-relaxed">{address}</span>
                            </div>
                            <a
                                href={`tel:${phone}`}
                                className="flex items-center gap-3 text-white hover:text-[#F5B800] transition-colors"
                            >
                                <IconPhone className="w-5 h-5 text-[#F5B800] flex-shrink-0" />
                                <span className="text-sm font-bold">{phone}</span>
                            </a>
                            <a
                                href="#customer-service"
                                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F5B800] px-6 py-3 text-[#0b2a4a] font-extrabold text-sm hover:bg-white hover:text-[#0072CE] transition-colors shadow-lg"
                            >
                                <span>Contact our team</span>
                                <IconArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
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
            <StatsBand />
            <ServicesSection />
            <MilestonesSection />
            <ImpactSection />
            <ContactCta />
        </div>
    );
}
