/**
 * Signature dishes — a scroll-pinned stack of Amani's most-loved plates.
 */

import { useEffect, useRef } from 'react';
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
  {
    name: 'Bommidala Pulusu',
    note: 'Tangy coastal fish curry',
    image: '/media/images/signatures/bommidala-pulusu.webp',
  },
  {
    name: 'Chicken Biryani',
    note: 'Dum rice and spiced chicken',
    image: '/media/images/signatures/chicken-biryani.webp',
  },
  {
    name: 'Gongura Mutton Curry',
    note: 'Slow-cooked mutton and sorrel',
    image: '/media/images/signatures/gongura-mutton-curry.webp',
  },
] as const;

export function SignatureDishes() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!section || cards.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add('(min-width: 900px)', () => {
        gsap.set(cards, {
          autoAlpha: 1,
          x: 28,
          yPercent: 115,
          scale: 1,
        });
        gsap.set(cards[0], { x: 0, yPercent: 0, zIndex: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * (SIGNATURE_DISHES.length - 0.1))}`,
            scrub: 1.1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.slice(1).forEach((card, index) => {
          const incomingIndex = index + 1;
          const stackStart = index;
          const position = index;

          for (let depth = 0; depth <= stackStart; depth += 1) {
            const stackedCard = cards[stackStart - depth];
            timeline.to(
              stackedCard,
              {
                x: -(depth + 1) * 10,
                y: (depth + 1) * 16,
                scale: 1 - (depth + 1) * 0.028,
                duration: 0.72,
                ease: 'power2.out',
              },
              position,
            );
          }

          timeline.to(
            card,
            {
              x: 0,
              yPercent: 0,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              onStart: () => gsap.set(card, { zIndex: incomingIndex + 1 }),
            },
            position,
          );
        });

        timeline.to({}, { duration: 0.32 });
        return () => timeline.kill();
      });
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="signature-stack" aria-labelledby="signature-stack-heading">
      <div className="signature-stack__shell">
        <header className="signature-stack__intro">
          <p>06 / Signature dishes</p>
          <div className="signature-stack__headline-group">
            <h2 id="signature-stack-heading">
              <span>From our <em>fire</em></span>
              <span>to your table.</span>
            </h2>
            <RangoliPattern className="signature-stack__motif" size="68" color="currentColor" strokeWidth={1.2} />
          </div>
          <p className="signature-stack__summary">Seven plates worth returning for.</p>
          <NavLink to="/menu/" className="signature-stack__menu-link">
            Explore the menu
          </NavLink>
        </header>

        <div className="signature-stack__stage" aria-label="Amani's signature dishes">
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
                />
              </div>
              <div className="signature-stack-card__copy">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p>{dish.note}</p>
                  <h3>{dish.name}</h3>
                </div>
                <NavLink to="/menu/" aria-label={`View ${dish.name} on the menu`}>
                  <svg aria-hidden="true" viewBox="0 0 18 18" fill="none">
                    <path d="M5 13 13 5M7 5h6v6" />
                  </svg>
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
