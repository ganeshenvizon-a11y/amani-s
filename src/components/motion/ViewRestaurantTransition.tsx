/**
 * ViewRestaurantTransition — Viewport transition when user clicks "View Restaurant".
 * Choreographs:
 * 1. Rangoli line expansion from central brand mark
 * 2. Warm rice-paper panel curtain lift/reveal (#F8F2E5)
 * 3. Focus transfer to homepage main heading
 * 4. Scroll unlock after completion (~1.2s or 200ms reduced-motion)
 */

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { RangoliPattern } from './RangoliPattern';

interface ViewRestaurantTransitionProps {
  onComplete: () => void;
}

export function ViewRestaurantTransition({ onComplete }: ViewRestaurantTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rangoliRef   = useRef<SVGSVGElement>(null);
  const panelRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const rangoli   = rangoliRef.current;
    const panel     = panelRef.current;

    if (!container || !panel) {
      onComplete();
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lock document scroll during transition
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Save completed state to sessionStorage
    try {
      sessionStorage.setItem('amani_view_restaurant_entered', 'true');
    } catch {
      // Storage unavailable fallback
    }

    if (reducedMotion) {
      gsap.to(container, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
          onComplete();
          // Focus main heading
          const mainHeading = document.querySelector<HTMLElement>('h1, #main-content');
          mainHeading?.focus();
        },
      });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        onComplete();
        // Shift focus to main heading accessibly
        const mainHeading = document.querySelector<HTMLElement>('h1, #main-content');
        if (mainHeading) {
          mainHeading.setAttribute('tabindex', '-1');
          mainHeading.focus();
        }
      },
    });

    // 1. Expand Kolam/Rangoli linework from center
    if (rangoli) {
      tl.fromTo(
        rangoli,
        { scale: 0.4, opacity: 0, rotate: -20 },
        { scale: 1.8, opacity: 1, rotate: 0, duration: 0.65, ease: 'power3.out' }
      );
    }

    // 2. Lift rice-paper panel vertically to reveal hero underneath
    tl.to(panel, {
      yPercent: -100,
      duration: 0.65,
      ease: 'power4.inOut',
    }, '-=0.2');

    // 3. Fade out overlay container
    tl.to(container, {
      opacity: 0,
      duration: 0.2,
    });

    return () => {
      tl.kill();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden bg-[var(--amani-void)]"
      aria-label="Entering Amani homepage"
    >
      <div
        ref={panelRef}
        className="absolute inset-0 bg-[var(--amani-canvas)] flex flex-col items-center justify-center"
      >
        <div className="text-[var(--amani-maroon)] flex flex-col items-center gap-4">
          <RangoliPattern ref={rangoliRef} size={140} color="var(--amani-maroon)" strokeWidth={1.5} />
          <span className="text-[var(--amani-eyebrow)] tracking-[0.2em] text-[var(--amani-ink)] font-semibold mt-2">
            AMANI · SOUTH INDIAN KITCHEN
          </span>
        </div>
      </div>
    </div>
  );
}
