import React, { useMemo } from 'react';
import {
    IconAplSunburst,
    IconArrowRight,
    IconCalendar,
    IconHome,
    IconNewspaper,
} from './Icons';
import { useContent } from '../context/ContentContext';
import {
    DEFAULT_NEWS,
    MEDIA_ROUTE_BASE,
    newsArticlePath,
    newsSlug,
    sortNewsByDateDesc,
} from '../data/mediaContent';

/**
 * NewsArticlePage
 * Standalone, full-length view of a single newsroom story reached by clicking
 * any news card: "#/news/<id>".
 *
 * The article is looked up from the CMS `news` collection (published items
 * only) with the shared DEFAULT_NEWS fallback, so the page always resolves to
 * the same record the card was rendered from. A "story not found" state is
 * shown when the id/slug does not match anything.
 */

/**
 * Jump back to the NEWSROOM section on the Media & Events page.
 *
 * The newsroom is not a standalone route, so navigating to "#/media" alone
 * would land at the top of the page. We switch the hash and wait two frames
 * (one for the router state update, one for the paint) before scrolling, or
 * just scroll when we are already there.
 */
const backToNewsroom = () => {
    if (typeof window === 'undefined') return;

    const scrollToNewsroom = () => {
        const node = document.getElementById('newsroom');
        if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const targetHash = `#${MEDIA_ROUTE_BASE}`;

    if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
        window.requestAnimationFrame(() =>
            window.requestAnimationFrame(scrollToNewsroom),
        );
        return;
    }

    scrollToNewsroom();
};

/** Shared "Back to newsroom" pill. */
function BackButton({ className = '' }) {
    return (
        <button
            type="button"
            onClick={backToNewsroom}
            className={`inline-flex items-center gap-2 rounded-full border border-[#0072CE]/40 px-5 py-3 text-sm font-bold text-[#0072CE] transition-colors hover:bg-[#0072CE] hover:text-white group ${className}`}
        >
            <IconArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            Back to newsroom
        </button>
    );
}

