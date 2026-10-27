import React, { useEffect, useMemo, useState } from 'react';
import { IconArrowRight, IconCalendar, IconNewspaper } from './Icons';
import { useContent } from '../context/ContentContext';
import {
    DEFAULT_NEWS,
    MEDIA_ROUTE_BASE,
    newsArticlePath,
    sortNewsByDateDesc,
} from '../data/mediaContent';

/**
 * NewsRoom
 * "Latest News from Aba Power" (APL Electric Company).
 *
 * Two looks are supported through the `variant` prop:
 *   - 'carousel' (default): the formal auto-sliding carousel used on the
 *     landing page — full-bleed image slides, progress dots and circular
 *     prev/next controls.
 *   - 'grid'              : a quiet, minimalistic grid of the six latest
 *     stories used on the Media & Events page.
 *
 * Articles come from the CMS `news` collection (published items only) and the
 * heading copy from `settings.newsroom`.
 */
// Fallback stories live in `data/mediaContent.js` (DEFAULT_NEWS) so the
// newsroom grid and the single-article page share one source of truth.

const DEFAULT_SETTINGS = {
    badge: 'NEWSROOM',
    title: 'Latest News from',
    titleAccent: 'Aba Power',
    subtitle:
        'Stay informed on the milestones, infrastructure projects and customer updates powering Aba and the wider Abia State economy.',
    autoplay: true,
    speedMs: 4000,
};

/** The landing-page carousel shows a fixed six-story window. */
const MAX_CARDS = 6;

/** The grid starts with six stories and reveals six more per "More" click. */
const GRID_BATCH = 6;

/**
 * Open the NEWSROOM / "Latest News from Aba Power" section on the dedicated
 * Media & Events page (the section itself is not a standalone route).
 *
 * When already on that page we simply scroll; from anywhere else we switch the
 * hash route and wait for the page to mount before scrolling, because the
 * router jumps to the top on every route change.
 */
const openNewsroom = () => {
    if (typeof window === 'undefined') return;

    const scrollToNewsroom = () => {
        const node = document.getElementById('newsroom');
        if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const targetHash = `#${MEDIA_ROUTE_BASE}`;

    if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
        // Two frames: one for the router state update, one for the page paint.
        window.requestAnimationFrame(() =>
            window.requestAnimationFrame(scrollToNewsroom),
        );
        return;
    }

    scrollToNewsroom();
};

