/**
 * Section 05 — Amani Brand Story
 * A scroll-pinned, right-to-left editorial timeline built from tactile photo cards.
 */

import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from '../../lib/gsap';

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
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add('(min-width: 1024px)', () => {
        const heading = introRef.current?.querySelector<HTMLElement>('h2');
        const travel = () => Math.max(0, rail.scrollWidth - window.innerWidth + 80);
        const pinDistance = () => Math.round(travel() * 1.08);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${pinDistance()}`,
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(rail, { x: () => -travel(), duration: 1, ease: 'none' }, 0);
        if (heading) {
          timeline.to(heading, { scale: 0.7, autoAlpha: 0.6, duration: 1, ease: 'none' }, 0);
        }

        return () => timeline.kill();
      });
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="brand-story" aria-labelledby="brand-story-heading">
      <div ref={introRef} className="brand-story__intro">
        <h2 id="brand-story-heading">A table built<br />by Grandma.</h2>
      </div>

      <div className="brand-story__viewport">
        <div ref={railRef} className="brand-story__rail">
          {STORY_CHAPTERS.map((chapter) => (
            <article className="brand-story-card" key={chapter.number}>
              <img
                className="brand-story-card__image"
                src={chapter.image}
                alt={chapter.alt}
                loading={chapter.number === '01' || chapter.number === '02' ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="brand-story-card__veil" aria-hidden="true" />
              <div className="brand-story-card__copy">
                <p className="brand-story-card__index">{chapter.number} <span>{chapter.label}</span></p>
                <h3>{chapter.title}</h3>
                <div className="brand-story-card__footer">
                  <p>{chapter.body}</p>
                  <NavLink to="/stories/" className="brand-story-card__link" aria-label={`Read more about ${chapter.label}`}>
                    <svg aria-hidden="true" viewBox="0 0 18 18" fill="none">
                      <path d="M5 13 13 5M7 5h6v6" />
                    </svg>
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
