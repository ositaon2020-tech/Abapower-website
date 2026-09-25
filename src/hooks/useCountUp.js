import { useEffect, useState } from 'react';
import { useInView } from './useInView';

/** First number inside a label, e.g. "2800 +" -> "2800", "110km+" -> "110". */
const NUMBER_RE = /(\d[\d,]*(?:\.\d+)?)/;

function parseValue(raw) {
    const text = String(raw ?? '');
    const match = text.match(NUMBER_RE);
    if (!match) return null;

    const numeric = Number(match[1].replace(/,/g, ''));
    if (!Number.isFinite(numeric)) return null;

    return {
        prefix: text.slice(0, match.index),
        suffix: text.slice(match.index + match[1].length),
        target: numeric,
        decimals: (match[1].split('.')[1] || '').length,
        grouped: match[1].includes(','),
        negative: text.slice(0, match.index).endsWith('-'),
    };
}

/**
 * Animated number for a stat label. Counts from zero up to the number found in
 * the string as soon as the element scrolls into view, keeping any prefix,
 * suffix and thousands grouping intact ("2800 +" -> "2800 +").
 *
 *   const [ref, value] = useCountUp(item.value);
 *   <div ref={ref}>{value}</div>
 *
 * Labels without a number (e.g. "APLE") are returned untouched, and users who
 * prefer reduced motion see the final value immediately.
 */
export function useCountUp(raw, duration = 1500) {
    const [ref, inView] = useInView({ threshold: 0.35, rootMargin: '0px 0px -4% 0px' });
    const [display, setDisplay] = useState(() => String(raw ?? ''));

    useEffect(() => {
        const parsed = parseValue(raw);

        if (!parsed) {
            setDisplay(String(raw ?? ''));
            return undefined;
        }

        const finalValue = String(raw);
        const reduce =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduce) {
            setDisplay(finalValue);
            return undefined;
        }

        if (!inView) {
            setDisplay(`${parsed.prefix}0${parsed.suffix}`);
            return undefined;
        }

        let frame = 0;
        const start = typeof performance !== 'undefined' ? performance.now() : Date.now();

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / duration);
            // easeOutCubic: fast start, gentle settle.
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = parsed.target * eased;

            const number = parsed.decimals
                ? current.toFixed(parsed.decimals)
                : parsed.grouped
                    ? Math.round(current).toLocaleString('en-US')
                    : String(Math.round(current));

            setDisplay(`${parsed.prefix}${number}${parsed.suffix}`);

            if (progress < 1) {
                frame = window.requestAnimationFrame(tick);
            } else {
                setDisplay(finalValue);
            }
        };

        frame = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(frame);
    }, [raw, inView, duration]);

    return [ref, display];
}

export default useCountUp;
