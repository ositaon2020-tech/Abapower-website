import React from 'react';
import { useContent } from '../context/ContentContext';

/** Scrolling headline ticker. Phrases come from the CMS `marquee` collection. */
const FALLBACK_ITEMS = [
  'APL ELECTRIC COMPANY',
  'RELIABLE POWER INFRASTRUCTURE',
  'INDUSTRIAL GROWTH IN ABA',
  'INTEGRATED GENERATION AND DISTRIBUTION',
  'ABA RING-FENCED AREA (9 LGAs)',
  'ENTERPRISE AND COMMUNITY IMPACT',
  '27KM OWAZA GAS PIPELINE',
  '188MW GENERATION CAPACITY',
  'STS SMART PREPAID METERING',
];

export default function Marquee() {
  const { getCollection, getSettings } = useContent();
  const heroSettings = getSettings('hero');

  const stored = getCollection('marquee').filter((item) => item.visible !== false);
  const marqueeItems = stored.length ? stored.map((item) => item.text) : FALLBACK_ITEMS;

  // Allow the whole strip to be toggled off from the dashboard.
  if (heroSettings.marqueeVisible === false) return null;

  if (marqueeItems.length === 0) return null;

  return (
    <div className="w-full bg-[#0072CE] text-white py-3.5 border-y border-[#F5B800]/40 overflow-hidden font-bold tracking-wider text-xs sm:text-sm uppercase heading-font shadow-lg">
      <div className="marquee-track flex items-center whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4">
            <span className="text-white hover:text-[#F5B800] transition-colors cursor-default">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#F5B800] inline-block shadow-sm shadow-yellow-400"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
