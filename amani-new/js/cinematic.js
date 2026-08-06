/* ============================================
   Amani's Kitchen — Cinematic Video Scroll Section
   Scroll position -> video.currentTime, no autoplay.

   Performance notes:
   - Exactly one rAF is ever pending; scroll/resize only record
     the latest input and request that single frame.
   - Section geometry (offsetTop/offsetHeight) is read once on
     load and cached, not re-read on every scroll/rAF tick.
   - video.currentTime is only reassigned when the delta exceeds
     a threshold (~1 source frame), and never while a seek is
     already in flight - the pending target is applied on 'seeked'
     instead of stacking redundant seeks.
   ============================================ */

(function () {
  'use strict';

  var section = document.getElementById('cinematicSection');
  var video = document.getElementById('cinematicVideo');
  var introLayer = document.getElementById('introLayer');
  var scrollIndicator = document.getElementById('scrollIndicator');
  var finalLayer = document.getElementById('finalLayer');

  if (!section || !video) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Lenis smooths native scroll input into inertial motion, then keeps
  // driving window.scrollTo() every frame - the existing 'scroll'
  // listener below still fires as usual, no scrub logic changes needed.
  // Skipped under reduced-motion, matching the rest of this file.
  var lenis = null;
  if (typeof window.Lenis === 'function' && !reducedMotion.matches) {
    lenis = new window.Lenis({
      duration: 1.1,
      smoothWheel: true
    });
    window.requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      window.requestAnimationFrame(raf);
    });
  }

  // Fraction of the scroll range spent moving through the video;
  // the remainder is the "hold" zone where the final frame settles
  // and the welcome UI reveals.
  var VIDEO_SCROLL_FRACTION = 0.92;
  var FINAL_REVEAL_THRESHOLD = 0.985;

  // Source video is 24fps -> ~0.0417s per frame. Seeking below one
  // frame's worth of difference is wasted decode work the eye can't see.
  var SEEK_THRESHOLD = 0.04;

  // Seeking to video.duration exactly is unreliable across browsers -
  // some clamp past the last decodable frame and land on a black/stale
  // frame. Pull the resting point back slightly so the hold/CTA state
  // always lands on the true final frame (menu on the table).
  var END_OF_VIDEO_SAFETY_MARGIN = 0.1;

  var duration = 0;
  var isReady = false;
  var latestScrollY = window.scrollY || window.pageYOffset;

  // Cached scroll-range geometry - measured once, not on every frame.
  var sectionTop = 0;
  var scrollableDistance = 0;

  var rafPending = false;
  var resizeRafPending = false;
  var hasStartedScrolling = false;
  var finalRevealed = false;
  var pendingTime = null;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function measure() {
    sectionTop = section.offsetTop;
    scrollableDistance = section.offsetHeight - window.innerHeight;
  }

  function getScrollProgress() {
    if (scrollableDistance <= 0) return 0;
    return clamp((latestScrollY - sectionTop) / scrollableDistance, 0, 1);
  }

  function seekTo(targetTime) {
    // A seek is already decoding - remember where we want to land
    // and apply it once 'seeked' fires, rather than issuing another
    // seek on top of one still in flight.
    if (video.seeking) {
      pendingTime = targetTime;
      return;
    }
    if (Math.abs(video.currentTime - targetTime) <= SEEK_THRESHOLD) return;
    pendingTime = null;
    video.currentTime = targetTime;
  }

  function onSeeked() {
    if (pendingTime === null) return;
    var target = pendingTime;
    pendingTime = null;
    if (Math.abs(video.currentTime - target) > SEEK_THRESHOLD) {
      video.currentTime = target;
    }
  }

  function applyProgress(progress) {
    // 1. Drive the video timeline (only once metadata/data is ready).
    if (isReady) {
      var videoProgress = clamp(progress / VIDEO_SCROLL_FRACTION, 0, 1);
      var maxSeekTime = Math.max(0, duration - END_OF_VIDEO_SAFETY_MARGIN);
      seekTo(Math.min(videoProgress * duration, maxSeekTime));
    }

    // 2. Scroll indicator fades out as soon as scrolling begins.
    if (!hasStartedScrolling && progress > 0.004) {
      hasStartedScrolling = true;
      scrollIndicator.classList.add('is-hidden');
    } else if (hasStartedScrolling && progress <= 0.004) {
      hasStartedScrolling = false;
      scrollIndicator.classList.remove('is-hidden');
    }

    // 3. Final reveal once the visitor has scrolled to the very end.
    if (progress >= FINAL_REVEAL_THRESHOLD && !finalRevealed) {
      finalRevealed = true;
      finalLayer.classList.add('is-visible');
    } else if (progress < FINAL_REVEAL_THRESHOLD && finalRevealed) {
      finalRevealed = false;
      finalLayer.classList.remove('is-visible');
    }
  }

  function onAnimationFrame() {
    rafPending = false;
    applyProgress(getScrollProgress());
  }

  function requestTick() {
    if (!rafPending) {
      rafPending = true;
      window.requestAnimationFrame(onAnimationFrame);
    }
  }

  function onScroll() {
    latestScrollY = window.scrollY || window.pageYOffset;
    requestTick();
  }

  function onResize() {
    if (resizeRafPending) return;
    resizeRafPending = true;
    window.requestAnimationFrame(function () {
      resizeRafPending = false;
      measure();
      requestTick();
    });
  }

  function setupScrollScrubbing() {
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    applyProgress(getScrollProgress());
  }

  function teardownScrollScrubbing() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  }

  function showStaticFinalState() {
    // Reduced motion: skip the scroll-scrubbed journey entirely and
    // present the arrival state immediately, accessibly.
    introLayer.style.display = 'none';
    if (isReady) {
      video.currentTime = Math.max(0, duration - END_OF_VIDEO_SAFETY_MARGIN);
    }
    finalLayer.classList.add('is-visible');
  }

  function onMetadataLoaded() {
    duration = video.duration || 0;
    isReady = duration > 0 && video.readyState >= 1;
    // Paint the very first frame instead of a blank/black element.
    video.currentTime = 0;

    if (reducedMotion.matches) {
      showStaticFinalState();
    } else {
      setupScrollScrubbing();
    }
  }

  video.addEventListener('loadedmetadata', onMetadataLoaded, { once: true });
  video.addEventListener('seeked', onSeeked);

  reducedMotion.addEventListener('change', function (event) {
    if (event.matches) {
      teardownScrollScrubbing();
      showStaticFinalState();
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    } else {
      finalLayer.classList.remove('is-visible');
      introLayer.style.display = '';
      finalRevealed = false;
      setupScrollScrubbing();
    }
  });
})();
