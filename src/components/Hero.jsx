import React from 'react';
import { useContent } from '../context/ContentContext';

/**
 * Hero / "Power Distribution" section.
 * Headline copy, the backdrop video/poster and the stat cards are all driven by
 * the CMS (settings.hero + the heroStats collection), so they can be edited from
 * the admin dashboard. Falls back to the original copy if the store is empty.
 */
const FALLBACK = {
  badge: 'POWER DISTRIBUTION',
  title: 'Delivering power directly to homes, businesses and industries.',
  subtitle:
    'Through state-of-the-art technology and distribution expertise, Aba Power supports reliable power delivery to customers, industries and communities.',
  imageUrl: 'https://thesouthernexaminer.com/21-04-2023-05-22-54-am-411344.jpg',
  // Corporate motion-graphics video. Lives in /public so it is served from the
  // site root — drop the .mp4 there and reference it as /file-name.mp4.
  videoUrl: '/aba-power-corporate.mp4',
};

export default function Hero() {
  const { getSettings, getCollection } = useContent();
  const s = { ...FALLBACK, ...getSettings('hero') };

  const bgImageUrl = s.imageUrl || FALLBACK.imageUrl;
  const bgVideoUrl = s.videoUrl || FALLBACK.videoUrl;

  const stored = getCollection('heroStats');
  const stats = stored.length
    ? stored
    : [
      { label: 'NETWORK', value: '110km+', caption: 'Overhead lines' },
      { label: 'UTILITY', value: 'APLE', caption: 'Aba Power delivery' },
      { label: 'MD CUSTOMERS', value: '1538', caption: 'Maximum demand customers' },
      { label: 'NMD CUSTOMERS', value: '256795', caption: 'Non-maximum demand customers' },
    ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden"
    >
      {/* Corporate Motion-Graphics Video Background + Brand Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Poster image shows first paint / acts as fallback if the video can't load */}
        <img
          src={bgImageUrl}
          alt="Aba Power distribution substation and network infrastructure"
          className="hero-bg-img absolute inset-0 w-full h-full object-cover object-center"
        />
        <video
          className="hero-bg-video absolute inset-0 w-full h-full object-cover object-center"
          src={bgVideoUrl}
          poster={bgImageUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={(e) => {
            // If the video can't load, hide it so the poster image beneath shows.
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 apl-blue-gradient-mask"></div>
        <div className="absolute inset-0 blue-grid-overlay opacity-30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Badge Pill */}
          <div className="hero-anim hero-anim-1 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/50 bg-white/5 text-white text-xs sm:text-sm font-bold tracking-[0.22em] uppercase mb-10 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5B800] inline-block animate-ping-slow"></span>
            <span>{s.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-anim hero-anim-2 text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] heading-font mb-8 drop-shadow-sm">
            {s.title}
          </h1>

          {/* Subtext */}
          <p className="hero-anim hero-anim-3 text-lg sm:text-2xl text-white/95 font-normal leading-relaxed mb-16 max-w-3xl">
            {s.subtitle}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl">
          {stats.map((s, i) => (
            <div
              key={i}
              className="hero-stat-card hero-anim"
              style={{ animationDelay: `${0.55 + i * 0.14}s` }}
            >
              <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase block mb-3">
                {s.label}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white heading-font tracking-tight mb-2">
                {s.value}
              </div>
              <span className="text-sm font-medium text-white/85 block">{s.caption}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue — gently bobs to invite the visitor down the page */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 sm:block">
        <a
          href="#stats"
          aria-label="Scroll to explore the site"
          className="apl-float pointer-events-auto group flex flex-col items-center gap-2 text-white/75 transition-colors hover:text-[#F5B800]"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#F5B800]" />
          </span>
        </a>
      </div>
    </section>
  );
}
