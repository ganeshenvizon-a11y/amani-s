/**
 * Section 02 — Gathering Statement
 * Existing full-screen banner with a cinematic GSAP counter-motion image slider.
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import { HERO_CONTENT } from '../../content/home';
import { gsap } from '../../lib/gsap';

type SwipeStart = { x: number; y: number };

export function GatheringStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const initializedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const autoplayRef = useRef<number | null>(null);
  const lastAdvanceRef = useRef(Date.now());
  const pointerStartRef = useRef<SwipeStart | null>(null);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const totalSlides = HERO_CONTENT.slides.length;

  const updateSlideAccessibility = useCallback((activeIndex: number) => {
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      slide.setAttribute('aria-hidden', String(index !== activeIndex));
    });
  }, []);

  const preloadSlide = useCallback((index: number) => {
    const slide = HERO_CONTENT.slides[(index + totalSlides) % totalSlides];
    if (!slide || typeof window === 'undefined') return;
    const image = new Image();
    image.src = slide.image;
  }, [totalSlides]);

  const goToSlide = useCallback((requestedIndex: number, direction: 1 | -1 = 1) => {
    const currentIndex = activeIndexRef.current;
    const nextIndex = (requestedIndex + totalSlides) % totalSlides;

    if (
      totalSlides < 2 ||
      isAnimatingRef.current ||
      nextIndex === currentIndex
    ) {
      return;
    }

    const currentSlide = slideRefs.current[currentIndex];
    const nextSlide = slideRefs.current[nextIndex];
    const currentMedia = mediaRefs.current[currentIndex];
    const nextMedia = mediaRefs.current[nextIndex];
    if (!currentSlide || !nextSlide || !currentMedia || !nextMedia) return;

    lastAdvanceRef.current = Date.now();
    preloadSlide(nextIndex);
    timelineRef.current?.kill();
    gsap.killTweensOf([currentSlide, nextSlide, currentMedia, nextMedia]);

    if (reducedMotionRef.current) {
      isAnimatingRef.current = true;
      gsap.set(nextSlide, { autoAlpha: 1, xPercent: 0, zIndex: 3 });
      gsap.to(currentSlide, { autoAlpha: 0, duration: 0.12, overwrite: true });
      gsap.to(nextSlide, {
        autoAlpha: 1,
        duration: 0.12,
        overwrite: true,
        onComplete: () => {
          gsap.set(currentSlide, { xPercent: 0, zIndex: 1 });
          gsap.set(nextSlide, { xPercent: 0, zIndex: 2 });
          activeIndexRef.current = nextIndex;
          setActiveSlide(nextIndex);
          updateSlideAccessibility(nextIndex);
          isAnimatingRef.current = false;
          preloadSlide(nextIndex + 1);
        },
      });
      return;
    }

    isAnimatingRef.current = true;
    const viewportWidth = window.innerWidth;
    const counterMotion = viewportWidth < 768 ? 9 : viewportWidth < 1100 ? 11 : 14;
    const outgoingMediaMotion = viewportWidth < 768 ? 8 : viewportWidth < 1100 ? 10 : 12;

    gsap.set(currentSlide, {
      autoAlpha: 1,
      xPercent: 0,
      zIndex: 2,
      willChange: 'transform',
    });
    gsap.set(nextSlide, {
      autoAlpha: 1,
      xPercent: direction * 100,
      zIndex: 3,
      willChange: 'transform',
    });
    gsap.set(currentMedia, {
      xPercent: 0,
      scale: 1,
      willChange: 'transform',
    });
    gsap.set(nextMedia, {
      xPercent: direction * -counterMotion,
      scale: 1.06,
      willChange: 'transform',
    });

    const timeline = gsap.timeline({
      defaults: { duration: 1.25, ease: 'power4.inOut' },
      onComplete: () => {
        gsap.set(currentSlide, {
          autoAlpha: 0,
          xPercent: 0,
          zIndex: 1,
          clearProps: 'willChange',
        });
        gsap.set(currentMedia, {
          xPercent: 0,
          scale: 1,
          clearProps: 'willChange',
        });
        gsap.set(nextSlide, {
          autoAlpha: 1,
          xPercent: 0,
          zIndex: 2,
          clearProps: 'willChange',
        });
        gsap.set(nextMedia, {
          xPercent: 0,
          scale: 1,
          clearProps: 'willChange',
        });

        activeIndexRef.current = nextIndex;
        setActiveSlide(nextIndex);
        updateSlideAccessibility(nextIndex);
        isAnimatingRef.current = false;
        timelineRef.current = null;
        lastAdvanceRef.current = Date.now();
        preloadSlide(nextIndex + 1);
      },
      onInterrupt: () => {
        isAnimatingRef.current = false;
      },
    });

    timeline
      .to(currentSlide, { xPercent: direction * -100 }, 0)
      .to(currentMedia, {
        xPercent: direction * outgoingMediaMotion,
        scale: 1.035,
      }, 0)
      .to(nextSlide, { xPercent: 0 }, 0)
      .to(nextMedia, { xPercent: 0, scale: 1 }, 0);

    timelineRef.current = timeline;
  }, [preloadSlide, totalSlides, updateSlideAccessibility]);

  const showNextSlide = useCallback(() => {
    goToSlide(activeIndexRef.current + 1, 1);
  }, [goToSlide]);

  const showPreviousSlide = useCallback(() => {
    goToSlide(activeIndexRef.current - 1, -1);
  }, [goToSlide]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const slides = slideRefs.current.filter((slide): slide is HTMLDivElement => Boolean(slide));
    const media = mediaRefs.current.filter((item): item is HTMLDivElement => Boolean(item));
    if (!section || slides.length === 0 || initializedRef.current) return;

    initializedRef.current = true;
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      slides.forEach((slide, index) => {
        gsap.set(slide, {
          autoAlpha: index === 0 ? 1 : 0,
          xPercent: 0,
          zIndex: index === 0 ? 2 : 1,
        });
      });
      gsap.set(media, { xPercent: 0, scale: 1 });
    }, section);

    activeIndexRef.current = 0;
    setActiveSlide(0);
    updateSlideAccessibility(0);
    preloadSlide(1);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      gsap.killTweensOf([...slides, ...media]);
      ctx.revert();
      initializedRef.current = false;
      isAnimatingRef.current = false;
    };
  }, [preloadSlide, updateSlideAccessibility]);

  // Preserve the section's existing restrained vertical parallax independently
  // from the horizontal slide and media transforms.
  useEffect(() => {
    const section = sectionRef.current;
    const imageLayer = imageLayerRef.current;
    if (!section || !imageLayer || reducedMotionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imageLayer, {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (totalSlides < 2 || reducedMotionRef.current) return;

    autoplayRef.current = window.setInterval(() => {
      const ready =
        !pausedRef.current &&
        !document.hidden &&
        !isAnimatingRef.current &&
        Date.now() - lastAdvanceRef.current >= 6000;

      if (ready) showNextSlide();
    }, 300);

    return () => {
      if (autoplayRef.current !== null) window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
  }, [showNextSlide, totalSlides]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement)) return;

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        lastAdvanceRef.current = Date.now();
        showNextSlide();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        lastAdvanceRef.current = Date.now();
        showPreviousSlide();
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) lastAdvanceRef.current = Date.now();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [showNextSlide, showPreviousSlide]);

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    const horizontalIntent = Math.abs(distanceX) > Math.abs(distanceY) * 1.25;
    if (!horizontalIntent || Math.abs(distanceX) < 55) return;

    lastAdvanceRef.current = Date.now();
    if (distanceX < 0) showNextSlide();
    else showPreviousSlide();
  };

  const pauseAutoplay = () => {
    pausedRef.current = true;
  };

  const resumeAutoplay = () => {
    pausedRef.current = false;
    lastAdvanceRef.current = Date.now();
  };

  return (
    <section
      ref={sectionRef}
      className="home-gathering-statement"
      aria-labelledby="gathering-statement-heading"
      aria-roledescription="carousel"
      aria-label="Amani restaurant highlights"
      tabIndex={0}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onFocusCapture={pauseAutoplay}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) resumeAutoplay();
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStartRef.current = null;
      }}
    >
      <div ref={imageLayerRef} className="home-gathering-statement__media">
        {HERO_CONTENT.slides.map((slide, index) => (
          <div
            key={slide.image}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            className="home-gathering-statement__slide"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${totalSlides}`}
            aria-hidden={index !== activeSlide}
          >
            <div
              ref={(element) => {
                mediaRefs.current[index] = element;
              }}
              className="home-gathering-statement__slide-media"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="home-gathering-statement__image"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                draggable="false"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="home-gathering-statement__shade" aria-hidden="true" />

      <div className="home-gathering-statement__content">
        <p className="home-gathering-statement__eyebrow">South Indian table</p>
        <h2 id="gathering-statement-heading" className="home-gathering-statement__title">
          <span>WHERE EVERY</span>
          <span>GATHERING FINDS</span>
          <span>ITS FLAVOUR</span>
        </h2>
        <div className="home-gathering-statement__note">
          <p>Rooted in the generous spirit of the South, Amani brings fire, fragrance and thoughtful hospitality to every table.</p>
          <NavLink to="/gatherings/" className="home-gathering-statement__link">
            Explore gatherings
          </NavLink>
        </div>
      </div>

      <div className="home-gathering-statement__navigation" aria-label="Banner controls">
        <button
          type="button"
          className="home-gathering-statement__arrow"
          aria-label="Show previous banner image"
          onClick={() => {
            lastAdvanceRef.current = Date.now();
            showPreviousSlide();
          }}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="home-gathering-statement__pagination" aria-label="Choose a banner image">
          {HERO_CONTENT.slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={`home-gathering-statement__dot ${activeSlide === index ? 'is-active' : ''}`}
              aria-label={`Show banner image ${index + 1}`}
              aria-current={activeSlide === index ? 'true' : undefined}
              onClick={() => {
                lastAdvanceRef.current = Date.now();
                goToSlide(index, index > activeIndexRef.current ? 1 : -1);
              }}
            >
              <span />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="home-gathering-statement__arrow"
          aria-label="Show next banner image"
          onClick={() => {
            lastAdvanceRef.current = Date.now();
            showNextSlide();
          }}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
