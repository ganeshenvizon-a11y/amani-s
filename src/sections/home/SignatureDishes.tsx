/**
 * Signature section — pinned stack of Amani's ambiance and atmosphere details.
 * Supports smooth GSAP pinned stack on desktop (>= 900px) and buttery, touch/mouse-swipeable rail on mobile (< 900px).
 */

import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import { RangoliPattern } from '../../components/motion/RangoliPattern';

const SIGNATURE_CARDS = [
  {
    headline: 'Warmth You Can Settle Into',
    supportingLine: 'Comfortable tables, warm lighting and spaces designed for meals that are never rushed.',
    image: '/media/images/ambiance/1.png',
  },
  {
    headline: 'The South, Painted in Memory',
    supportingLine: 'Narrative artworks honour everyday rituals, from the chaata and rolu to hands measuring grain with instinct.',
    image: '/media/images/ambiance/2.png',
  },
  {
    headline: 'Objects That Remember Home',
    supportingLine: 'Brass vessels, ceramic jars, stone grinders, woven textures and wooden utensils bring familiar memories into the room.',
    image: '/media/images/ambiance/3.png',
  },
  {
    headline: 'Every Table Made to Welcome',
    supportingLine: 'For everyday meals, family conversations and occasions that bring generations together.',
    image: '/media/images/ambiance/4.png',
  },
] as const;

// Each card keeps a distinct resting angle so the reveal feels like a casually
// placed pile of printed cards, rather than perfectly aligned panels.
const CARD_TILTS = [-3.4, 2.6, -1.9, 3.1] as const;

export function SignatureDishes() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);

  // Drag-to-scroll state for mobile & mouse swiping
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Active card index for mobile pagination dots
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!section || cards.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add('(min-width: 900px)', () => {
        gsap.set(cards, {
          autoAlpha: 1,
          x: 0,
          yPercent: 115,
          rotation: (index) => CARD_TILTS[index],
          scale: 1,
        });
        gsap.set(cards[0], { x: 0, yPercent: 0, rotation: CARD_TILTS[0], zIndex: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * 1.1)}`,
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.slice(1).forEach((card, index) => {
          const incomingIndex = index + 1;
          const position = index;

          timeline.to(
            card,
            {
              x: 0,
              y: 0,
              yPercent: 0,
              rotation: CARD_TILTS[incomingIndex],
              scale: 1,
              duration: 1,
              ease: 'power2.out',
              onStart: () => gsap.set(card, { zIndex: incomingIndex + 1 }),
            },
            position,
          );
        });

        return () => timeline.kill();
      });

      media.add('(max-width: 899px)', () => {
        gsap.set(cards, { clearProps: 'all' });
      });
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  // Track scroll position on mobile/tablet for active card tracker dots
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleScroll = () => {
      if (window.innerWidth >= 900) return;
      const maxScrollLeft = stage.scrollWidth - stage.clientWidth;
      if (maxScrollLeft <= 0) {
        setActiveIndex(0);
        return;
      }

      const progress = stage.scrollLeft / maxScrollLeft;
      const dotIndex = Math.round(progress * (SIGNATURE_CARDS.length - 1));
      setActiveIndex(Math.min(Math.max(0, dotIndex), SIGNATURE_CARDS.length - 1));
    };

    handleScroll();
    stage.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      stage.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Pointer/Touch drag handlers for drag-to-scroll on mobile and desktop
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 900) return;
    const stage = stageRef.current;
    if (!stage) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    scrollLeftRef.current = stage.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || window.innerWidth >= 900) return;
    const stage = stageRef.current;
    if (!stage) return;

    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 5) {
      hasDraggedRef.current = true;
    }
    stage.scrollLeft = scrollLeftRef.current - dx;
  };

  const handlePointerUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const scrollToDot = (dotIndex: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const maxScrollLeft = stage.scrollWidth - stage.clientWidth;
    if (maxScrollLeft <= 0) return;
    const targetScrollLeft = (dotIndex / (SIGNATURE_CARDS.length - 1)) * maxScrollLeft;
    stage.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="signature-stack" aria-labelledby="signature-stack-heading">
      <div className="signature-stack__shell">
        <header className="signature-stack__intro">
          <div className="signature-stack__headline-group">
            <h2 id="signature-stack-heading">
              <span>Familiar in</span>
              <span>every <em>detail.</em></span>
            </h2>
            <RangoliPattern className="signature-stack__motif" size="68" color="currentColor" strokeWidth={1.2} />
          </div>
          <p className="signature-stack__summary">
            From the glow of brass to the stories painted on our walls, every detail carries a quiet memory of the South.
          </p>
          <NavLink to="/visit/" className="signature-stack__menu-link">
            STEP INSIDE →
          </NavLink>
        </header>

        <div
          ref={stageRef}
          className="signature-stack__stage"
          aria-label="Familiar in every detail gallery"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrLeave}
          onPointerLeave={handlePointerUpOrLeave}
          onPointerCancel={handlePointerUpOrLeave}
        >
          {SIGNATURE_CARDS.map((card, index) => (
            <article
              className="signature-stack-card"
              key={card.headline}
              ref={(element) => {
                if (element) cardRefs.current[index] = element;
              }}
            >
              <div className="signature-stack-card__image-wrap">
                <img
                  src={card.image}
                  alt={card.headline}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                />
              </div>
              <div className="signature-stack-card__copy">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{card.headline}</h3>
                  <p>{card.supportingLine}</p>
                </div>
                <NavLink
                  to="/visit/"
                  aria-label={`Step inside: ${card.headline}`}
                  onClick={(e) => {
                    if (hasDraggedRef.current) {
                      e.preventDefault();
                    }
                  }}
                >
                  <svg aria-hidden="true" viewBox="0 0 18 18" fill="none">
                    <path d="M5 13 13 5M7 5h6v6" />
                  </svg>
                </NavLink>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile/Tablet Swipe Pagination Dots */}
        <div className="signature-stack__dots" aria-hidden="true">
          {SIGNATURE_CARDS.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              className={`signature-stack__dot ${activeIndex === dotIndex ? 'is-active' : ''}`}
              onClick={() => scrollToDot(dotIndex)}
              aria-label={`Go to card ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
