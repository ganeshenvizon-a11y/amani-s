/**
 * SiteLoader — Brand loader with continuously spinning outer ring.
 * • Outer dashed ring spins indefinitely via CSS keyframe (reliable, smooth).
 * • GSAP handles logo entrance (scale + fade) and exit (fade out).
 * • Calls onDone after ~700ms so the animation is visible on every load.
 */

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import '../../styles/loader.css';

interface SiteLoaderProps {
  onDone: () => void;
}

export function SiteLoader({ onDone }: SiteLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef   = useRef<HTMLDivElement>(null);
  const hasExited = useRef(false);

  useEffect(() => {
    const loader = loaderRef.current;
    const logo   = logoRef.current;

    if (!loader || !logo) {
      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');
      onDone();
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.documentElement.classList.add('is-loading');
    document.body.classList.add('is-loading');

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
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          if (loader) loader.style.display = 'none';
          onDone();
        },
      });
    }

    if (prefersReduced) {
      // No animation — just show briefly and leave
      const timer = setTimeout(finish, 300);
      return () => {
        clearTimeout(timer);
        document.documentElement.classList.remove('is-loading');
        document.body.classList.remove('is-loading');
      };
    }

    // Entrance: logo fades + scales in
    gsap.fromTo(
      logo,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
    );

    // Hold for 700ms then exit (ring keeps spinning via CSS during this window)
    const timer = setTimeout(finish, 700);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');
    };
  }, [onDone]);

  return (
    <div
      ref={loaderRef}
      className="site-loader"
      role="status"
      aria-label="Loading Amani's"
    >
      <div ref={logoRef} className="site-loader__logo">
        {/* Logo mark */}
        <div className="site-loader__mark">
          <svg
            className="site-loader__svg"
            viewBox="0 0 208 208"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer dashed spinning ring — animated via CSS */}
            <circle
              className="site-loader__ring-outer"
              cx="104"
              cy="104"
              r="90"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 6"
            />

            {/* Inner static ring */}
            <circle
              className="site-loader__ring-inner"
              cx="104"
              cy="104"
              r="68"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            {/* Center dot */}
            <circle cx="104" cy="104" r="10" fill="currentColor" />
          </svg>
        </div>

        {/* Wordmark below */}
        <span className="site-loader__wordmark">Āmani</span>
      </div>

      {/* SR-only live region */}
      <span className="site-loader__sr-only" aria-live="polite">
        Loading…
      </span>
    </div>
  );
}
