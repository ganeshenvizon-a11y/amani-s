/**
 * Section 07 — Guest Reviews
 * Restrained editorial presentation of verified guest reviews.
 */

import { useState } from 'react';
import { GUEST_REVIEWS_CONTENT } from '../../content/reviews';
import { Reveal } from '../../components/motion/Reveal';

export function GuestReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = GUEST_REVIEWS_CONTENT.reviews.length;
  const currentReview = GUEST_REVIEWS_CONTENT.reviews[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  return (
    <section
      className="section-padding bg-[var(--amani-paper)] text-[var(--amani-ink)] border-b border-[var(--amani-hairline)]"
      aria-label="Guest Reviews"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <Reveal className="max-w-2xl mb-16">
          <span className="text-eyebrow mb-3 block">{GUEST_REVIEWS_CONTENT.label}</span>
          <h2 className="text-h1 mb-4 font-serif">{GUEST_REVIEWS_CONTENT.heading}</h2>
          <p className="text-body-lg">{GUEST_REVIEWS_CONTENT.intro}</p>
        </Reveal>

        {/* Large Quote Container */}
        <div className="max-w-4xl mx-auto p-8 md:p-12 bg-[var(--amani-canvas)] rounded-[var(--amani-radius-md)] border border-[var(--amani-hairline)] shadow-sm">
          <div aria-live="polite" className="space-y-6">
            <span className="font-serif text-6xl text-[var(--amani-maroon)] leading-none block opacity-40 select-none">
              “
            </span>
            <blockquote className="font-serif text-2xl md:text-3xl text-[var(--amani-ink)] leading-relaxed italic">
              {currentReview.quote}
            </blockquote>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--amani-hairline)] pt-6 font-sans">
              <div>
                <span className="font-semibold text-base block">{currentReview.author}</span>
                <span className="text-xs text-[var(--amani-ink-muted)] font-mono">
                  {currentReview.source} {currentReview.date ? `· ${currentReview.date}` : ''}
                </span>
              </div>

              {currentReview.dishMentioned && (
                <span className="text-xs uppercase tracking-wider text-[var(--amani-maroon)] font-semibold bg-[var(--amani-paper)] px-3 py-1 rounded">
                  Mentioned: {currentReview.dishMentioned}
                </span>
              )}
            </div>
          </div>

          {/* Navigation Controls & Progress */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-[var(--amani-hairline)]">
            <span className="text-xs font-mono text-[var(--amani-ink-muted)]">
              0{currentIndex + 1} / 0{total}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 border border-[var(--amani-hairline)] rounded-full hover:bg-[var(--amani-paper)] hover:border-[var(--amani-maroon)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--amani-maroon)] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Previous review"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="p-3 border border-[var(--amani-hairline)] rounded-full hover:bg-[var(--amani-paper)] hover:border-[var(--amani-maroon)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--amani-maroon)] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Next review"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
