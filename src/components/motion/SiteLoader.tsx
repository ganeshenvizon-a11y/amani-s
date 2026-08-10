/**
 * SiteLoader — Premium Anime.js Staggered Page Reveal
 * • 9 vertical rectangular strips covering 100dvh.
 * • Centered Amani brand logo entrance (fade + scale + slide up, 600ms) with 250ms hold.
 * • Center-outward-upward stagger reveal of the hero section underneath (850ms, easeInOutQuart).
 * • Logo exit simultaneous with panel lift (350ms).
 * • Scroll lock management & reduced motion support.
 */

import { useEffect, useRef } from 'react';
import { createTimeline, stagger } from 'animejs';
import { BRAND_CONFIG } from '../../config/brand';
import '../../styles/loader.css';

interface SiteLoaderProps {
  onDone: () => void;
}

const STRIP_COUNT = 9;

export function SiteLoader({ onDone }: SiteLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const stripsRef = useRef<Array<HTMLDivElement | null>>([]);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    const loader = loaderRef.current;
    const logo = logoRef.current;
    const strips = stripsRef.current.filter((s): s is HTMLDivElement => s !== null);

    if (!loader || !logo || strips.length === 0) {
      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');
      onDone();
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lock page scroll while loader is active
    document.documentElement.classList.add('is-loading');
    document.body.classList.add('is-loading');

    function finish() {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;

      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');

      if (loader) {
        loader.style.display = 'none';
      }
      onDone();
    }

    if (prefersReduced) {
      const timer = setTimeout(finish, 200);
      return () => {
        clearTimeout(timer);
        document.documentElement.classList.remove('is-loading');
        document.body.classList.remove('is-loading');
      };
    }

    // Single controlled Anime.js Timeline for the entrance, hold, and stagger curtain reveal
    const tl = createTimeline({
      onComplete: finish,
    });

    // 1. Logo entrance (0 → 1 opacity, .92 → 1 scale, 12px → 0 translateY, ~600ms, smooth ease-out)
    tl.add(logo, {
      opacity: [0, 1],
      scale: [0.92, 1],
      translateY: [12, 0],
      duration: 600,
      ease: 'outCubic',
    });

    // 2. Hold for ~250ms, then main stagger reveal of strips center → outward → upward
    tl.add(
      strips,
      {
        translateY: ['0%', '-105%'],
        delay: stagger(65, { from: 'center' }),
        duration: 850,
        ease: 'inOutQuart',
      },
      '+=250'
    );

    // 3. Logo exit synchronized with panel lift (opacity 1 → 0, translateY 0 → -20px, scale 1 → .96, ~350ms)
    tl.add(
      logo,
      {
        opacity: [1, 0],
        translateY: [0, -20],
        scale: [1, 0.96],
        duration: 350,
        ease: 'inCubic',
      },
      '-=850'
    );

    // Safety fallback timeout to prevent hanging if timeline gets interrupted
    const fallbackTimer = setTimeout(() => {
      finish();
    }, 2400);

    return () => {
      clearTimeout(fallbackTimer);
      try {
        tl.pause();
      } catch {
        // ignore cleanup error
      }
      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');
    };
  }, [onDone]);

  return (
    <div
      ref={loaderRef}
      className="site-loader"
      role="status"
      aria-label="Loading Amani's Restaurant"
    >
      {/* 9 Vertical Rectangular Strips */}
      <div className="site-loader__strips" aria-hidden="true">
        {Array.from({ length: STRIP_COUNT }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              stripsRef.current[index] = el;
            }}
            className="site-loader__strip"
          />
        ))}
      </div>

      {/* Centered Brand Logo Overlay Stage */}
      <div ref={logoRef} className="site-loader__brand-stage">
        <div className="site-loader__logo-wrapper">
          <img
            src={BRAND_CONFIG.logoMarkSvg}
            alt="Amani's"
            className="site-loader__logo-img"
          />
          <span className="site-loader__wordmark-text">Āmani</span>
          <span className="site-loader__kicker-text">South Indian Kitchen</span>
        </div>
      </div>

      {/* Screen Reader Notification */}
      <span className="site-loader__sr-only" aria-live="polite">
        Loading Amani's South Indian Kitchen…
      </span>
    </div>
  );
}

