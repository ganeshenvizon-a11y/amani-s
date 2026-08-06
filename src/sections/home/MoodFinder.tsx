/**
 * Section 02 — Mood Finder
 * Helps undecided visitors discover dishes based on how they want to feel.
 */

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MOOD_FINDER_CONTENT } from '../../content/home';
import { Reveal } from '../../components/motion/Reveal';

export function MoodFinder() {
  const [activeTabId, setActiveTabId] = useState(MOOD_FINDER_CONTENT.moods[0].id);

  const activeMood = MOOD_FINDER_CONTENT.moods.find((m) => m.id === activeTabId) || MOOD_FINDER_CONTENT.moods[0];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const total = MOOD_FINDER_CONTENT.moods.length;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % total;
      setActiveTabId(MOOD_FINDER_CONTENT.moods[nextIndex].id);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + total) % total;
      setActiveTabId(MOOD_FINDER_CONTENT.moods[prevIndex].id);
    }
  };

  return (
    <section
      className="section-padding bg-[var(--amani-canvas)] text-[var(--amani-ink)] border-b border-[var(--amani-hairline)]"
      aria-label="Mood Finder — Choose dishes by feeling"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <Reveal className="max-w-2xl mb-12">
          <span className="text-eyebrow mb-3 block">{MOOD_FINDER_CONTENT.label}</span>
          <h2 className="text-h1 mb-4 font-serif">{MOOD_FINDER_CONTENT.heading}</h2>
          <p className="text-body-lg">{MOOD_FINDER_CONTENT.description}</p>
        </Reveal>

        {/* 5/7 Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Mood Selection Tabs & Copy */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {/* Tab list */}
            <div
              role="tablist"
              aria-label="Filter food suggestions by mood"
              className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none snap-x"
            >
              {MOOD_FINDER_CONTENT.moods.map((mood, idx) => {
                const isActive = mood.id === activeTabId;
                return (
                  <button
                    key={mood.id}
                    id={`tab-${mood.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${mood.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTabId(mood.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`snap-start text-left px-5 py-4 rounded-[var(--amani-radius-sm)] border transition-all duration-300 min-h-[44px] flex items-center justify-between gap-4 font-sans ${
                      isActive
                        ? 'bg-[var(--amani-paper)] border-[var(--amani-maroon)] text-[var(--amani-ink)] font-medium shadow-sm'
                        : 'bg-transparent border-[var(--amani-hairline)] text-[var(--amani-ink-soft)] hover:border-[var(--amani-ink-muted)]'
                    }`}
                  >
                    <span className="text-base sm:text-lg font-serif">{mood.title}</span>
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        isActive ? 'bg-[var(--amani-maroon)] scale-125' : 'bg-transparent border border-[var(--amani-ink-muted)]'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Mood Details & Dish Suggestions */}
            <div
              id={`panel-${activeMood.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeMood.id}`}
              className="mt-8 p-6 bg-[var(--amani-paper)] border border-[var(--amani-hairline)] rounded-[var(--amani-radius-sm)]"
            >
              <p className="text-body mb-6 font-sans leading-relaxed">
                {activeMood.description}
              </p>

              {/* Dish List */}
              <div className="space-y-3 mb-6">
                <span className="text-xs uppercase tracking-widest text-[var(--amani-ink-muted)] font-semibold block">
                  Suggested Flavours:
                </span>
                <ul className="space-y-2">
                  {activeMood.dishes.map((dish, i) => (
                    <li key={i} className="text-sm font-serif text-[var(--amani-ink)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--amani-maroon)]" aria-hidden="true" />
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <NavLink
                to={activeMood.menuLink}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--amani-maroon)] font-semibold hover:underline"
              >
                Explore Matching Menu Section →
              </NavLink>
            </div>
          </div>

          {/* Right Column: Dominant 4:5 Image Crossfade */}
          <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-[var(--amani-radius-md)] border border-[var(--amani-hairline)]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeMood.id}
                src={activeMood.image}
                alt={activeMood.title}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </AnimatePresence>
            <div className="absolute bottom-4 right-4 bg-[var(--amani-void)] text-[var(--amani-cream-on-dark)] text-xs px-3 py-1.5 rounded font-mono opacity-80">
              {activeMood.title}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
