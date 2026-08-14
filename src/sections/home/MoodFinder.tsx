/**
 * Section 03 — Choose by Feeling
 * Horizontal tasting journey with card button traversal.
 */

import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MOOD_FINDER_CONTENT } from '../../content/home';

export function MoodFinder() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = () => {
    const rail = railRef.current;
    if (!rail) return;
    const { scrollLeft, scrollWidth, clientWidth } = rail;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    checkScrollState();
    rail.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);

    return () => {
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
      <div className="home-mood-journey__header">
        <div className="home-mood-journey__intro">
          <h2 id="mood-journey-heading">The dishes our tables return for.</h2>
        </div>

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
      </div>

      <div className="home-mood-journey__viewport">
        <div ref={railRef} className="home-mood-journey__rail">
          {MOOD_FINDER_CONTENT.moods.map((mood, index) => {
            const titleParts = mood.title.split('&');
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
                  <h3 className="mood-journey-card__title">
                    {titleParts.length > 1 ? (
                      <>
                        {titleParts[0].trim()}
                        <br />
                        &amp; {titleParts[1].trim()}
                      </>
                    ) : (
                      mood.title
                    )}
                  </h3>
                  <div className="mood-journey-card__footer">
                    <div
                      className="mood-journey-card__tags"
                      aria-label={`Suggested dishes for ${mood.title}`}
                    >
                      {mood.dishes.slice(0, 2).map((dish) => (
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

