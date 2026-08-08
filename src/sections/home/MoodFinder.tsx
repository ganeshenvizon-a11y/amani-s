/**
 * Section 03 — Choose by Feeling
 * A pinned horizontal tasting journey driven by the visitor's vertical scroll.
 */

import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { MOOD_FINDER_CONTENT } from '../../content/home';
import { gsap } from '../../lib/gsap';

export function MoodFinder() {
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
      media.add('(min-width: 768px)', () => {
        const heading = introRef.current?.querySelector<HTMLElement>('h2');
        // Align final card cleanly within viewport edge
        const travel = () => Math.max(0, rail.scrollWidth - window.innerWidth + 80);
        // 1:1 pin distance matching horizontal travel length for natural scroll pacing
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
          timeline.to(
            heading,
            { scale: 0.7, autoAlpha: 0.6, duration: 1, ease: 'none' },
            0,
          );
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
    <section
      ref={sectionRef}
      className="home-mood-journey"
      aria-labelledby="mood-journey-heading"
    >
      <div ref={introRef} className="home-mood-journey__intro">
        <h2 id="mood-journey-heading">Choose the feeling. We&apos;ll find the flavour.</h2>
      </div>

      <div className="home-mood-journey__viewport">
        <div ref={railRef} className="home-mood-journey__rail">
          {MOOD_FINDER_CONTENT.moods.map((mood, index) => {
            const formattedNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
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
                  <div className="mood-journey-card__number">{formattedNumber}</div>
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
