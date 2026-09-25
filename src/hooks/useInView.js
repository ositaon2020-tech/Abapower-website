import { useEffect, useRef, useState } from 'react';

/**
 * Fires once (never resets) the first time the attached node enters the
 * viewport — the building block behind the count-up numbers and any other
 * "animate when seen" behaviour.
 *
 *   const [ref, inView] = useInView();
 *   <span ref={ref}>{inView ? 'on' : 'off'}</span>
 */
export function useInView(options = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            setInView(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    setInView(true);
                    observer.disconnect();
                });
            },
            { threshold: 0.25, rootMargin: '0px 0px -6% 0px', ...options },
        );

        observer.observe(node);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [ref, inView];
}

export default useInView;
