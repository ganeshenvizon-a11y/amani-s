/**
 * Section 01 — Hero
 * Full-bleed 100vh cinematic hero: background image + floating navbar + bold statement.
 */

import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { HERO_CONTENT } from '../../content/home';
import { gsap } from '../../lib/gsap';

export function Hero() {
  const heroRef    = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const headlineLines = HERO_CONTENT.headline.split('\n');

  useEffect(() => {
    const hero  = heroRef.current;
    const bgImg = bgImageRef.current;
    if (!hero || !bgImg) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgImg,
        { scale: 1.08 },
        { scale: 1, duration: 10, ease: 'sine.out' }
      );

      // Parallax: background image drifts slower than scroll, content fades/rises faster
      gsap.fromTo(
        bgImg,
        { yPercent: -12 },
        {
          yPercent: 12,
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
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--amani-void)]"
      aria-label="Welcome to Amani"
    >
      {/* Background Media with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src={HERO_CONTENT.image}
          alt="Amani South Indian dining atmosphere with warm tables and prepared feast"
          className="absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover object-center will-change-transform"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 home-hero__overlay" />
      </div>

      {/* Hero Statement */}
      <div className="hero-content-wrapper home-hero__content">
        <h1 className="home-hero__title" data-split="true">
          {headlineLines.map((line, i) => (
            <span key={i} className="home-hero__title-line">
              <motion.span
                className="block"
                initial={shouldReduceMotion ? false : { y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
