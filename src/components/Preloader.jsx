import React, { useEffect, useState } from 'react';
import aplLogo from '../assets/apl-logo.png';
import '../preloader.css';

/* How long the brand splash stays on screen before it fades away, in ms. */
const LOAD_DURATION_MS = 3000;
/* Extra time allowed for the fade-out transition before the node is removed. */
const FADE_OUT_MS = 600;

/**
 * Full-screen brand preloader shown while the site boots.
 *
 * The APL logo sits at the centre of a revolving circular spinner; after
 * `LOAD_DURATION_MS` the overlay fades out and is unmounted so it never
 * interferes with the page again during the session.
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
                    <img src={aplLogo} alt="APL Electric Company" className="apl-preloader-logo" />
                </div>
                <p className="apl-preloader-text">APL Electric Company</p>
            </div>
        </div>
    );
}
