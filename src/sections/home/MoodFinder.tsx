/**
 * Section 03 — Choose by Feeling
 * Horizontal tasting journey with card button traversal.
 */

import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MOOD_FINDER_CONTENT } from '../../content/home';
import { RangoliPattern } from '../../components/motion/RangoliPattern';

export function MoodFinder() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const checkScrollState = () => {
    const rail = railRef.current;
    if (!rail) return;
    const { scrollLeft, scrollWidth, clientWidth } = rail;
    const isOverflowing = scrollWidth > clientWidth + 10;
    setHasOverflow(isOverflowing);
    setCanScrollLeft(isOverflowing && scrollLeft > 10);
    setCanScrollRight(isOverflowing && scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    checkScrollState();
    const timer = setTimeout(checkScrollState, 100);

    rail.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);

    return () => {
      clearTimeout(timer);
      rail.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const rail = railRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>('.mood-journey-card');
    const cardWidth = firstCard ? firstCard.offsetWidth : 320;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
    rail.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      className="home-mood-journey"
      aria-labelledby="mood-journey-heading"
    >
      {/* Background Pattern Texture Overlay */}
      <div className="home-mood-journey__bg-pattern" aria-hidden="true">
        <img
          src="/media/images/hero-pattern.png"
          alt=""
          className="home-mood-journey__bg-pattern-img"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Rangoli Watermark Motifs */}
      <div className="home-mood-journey__motif home-mood-journey__motif--left" aria-hidden="true">
        <RangoliPattern size={420} color="var(--amani-gold, #c8a762)" strokeWidth={0.8} />
      </div>
      <div className="home-mood-journey__motif home-mood-journey__motif--right" aria-hidden="true">
        <RangoliPattern size={420} color="var(--amani-gold, #c8a762)" strokeWidth={0.8} />
      </div>

      <div className="home-mood-journey__header">
        <div className="home-mood-journey__intro">
          <h2 id="mood-journey-heading">
            What Are You<br />
            in the Mood For?
          </h2>
        </div>

        {hasOverflow && (
          <div className="home-mood-journey__controls">
            <button
              type="button"
              className="home-mood-journey__nav-btn"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="home-mood-journey__nav-btn"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="home-mood-journey__viewport">
        <div ref={railRef} className="home-mood-journey__rail">
          {MOOD_FINDER_CONTENT.moods.map((mood, index) => {
            return (
              <article className="mood-journey-card" key={mood.id}>
                <img
                  src={mood.image}
                  alt=""
                  className="mood-journey-card__image"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div className="mood-journey-card__veil" aria-hidden="true" />
                <div className="mood-journey-card__content">
                  <h3 className="mood-journey-card__title">{mood.title}</h3>
                  <div className="mood-journey-card__footer">
                    <div
                      className="mood-journey-card__tags"
                      aria-label={`Suggested dish for ${mood.title}`}
                    >
                      {mood.dishes.slice(0, 1).map((dish) => (
                        <span className="mood-journey-card__tag" key={dish}>
                          {dish}
                        </span>
                      ))}
                    </div>
                    <NavLink
                      to={mood.menuLink}
                      className="mood-journey-card__link"
                      aria-label={`Explore dishes for ${mood.title}`}
                    >
                      <svg aria-hidden="true" viewBox="0 0 18 18" fill="none">
                        <path d="M5 13 13 5M7 5h6v6" />
                      </svg>
                    </NavLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

