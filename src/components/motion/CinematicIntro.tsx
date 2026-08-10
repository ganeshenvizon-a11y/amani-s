/**
 * CinematicIntro — React component
 *
 * In-place virtual scroll video intro screen.
 * The viewport remains fixed (100vw x 100vh). Wheel / touch / key input scrubs
 * video.currentTime from start to finish without scrolling the document or exposing blank space.
 *
 * At >= 95% progress → Welcome layer reveals with:
 *   • "View Menu"       → navigates to /menu/
 *   • "View Restaurant" → navigates to / (home page)
 */

import { useEffect, useRef } from 'react';
import '../../styles/cinematic.css';

interface CinematicIntroProps {
  onComplete: (destination: string) => void;
}

const FINAL_REVEAL_THRESHOLD     = 0.95;
const SEEK_THRESHOLD             = 0.04;
const END_OF_VIDEO_SAFETY_MARGIN = 0.10;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const videoRef           = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const finalLayerRef      = useRef<HTMLDivElement>(null);

  const duration       = useRef(0);
  const isReady        = useRef(false);
  const targetProgress  = useRef(0);
  const currentProgress = useRef(0);
  const hasScrolled    = useRef(false);
  const finalRevealed  = useRef(false);
  const animFrameId    = useRef<number | null>(null);

  useEffect(() => {
    const video      = videoRef.current;
    const indicator  = scrollIndicatorRef.current;
    const finalLayer = finalLayerRef.current;

    if (!video || !indicator || !finalLayer) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Lock document scroll so page never moves
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // ── Seeking ────────────────────────────────────────────────────
    function seekTo(t: number) {
      if (!video) return;
      if (Math.abs(video.currentTime - t) <= SEEK_THRESHOLD) return;
      try {
        video.currentTime = t;
      } catch {
        /* noop */
      }
    }

    function onSeeked() {
      // noop - direct assignment provides instant scrubbing without event lock
    }

    // ── Apply progress ─────────────────────────────────────────────
    function applyProgress(p: number) {
      if (!indicator || !finalLayer) return;
      if (isReady.current) {
        const max = Math.max(0, duration.current - END_OF_VIDEO_SAFETY_MARGIN);
        seekTo(Math.min(p * duration.current, max));
      }

      if (!hasScrolled.current && p > 0.005) {
        hasScrolled.current = true;
        indicator.classList.add('is-hidden');
      } else if (hasScrolled.current && p <= 0.005) {
        hasScrolled.current = false;
        indicator.classList.remove('is-hidden');
      }

      if (p >= FINAL_REVEAL_THRESHOLD && !finalRevealed.current) {
        finalRevealed.current = true;
        finalLayer.classList.add('is-visible');
      } else if (p < FINAL_REVEAL_THRESHOLD && finalRevealed.current) {
        finalRevealed.current = false;
        finalLayer.classList.remove('is-visible');
      }
    }

    // ── Smooth Lerp Loop ───────────────────────────────────────────
    function startSmoothLoop() {
      if (animFrameId.current !== null) return;

      function step() {
        const diff = targetProgress.current - currentProgress.current;
        if (Math.abs(diff) > 0.0002) {
          currentProgress.current += diff * 0.32;
          applyProgress(currentProgress.current);
          animFrameId.current = requestAnimationFrame(step);
        } else {
          currentProgress.current = targetProgress.current;
          applyProgress(currentProgress.current);
          animFrameId.current = null;
        }
      }

      animFrameId.current = requestAnimationFrame(step);
    }

    // ── Wheel scrubbing ────────────────────────────────────────────
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const delta = e.deltaY * (e.deltaMode === 1 ? 0.02 : 0.00045);
      targetProgress.current = clamp(targetProgress.current + delta, 0, 1);
      startSmoothLoop();
    }

    // ── Touch scrubbing ────────────────────────────────────────────
    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchY) * 0.0018;
      touchStartY = touchY;
      targetProgress.current = clamp(targetProgress.current + deltaY, 0, 1);
      startSmoothLoop();
    }

    // ── Key navigation ─────────────────────────────────────────────
    function onKeyDown(e: KeyboardEvent) {
      if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
        e.preventDefault();
        targetProgress.current = clamp(targetProgress.current + 0.06, 0, 1);
        startSmoothLoop();
      } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
        e.preventDefault();
        targetProgress.current = clamp(targetProgress.current - 0.06, 0, 1);
        startSmoothLoop();
      }
    }

    // ── Reduced motion fallback ─────────────────────────────────────
    function showStaticFinalState() {
      if (!video || !indicator || !finalLayer) return;
      indicator.style.display = 'none';
      if (isReady.current) {
        video.currentTime = Math.max(0, duration.current - END_OF_VIDEO_SAFETY_MARGIN);
      }
      finalLayer.classList.add('is-visible');
    }

    function onMetadataLoaded() {
      if (!video) return;
      duration.current = video.duration || 0;
      isReady.current  = duration.current > 0 && video.readyState >= 1;
      video.currentTime = 0;

      if (reducedMotion.matches) {
        showStaticFinalState();
      } else {
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('keydown', onKeyDown);
        applyProgress(currentProgress.current);
      }
    }

    video.addEventListener('loadedmetadata', onMetadataLoaded, { once: true });
    video.addEventListener('seeked', onSeeked);

    return () => {
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      video.removeEventListener('seeked', onSeeked);
    };
  }, []);

  function handleNav(destination: string) {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    onComplete(destination);
  }

  return (
    <section
      className="cinematic-section"
      id="cinematicSection"
      aria-label="Amani's restaurant introduction"
    >
      <div className="cinematic-stage" id="cinematicStage">
        {/* Scrubbed video — muted, no autoplay */}
        <video
          className="cinematic-video"
          id="cinematicVideo"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/media/videos/amani-intro.mp4" type="video/mp4" />
        </video>

        {/* Subtle vignette overlay */}
        <div className="cinematic-overlay" id="cinematicOverlay" />

        {/* Intro scroll indicator */}
        <div className="intro-layer" id="introLayer">
          <div className="scroll-indicator" id="scrollIndicator" ref={scrollIndicatorRef}>
            <span className="scroll-arrow" aria-hidden="true">↓</span>
            <span className="scroll-label">Scroll to Enter</span>
          </div>
        </div>

        {/* Final reveal — shown when progress >= 95% */}
        <div className="final-layer" id="finalLayer" ref={finalLayerRef}>
          <div className="final-overlay" />
          <div className="final-content">
            <h1 className="final-title">Welcome to Amani's</h1>
            <p className="final-subtitle">What would you like to explore?</p>
            <nav className="final-actions" aria-label="Choose where to go">
              <button
                className="final-btn"
                onClick={() => handleNav('/menu/')}
              >
                View Menu
              </button>
              <button
                className="final-btn"
                onClick={() => handleNav('/')}
              >
                View Restaurant
              </button>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
