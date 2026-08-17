/**
 * Signature dishes — a scroll-pinned stack of Amani's most-loved plates.
 * Supports smooth GSAP pinned stack on desktop (>= 900px) and buttery, touch/mouse-swipeable rail on mobile (< 900px).
 */

import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import { RangoliPattern } from '../../components/motion/RangoliPattern';

const SIGNATURE_DISHES = [
  {
    name: 'Naatu Kodi Pulusu',
    note: 'Slow-cooked country chicken',
    image: '/media/images/signatures/naatu-kodi-pulusu.webp',
  },
  {
    name: 'Paneer Tikka',
    note: 'Charred paneer from the grill',
    image: '/media/images/signatures/paneer-tikka.webp',
  },
  {
    name: 'Avakai Biryani',
    note: 'Mango pickle biryani',
    image: '/media/images/signatures/avakai-biryani.webp',
  },
  {
    name: 'Bhimavaram Mixed Pulav',
    note: 'A fragrant coastal rice',
    image: '/media/images/signatures/bhimavaram-mixed-pulav.webp',
  },
] as const;

// Each card keeps a distinct resting angle so the reveal feels like a casually
// placed pile of printed menus, rather than perfectly aligned panels.
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

  // Track scroll position on mobile for active card indicator
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleScroll = () => {
      if (window.innerWidth >= 900) return;
      const cardWidth = stage.firstElementChild ? (stage.firstElementChild as HTMLElement).offsetWidth : 300;
      const index = Math.round(stage.scrollLeft / (cardWidth + 16));
      setActiveIndex(Math.min(Math.max(0, index), SIGNATURE_DISHES.length - 1));
    };

    stage.addEventListener('scroll', handleScroll, { passive: true });
    return () => stage.removeEventListener('scroll', handleScroll);
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

  const scrollToCard = (index: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const card = stage.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  return (
    <section ref={sectionRef} className="signature-stack" aria-labelledby="signature-stack-heading">
      <div className="signature-stack__shell">
        <header className="signature-stack__intro">
          <div className="signature-stack__headline-group">
            <h2 id="signature-stack-heading">
              <span>From our <em>fire</em></span>
              <span>to your table.</span>
            </h2>
            <RangoliPattern className="signature-stack__motif" size="68" color="currentColor" strokeWidth={1.2} />
          </div>
          <p className="signature-stack__summary">Four plates worth returning for.</p>
          <NavLink to="/menu/" className="signature-stack__menu-link">
            Explore the menu
          </NavLink>
        </header>

        <div
          ref={stageRef}
          className="signature-stack__stage"
          aria-label="Amani's signature dishes"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrLeave}
          onPointerLeave={handlePointerUpOrLeave}
          onPointerCancel={handlePointerUpOrLeave}
        >
          {SIGNATURE_DISHES.map((dish, index) => (
            <article
              className="signature-stack-card"
              key={dish.name}
              ref={(element) => {
                if (element) cardRefs.current[index] = element;
              }}
            >
              <div className="signature-stack-card__image-wrap">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                />
              </div>
              <div className="signature-stack-card__copy">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p>{dish.note}</p>
                  <h3>{dish.name}</h3>
                </div>
                <NavLink
                  to="/menu/"
                  aria-label={`View ${dish.name} on the menu`}
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

        {/* Mobile Swipe Pagination Dots */}
        <div className="signature-stack__dots" aria-hidden="true">
          {SIGNATURE_DISHES.map((dish, index) => (
            <button
              key={dish.name}
              type="button"
              className={`signature-stack__dot ${activeIndex === index ? 'is-active' : ''}`}
              onClick={() => scrollToCard(index)}
              aria-label={`Go to ${dish.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

