import React, { useState } from 'react';
import {
    IconAplSunburst,
    IconChevronDown,
    IconUsers,
} from './Icons';
import { LEADERSHIP_INTRO, LEADERSHIP_MEMBERS } from '../data/aboutContent';

// Executive portraits bundled with the app. Referencing the local files (rather
// than remote URLs) keeps the team images visible in every environment.
import ugoOpiegbe from '../assets/Ugo Opiegebe.jpeg';
import omehAbdullahi from '../assets/Omeh Abdullahi.jpeg';
import livinusNmaram from '../assets/Livinus Nmaram.jpeg';
import emekaVictor from '../assets/Emeka Victor.jpeg';
import chigozieOkonji from '../assets/Chigozie Okonji.jpeg';
import stephenAgbo from '../assets/Stephen Agbo.jpeg';
import simonAkpata from '../assets/Simon Akpata.jpeg';

/** Maps each team member key to their bundled portrait. */
const LEADER_PORTRAITS = {
    opiegbe: ugoOpiegbe,
    siddi: omehAbdullahi,
    nmaram: livinusNmaram,
    ngwoke: emekaVictor,
    okonji: chigozieOkonji,
    agbo: stephenAgbo,
    akpata: simonAkpata,
};

/**
 * Per-member object-position for the portrait, so each face sits centred in
 * the card's cover area. Defaults to the top of the frame when not listed.
 */
const LEADER_PORTRAIT_POSITION = {
    siddi: 'object-center',
    agbo: 'object-center',
    // Centre Engr. Livinus Nwaoha Nmaram's portrait so his face sits properly
    // within the cover area rather than being cropped toward the top.
    nmaram: 'object-center',
};

const DEFAULT_PORTRAIT_POSITION = 'object-top';

/**
 * LeadershipPage
 * Dedicated, standalone "Leadership" page reached from the navbar Company menu:
 *   #/leadership
 *
 * Mirrors the abapower.com leadership block — a centred title with an
 * introductory line, followed by a responsive grid of executive cards. Each
 * card shows the portrait, the office held and a "Read Bio" disclosure that
 * expands the biography in place.
 */

/** A single executive card with an expandable biography. */
function LeaderCard({ member }) {
    const [open, setOpen] = useState(false);
    const portrait = LEADER_PORTRAITS[member.key] || member.image;
    const portraitPosition =
        member.imagePosition ||
        LEADER_PORTRAIT_POSITION[member.key] ||
        DEFAULT_PORTRAIT_POSITION;

    return (
        <article className="group bg-white rounded-3xl border border-[#cfe2f5] shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            {/* Every portrait shares the same Aba Power backdrop — a navy→blue
                gradient with a gold-topped brand wash — so the team reads as one
                uniform set regardless of each photo's original background. */}
            <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden bg-gradient-to-br from-[#0b2a4a] via-[#083a63] to-[#0072CE]">
                <img
                    src={portrait}
                    alt={member.name}
                    loading="lazy"
                    className={`w-full h-full object-cover ${portraitPosition} transition-transform duration-500 group-hover:scale-[1.04]`}
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0072CE] via-[#F5B800] to-[#0072CE]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b2a4a]/80 via-[#0b2a4a]/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>

            <div className="flex flex-1 flex-col px-7 py-7">
                <h3 className="text-xl font-extrabold heading-font text-[#0b2a4a] tracking-tight">
                    {member.name}
                </h3>
                <p className="text-[#0072CE] text-sm font-semibold mt-2">
                    {member.role}
                </p>

                <div className="border-t border-[#cfe2f5] mt-6 pt-5">
                    <button
                        type="button"
                        onClick={() => setOpen((value) => !value)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-3 text-left text-sm font-extrabold heading-font text-[#0b2a4a] hover:text-[#0072CE] transition-colors"
                    >
                        <span>{open ? 'Hide Bio' : 'Read Bio'}</span>
                        <IconChevronDown
                            className={`w-4 h-4 text-[#0072CE] transition-transform duration-300 ${open ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {open && (
                        <p className="text-slate-600 text-sm leading-relaxed mt-3">
                            {member.bio}
                        </p>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function LeadershipPage() {
    return (
        <div
            id="leadership"
            className="bg-gradient-to-br from-[#eef5fc] via-[#e2eefb] to-[#d3e6fa]"
        >
            {/* Page banner */}
            <div className="relative pt-36 pb-14 sm:pt-40 sm:pb-16 overflow-hidden bg-gradient-to-br from-[#0b2440] via-[#062542] to-[#030f1e]">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0072CE]/25 rounded-full filter blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F5B800]/15 rounded-full filter blur-3xl pointer-events-none"></div>
                <div className="absolute inset-0 blue-grid-overlay opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-reveal="up">
                    <nav
                        aria-label="Breadcrumb"
                        className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/70 mb-5"
                    >
                        <a
                            href="#hero"
                            className="hover:text-[#F5B800] transition-colors"
                        >
                            Home
                        </a>
                        <span aria-hidden="true">/</span>
                        <span className="text-[#F5B800] font-semibold">
                            Leadership
                        </span>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/5 text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-5">
                        <IconAplSunburst className="w-3.5 h-3.5" />
                        <span>{LEADERSHIP_INTRO.badge}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white heading-font tracking-tight leading-[1.1] max-w-4xl">
                        {LEADERSHIP_INTRO.title}
                    </h1>

                    <p className="text-white/80 text-base sm:text-lg leading-relaxed mt-6 max-w-3xl">
                        {LEADERSHIP_INTRO.subtitle}
                    </p>
                </div>
            </div>

            {/* Team grid */}
            <section className="bg-white border-b border-[#0072CE]/15 py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12" data-reveal="up">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b2a4a] text-white text-[11px] font-bold tracking-[0.18em] uppercase mb-6">
                            <IconUsers className="w-3.5 h-3.5 text-[#F5B800]" />
                            <span>MEET THE TEAM</span>
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2a4a] heading-font tracking-tight leading-[1.12]">
                            The people powering Aba
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-reveal-stagger>
                        {LEADERSHIP_MEMBERS.map((member) => (
                            <LeaderCard key={member.key} member={member} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
