/**
 * Gatherings preview — editorial split layout with an accessible image slider.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GATHERINGS_PREVIEW_CONTENT } from '../../content/home';
import { Reveal } from '../../components/motion/Reveal';

const GATHERING_SLIDES = [
  {
    image: '/media/images/happy-south-indian-dining.png',
    alt: 'Family enjoying a shared South Indian meal at Amani',
    label: 'Family celebrations',
  },
  {
    image: '/media/images/gathering-interior-01.webp',
    alt: 'Warm Amani dining room prepared for a gathering',
    label: 'Slow evenings',
  },
  {
    image: '/media/images/gathering-interior-03.webp',
    alt: 'Amani dining room with softly lit tables and warm details',
    label: 'Intimate dinners',
  },
  {
    image: '/media/images/gathering-interior-05.webp',
    alt: 'Generous Amani restaurant space ready for a milestone meal',
    label: 'Milestones',
  },
] as const;

interface PointerStart {
  x: number;
  y: number;
}

export function GatheringsPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const pauseAutoplayRef = useRef(false);
  const pointerStartRef = useRef<PointerStart | null>(null);
  const totalSlides = GATHERING_SLIDES.length;

  const goToSlide = useCallback((nextIndex: number) => {
    const currentIndex = activeIndexRef.current;
    if (currentIndex === nextIndex) return;

    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  }, []);

  const showNext = useCallback(() => {
    const nextIndex = (activeIndexRef.current + 1) % totalSlides;
    goToSlide(nextIndex);
  }, [goToSlide, totalSlides]);

  const showPrevious = useCallback(() => {
    const nextIndex = (activeIndexRef.current - 1 + totalSlides) % totalSlides;
    goToSlide(nextIndex);
  }, [goToSlide, totalSlides]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = window.setInterval(() => {
      if (!pauseAutoplayRef.current && !document.hidden) showNext();
    }, 6200);

    return () => window.clearInterval(interval);
  }, [showNext]);

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;

    const xDistance = event.clientX - start.x;
    const yDistance = event.clientY - start.y;
    if (Math.abs(xDistance) < 48 || Math.abs(xDistance) < Math.abs(yDistance) * 1.25) return;
    if (xDistance < 0) showNext();
    else showPrevious();
  };

  return (
    <section className="gatherings-section" aria-labelledby="gatherings-heading">
      <div className="gatherings-container">
        <div className="gatherings-content">
          <Reveal direction="up">
            <span className="gatherings-eyebrow">{GATHERINGS_PREVIEW_CONTENT.label}</span>
            <h2 id="gatherings-heading" className="gatherings-heading">{GATHERINGS_PREVIEW_CONTENT.heading}</h2>
            <p className="gatherings-body">{GATHERINGS_PREVIEW_CONTENT.body}</p>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <div className="gatherings-occasions" role="list">
              {GATHERINGS_PREVIEW_CONTENT.occasions.map((occasion) => (
                <NavLink key={occasion.path} to={occasion.path} className="gatherings-row" role="listitem">
                  <span className="gatherings-row__text">{occasion.label}</span>
                  <span className="gatherings-row__arrow" aria-hidden="true">→</span>
                </NavLink>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.25}>
            <NavLink to={GATHERINGS_PREVIEW_CONTENT.primaryCtaLink} className="gatherings-cta">
              <span>{GATHERINGS_PREVIEW_CONTENT.primaryCta}</span>
              <span className="gatherings-cta__line" aria-hidden="true" />
            </NavLink>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.2}>
          <div
            className="gatherings-slider"
            aria-roledescription="carousel"
            aria-label="Amani gatherings gallery"
            tabIndex={0}
            onPointerDown={(event) => { pointerStartRef.current = { x: event.clientX, y: event.clientY }; }}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStartRef.current = null; }}
            onFocus={() => { pauseAutoplayRef.current = true; }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) pauseAutoplayRef.current = false;
            }}
            onPointerEnter={() => { pauseAutoplayRef.current = true; }}
            onPointerLeave={() => { pauseAutoplayRef.current = false; }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') { event.preventDefault(); showNext(); }
              if (event.key === 'ArrowLeft') { event.preventDefault(); showPrevious(); }
            }}
          >
            <div className="gatherings-slider__media">
              {GATHERING_SLIDES.map((slide, index) => (
                <div
                  key={slide.image}
                  className={`gatherings-slider__slide ${index === activeIndex ? 'is-active' : ''}`}
                  aria-hidden={index !== activeIndex}
                >
                  <img
                    src={slide.image}
                    alt={index === activeIndex ? slide.alt : ''}
                    className="gatherings-slider__image"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding="async"
                    draggable="false"
                  />
                </div>
              ))}
            </div>

            <div className="gatherings-slider__overlay" aria-hidden="true" />
            <div className="gatherings-slider__caption" aria-live="polite">
              <span>{String(activeIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}</span>
              <strong>{GATHERING_SLIDES[activeIndex].label}</strong>
            </div>

            <div className="gatherings-slider__navigation" aria-label="Gatherings gallery controls">
              <button type="button" aria-label="Show previous gathering image" onClick={showPrevious}>←</button>
              <div className="gatherings-slider__progress" aria-label="Choose a gathering image">
                {GATHERING_SLIDES.map((slide, index) => (
                  <button
                    key={slide.image}
                    type="button"
                    className={index === activeIndex ? 'is-active' : ''}
                    aria-label={`Show ${slide.label}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
              <button type="button" aria-label="Show next gathering image" onClick={showNext}>→</button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
