import React from 'react';
import {
  IconCheckCircle,
  IconZap,
  IconShield,
  IconCreditCard,
  IconGrid,
  IconCalculator,
  IconPhone,
  IconArrowRight,
  IconWhatsApp,
} from './Icons';
import { ABOUT_ROUTE_BASE } from '../data/aboutContent';
import {
  CUSTOMER_SERVICE_ROUTE_BASE,
  NEW_CONNECTION_ROUTE_BASE,
} from '../data/customerServiceContent';
/* Bundled locally (rather than a remote URL) so the section image is visible in
   every environment, matching the pattern used by the other section photos. */
import abPng from '../assets/ab.png';

/* Payment now happens on the Nkeanyi self-service site. */
const PAY_NOW_URL = 'https://nkeanyi.abapower.com/';

/* MAP meter applications are handled on the APLE meter-request portal. */
const METER_REQUEST_URL = 'https://aple.meterrequest.smartpowerbilling.com/#/about';

/* New connection requests are handled on the in-app application page. */
const NEW_CONNECTION_URL = `#${NEW_CONNECTION_ROUTE_BASE}`;

/* Community Telegram group for customers joining the Aba Power network. */
const JOIN_NETWORK_URL = 'https://t.me/+1vysoThHNNQwMWNk';

/* External destinations open in a new tab; in-app hash links stay put. */
const externalLinkProps = (href) =>
  /^https?:\/\//i.test(href || '')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

