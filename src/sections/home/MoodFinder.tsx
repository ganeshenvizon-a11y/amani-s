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
        // Align the final card comfortably inside the right edge.
        const travel = () => Math.max(0, rail.scrollWidth - window.innerWidth + 144);
        // Keep the section pinned after the rail completes so the final card can settle
        // before the next scene is allowed to enter.
        const finalHold = () => Math.max(320, window.innerHeight * 0.62);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${travel() + finalHold()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(rail, { x: () => -travel(), duration: 1, ease: 'none' }, 0);

        if (heading) {
          timeline.to(
            heading,
            { scale: 0.62, autoAlpha: 0.7, duration: 1, ease: 'none' },
            0,
          );
        }

        // An empty tail gives the completed composition a deliberate pause.
        timeline.to({}, { duration: finalHold() / Math.max(travel(), 1) });

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
          {MOOD_FINDER_CONTENT.moods.map((mood, index) => (
            <article className="mood-journey-card" key={mood.id}>
              <img
                src={mood.image}
                alt=""
                className="mood-journey-card__image"
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="mood-journey-card__veil" aria-hidden="true" />
              <div className="mood-journey-card__glass">
                <span className="mood-journey-card__number">0{index + 1}</span>
                <h3>{mood.title}</h3>
                <ul aria-label={`Suggested dishes for ${mood.title}`}>
                  {mood.dishes.slice(0, 2).map((dish) => (
                    <li key={dish}>{dish}</li>
                  ))}
                </ul>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
