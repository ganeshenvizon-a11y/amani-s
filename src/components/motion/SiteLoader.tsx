/**
 * SiteLoader — Lightweight, responsive brand loader animation.
 * Plays a quick 400ms entrance & exit reveal, ensuring pages load immediately without freezing.
 */

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import '../../styles/loader.css';

interface SiteLoaderProps {
  onDone: () => void;
}

export function SiteLoader({ onDone }: SiteLoaderProps) {
  const loaderRef  = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<SVGGElement>(null);
  const hasExited  = useRef(false);

  useEffect(() => {
    const loader = loaderRef.current;
    const logo   = logoRef.current;
    const ring   = ringRef.current;

    if (!loader || !logo) {
      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');
      onDone();
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function finish() {
      if (hasExited.current) return;
      hasExited.current = true;

      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');

      if (prefersReduced) {
        onDone();
        return;
      }

      gsap.to(loader, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => {
          if (loader) loader.style.display = 'none';
          onDone();
        },
      });
    }

    document.documentElement.classList.add('is-loading');
    document.body.classList.add('is-loading');

    // Smooth logo scale in + ring rotation
    if (!prefersReduced) {
      gsap.fromTo(logo, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
      if (ring) {
        gsap.to(ring, { rotation: 180, duration: 0.5, ease: 'power1.inOut', transformOrigin: '50% 50%' });
      }
    }

    // Finish after 450ms safety window
    const timer = setTimeout(finish, 450);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[var(--amani-canvas)] text-[var(--amani-ink)] flex items-center justify-center pointer-events-none"
      ref={loaderRef}
      role="status"
      aria-label="Loading Amani"
    >
      <div className="flex flex-col items-center gap-4" ref={logoRef}>
        <svg
          className="w-20 h-20 text-[var(--amani-maroon)]"
          viewBox="0 0 208 208"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g ref={ringRef}>
            <circle cx="104" cy="104" r="90" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" />
            <circle cx="104" cy="104" r="70" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          </g>
          <circle cx="104" cy="104" r="12" fill="currentColor" />
        </svg>
        <span className="font-serif text-2xl tracking-wider text-[var(--amani-ink)]">Āmani</span>
      </div>
    </div>
  );
}
