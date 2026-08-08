/**
 * Section 02 — Gathering Statement
 * Existing full-screen banner with a cinematic GSAP counter-motion image slider and animated text sync.
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

const GATHERING_SLIDE_IMAGES = [
  {
    image: '/media/images/gathering-interior-01.webp',
    alt: "Sunlit Amani's dining room with warm wood, brass accents, and lush plants",
  },
  {
    image: '/media/images/gathering-interior-02.webp',
    alt: "Amani's dining room with warm arched wood details and softly lit pendant lamps",
  },
  {
    image: '/media/images/gathering-interior-03.webp',
    alt: "An intimate Amani's banquette with brass, wood, and hand-finished details",
  },
  {
    image: '/media/images/gathering-interior-04.webp',
    alt: "Amani's restaurant interior with a warm open kitchen and handcrafted lighting",
  },
  {
    image: '/media/images/gathering-interior-05.webp',
    alt: "Amani's dining room with arched windows, warm wood beams, and brass lanterns",
  },
] as const;

const GATHERING_SLIDES = HERO_CONTENT.slides.map((slide, index) => ({
  ...slide,
  ...GATHERING_SLIDE_IMAGES[index],
}));

export function GatheringStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textGroupRefs = useRef<Array<HTMLDivElement | null>>([]);
  const titleLineRefs = useRef<Array<Array<HTMLSpanElement | null>>>([]);
  const noteRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const initializedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const autoplayRef = useRef<number | null>(null);
  const lastAdvanceRef = useRef(Date.now());
  const userClickedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const totalSlides = GATHERING_SLIDES.length;

  const updateSlideAccessibility = useCallback((activeIndex: number) => {
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      slide.setAttribute('aria-hidden', String(index !== activeIndex));
    });
    textGroupRefs.current.forEach((group, index) => {
      if (!group) return;
      group.setAttribute('aria-hidden', String(index !== activeIndex));
    });
  }, []);

  const preloadSlide = useCallback((index: number) => {
    const slide = GATHERING_SLIDES[(index + totalSlides) % totalSlides];
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

    const currentTextGroup = textGroupRefs.current[currentIndex];
    const nextTextGroup = textGroupRefs.current[nextIndex];
    const currentTitleLines = (titleLineRefs.current[currentIndex] || []).filter(
      (item): item is HTMLSpanElement => Boolean(item)
    );
    const nextTitleLines = (titleLineRefs.current[nextIndex] || []).filter(
      (item): item is HTMLSpanElement => Boolean(item)
    );
    const currentNote = noteRefs.current[currentIndex];
    const nextNote = noteRefs.current[nextIndex];

    if (!currentSlide || !nextSlide || !currentMedia || !nextMedia) return;

    lastAdvanceRef.current = Date.now();
    preloadSlide(nextIndex);
    timelineRef.current?.kill();
    gsap.killTweensOf(
      [
        currentSlide,
        nextSlide,
      ].filter(Boolean)
    );

    if (reducedMotionRef.current) {
      isAnimatingRef.current = true;
      gsap.set(nextSlide, { autoAlpha: 1, xPercent: 0, zIndex: 3 });
      if (nextTextGroup) gsap.set(nextTextGroup, { autoAlpha: 1, zIndex: 3 });
      gsap.to(currentSlide, { autoAlpha: 0, duration: 0.12, overwrite: true });
      if (currentTextGroup) gsap.to(currentTextGroup, { autoAlpha: 0, duration: 0.12, overwrite: true });
      gsap.to(nextSlide, {
        autoAlpha: 1,
        duration: 0.12,
        overwrite: true,
        onComplete: () => {
          gsap.set(currentSlide, { xPercent: 0, zIndex: 1 });
          gsap.set(nextSlide, { xPercent: 0, zIndex: 2 });
          if (currentTextGroup) gsap.set(currentTextGroup, { zIndex: 1 });
          if (nextTextGroup) gsap.set(nextTextGroup, { zIndex: 2 });
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

    if (currentTextGroup) gsap.set(currentTextGroup, { autoAlpha: 1, zIndex: 2 });
    if (nextTextGroup) gsap.set(nextTextGroup, { autoAlpha: 1, zIndex: 3 });

    if (nextTitleLines.length > 0) {
      gsap.set(nextTitleLines, {
        yPercent: direction * 108,
        autoAlpha: 0,
        willChange: 'transform, opacity',
      });
    }
    if (nextNote) {
      gsap.set(nextNote, {
        y: direction * 28,
        autoAlpha: 0,
        willChange: 'transform, opacity',
      });
    }

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

        if (currentTextGroup) gsap.set(currentTextGroup, { autoAlpha: 0, zIndex: 1 });
        if (nextTextGroup) gsap.set(nextTextGroup, { autoAlpha: 1, zIndex: 2 });
        if (currentTitleLines.length > 0) gsap.set(currentTitleLines, { clearProps: 'willChange' });
        if (nextTitleLines.length > 0) gsap.set(nextTitleLines, { clearProps: 'willChange' });
        if (currentNote) gsap.set(currentNote, { clearProps: 'willChange' });
        if (nextNote) gsap.set(nextNote, { clearProps: 'willChange' });

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

    if (currentTitleLines.length > 0) {
      timeline.to(
        currentTitleLines,
        {
          yPercent: direction * -100,
          autoAlpha: 0,
          duration: 0.48,
          stagger: 0.04,
          ease: 'power3.in',
        },
        0
      );
    }
    if (currentNote) {
      timeline.to(
        currentNote,
        {
          y: direction * -20,
          autoAlpha: 0,
          duration: 0.42,
          ease: 'power3.in',
        },
        0
      );
    }

    if (nextTitleLines.length > 0) {
      timeline.to(
        nextTitleLines,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.82,
          stagger: 0.06,
          ease: 'power4.out',
        },
        0.22
      );
    }
    if (nextNote) {
      timeline.to(
        nextNote,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.78,
          ease: 'power4.out',
        },
        0.34
      );
    }

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

      textGroupRefs.current.forEach((group, index) => {
        if (!group) return;
        const isFirst = index === 0;
        gsap.set(group, {
          autoAlpha: isFirst ? 1 : 0,
          zIndex: isFirst ? 2 : 1,
        });

        const lines = (titleLineRefs.current[index] || []).filter(
          (item): item is HTMLSpanElement => Boolean(item)
        );
        lines.forEach((line) => {
          gsap.set(line, {
            yPercent: isFirst ? 0 : 108,
            autoAlpha: isFirst ? 1 : 0,
          });
        });

        const note = noteRefs.current[index];
        if (note) {
          gsap.set(note, {
            y: isFirst ? 0 : 28,
            autoAlpha: isFirst ? 1 : 0,
          });
        }
      });
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

  // Auto-scroll loop — advances slides every 4.5 seconds if user hasn't clicked
  useEffect(() => {
    if (totalSlides < 2 || reducedMotionRef.current) return;

    autoplayRef.current = window.setInterval(() => {
      const ready =
        !userClickedRef.current &&
        !document.hidden &&
        !isAnimatingRef.current &&
        Date.now() - lastAdvanceRef.current >= 4500;

      if (ready) showNextSlide();
    }, 400);

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
        userClickedRef.current = true;
        lastAdvanceRef.current = Date.now();
        showNextSlide();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        userClickedRef.current = true;
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

  const pointerStartRef = useRef<SwipeStart | null>(null);

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

    userClickedRef.current = true;
    lastAdvanceRef.current = Date.now();
    if (distanceX < 0) showNextSlide();
    else showPreviousSlide();
  };

  return (
    <section
      ref={sectionRef}
      className="home-gathering-statement"
      aria-labelledby="gathering-statement-heading"
      aria-roledescription="carousel"
      aria-label="Amani's restaurant highlights"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStartRef.current = null;
      }}
    >
      <div ref={imageLayerRef} className="home-gathering-statement__media">
        {GATHERING_SLIDES.map((slide, index) => (
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
        {GATHERING_SLIDES.map((slide, index) => (
          <div
            key={slide.image}
            ref={(element) => {
              textGroupRefs.current[index] = element;
            }}
            className={`home-gathering-statement__text-group ${
              index === activeSlide ? 'is-active' : ''
            }`}
            aria-hidden={index !== activeSlide}
          >
            <h2
              id={index === 0 ? 'gathering-statement-heading' : undefined}
              className="home-gathering-statement__title"
            >
              {slide.titleLines.map((line, lineIndex) => (
                <span key={lineIndex} className="home-gathering-statement__title-line-mask">
                  <span
                    ref={(element) => {
                      if (!titleLineRefs.current[index]) {
                        titleLineRefs.current[index] = [];
                      }
                      titleLineRefs.current[index][lineIndex] = element;
                    }}
                    className="home-gathering-statement__title-line"
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h2>
            <div
              ref={(element) => {
                noteRefs.current[index] = element;
              }}
              className="home-gathering-statement__note"
            >
              <p>{slide.description}</p>
              <NavLink to={slide.ctaLink} className="home-gathering-statement__link">
                {slide.ctaText}
              </NavLink>
            </div>
          </div>
        ))}
      </div>

      <div className="home-gathering-statement__navigation" aria-label="Banner controls">
        <button
          type="button"
          className="home-gathering-statement__arrow"
          aria-label="Show previous banner image"
          onClick={() => {
            userClickedRef.current = true;
            lastAdvanceRef.current = Date.now();
            showPreviousSlide();
          }}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="home-gathering-statement__pagination" aria-label="Choose a banner image">
          {GATHERING_SLIDES.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={`home-gathering-statement__dot ${activeSlide === index ? 'is-active' : ''}`}
              aria-label={`Show banner image ${index + 1}`}
              aria-current={activeSlide === index ? 'true' : undefined}
              onClick={() => {
                userClickedRef.current = true;
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
            userClickedRef.current = true;
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
