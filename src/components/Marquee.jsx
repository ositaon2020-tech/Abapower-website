import React, { useEffect, useMemo, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { DEFAULT_NEWS, newsArticlePath, sortNewsByDateDesc } from '../data/mediaContent';

/**
 * News headline ticker.
 * Fetches all latest published news from Aba Power (CMS / DEFAULT_NEWS),
 * sorted newest first, and displays the news titles one at a time with a
 * smooth, readable vertical slide transition that stays visible for 4s.
 */
export default function Marquee() {
  const { getCollection, getSettings } = useContent();
  const heroSettings = getSettings('hero');

  // Allow the whole strip to be toggled off from the dashboard.
  if (heroSettings.marqueeVisible === false) return null;

  // Retrieve and sort all published news stories from Aba Power
  const newsStories = useMemo(() => {
    const stored = getCollection('news').filter(
      (item) => item.published !== false && (item.title || item.summary),
    );
    const list = stored.length ? stored : DEFAULT_NEWS;
    return sortNewsByDateDesc(list);
  }, [getCollection]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = newsStories.length;

  // Rotate to the next title every 4 seconds, pausing when the reader hovers
  useEffect(() => {
    if (total <= 1 || isPaused) return undefined;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [total, isPaused]);

  if (!newsStories || total === 0) return null;

  const currentStory = newsStories[currentIndex] || newsStories[0];

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <div
      className="relative w-full bg-[#0072CE] text-white border-y border-[#F5B800]/40 overflow-hidden shadow-lg select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Latest News Headlines"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-12 sm:h-14 gap-3 sm:gap-4">
        {/* Pinned "Latest News" badge */}
        <div className="flex items-center gap-2 bg-[#0b2a4a] text-[#F5B800] px-3 sm:px-3.5 py-1.5 rounded-full font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex-shrink-0 border border-[#F5B800]/30 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-pulse shadow-sm shadow-yellow-400" />
          <span className="heading-font whitespace-nowrap">Latest News</span>
        </div>

        {/* Headline Stage: single title visible with smooth vertical slide */}
        <div className="flex-1 h-full flex items-center overflow-hidden min-w-0">
          <div
            key={currentIndex}
            className="news-ticker-slide flex items-center gap-2.5 sm:gap-3 w-full min-w-0"
          >
            {currentStory.category ? (
              <span className="hidden md:inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white/15 text-[#F5B800] border border-[#F5B800]/30 tracking-wider flex-shrink-0">
                {currentStory.category}
              </span>
            ) : null}

            <a
              href={`#${newsArticlePath(currentStory.id)}`}
              className="text-white hover:text-[#F5B800] font-bold text-xs sm:text-sm md:text-base tracking-normal transition-colors truncate block flex-1 group"
              title={`Read full story: ${currentStory.title}`}
            >
              <span className="group-hover:underline underline-offset-4 decoration-[#F5B800]">
                {currentStory.title}
              </span>
            </a>

            <a
              href={`#${newsArticlePath(currentStory.id)}`}
              className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold text-blue-100 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full transition-colors flex-shrink-0"
            >
              <span>Read Story</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Controls: Counter and Previous / Next Chevrons */}
        {total > 1 && (
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-auto">
            <span className="hidden sm:inline-block text-[10px] sm:text-xs font-semibold text-white/75 font-mono tracking-wider tabular-nums mr-1">
              {currentIndex + 1} / {total}
            </span>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous headline"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5B800]"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next headline"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5B800]"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
