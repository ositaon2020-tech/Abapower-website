import { useEffect, useState } from 'react';

/**
 * Minimal hash-based router.
 * Returns the part of the URL hash that looks like a path, e.g.
 *   "#/health-safety"           -> "/health-safety"
 *   "#/health-safety/emergency-hotline" -> "/health-safety/emergency-hotline"
 *   "#about-us"                 -> "/"   (plain anchors count as the landing page)
 *
 * Using the hash keeps deep links working on static hosting (GitHub Pages,
 * S3, a plain file server) without any extra routing dependency.
 */
export function useHashPath() {
    const read = () => {
        if (typeof window === 'undefined') return '/';
        const raw = window.location.hash || '';
        // Only treat hashes that begin with "#/" as routes.
        if (!raw.startsWith('#/')) return '/';
        return raw.slice(1) || '/';
    };

    const [path, setPath] = useState(read);

    useEffect(() => {
        const onChange = () => setPath(read());
        window.addEventListener('hashchange', onChange);
        return () => window.removeEventListener('hashchange', onChange);
    }, []);

    // Start at the top whenever we move between routed pages. Plain anchors
    // (e.g. "#customer-service") are left alone so the browser can scroll to them.
    useEffect(() => {
        const raw = typeof window !== 'undefined' ? window.location.hash : '';
        if (raw.startsWith('#/')) {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    }, [path]);

    return path;
}

export default useHashPath;
