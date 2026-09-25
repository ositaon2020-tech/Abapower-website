import React from 'react';
import { IconArrowRight } from './Icons';
import { ABOUT_ROUTE_BASE } from '../data/aboutContent';
/* Device-aware store links for the Nkeanyi App (Play Store / App Store). */
import { PLAY_STORE_URL, getAppStoreUrl } from '../lib/appLinks';
/* Bundled locally (rather than a remote URL) so the section image is visible in
   every environment, matching the pattern used by the other section photos. */
import tubPng from '../assets/tub.png';

/* Self-service customer portal login (shared with the footer entry). */
const CUSTOMER_PORTAL_URL = 'https://admin.smartpowerbilling.com/web/login';

/**
 * Opens the right Nkeanyi download for the visitor's device. Running on click
 * (rather than as a static href) means the desktop default — Google Play — can
 * stay in the markup for SEO and right-click/"open in new tab".
 */
const handleAppDownload = (event) => {
  // Let modified clicks (new tab / new window) fall through to the plain href.
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  ) {
    return;
  }
  event.preventDefault();
  const url = getAppStoreUrl();
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

export default function GridTelemetry({ onOpenSupportModal, onOpenCareersModal }) {
  // Aba Power engineer servicing a distribution transformer.
  const engineerImages = [tubPng];
  const [imgIndex, setImgIndex] = React.useState(0);

  const handleImgError = () => {
    setImgIndex((i) => (i + 1 < engineerImages.length ? i + 1 : i));
  };

  return (
    <section id="media" className="py-20 relative section-shade text-slate-900 border-b border-[#0072CE]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header matching exact screenshot typography */}
        <div className="text-center mb-12" data-reveal="up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0b2a4a] heading-font tracking-tight">
            Aba Power – Powering the <br className="hidden sm:inline" />
            <span className="text-[#b07d00]">Industrial Heart</span> of Nigeria
          </h2>
        </div>

        {/* Grid Layout matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

          {/* Left Column: Engineer Photo Card */}
          <div
            data-reveal="left"
            className="lg:col-span-6 rounded-3xl overflow-hidden shadow-xl relative min-h-[360px] lg:min-h-0 group bg-[#0b2a4a] border border-white/10 transition-shadow duration-500 hover:shadow-2xl"
          >
            <img
              key={imgIndex}
              src={engineerImages[imgIndex]}
              onError={handleImgError}
              alt="Aba Power engineer servicing a distribution transformer on the Aba network"
              className="absolute inset-0 w-full h-full object-cover object-center saturate-[0.9] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Brand duotone: deep navy/blue wash ties the photo to the APLE palette. */}
            <div className="absolute inset-0 bg-[#0072CE]/20 mix-blend-multiply pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a4a]/90 via-[#0b2a4a]/20 to-transparent pointer-events-none"></div>

            {/* Subtle inset keyline matches the card borders used across the site. */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/15 pointer-events-none"></div>
          </div>

          {/* Right Column: 3 Feature Cards */}
          <div className="lg:col-span-6 flex flex-col gap-4">

            {/* Top Wide Card - Driven by Aba IPP */}
            <div
              data-reveal="right"
              className="bg-[#e6ebf2] p-6 sm:p-7 rounded-3xl flex flex-col justify-between shadow-xl border border-white/50 text-[#0f172a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold heading-font text-[#0f172a] tracking-tight mb-2">
                  Driven by the Aba Integrated Power Project
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4">
                  The Aba IPP is a major pioneer of the Aba Electric Company
                </p>
              </div>

              <div>
                <a
                  href={`#${ABOUT_ROUTE_BASE}`}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#0f172a]/40 text-[#0f172a] font-bold text-xs sm:text-sm hover:bg-[#0f172a] hover:text-white transition-all"
                >
                  <span>Learn more</span>
                  <IconArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Bottom 2 Split Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Bottom Left Card: Nkeanyi App - Updated with user's requested icon & exact message */}
              <div
                data-reveal="right"
                style={{ '--reveal-delay': '0.12s' }}
                className="group/app bg-[#e6ebf2] p-6 rounded-3xl flex flex-col justify-between shadow-xl border border-white/50 text-[#0f172a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Smartphone App Icon with APL Gold Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-[#0072CE]/15 border border-[#0072CE]/30 flex items-center justify-center mb-4 text-[#0072CE] relative transition-transform duration-300 group-hover/app:scale-110">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="5" y="2" width="14" height="20" rx="3" strokeWidth="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5B800] absolute -top-1 -right-1 border border-white"></span>
                  </div>

                  <h4 className="text-xl font-extrabold heading-font text-[#0f172a] mb-1.5">
                    Nkeanyi App
                  </h4>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4">
                    Pay bills instantly, check arrears with ease, view map refunds and more
                  </p>
                </div>

                <div>
                  <a
                    data-track="Grid Telemetry · Download Nkeanyi App"
                    href={PLAY_STORE_URL}
                    onClick={handleAppDownload}
                    aria-label="Download the Nkeanyi App for your device"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#0f172a]/40 text-[#0f172a] font-bold text-xs hover:bg-[#0f172a] hover:text-white transition-all"
                  >
                    <span>Download Nkeanyi App</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Bottom Right Card: Customer Portal */}
              <div
                data-reveal="right"
                style={{ '--reveal-delay': '0.2s' }}
                className="group/portal bg-[#e6ebf2] p-6 rounded-3xl flex flex-col justify-between shadow-xl border border-white/50 text-[#0f172a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-200/80 border border-slate-300 flex items-center justify-center mb-4 text-[#0f172a] transition-transform duration-300 group-hover/portal:scale-110">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.5 3a17 17 0 000 18m1-18a17 17 0 010 18" />
                    </svg>
                  </div>

                  <h4 className="text-xl font-extrabold heading-font text-[#0f172a] mb-1.5">
                    Customer Portal
                  </h4>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4">
                    Register on the Customer portal to access varieties of services for customers.
                  </p>
                </div>

                <div>
                  <a
                    data-track="Grid Telemetry · Customer Portal"
                    href={CUSTOMER_PORTAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#0f172a]/40 text-[#0f172a] font-bold text-xs hover:bg-[#0f172a] hover:text-white transition-all"
                  >
                    <span>Register now</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
