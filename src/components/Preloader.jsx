import React, { useEffect, useState } from 'react';
import '../preloader.css';

/* How long the brand splash stays on screen before it fades away, in ms. */
const LOAD_DURATION_MS = 3000;
/* Extra time allowed for the fade-out transition before the node is removed. */
const FADE_OUT_MS = 600;

/* Geometry for the official APL 30-spike sunburst emblem in white */
const CX = 150;
const CY = 150;
const OUTER = 146;
const INNER = 100;
const SPIKES = 30;

const SUNBURST_POINTS = (() => {
    const points = [];
    for (let i = 0; i < SPIKES * 2; i += 1) {
        const radius = i % 2 === 0 ? OUTER : INNER;
        const angle = (Math.PI * i) / SPIKES - Math.PI / 2;
        const x = (CX + radius * Math.cos(angle)).toFixed(2);
        const y = (CY + radius * Math.sin(angle)).toFixed(2);
        points.push(`${x},${y}`);
    }
    return points.join(' ');
})();

/**
 * Full-screen brand preloader shown while the site boots.
 *
 * The white APL logo emblem sits at the centre of revolving circular
 * spinner rings; after `LOAD_DURATION_MS` the overlay fades out and is
 * unmounted so it never interferes with the page again during the session.
 */
export default function Preloader() {
    // `leaving` starts the fade-out; `hidden` removes the node once faded.
    const [leaving, setLeaving] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const fadeTimer = window.setTimeout(() => setLeaving(true), LOAD_DURATION_MS);
        const removeTimer = window.setTimeout(
            () => setHidden(true),
            LOAD_DURATION_MS + FADE_OUT_MS,
        );
        return () => {
            window.clearTimeout(fadeTimer);
            window.clearTimeout(removeTimer);
        };
    }, []);

    if (hidden) return null;

    return (
        <div
            className={`apl-preloader${leaving ? ' apl-preloader--leaving' : ''}`}
            role="status"
            aria-live="polite"
            aria-label="Loading APL Electric Company"
        >
            <div className="apl-preloader-inner">
                <div className="apl-preloader-spinner">
                    <span className="apl-preloader-track" aria-hidden="true" />
                    <span className="apl-preloader-ring" aria-hidden="true" />
                    <svg
                        className="apl-preloader-logo"
                        viewBox="0 0 300 300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="APL Electric Company Logo"
                    >
                        {/* Translucent white disc with clean white border */}
                        <circle
                            cx="150"
                            cy="150"
                            r="147"
                            fill="rgba(255, 255, 255, 0.12)"
                            stroke="#ffffff"
                            strokeWidth="3.5"
                        />
                        {/* Brilliant white sunburst */}
                        <polygon points={SUNBURST_POINTS} fill="#ffffff" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