/** Responsive number of slides visible at once (1 / 2 / 3). */
function usePerView() {
    const read = () => {
        if (typeof window === 'undefined') return 3;
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    };

    const [perView, setPerView] = useState(read);

    useEffect(() => {
        const onResize = () => setPerView(read());
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return perView;
}

/* ------------------------------------------------------------------ Carousel */

/** The original formal auto-sliding carousel (landing page). */
function NewsCarousel({ news, perView, index, onSelect, controls }) {
    const maxIndex = Math.max(0, news.length - perView);
    const translate = -(index * (100 / perView));

    return (
        <>
            <div className="newsroom-viewport">
                <div
                    className="newsroom-track"
                    style={{ transform: `translateX(${translate}%)` }}
                >
                    {news.map((item) => (
                        <div
                            key={item.id}
                            className="newsroom-slide"
                            style={{ width: `${100 / perView}%` }}
                        >
                            <a
                                href={`#${newsArticlePath(item.id)}`}
                                className="newsroom-card block"
                                aria-label={`Read full story: ${item.title}`}
                            >
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        className="newsroom-card-img"
                                    />
                                ) : null}
                                <div className="newsroom-card-overlay" />
                                <div className="newsroom-card-content">
                                    <span className="newsroom-card-tag">
                                        {item.category}
                                    </span>
                                    <h3 className="newsroom-card-title">
                                        {item.title}
                                    </h3>
                                    <div className="newsroom-card-meta">
                                        <IconCalendar className="w-4 h-4 text-[#F5B800]" />
                                        <span>{item.date}</span>
                                        {item.readTime ? (
                                            <>
                                                <span className="newsroom-dot" />
                                                <span>{item.readTime}</span>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {maxIndex > 0 ? (
                <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-0">
                    <div className="flex items-center justify-center gap-2">
                        {news.map((item, i) => (
                            <button
                                key={item.id}
                                type="button"
                                aria-label={`Go to slide ${i + 1}`}
                                className={`newsroom-dot-btn${i === index ? ' is-active' : ''
                                    }`}
                                onClick={() => onSelect(Math.min(i, maxIndex))}
                            />
                        ))}
                    </div>

                    {controls ? (
                        <div className="flex items-center gap-3 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
                            {controls}
                        </div>
                    ) : null}
                </div>
            ) : null}
        </>
    );
}

/* ---------------------------------------------------------------------- Grid */

/** One quiet news tile: thumbnail strip, category, headline, date. */
function NewsCard({ item }) {
    return (
        <a
            href={`#${newsArticlePath(item.id)}`}
            aria-label={`Read full story: ${item.title}`}
            className="group flex flex-col rounded-2xl border border-[#0072CE]/15 bg-white/80 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#0072CE]/35 hover:shadow-xl hover:shadow-[#0072CE]/10"
        >
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#e2eefb]">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <IconNewspaper className="h-8 w-8 text-[#0072CE]/30" />
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0072CE]">
                    {item.category}
                </span>
                <h3 className="mt-2 text-base font-bold leading-snug text-[#0b2a4a] heading-font tracking-tight">
                    {item.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 pt-4 text-xs font-medium text-slate-500">
                    <IconCalendar className="h-3.5 w-3.5 text-[#b07d00]" />
                    <span>{item.date}</span>
                </div>
            </div>
        </a>
    );
}

/* ------------------------------------------------------------------- Section */

export default function NewsRoom({ variant = 'carousel' }) {
    const { getCollection, getSettings } = useContent();
    const settings = { ...DEFAULT_SETTINGS, ...getSettings('newsroom') };
    const isGrid = variant === 'grid';
    const showCarousel = !isGrid;

    const perView = usePerView();
    const [index, setIndex] = useState(0);
    // How many stories the grid variant is currently showing.
    const [gridLimit, setGridLimit] = useState(GRID_BATCH);

    // Only published articles appear on the public site, newest first.
    const allNews = useMemo(() => {
        const stored = getCollection('news').filter(
            (item) => item.published !== false,
        );
        return sortNewsByDateDesc(stored.length ? stored : DEFAULT_NEWS);
    }, [getCollection]);

    // The carousel keeps a fixed six-story window; the grid reveals the rest
    // in batches as the reader clicks "More".
    const news = isGrid
        ? allNews.slice(0, gridLimit)
        : allNews.slice(0, MAX_CARDS);

    const maxIndex = Math.max(0, news.length - perView);
    const hasMoreGrid = isGrid && gridLimit < allNews.length;

    // Keep the active slide in range when the viewport changes.
    useEffect(() => {
        setIndex((current) => Math.min(current, maxIndex));
    }, [maxIndex]);

    // Autoplay — pauses itself at the end of the track then restarts.
    useEffect(() => {
        if (!showCarousel || !settings.autoplay || maxIndex === 0) return undefined;
        const id = window.setInterval(() => {
            setIndex((current) => (current >= maxIndex ? 0 : current + 1));
        }, settings.speedMs || 4000);
        return () => window.clearInterval(id);
    }, [showCarousel, settings.autoplay, settings.speedMs, maxIndex]);

    const go = (next) => {
        setIndex((current) => {
            if (next < 0) return maxIndex;
            if (next > maxIndex) return 0;
            return next;
        });
    };

    return (
        <section
            id="newsroom"
            className="newsroom-section py-24 relative section-shade border-t border-[#0072CE]/20 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header: left title, right "View all news" */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12" data-reveal="up">
                    <div>
                        <div className="badge-pill-blue-light mb-4">
                            <IconNewspaper className="w-4 h-4 text-[#0072CE]" />
                            <span>{settings.badge}</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0b2a4a] heading-font tracking-tight">
                            {settings.title}{' '}
                            <span className="text-[#b07d00]">{settings.titleAccent}</span>
                        </h2>
                        <p className="text-slate-600 text-base sm:text-lg mt-4 max-w-2xl">
                            {settings.subtitle}
                        </p>
                    </div>

                    {!isGrid || hasMoreGrid ? (
                        <div className="flex items-center gap-3 self-start sm:self-auto">
                            <button
                                type="button"
                                onClick={
                                    isGrid
                                        ? () =>
                                            setGridLimit(
                                                (current) => current + GRID_BATCH,
                                            )
                                        : openNewsroom
                                }
                                aria-expanded={isGrid ? hasMoreGrid : undefined}
                                className="inline-flex items-center gap-2 rounded-full border border-[#0072CE]/40 px-5 py-3 font-bold text-[#0072CE] hover:bg-[#0072CE] hover:text-white transition-colors whitespace-nowrap text-sm group"
                            >
                                {isGrid ? 'More' : 'View all news'}
                                <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>

            {isGrid ? (
                /* Minimalistic grid of the six latest stories */
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        data-reveal="up"
                    >
                        {news.map((item) => (
                            <NewsCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            ) : (
                /* Original formal auto-sliding carousel */
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-reveal="up">
                    <NewsCarousel
                        news={news}
                        perView={perView}
                        index={index}
                        onSelect={setIndex}
                        controls={
                            maxIndex > 0 ? (
                                <>
                                    <button
                                        type="button"
                                        className="newsroom-arrow-btn newsroom-arrow-prev"
                                        onClick={() => go(index - 1)}
                                        aria-label="Previous news"
                                    >
                                        <IconArrowRight className="w-5 h-5" />
                                    </button>
                                    <button
                                        type="button"
                                        className="newsroom-arrow-btn"
                                        onClick={() => go(index + 1)}
                                        aria-label="Next news"
                                    >
                                        <IconArrowRight className="w-5 h-5" />
                                    </button>
                                </>
                            ) : null
                        }
                    />
                </div>
            )}
        </section>
    );
}
