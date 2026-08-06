/**
 * SmoothScrollProvider
 * Wraps the app in Lenis smooth scroll and connects it to GSAP ScrollTrigger.
 * One Lenis instance at app level — never create another one inside a page.
 *
 * Lenis is disabled automatically when prefers-reduced-motion: reduce.
 */
import { type ReactNode, useEffect, useRef } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (reducedMotion) return;

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    const lenis = lenisRef.current?.lenis;
    lenis?.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis?.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.08,
      }}
    >
      {children}
    </ReactLenis>
  );
}
