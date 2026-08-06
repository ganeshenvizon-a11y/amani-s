/**
 * Site loader controller.
 * Owns the GSAP master timeline for the fullscreen logo loading animation.
 * Isolated in an IIFE so it never leaks globals into the host page.
 */
(function () {
  'use strict';

  var MIN_DURATION_MS = 1800;
  var MAX_SAFETY_DURATION_MS = 8000;

  var RING_ROTATION_DURATION = 8.5;
  var ENTRANCE_START_OFFSET = 0.15;
  var ENTRANCE_DURATION = 0.9;
  var BREATHE_DURATION = 1.8;
  var BREATHE_SCALE = 1.018;

  var EXIT_RING_ACCEL_DURATION = 0.35;
  var EXIT_LOGO_DURATION = 0.55;
  var EXIT_BG_DURATION = 0.65;

  var loaderEl = document.querySelector('.site-loader');

  // Fail safe: if the loader markup or GSAP didn't load, never trap the page.
  if (!loaderEl || typeof window.gsap === 'undefined') {
    releasePage();
    return;
  }

  var logoEl = loaderEl.querySelector('.site-loader__logo');
  var breatheEl = loaderEl.querySelector('.site-loader__logo-breathe');
  var ringEl = loaderEl.querySelector('.logo-ring');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var ringTween = null;
  var breatheTween = null;
  var hasExited = false;
  var startTime = now();

  function now() {
    return (window.performance && performance.now) ? performance.now() : Date.now();
  }

  function releasePage() {
    if (loaderEl) {
      loaderEl.parentNode.removeChild(loaderEl);
    }
    document.documentElement.classList.remove('is-loading');
    document.body.classList.remove('is-loading');
  }

  function playEntrance() {
    if (prefersReducedMotion) {
      gsap.set(logoEl, { opacity: 0 });
      gsap.to(logoEl, { opacity: 1, duration: 0.4, ease: 'power1.out' });
      return;
    }

    gsap.set(logoEl, { opacity: 0, scale: 0.88, y: 8 });
    gsap.set(ringEl, { rotation: 0, transformOrigin: '50% 50%' });

    ringTween = gsap.to(ringEl, {
      rotation: 360,
      duration: RING_ROTATION_DURATION,
      ease: 'none',
      repeat: -1,
      transformOrigin: '50% 50%'
    });

    gsap.to(logoEl, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: ENTRANCE_DURATION,
      ease: 'power3.out',
      delay: ENTRANCE_START_OFFSET
    });

    breatheTween = gsap.to(breatheEl, {
      scale: BREATHE_SCALE,
      duration: BREATHE_DURATION,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: ENTRANCE_START_OFFSET + ENTRANCE_DURATION
    });
  }

  function killLivingTweens() {
    if (ringTween) {
      ringTween.kill();
      ringTween = null;
    }
    if (breatheTween) {
      breatheTween.kill();
      breatheTween = null;
    }
  }

  function hideLoader() {
    killLivingTweens();
    loaderEl.style.display = 'none';
    loaderEl.style.pointerEvents = 'none';
    document.documentElement.classList.remove('is-loading');
    document.body.classList.remove('is-loading');
  }

  function finishLoading() {
    if (hasExited) {
      return;
    }
    hasExited = true;

    if (prefersReducedMotion) {
      gsap.to(logoEl, {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.inOut',
        onComplete: hideLoader
      });
      return;
    }

    var exitTl = gsap.timeline({ onComplete: hideLoader });

    if (ringTween) {
      exitTl.to(ringTween, {
        timeScale: 3,
        duration: EXIT_RING_ACCEL_DURATION,
        ease: 'power2.in'
      }, 0);
    }

    exitTl.to(logoEl, {
      scale: 0.82,
      opacity: 0,
      duration: EXIT_LOGO_DURATION,
      ease: 'power3.inOut'
    }, 0.1);

    exitTl.to(loaderEl, {
      opacity: 0,
      duration: EXIT_BG_DURATION,
      ease: 'power3.inOut'
    }, 0.15);
  }

  function scheduleFinish() {
    var elapsed = now() - startTime;
    var remaining = Math.max(0, MIN_DURATION_MS - elapsed);
    setTimeout(finishLoading, remaining);
  }

  playEntrance();

  window.addEventListener('load', scheduleFinish);
  setTimeout(scheduleFinish, MAX_SAFETY_DURATION_MS);
})();
