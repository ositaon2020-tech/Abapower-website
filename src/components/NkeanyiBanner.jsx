import React, { useState } from 'react';
import { IconArrowRight } from './Icons';
import {
  PLAY_STORE_URL,
  APP_STORE_URL,
  getAppStoreUrl,
  getSmartAppUrl,
} from '../lib/appLinks';

/**
 * The QR code encodes a same-origin landing page rather than a fixed store
 * URL, so a phone that scans it is forwarded to the correct store for its
 * platform (Play Store for Android, App Store for iOS).
 *
 * The URL is derived from the live origin (see getSmartAppUrl) so the code is
 * correct on localhost, staging, a sub-path deployment and production alike —
 * no hard-coded domain that can go stale.
 */
const SMART_APP_URL = getSmartAppUrl();

/**
 * Two independent, free QR services. The primary is used first; if its request
 * fails (network hiccup, provider outage) we transparently fall back to the
 * second so the banner never shows a broken image.
 */
const qrFor = (provider, data) => {
  const encoded = encodeURIComponent(data);
  if (provider === 'quickchart') {
    return `https://quickchart.io/qr?size=320&margin=1&dark=0b2a4a&light=ffffff&text=${encoded}`;
  }
  return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=0&color=0b2a4a&bgcolor=ffffff&data=${encoded}`;
};

const QR_SOURCES = [qrFor('qrserver', SMART_APP_URL), qrFor('quickchart', SMART_APP_URL)];

export default function NkeanyiBanner() {
  const [qrIndex, setQrIndex] = useState(0);
  return (
    <section className="section-shade relative z-20 pt-12 border-t border-[#0072CE]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Banner Container — overlaps and sits on top of the Footer below */}
        <div
          className="-mb-20 sm:-mb-24 relative rounded-3xl bg-gradient-to-r from-[#0072CE] via-[#005fb3] to-[#071e3d] px-6 py-8 sm:px-10 sm:py-9 lg:px-14 overflow-hidden shadow-2xl border border-[#F5B800]/30 transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_rgba(0,114,206,0.55)]"
          data-reveal="zoom"
        >

          {/* Subtle background glow circles */}
          <div className="absolute top-0 right-1/3 w-72 h-72 bg-[#F5B800]/15 rounded-full filter blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            {/* Left Content Side */}
            <div className="lg:col-span-8 space-y-4">

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/30 border border-[#F5B800]/40 text-[#F5B800] text-[10px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-ping"></span>
                <span>OFFICIAL APL ELECTRIC MOBILE UTILITY APP</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold heading-font text-white tracking-tight leading-tight">
                  Download Nkeanyi App
                </h2>
                <p className="text-slate-100 text-sm sm:text-base font-medium leading-relaxed max-w-xl mt-2">
                  Get real-time insight into your account activity, pay bills and lots more
                </p>
              </div>

              {/* Action Buttons & Social Proof */}
              <div className="space-y-3 pt-1">

                {/* Both store badges are shown; each still links to its own
                    store so visitors always have a manual choice. */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    data-track="Nkeanyi Banner · Google Play"
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-white py-3 px-6 text-sm shadow-xl"
                  >
                    <span>Get it on Google Play</span>
                    <IconArrowRight className="w-4 h-4 text-[#0072CE]" />
                  </a>

                  <a
                    data-track="Nkeanyi Banner · App Store"
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    <span>Download on the App Store</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-xs font-semibold text-slate-200">Available on iOS & Android</span>

                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-2 overflow-hidden">
                      <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0072CE] bg-[#F5B800] text-[#030f1e] font-bold text-[9px] flex items-center justify-center">APL</div>
                      <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0072CE] bg-white text-[#0072CE] font-bold text-[9px] flex items-center justify-center">STS</div>
                      <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0072CE] bg-slate-800 text-yellow-400 font-bold text-[9px] flex items-center justify-center">ABA</div>
                    </div>
                    <span className="text-xs font-semibold text-slate-200">
                      <span className="text-[#F5B800] font-bold">250,000+</span> customers
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Nkeanyi App QR code (encodes the smart /get-app redirect) */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-2">
              <a
                href={getAppStoreUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scan or tap to download the Nkeanyi App for your device"
                className="apl-float-slow group bg-white p-3 rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
              >
                <img
                  src={QR_SOURCES[qrIndex]}
                  onError={() =>
                    setQrIndex((i) => (i + 1 < QR_SOURCES.length ? i + 1 : i))
                  }
                  alt="QR code to download the Nkeanyi App on the App Store or Google Play"
                  className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
                  loading="lazy"
                />
              </a>
              <span className="text-[11px] font-semibold text-slate-200 tracking-wide">Scan to get the app for your device</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
