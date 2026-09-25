import { useEffect } from 'react';

/**
 * Global scroll-reveal observer.
 *
 * Any element marked with a `data-reveal` attribute fades/slides into place the
 * first time it scrolls into the viewport. The element's final CSS state lives
 * in `index.css` (`.is-visible`), so components only need the attribute:
 *
 *   <div data-reveal>…</div>
 *   <div data-reveal="left" style={{ '--reveal-delay': '0.1s' }}>…</div>
 *
 * Call it once, high in the tree, passing the current route so the observer is
 * re-scanned after every navigation (routed pages mount fresh content). Users
 * who prefer reduced motion simply get everything revealed immediately.
 */
export function useReveal(routeKey) {
    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const revealsEverything =
            !('IntersectionObserver' in window) ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const show = (el) => el.classList.add('is-visible');

        let observer = null;

        const scan = () => {
            // Both single elements (`data-reveal`) and stagger containers
            // (`data-reveal-stagger`, whose children animate in sequence) start
            // hidden and are switched on by adding `.is-visible`.
            const pending = document.querySelectorAll(
                '[data-reveal]:not(.is-visible), [data-reveal-stagger]:not(.is-visible)',
            );

            if (revealsEverything) {
                pending.forEach(show);
                return;
            }

            if (!observer) {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (!entry.isIntersecting) return;
                            show(entry.target);
                            observer.unobserve(entry.target);
                        });
                    },
                    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
                );
            }

            pending.forEach((el) => observer.observe(el));
        };

        scan();

        // Content that mounts a beat later (CMS data, carousels, fonts) gets picked
        // up by these passes so nothing is left invisible.
        const timers = [120, 600, 1400].map((ms) => window.setTimeout(scan, ms));

        // Newly injected nodes (e.g. slides added to a carousel) are re-scanned too.
        // Only childList is observed so inline style/animation churn doesn't retrigger.
        let mutationObserver = null;
        let debounce = 0;
        if ('MutationObserver' in window && !revealsEverything) {
            mutationObserver = new MutationObserver(() => {
                window.clearTimeout(debounce);
                debounce = window.setTimeout(scan, 280);
            });
            mutationObserver.observe(document.body, { childList: true, subtree: true });
        }

        return () => {
            timers.forEach((id) => window.clearTimeout(id));
            window.clearTimeout(debounce);
            if (mutationObserver) mutationObserver.disconnect();
            if (observer) observer.disconnect();
        };
    }, [routeKey]);
}

export default useReveal;
