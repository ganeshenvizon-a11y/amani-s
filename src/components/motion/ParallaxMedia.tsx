/**
 * ParallaxMedia — Subtle parallax image container using GSAP ScrollTrigger.
 */
import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

interface ParallaxMediaProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // e.g. 0.15 for subtle movement
  priority?: boolean;
}

export function ParallaxMedia({
  src,
  alt,
  className = '',
  speed = 0.12,
  priority = false,
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img       = imgRef.current;
    if (!container || !img) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="w-full h-full object-cover scale-[1.08] transition-transform duration-700"
      />
    </div>
  );
}
