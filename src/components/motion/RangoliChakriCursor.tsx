/**
 * RangoliChakriCursor — Traditional South Indian Rangoli Kolam / Chakri custom cursor.
 * Features dynamic contrast adaptation (inverting on light vs dark backgrounds),
 * smooth lerp physics, spinning radial Rangoli motif, interactive hover scaling,
 * and click starburst ripple.
 */

import { useEffect, useRef, useState } from 'react';

export function RangoliChakriCursor() {
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const rotation = useRef(0);
  const currentScale = useRef(1);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Touchscreen / reduced motion check
    const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touch || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    let animationFrameId: number;

    const onPointerMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        // Interactive hover check
        const interactive = !!target.closest(
          'a, button, input, textarea, select, [role="button"], .mood-journey-card, .experience-step, [data-cursor="hover"]'
        );
        setIsHovered(interactive);

        // Detect light vs dark background under cursor for high contrast
        const darkEl = target.closest(
          '.mood-journey-card, .home-hero, .site-loader, [data-theme="dark"], .bg-dark, .bg-void, .bg-\\[var\\(--amani-void\\)\\]'
        );

        if (darkEl) {
          setIsLightBg(false);
        } else {
          try {
            const compBg = window.getComputedStyle(target).backgroundColor;
            if (compBg && compBg.startsWith('rgb')) {
              const rgb = compBg.match(/\d+/g);
              if (rgb && rgb.length >= 3) {
                const r = parseInt(rgb[0], 10);
                const g = parseInt(rgb[1], 10);
                const b = parseInt(rgb[2], 10);
                const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                setIsLightBg(lum > 0.45);
              }
            } else {
              setIsLightBg(true);
            }
          } catch {
            setIsLightBg(true);
          }
        }
      }
    };

    const onPointerDown = () => {
      setIsClicking(true);
      if (rippleRef.current) {
        rippleRef.current.style.transform = 'translate(-50%, -50%) scale(1.6)';
        rippleRef.current.style.opacity = '0.8';
        setTimeout(() => {
          if (rippleRef.current) {
            rippleRef.current.style.transform = 'translate(-50%, -50%) scale(0.2)';
            rippleRef.current.style.opacity = '0';
          }
        }, 320);
      }
    };

    const onPointerUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mousedown', onPointerDown, { passive: true });
    window.addEventListener('mouseup', onPointerUp, { passive: true });
    document.body.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.body.addEventListener('mouseenter', onMouseEnter, { passive: true });

    // Smooth lerp physics loop
    const loop = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.16;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.16;

      const spinSpeed = isHovered ? 1.8 : 0.6;
      rotation.current = (rotation.current + spinSpeed) % 360;

      const desiredScale = isClicking ? 0.85 : isHovered ? 1.45 : 1;
      currentScale.current += (desiredScale - currentScale.current) * 0.2;

      if (cursorFollowerRef.current) {
        cursorFollowerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${
          followerPos.current.y
        }px, 0) translate(-50%, -50%) rotate(${rotation.current}deg) scale(${currentScale.current})`;
      }

      if (rippleRef.current) {
        rippleRef.current.style.left = `${pos.current.x}px`;
        rippleRef.current.style.top = `${pos.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isHovered, isClicking]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`rangoli-cursor-wrapper ${isVisible ? 'is-visible' : ''} ${
        isHovered ? 'is-hovered' : ''
      } ${isLightBg ? 'is-light-bg' : 'is-dark-bg'}`}
      aria-hidden="true"
    >
      {/* Outer Rangoli Kolam / Chakri follower */}
      <div ref={cursorFollowerRef} className="rangoli-cursor-chakri">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rangoli-cursor-svg"
        >
          {/* Outer dashed spinning Chakri ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeDasharray="4 3"
            className="rangoli-ring-outer"
          />

          {/* Inner smooth guide ring */}
          <circle
            cx="50"
            cy="50"
            r="28"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.55"
          />

          {/* 8-Fold Rangoli Petal Loops (Kolam motif) */}
          <path
            d="M 50 12 Q 65 32.5 50 50 Q 35 32.5 50 12 Z"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.88"
          />
          <path
            d="M 50 50 Q 67.5 35 88 50 Q 67.5 65 50 50 Z"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.88"
          />
          <path
            d="M 50 50 Q 65 67.5 50 88 Q 35 67.5 50 50 Z"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.88"
          />
          <path
            d="M 50 50 Q 32.5 35 12 50 Q 32.5 65 50 50 Z"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.88"
          />

          {/* Diagonal Petal Flourishes */}
          <path
            d="M 50 50 Q 65 24 76 24 Q 76 35 50 50 Z"
            stroke="currentColor"
            strokeWidth="0.85"
            opacity="0.7"
          />
          <path
            d="M 50 50 Q 76 65 76 76 Q 65 76 50 50 Z"
            stroke="currentColor"
            strokeWidth="0.85"
            opacity="0.7"
          />
          <path
            d="M 50 50 Q 35 76 24 76 Q 24 65 50 50 Z"
            stroke="currentColor"
            strokeWidth="0.85"
            opacity="0.7"
          />
          <path
            d="M 50 50 Q 24 35 24 24 Q 35 24 50 50 Z"
            stroke="currentColor"
            strokeWidth="0.85"
            opacity="0.7"
          />

          {/* Radial Pulli Dots */}
          <circle cx="50" cy="22" r="1.6" fill="currentColor" opacity="0.85" />
          <circle cx="78" cy="50" r="1.6" fill="currentColor" opacity="0.85" />
          <circle cx="50" cy="78" r="1.6" fill="currentColor" opacity="0.85" />
          <circle cx="22" cy="50" r="1.6" fill="currentColor" opacity="0.85" />
        </svg>
      </div>

      {/* Click starburst ripple */}
      <div ref={rippleRef} className="rangoli-cursor-ripple" />
    </div>
  );
}
