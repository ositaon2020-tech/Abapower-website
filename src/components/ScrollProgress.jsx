import React, { useEffect, useState } from 'react';

/** Pixel scroll position after which the "back to top" control appears. */
const SHOW_BUTTON_AFTER = 620;

/**
 * Two lightweight scroll affordances for the public site:
 *   1. a brand-gradient progress bar pinned to the very top of the viewport, and
 *   2. a floating "back to top" button that fades in once you've scrolled past
 *      the hero.
 *
 * Scroll reads are throttled with requestAnimationFrame so this stays cheap.
 */
export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);
    const [past, setPast] = useState(0);

    useEffect(() => {
        let frame = 0;

        const measure = () => {
            frame = 0;
            const doc = document.documentElement;
            const max = doc.scrollHeight - window.innerHeight;
            const y = window.scrollY || doc.scrollTop || 0;
            setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
            setPast(y);
        };

        const onScroll = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    const toTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="apl-scroll-progress" aria-hidden="true">
                <span style={{ transform: `scaleX(${progress})` }} />
            </div>

            <button
                type="button"
                onClick={toTop}
                aria-label="Back to top"
                title="Back to top"
                className={`apl-to-top${past > SHOW_BUTTON_AFTER ? ' is-visible' : ''}`}
                tabIndex={past > SHOW_BUTTON_AFTER ? 0 : -1}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M12 19V5" />
                    <path d="M5 12l7-7 7 7" />
                </svg>
            </button>
        </>
    );
}
