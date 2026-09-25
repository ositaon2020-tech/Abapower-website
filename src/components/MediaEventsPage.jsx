import React, { useEffect, useMemo, useState } from 'react';
import {
    IconAplSunburst,
    IconArrowRight,
    IconCalendar,
    IconCamera,
    IconImage,
    IconMapPin,
    IconNewspaper,
    IconPhone,
    IconX,
} from './Icons';
import { useContent } from '../context/ContentContext';
import NewsRoom from './NewsRoom';
import {
    DEFAULT_EVENTS,
    MEDIA_CATEGORIES,
    MEDIA_GALLERY,
    MEDIA_HERO,
    MEDIA_NEWSROOM,
} from '../data/mediaContent';

/**
 * MediaEventsPage
 * Dedicated, standalone "Media & Events" page reached from the navbar:
 *   #/media
 *
 * Combines the Aba Power newsroom with a filterable gallery of events hosted by
 * the company. Articles come from the CMS `news` collection (via the shared
 * <NewsRoom/> component) while the gallery is driven by the CMS `events`
 * collection with a static fallback. Styled to match the abapower.com look:
 * dark gradient banner, light shade body, brand blue/gold accents.
 */

/** Determine whether an event should render as a wide (featured) tile. */
const isFeatured = (index) => index === 0 || index === 5;

/**
 * Smoothly scroll to an in-page section.
 *
 * The page lives on the hash route "#/media", so a plain anchor such as
 * "href=#events-gallery" would replace the route with a non-route hash and
 * make the hash router fall back to the landing page. Scrolling directly
 * keeps the visitor on this page while still jumping to the section.
 */
