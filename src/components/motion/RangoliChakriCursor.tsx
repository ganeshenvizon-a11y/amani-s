/**
 * DotCursor — A clean, minimal interactive dot cursor.
 * Follows the mouse with smooth lerp physics.
 * Scales up on hover over interactive elements, shrinks on click.
 */

import { useEffect, useRef, useState } from 'react';

export function RangoliChakriCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touch || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('has-custom-cursor');

    let animationFrameId: number;

    const onPointerMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = !!target.closest(
          'a, button, input, textarea, select, [role="button"], .mood-journey-card, .experience-step, [data-cursor="hover"]'
        );
        setIsHovered(interactive);
      }
    };

    const onPointerDown = () => setIsClicking(true);
    const onPointerUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mousedown', onPointerDown, { passive: true });
    window.addEventListener('mouseup', onPointerUp, { passive: true });
    document.body.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.body.addEventListener('mouseenter', onMouseEnter, { passive: true });

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      document.body.classList.remove('has-custom-cursor');
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
      className={`dot-cursor-wrapper ${isVisible ? 'is-visible' : ''} ${isHovered ? 'is-hovered' : ''} ${isClicking ? 'is-clicking' : ''}`}
      aria-hidden="true"
    >
      <div ref={dotRef} className="dot-cursor-dot" />
    </div>
  );
}