export default function CoverageMap() {
  /* Quick-action cards — the "What do you want to do today?" service hub,
     re-skinned to the Aba Power light theme and wired to real customer journeys. */
  const quickActions = [
    {
      title: 'Make Payment',
      tone: 'navy',
      icon: IconCreditCard,
      description:
        'Need to make payment? Take advantage of our hassle-free payment channels and top up your account or meter in seconds.',
      cta: 'Pay Now',
      track: 'Service Hub · Pay Now',
      /* Sends customers to the Nkeanyi portal instead of opening a modal. */
      href: PAY_NOW_URL,
    },
    {
      title: 'Get Metered',
      tone: 'navy',
      icon: IconZap,
      // Actual prepaid electricity meter photo (Hexing HXE118-KP).
      // Source: Wikimedia Commons (VulcanSphere) — CC BY 4.0.
      image:
        'https://upload.wikimedia.org/wikipedia/commons/7/7a/Hexing_HXE118-KP_prepaid_electricity_meter_in_Indonesia_%282025-09-30%29.jpg',
      badge: 'APLE',
      imageAlt: 'Prepaid single phase electricity meter',
      description:
        'Need a Prepaid or Postpaid Meter? Request / Apply for one and get it installed without any delay.',
      cta: 'Apply Here',
      track: 'Service Hub · Get Metered',
      /* Opens the APLE meter-request portal. */
      href: METER_REQUEST_URL,
    },
    {
      title: 'Request New Connection',
      tone: 'navy',
      icon: IconGrid,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvubg975gu1LsoOiZYdmful2lBEHI46tmiCfNPrdIB1QSLksMxdCwrzQk&s=10',
      badge: 'APLE',
      description:
        'Need a new connection to Aba Power by APL Electric? Fill the application form or download our electricity supply agreement form and submit it to the nearest APL Electric office.',
      cta: 'Request Now',
      track: 'Service Hub · Request New Connection',
      /* Opens the in-app Request New Connection page. */
      href: NEW_CONNECTION_URL,
    },
    {
      title: 'Tariff Information',
      tone: 'navy',
      icon: IconCalculator,
      // Prepaid electricity meter reading kWh units — reflects the units of
      // power purchased under the NERC-approved MYTO tariff framework.
      image:
        'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ-1O97ikeM1l10XVviDyMRurNVByVYyvZbrWD3gvGrLt8Tz1VJ',
      imageAlt: 'Prepaid electricity meter displaying kWh units for tariff billing',
      badge: 'APLE',
      description:
        'Get information on your tariff to understand the units of power you have purchased under the NERC-approved MYTO framework.',
      cta: 'Learn More',
      track: 'Service Hub · Tariff Information',
      /* Mirrors the main menu's "Tariff Information" topic. */
      href: `#${CUSTOMER_SERVICE_ROUTE_BASE}/tariff-information`,
    },
  ];

  const whistleblowerImage =
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop';
  /* Aba Power Electric HQ with the fleet of response vehicles. */
  const commitmentImage = abPng;

  return (
    <section id="nkeanyi-web" className="py-24 relative section-shade overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0072CE]/10 rounded-full filter blur-3xl -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* What do you want to do today? — Customer Quick Actions */}
        <div className="mb-20">
          <div className="text-center mb-12" data-reveal="up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0b2a4a] heading-font tracking-tight uppercase">
              What Are We Doing Today?
            </h2>
            <span className="block w-28 h-1.5 bg-[#F5B800] rounded-full mx-auto mt-5"></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" data-reveal-stagger>
            {quickActions.map((action) => {
              const ActionIcon = action.icon;
              const isGold = action.tone === 'gold';
              return (
                <div
                  key={action.title}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-[#0072CE]/15 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row"
                >
                  {/* Visual panel */}
                  <div className="sm:w-[42%] relative min-h-[190px] flex items-center justify-center overflow-hidden">
                    {action.image ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0072CE]/20 to-[#0b2440]/10 flex items-center justify-center">
                        <ActionIcon className="w-20 h-20 text-[#0072CE]/40" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0b2440] to-[#030f1e]"></div>
                    )}

                    {action.image ? (
                      <img
                        src={action.image}
                        alt={action.imageAlt || action.title}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <ActionIcon className="relative z-10 w-24 h-24 text-[#F5B800]" />
                    )}

                    {action.badge ? (
                      <span className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-[#0b2a4a] text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-widest">
                        {action.badge}
                      </span>
                    ) : null}

                    {!action.image ? (
                      <span className="absolute bottom-4 right-4 z-10 w-11 h-11 rounded-full bg-[#F5B800] text-[#030f1e] flex items-center justify-center shadow-lg">
                        <IconCheckCircle className="w-6 h-6" />
                      </span>
                    ) : null}
                  </div>

                  {/* Content */}
                  <div className="sm:w-[58%] flex flex-col">
                    <div
                      className={`flex items-center gap-3 px-5 py-4 ${isGold ? 'bg-[#F5B800]' : 'bg-[#0b2a4a]'
                        }`}
                    >
                      <ActionIcon
                        className={`w-5 h-5 flex-shrink-0 ${isGold ? 'text-[#030f1e]' : 'text-[#F5B800]'
                          }`}
                      />
                      <h3
                        className={`font-extrabold heading-font text-lg tracking-tight ${isGold ? 'text-[#030f1e]' : 'text-white'
                          }`}
                      >
                        {action.title}
                      </h3>
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">
                        {action.description}
                      </p>
                      {action.href ? (
                        <a
                          data-track={action.track}
                          href={action.href}
                          {...externalLinkProps(action.href)}
                          className={`mt-auto self-start inline-flex items-center gap-2 ${isGold ? 'btn-apl-gold' : 'btn-apl-blue'}`}
                        >
                          {action.cta}
                          <IconArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          data-track={action.track}
                          onClick={action.onClick}
                          className={`mt-auto self-start ${isGold ? 'btn-apl-gold' : 'btn-apl-blue'}`}
                        >
                          {action.cta}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Whistle Blowing Line + Our Commitment */}
        <div className="flex flex-col gap-10">
          {/* See Something, Say Something — Whistle Blowing Line */}
          <div data-reveal="blur" className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
            {/* Deep navy base */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a2140] via-[#0b2a4a] to-[#030f1e]"></div>
            {/* Brand accent bar */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#F5B800] via-[#E2432F] to-[#0072CE]"></div>
            {/* Grid texture */}
            <div className="absolute inset-0 blue-grid-overlay opacity-40"></div>
            {/* Ambient glows */}
            <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-[#0072CE]/25 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="absolute -top-24 right-1/4 w-72 h-72 bg-[#E2432F]/20 rounded-full filter blur-3xl pointer-events-none"></div>

            {/* Photo */}
            <div className="absolute right-0 top-0 h-full w-[45%] pointer-events-none">
              <img
                src={whistleblowerImage}
                alt="Whistleblower on a call"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                className="w-full h-full object-cover object-center opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a2140] via-[#0b2a4a]/85 to-transparent"></div>
            </div>

            <div className="relative z-10 p-7 sm:p-10 lg:p-12 flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
              <div className="flex-shrink-0 text-center sm:text-left">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-white/70 uppercase mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse"></span>
                  Community Protection
                </span>
                <h3 className="text-4xl sm:text-5xl font-extrabold heading-font text-white leading-[1.05] tracking-tight">
                  Report Energy Theft
                </h3>
                <h3 className="text-4xl sm:text-5xl font-extrabold heading-font bg-gradient-to-r from-[#F5B800] to-[#ffe08a] bg-clip-text text-transparent leading-[1.05] tracking-tight">
                  and Vandalism
                </h3>
              </div>

              <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-5 sm:gap-9 sm:border-l sm:border-white/15 sm:pl-12">
                <div className="text-center sm:text-left">
                  <span className="block text-[#F5B800] font-bold tracking-[0.25em] text-[11px] sm:text-xs uppercase mb-4">
                    Whistle Blowing Line
                  </span>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
                    <a
                      href="tel:09162788075"
                      aria-label="Call the whistle blowing line"
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5B800] to-[#d9a300] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#F5B800]/30 hover:scale-105 transition-transform"
                    >
                      <IconPhone className="w-7 h-7 text-[#030f1e]" />
                    </a>
                    <a
                      href="tel:09162788075"
                      className="text-white font-extrabold heading-font text-2xl sm:text-3xl lg:text-4xl tracking-tight hover:text-[#F5B800] transition-colors"
                    >
                      09162788075
                    </a>
                  </div>
                  <span className="block text-white/50 text-[11px] font-medium mt-4">
                    Calls are treated as strictly confidential.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Our Commitment — premium card */}
          <div
            data-reveal="zoom"
            className="group/commit relative rounded-[2rem] bg-white border border-[#0072CE]/15 shadow-xl overflow-hidden transition-shadow duration-500 hover:shadow-2xl"
          >
            <div className="gradient-animate absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#0072CE] via-[#38BDF8] to-[#F5B800]"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center p-6 sm:p-10 lg:p-12">
              {/* Image with dual corner frames */}
              <div className="relative">
                <span className="hidden sm:block absolute -top-5 -left-5 w-20 h-20 border-t-[6px] border-l-[6px] border-[#F5B800] rounded-tl-[2rem] pointer-events-none z-10"></span>
                <span className="hidden sm:block absolute -bottom-5 -right-5 w-20 h-20 border-b-[6px] border-r-[6px] border-[#0072CE] rounded-br-[2rem] pointer-events-none z-10"></span>

                <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden ring-1 ring-[#0b2a4a]/10 shadow-2xl bg-gradient-to-br from-[#0b2440] to-[#0072CE] flex items-center justify-center">
                  <IconZap className="w-24 h-24 text-[#F5B800]/60" />
                  <img
                    src={commitmentImage}
                    alt="Aba Power Electric headquarters and response vehicle fleet"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/commit:scale-[1.04]"
                  />

                  {/* Floating stat badge */}
                  <div className="apl-float absolute bottom-4 left-4 z-10 rounded-2xl bg-white/95 backdrop-blur-sm px-4 py-2.5 shadow-xl border border-[#0072CE]/15">
                    <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#0072CE]">
                      12th Disco in Nigeria
                    </span>
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-12 h-1 bg-[#F5B800] rounded-full"></span>
                  <span className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#0072CE] uppercase">
                    Our Commitment
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-extrabold heading-font text-[#0b2a4a] leading-[1.05] tracking-tight">
                  Committed to serving
                  <br />
                  you <span className="text-[#0072CE]">better.</span>
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-6 max-w-xl">
                  As the 12th Disco in Nigeria, we are providing electricity with excellent service delivery, operating with high safety standards. And we are even closer to our customers than ever.
                </p>

                <div className="flex flex-row flex-wrap items-center gap-4 mt-8">
                  <a
                    href={`#${ABOUT_ROUTE_BASE}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0072CE] to-[#005fb3] text-white font-bold hover:from-[#0080ff] hover:to-[#0072CE] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#0072CE]/35"
                  >
                    <span>About Us</span>
                    <IconArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="https://whatsapp.com/channel/0029VajSPIB5a245kPcnFS0C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-[#0b2a4a]/20 text-[#0b2a4a] font-bold hover:border-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                  >
                    <IconWhatsApp className="w-5 h-5 text-[#25D366] transition-colors group-hover:text-white" />
                    <span>Aba Power channel on WhatsApp</span>
                    <IconArrowRight className="w-5 h-5" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-3 mt-10">
                  <span className="inline-flex items-center gap-3 rounded-2xl bg-[#0072CE]/8 border border-[#0072CE]/20 pl-2 pr-5 py-2">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0072CE] to-[#005fb3] flex items-center justify-center flex-shrink-0">
                      <IconShield className="w-5 h-5 text-white" />
                    </span>
                    <span className="font-bold text-[#0b2a4a] text-sm">24/7 Customer Support</span>
                  </span>
                  <span className="inline-flex items-center gap-3 rounded-2xl bg-[#F5B800]/10 border border-[#F5B800]/40 pl-2 pr-5 py-2">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0b2a4a] to-[#030f1e] flex items-center justify-center flex-shrink-0">
                      <IconZap className="w-5 h-5 text-[#F5B800]" />
                    </span>
                    <span className="font-bold text-[#0b2a4a] text-sm">Rapid Response Team</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