function scrollToSection(id) {
    if (typeof document === 'undefined') return;
    const node = document.getElementById(id);
    if (!node) return;
    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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
                    <span className="text-[#F5B800] font-semibold">Media & Events</span>
                </nav>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/5 text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-5">
                    <IconAplSunburst className="w-3.5 h-3.5" />
                    <span>{MEDIA_HERO.badge}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white heading-font tracking-tight leading-[1.1] max-w-4xl">
                    {MEDIA_HERO.title.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="text-[#F5B800]">{MEDIA_HERO.title.split(' ').slice(-1)}</span>
                </h1>

                <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6 max-w-3xl">
                    {MEDIA_HERO.subtitle}
                </p>

                {/* Hero stat strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 max-w-4xl">
                    {MEDIA_HERO.stats.map((stat) => (
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

                {/* Jump actions */}
                <div className="flex flex-wrap gap-3 mt-8">
                    <button
                        type="button"
                        onClick={() => scrollToSection('newsroom')}
                        className="inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-6 py-3 text-[#0b2a4a] font-extrabold text-sm hover:bg-white transition-colors shadow-lg"
                    >
                        <IconNewspaper className="w-4 h-4" />
                        <span>Read the newsroom</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollToSection('events-gallery')}
                        className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-white font-bold text-sm hover:bg-white/10 transition-colors"
                    >
                        <IconCamera className="w-4 h-4" />
                        <span>Browse the gallery</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

/** Heading block shared by the two main content sections. */
function SectionHeading({ icon: Icon, eyebrow, title, subtitle, tone = 'blue' }) {
    const accent =
        tone === 'gold'
            ? 'bg-[#F5B800] text-[#0b2a4a]'
            : 'bg-[#0b2a4a] text-white';
    const accentIcon = tone === 'gold' ? 'text-[#0b2a4a]' : 'text-[#F5B800]';
    return (
        <div className="max-w-3xl" data-reveal="up">
            <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${accent} text-[11px] font-bold tracking-[0.18em] uppercase mb-5`}
            >
                <Icon className={`w-3.5 h-3.5 ${accentIcon}`} />
                <span>{eyebrow}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2a4a] heading-font tracking-tight leading-[1.12]">
                {title}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mt-4">{subtitle}</p>
        </div>
    );
}

/**
 * The newsroom teaser shown at the top of the page. It summarises the section
 * then embeds the shared <NewsRoom/> in its minimalistic grid variant.
 */
function NewsSection() {
    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    icon={IconNewspaper}
                    eyebrow={MEDIA_NEWSROOM.eyebrow}
                    title={MEDIA_NEWSROOM.title}
                    subtitle={MEDIA_NEWSROOM.subtitle}
                />
            </div>

            {/* Grid variant: heading and the six-card grid all live here. */}
            <div className="mt-12" data-reveal="up">
                <NewsRoom variant="grid" />
            </div>
        </section>
    );
}

/** Lightbox overlay for a single selected event photo. */
function EventLightbox({ event, onClose }) {
    useEffect(() => {
        if (!event) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [event, onClose]);

    if (!event) return null;

    return (
        <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 bg-[#030f1e]/85 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={event.title}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl bg-[#0b1f38] rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close image"
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#F5B800] hover:text-[#0b2a4a] transition-colors"
                >
                    <IconX className="w-5 h-5" />
                </button>

                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full max-h-[62vh] object-cover"
                />

                <div className="p-6 sm:p-8">
                    <span className="badge-pill-gold-light mb-3">{event.category}</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white heading-font tracking-tight mb-3">
                        {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70 mb-4">
                        {event.date && (
                            <span className="inline-flex items-center gap-2">
                                <IconCalendar className="w-4 h-4 text-[#F5B800]" />
                                {event.date}
                            </span>
                        )}
                        {event.location && (
                            <span className="inline-flex items-center gap-2">
                                <IconMapPin className="w-4 h-4 text-[#F5B800]" />
                                {event.location}
                            </span>
                        )}
                    </div>
                    {event.caption && (
                        <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                            {event.caption}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

/** One gallery tile (button that opens the lightbox). */
function EventCard({ event, featured, onOpen }) {
    return (
        <button
            type="button"
            onClick={() => onOpen(event)}
            className={`group relative text-left rounded-3xl overflow-hidden border border-[#cfe2f5] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#0072CE]/30 ${featured ? 'sm:col-span-2' : ''
                }`}
        >
            <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${featured ? 'h-64 sm:h-80' : 'h-56'
                    }`}
            />
            {/* Dark gradient scrim so the overlaid text stays legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030f1e] via-[#030f1e]/45 to-transparent" />

            <span className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5B800] text-[#0b2a4a] text-[11px] font-bold tracking-[0.12em] uppercase">
                {event.category}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="text-white font-extrabold heading-font tracking-tight leading-snug text-base sm:text-lg">
                    {event.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/75 mt-2">
                    {event.date && (
                        <span className="inline-flex items-center gap-1.5">
                            <IconCalendar className="w-3.5 h-3.5 text-[#F5B800]" />
                            {event.date}
                        </span>
                    )}
                    {event.location && (
                        <span className="inline-flex items-center gap-1.5">
                            <IconMapPin className="w-3.5 h-3.5 text-[#F5B800]" />
                            {event.location}
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
}

/** Filterable grid of event photos with a lightbox. */
function EventsGallery() {
    const { getCollection } = useContent();

    // Published events from the CMS, falling back to the shipped defaults.
    const events = useMemo(() => {
        const stored = getCollection('events').filter((item) => item.published !== false);
        return stored.length ? stored : DEFAULT_EVENTS;
    }, [getCollection]);

    // Only offer filters that actually have matching events.
    const categories = useMemo(() => {
        const present = new Set(events.map((e) => e.category).filter(Boolean));
        return MEDIA_CATEGORIES.filter(
            (cat) => cat === 'All' || present.has(cat),
        );
    }, [events]);

    const [active, setActive] = useState('All');
    const [selected, setSelected] = useState(null);

    const visible = useMemo(
        () => (active === 'All' ? events : events.filter((e) => e.category === active)),
        [events, active],
    );

    return (
        <section
            id="events-gallery"
            className="py-16 sm:py-20 bg-white border-y border-[#0072CE]/15"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
                    <SectionHeading
                        icon={IconCamera}
                        eyebrow={MEDIA_GALLERY.eyebrow}
                        title={MEDIA_GALLERY.title}
                        subtitle={MEDIA_GALLERY.subtitle}
                        tone="gold"
                    />

                    {/* Category filter chips */}
                    <div className="flex flex-wrap gap-2 lg:justify-end" data-reveal="up">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActive(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase border transition-colors ${active === cat
                                    ? 'bg-[#0072CE] border-[#0072CE] text-white'
                                    : 'border-[#0072CE]/30 text-[#0b2a4a] hover:bg-[#0072CE]/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal-stagger>
                    {visible.map((event, index) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            featured={isFeatured(index)}
                            onOpen={setSelected}
                        />
                    ))}
                </div>

                {visible.length === 0 && (
                    <div className="text-center py-16">
                        <IconImage className="w-12 h-12 text-[#0072CE]/40 mx-auto mb-4" />
                        <p className="text-slate-600 font-medium">
                            No events in this category yet.
                        </p>
                    </div>
                )}
            </div>

            <EventLightbox event={selected} onClose={() => setSelected(null)} />
        </section>
    );
}

/** Closing call to action: media enquiries. */
function MediaContactCta() {
    const { getSettings } = useContent();
    const branding = getSettings('branding');

    const phone = branding.phone || '0700-APL-POWER';
    const email = branding.email || 'info@abapower.com';

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0072CE] via-[#0066b8] to-[#00518f] px-8 py-12 sm:px-12 sm:py-14 shadow-2xl" data-reveal="zoom">
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#F5B800]/20 rounded-full filter blur-3xl pointer-events-none"></div>
                    <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white heading-font tracking-tight leading-tight mb-3">
                                Media & press enquiries
                            </h2>
                            <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-2xl">
                                Journalists, partners and event organisers can reach the Aba
                                Power communications team for interviews, imagery, press
                                statements and event collaborations.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <a
                                href={`tel:${phone}`}
                                className="flex items-center gap-3 text-white hover:text-[#F5B800] transition-colors"
                            >
                                <IconPhone className="w-5 h-5 text-[#F5B800] flex-shrink-0" />
                                <span className="text-sm font-bold">{phone}</span>
                            </a>
                            <a
                                href={`mailto:${email}`}
                                className="flex items-center gap-3 text-white hover:text-[#F5B800] transition-colors"
                            >
                                <IconNewspaper className="w-5 h-5 text-[#F5B800] flex-shrink-0" />
                                <span className="text-sm font-bold">{email}</span>
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

export default function MediaEventsPage() {
    return (
        <div id="media" className="bg-gradient-to-br from-[#eef5fc] via-[#e2eefb] to-[#d3e6fa]">
            <PageBanner />
            <NewsSection />
            <EventsGallery />
            <MediaContactCta />
        </div>
    );
}