/** Banner shared by the found and not-found states (breadcrumb + badge). */
function ArticleBanner({ category, title, date, readTime }) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0b2440] via-[#062542] to-[#030f1e] pb-14 pt-36 sm:pb-16 sm:pt-40">
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#0072CE]/25 filter blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#F5B800]/15 filter blur-3xl" />
            <div className="blue-grid-overlay absolute inset-0 opacity-20" />

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/70 sm:text-sm"
                >
                    <a href="#hero" className="transition-colors hover:text-[#F5B800]">
                        Home
                    </a>
                    <span aria-hidden="true">/</span>
                    <a
                        href={`#${MEDIA_ROUTE_BASE}`}
                        className="transition-colors hover:text-[#F5B800]"
                    >
                        Media & Events
                    </a>
                    <span aria-hidden="true">/</span>
                    <span className="font-semibold text-[#F5B800]">News</span>
                </nav>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                    <IconAplSunburst className="h-3.5 w-3.5" />
                    <span>{category || 'NEWSROOM'}</span>
                </div>

                <h1 className="max-w-4xl heading-font text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl">
                    {title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-white/80">
                    {date ? (
                        <span className="inline-flex items-center gap-2">
                            <IconCalendar className="h-4 w-4 text-[#F5B800]" />
                            {date}
                        </span>
                    ) : null}
                    {readTime ? (
                        <span className="inline-flex items-center gap-2">
                            <IconNewspaper className="h-4 w-4 text-[#F5B800]" />
                            {readTime}
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default function NewsArticlePage({ slug }) {
    const { getCollection } = useContent();

    // Published stories only, with the shared static fallback, newest first.
    const articles = useMemo(() => {
        const stored = getCollection('news').filter(
            (item) => item.published !== false,
        );
        return sortNewsByDateDesc(stored.length ? stored : DEFAULT_NEWS);
    }, [getCollection]);

    // Resolve the requested story by its id/slug.
    const article = useMemo(() => {
        if (!slug) return null;
        const target = newsSlug(slug);
        return articles.find((item) => newsSlug(item.id) === target) || null;
    }, [articles, slug]);

    // Three more stories to read next (already ordered newest-first).
    const related = useMemo(
        () => articles.filter((item) => item.id !== article?.id).slice(0, 3),
        [articles, article],
    );

    /*
     * Split the story into a lead (the summary) plus body paragraphs.
     * `body` may be an array of paragraphs or a plain string (blank-line
     * separated). When there is no body we fall back to the summary so the
     * article is never empty.
     */
    const { lead, body } = useMemo(() => {
        if (!article) return { lead: '', body: [] };

        let list = [];
        if (Array.isArray(article.body)) {
            list = article.body;
        } else if (typeof article.body === 'string' && article.body.trim()) {
            list = article.body.split(/\n{2,}/);
        }
        list = list.map((part) => String(part).trim()).filter(Boolean);

        const leadText = article.summary ? String(article.summary).trim() : '';
        if (!list.length) {
            return { lead: '', body: leadText ? [leadText] : [] };
        }
        return { lead: leadText, body: list };
    }, [article]);

    /* --------------------------------------------------------- Not found */
    if (!article) {
        return (
            <div className="bg-gradient-to-br from-[#eef5fc] via-[#e2eefb] to-[#d3e6fa]">
                <ArticleBanner title="Story not found" />
                <section className="py-16 sm:py-20">
                    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                            We couldn't find the news story you were looking for.
                            It may have been moved or unpublished.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <BackButton />
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div
            id="news-article"
            className="bg-gradient-to-br from-[#eef5fc] via-[#e2eefb] to-[#d3e6fa]"
        >
            <ArticleBanner
                category={article.category}
                title={article.title}
                date={article.date}
                readTime={article.readTime}
            />

            <article className="py-14 sm:py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Hero image */}
                    {article.image ? (
                        <figure
                            className="-mt-24 mb-10 overflow-hidden rounded-3xl border border-white/60 shadow-2xl shadow-[#0072CE]/20 sm:-mt-28"
                            data-reveal="zoom"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="aspect-[16/9] w-full object-cover"
                            />
                        </figure>
                    ) : null}

                    <div
                        className="rounded-3xl border border-[#0072CE]/15 bg-white/85 p-6 shadow-xl shadow-[#0072CE]/5 sm:p-10"
                        data-reveal="up"
                    >
                        <BackButton className="mb-8" />

                        {lead ? (
                            <p className="border-l-4 border-[#F5B800] pl-5 text-lg font-semibold leading-relaxed text-[#0b2a4a] sm:text-xl">
                                {lead}
                            </p>
                        ) : null}

                        <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                            {body.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Story footer: category + share/back actions */}
                        <div className="mt-10 flex flex-col gap-4 border-t border-[#0072CE]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                                {article.category ? (
                                    <span className="rounded-full border border-[#0072CE]/25 bg-[#0072CE]/5 px-3 py-1 uppercase tracking-[0.12em] text-[#0072CE]">
                                        {article.category}
                                    </span>
                                ) : null}
                                {article.date ? <span>{article.date}</span> : null}
                                {article.readTime ? (
                                    <>
                                        <span aria-hidden="true">•</span>
                                        <span>{article.readTime}</span>
                                    </>
                                ) : null}
                            </div>
                            <BackButton />
                        </div>
                    </div>
                </div>
            </article>

            {/* More from the newsroom */}
            {related.length ? (
                <section className="border-t border-[#0072CE]/15 py-14 sm:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div
                            className="mb-8 flex items-center gap-3"
                            data-reveal="up"
                        >
                            <IconNewspaper className="h-5 w-5 text-[#0072CE]" />
                            <h2 className="heading-font text-2xl font-extrabold tracking-tight text-[#0b2a4a] sm:text-3xl">
                                More from the newsroom
                            </h2>
                        </div>

                        <div
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                            data-reveal="up"
                        >
                            {related.map((item) => (
                                <a
                                    key={item.id}
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
                                        <h3 className="heading-font mt-2 text-base font-bold leading-snug tracking-tight text-[#0b2a4a]">
                                            {item.title}
                                        </h3>
                                        <div className="mt-auto flex items-center gap-2 pt-4 text-xs font-medium text-slate-500">
                                            <IconCalendar className="h-3.5 w-3.5 text-[#b07d00]" />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center" data-reveal="up">
                            <BackButton />
                        </div>
                    </div>
                </section>
            ) : (
                <section className="pb-16">
                    <div className="mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
                        <BackButton />
                    </div>
                </section>
            )}

            {/* Media & press enquiries */}
            <section className="pb-16 sm:pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0072CE] via-[#0066b8] to-[#00518f] px-8 py-12 shadow-2xl sm:px-12 sm:py-14"
                        data-reveal="zoom"
                    >
                        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#F5B800]/20 filter blur-3xl" />
                        <div className="relative">
                            <h2 className="heading-font mb-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                Media & press enquiries
                            </h2>
                            <p className="max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                                Journalists and partners can reach the Aba Power
                                communications team for interviews, imagery and press
                                statements relating to this story.
                            </p>
                            <button
                                type="button"
                                onClick={backToNewsroom}
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F5B800] px-6 py-3 text-sm font-extrabold text-[#0b2a4a] shadow-lg transition-colors hover:bg-white hover:text-[#0072CE]"
                            >
                                <IconHome className="h-4 w-4" />
                                <span>Explore more news</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
