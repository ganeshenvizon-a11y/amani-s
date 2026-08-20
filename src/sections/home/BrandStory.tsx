/**
 * Section 05 — Amani Brand Story
 * An editorial timeline card gallery with button traversal.
 */

import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RangoliPattern } from '../../components/motion/RangoliPattern';

const STORY_CHAPTERS = [
  {
    number: '01',
    label: 'Familiar aroma ',
    title: 'It begins with an aroma you remember.',
    body: 'Curry leaves crackling, spices warming and something familiar taking shape in the kitchen. ',
    image: '/media/images/story/1.png',
    alt: 'Grandmother preparing food in a warm home kitchen',
  },
  {
    number: '02',
    label: 'Patience and preparation',
    title: 'With food given time, care and patience. ',
    body: 'Flavours are built slowly - through familiar methods, thoughtful preparation and an instinct for when something feels right. ',
    image: '/media/images/story/2.png',
    alt: 'Grandmother serving guests in a small family restaurant',
  },
  {
    number: '03',
    label: 'The welcoming table',
    title: 'At a table that always makes room.',
    body: 'For children, parents, elders, familiar faces and those joining us for the first time.',
    image: '/media/images/story/3.png',
    alt: 'Family and guests sharing a South Indian meal together',
  },
  {
    number: '04',
    label: 'The return of home',
    title: 'And in flavours that bring home closer.',
    body: 'A contemporary South Indian table shaped by memory, generosity and the warmth of being cared for.',
    image: '/media/images/story/4.png',
    alt: 'The next generation greeting guests in a warm restaurant',
  },
];

export function BrandStory() {
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
    const firstCard = rail.querySelector<HTMLElement>('.brand-story-card');
    const cardWidth = firstCard ? firstCard.offsetWidth : 320;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1);
    rail.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="brand-story" aria-labelledby="brand-story-heading">
      {/* Background Pattern Texture Overlay */}
      <div className="brand-story__bg-pattern" aria-hidden="true">
        <img
          src="/media/images/hero-pattern.png"
          alt=""
          className="brand-story__bg-pattern-img"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Rangoli Watermark Motifs */}
      <div className="brand-story__motif brand-story__motif--left" aria-hidden="true">
        <RangoliPattern size={420} color="var(--amani-gold, #c8a762)" strokeWidth={0.8} />
      </div>
      <div className="brand-story__motif brand-story__motif--right" aria-hidden="true">
        <RangoliPattern size={420} color="var(--amani-gold, #c8a762)" strokeWidth={0.8} />
      </div>

      <div className="brand-story__header">
        <div className="brand-story__intro">
          <h2 id="brand-story-heading">
            Amani’s Begins,<br />Before the First Bite.
          </h2>
          <p className="brand-story__copy">
            In familiar aromas, patient preparation and the quiet warmth of being cared for. Because sometimes, home does not return as a place. It returns as a flavour.
          </p>
        </div>

        {hasOverflow && (
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
        )}
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
