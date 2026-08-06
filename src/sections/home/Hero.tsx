/**
 * Section 01 — Hero
 * Full-bleed 100vh cinematic hero: background image + floating navbar + bold statement.
 */

import { useRef, useEffect } from 'react';
import { HERO_CONTENT } from '../../content/home';
import { gsap } from '../../lib/gsap';

export function Hero() {
  const heroRef    = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const headlineLines = HERO_CONTENT.headline.split('\n');

  useEffect(() => {
    const hero  = heroRef.current;
    const bgImg = bgImageRef.current;
    if (!hero || !bgImg) return;

    const titleLines = hero.querySelectorAll<HTMLElement>('.home-hero__title-line-inner');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgImg,
        { scale: 1.08 },
        { scale: 1, duration: 10, ease: 'sine.out' }
      );

      gsap.fromTo(
        titleLines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: hero, start: 'top 72%', once: true },
        }
      );

      // Retain the existing cinematic movement, with a more restrained image drift.
      gsap.fromTo(
        bgImg,
        { yPercent: -3 },
        {
          yPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.to('.hero-content-wrapper', {
        y: '6vh',
        opacity: 0.3,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="home-hero relative w-full overflow-hidden bg-[var(--amani-void)]"
      aria-label="Welcome to Amani"
    >
      {/* Background Media with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src={HERO_CONTENT.image}
          alt="Golden masala dosa with South Indian accompaniments"
          className="absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover object-[52%_center] will-change-transform"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 home-hero__overlay" />
      </div>

      {/* Hero Statement — shares the navigation's exact inner content boundary. */}
      <div className="hero-content-wrapper home-hero__content">
        <h1 className="home-hero__title" data-split="true">
          {headlineLines.map((line, i) => (
            <span key={i} className="home-hero__title-line">
              <span className="home-hero__title-line-inner">{line}</span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
