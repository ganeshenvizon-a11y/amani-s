/**
 * Section 05 — Amani Brand Story
 * An editorial timeline card gallery with button traversal.
 */

import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const STORY_CHAPTERS = [
  {
    number: '01',
    label: 'The beginning',
    title: 'Grandma cooked first.',
    body: 'Grandma made warm meals for neighbours from her small home kitchen.',
    image: '/media/images/story/amani-story-01-grandma-kitchen.webp',
    alt: 'Grandmother preparing food in a warm home kitchen',
  },
  {
    number: '02',
    label: 'The first room',
    title: 'Then came one small room.',
    body: 'More people came, so we opened a tiny place with a few steel tables.',
    image: '/media/images/story/amani-story-02-first-room.webp',
    alt: 'Grandmother serving guests in a small family restaurant',
  },
  {
    number: '03',
    label: 'The family table',
    title: 'The family joined in.',
    body: 'Her children learned the recipes and made space for every hungry guest.',
    image: '/media/images/story/amani-story-03-family-table.webp',
    alt: 'Family and guests sharing a South Indian meal together',
  },
  {
    number: '04',
    label: 'Growing together',
    title: 'The doors opened wider.',
    body: 'We found a bigger room, but kept the same welcome at the door.',
    image: '/media/images/story/amani-story-04-growing-room.webp',
    alt: 'The next generation greeting guests in a warm restaurant',
  },
  {
    number: '05',
    label: 'Passing it on',
    title: 'Every recipe stayed close.',
    body: 'Grandma wrote things down so every generation could keep cooking with heart.',
    image: '/media/images/story/amani-story-05-recipes.webp',
    alt: 'Grandmother and granddaughter writing a family recipe together in a home kitchen',
  },
  {
    number: '06',
    label: 'The long table',
    title: 'More seats. Same warmth.',
    body: 'Big family meals turned a local favourite into a room for everyone.',
    image: '/media/images/story/amani-story-06-community.webp',
    alt: 'Families sharing a South Indian feast around a long table in a warm restaurant',
  },
  {
    number: '07',
    label: 'Today',
    title: 'Still made like home.',
    body: 'Today, every shared meal carries a little of Grandma’s first table.',
    image: '/media/images/story/amani-story-05-today.webp',
    alt: 'A contemporary restaurant where generations share a meal',
  },
];

export function BrandStory() {
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
    const firstCard = rail.querySelector<HTMLElement>('.brand-story-card');
    const cardWidth = firstCard ? firstCard.offsetWidth : 320;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
    rail.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="brand-story" aria-labelledby="brand-story-heading">
      <div className="brand-story__header">
        <div className="brand-story__intro">
          <h2 id="brand-story-heading">A table built<br />by Grandma.</h2>
        </div>

        <div className="brand-story__controls">
          <button
            type="button"
            className="brand-story__nav-btn"
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
            className="brand-story__nav-btn"
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

      <div className="brand-story__viewport">
        <div ref={railRef} className="brand-story__rail">
          {STORY_CHAPTERS.map((chapter) => (
            <NavLink
              to="/stories/"
              className="brand-story-card"
              key={chapter.number}
              aria-label={`Read story: ${chapter.title}`}
            >
              <img
                className="brand-story-card__image"
                src={chapter.image}
                alt={chapter.alt}
                loading={chapter.number === '01' || chapter.number === '02' ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="brand-story-card__veil" aria-hidden="true" />
              <div className="brand-story-card__copy">
                <h3>{chapter.title}</h3>
                <span className="brand-story-card__arrow" aria-hidden="true">
                  <svg viewBox="0 0 18 18" fill="none">
                    <path d="M5 13 13 5M7 5h6v6" />
                  </svg>
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}
