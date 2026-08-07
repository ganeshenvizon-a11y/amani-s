/**
 * Section 01 — Hero
 * A tactile editorial collage that introduces Amani before the image story begins.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { HERO_CONTENT } from '../../content/home';
import { gsap } from '../../lib/gsap';

const HERO_CARDS = [
  {
    image: '/media/images/dish-andhra-chicken-curry.jpg',
    alt: 'Andhra Chicken Curry served in a brass kadai',
  },
  {
    image: '/media/images/dish-chepala-pulusu.jpg',
    alt: 'Chepala Pulusu — traditional Andhra fish curry',
  },
  {
    image: '/media/images/grandma-cooking-stone-1.png',
    alt: 'Grandmother cooking on a traditional stone in an Andhra kitchen',
  },
  {
    image: '/media/images/dish-chicken-majestic.jpg',
    alt: 'Chicken Majestic — crispy Andhra-style fried chicken',
  },
  {
    image: '/media/images/dish-naatu-kodi-pulusu.jpg',
    alt: 'Naatu Kodi Pulusu — country chicken curry',
  },
  {
    image: '/media/images/grandma-cooking-stone-2.png',
    alt: 'Grandmother grinding spices on a traditional silbatta stone',
  },
  HERO_CONTENT.slides[4],
];

const CARD_ROTATION_RANGES = [
  [-14, -9],
  [-8, -3],
  [6, 11],
  [-3, 4],
  [-11, -6],
  [7, 12],
  [10, 16],
] as const;

const HERO_CARD_META = [
  { stamp: 'ANDHRA 1974', tag: 'ANDHRA CHICKEN CURRY' },
  { stamp: 'COASTAL CATCH', tag: 'CHEPALA PULUSU' },
  { stamp: 'AMMAMMA VANTA', tag: 'HOMELY COOKING' },
  { stamp: 'RECIPE NO. 03', tag: 'CHICKEN MAJESTIC' },
  { stamp: 'NAATU KODI', tag: 'NAATU KODI PULUSU' },
  { stamp: 'ROLU ROKALI', tag: 'STONE GROUND SPICES' },
  { stamp: 'SHARED TABLE', tag: 'FAMILY MEMORY' },
];

type HeroCardStyle = CSSProperties & {
  '--hero-card-scale': string;
};

type CardMotion = {
  element: HTMLButtonElement;
  x: number;
  y: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  angularVelocity: number;
  mode: 'waiting' | 'falling' | 'settling' | 'resting' | 'dragging' | 'throwing';
  launchAt: number;
  lastPointerX: number;
  lastPointerY: number;
  lastPointerTime: number;
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
};

const DYNAMIC_WORDS = ['HOME', 'LOVE', 'CARE'] as const;
const WORD_DELAYS = [3200, 2600, 2600] as const;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const cardMotion = useRef<CardMotion[]>([]);
  const activeCard = useRef<CardMotion | null>(null);
  const cardRotations = useRef<number[]>([]);
  const cardScales = useRef<number[]>([]);
  const [draggedCard, setDraggedCard] = useState<number | null>(null);

  // Dynamic word animation state for HOME -> LOVE -> CARE -> HOME
  const [wordIndex, setWordIndex] = useState(0);
  const [wordState, setWordState] = useState<'idle' | 'leaving' | 'entering'>('idle');

  if (cardRotations.current.length === 0) {
    cardRotations.current = CARD_ROTATION_RANGES.map(([min, max]) => min + Math.random() * (max - min));
    cardScales.current = HERO_CARDS.map(() => 0.95 + Math.random() * 0.13);
  }

  // Handle slow, editorial semantic word cycle on second headline line
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let timerId: ReturnType<typeof setTimeout>;
    let transitionTimerId: ReturnType<typeof setTimeout>;

    const scheduleNext = (currentIndex: number) => {
      const delay = WORD_DELAYS[currentIndex] ?? 3200;
      timerId = setTimeout(() => {
        setWordState('leaving');

        transitionTimerId = setTimeout(() => {
          const nextIndex = (currentIndex + 1) % DYNAMIC_WORDS.length;
          setWordIndex(nextIndex);
          setWordState('entering');

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setWordState('idle');
              scheduleNext(nextIndex);
            });
          });
        }, 320);
      }, delay);
    };

    scheduleNext(0);

    return () => {
      clearTimeout(timerId);
      clearTimeout(transitionTimerId);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLButtonElement => card !== null);
    if (!hero || cards.length === 0) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const render = (card: CardMotion) => {
      card.element.style.transform = `translate3d(${card.x}px, ${card.y}px, 0) rotate(${card.rotation}deg)`;
    };
    const now = performance.now();

    cardMotion.current = cards.map((element, index) => {
      const rotation = cardRotations.current[index] ?? 0;
      const card: CardMotion = {
        element,
        x: 0,
        y: reducedMotion ? 0 : -(window.innerHeight + element.offsetHeight + index * 64),
        rotation,
        velocityX: 0,
        velocityY: 0,
        angularVelocity: 0,
        mode: reducedMotion ? 'resting' : 'waiting',
        launchAt: now + 420 + index * 115,
        lastPointerX: 0,
        lastPointerY: 0,
        lastPointerTime: now,
        bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 },
      };

      element.style.opacity = reducedMotion ? '1' : '0';
      element.style.visibility = reducedMotion ? 'visible' : 'hidden';
      render(card);
      return card;
    });

    const ctx = gsap.context(() => {
      if (reducedMotion) return;
      gsap.fromTo(
        '.home-hero__title-line-inner',
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.12, delay: 0.15, ease: 'power4.out' },
      );
    }, hero);

    let frameId = 0;
    let previousTime = now;
    const animate = (time: number) => {
      const dt = Math.min((time - previousTime) / 1000, 0.032);
      previousTime = time;

      cardMotion.current.forEach((card, index) => {
        const targetRotation = cardRotations.current[index] ?? 0;

        if (card.mode === 'waiting' && time >= card.launchAt) {
          card.mode = 'falling';
          card.velocityY = 0;
          card.angularVelocity = (targetRotation > 0 ? -1 : 1) * 20;
          card.element.style.visibility = 'visible';
          card.element.style.opacity = '1';
        }

        if (card.mode === 'falling') {
          // Organic, soft gravity drop
          card.velocityY += 3600 * dt;
          card.y += card.velocityY * dt;
          card.rotation += card.angularVelocity * dt;

          // Gently orient rotation toward target angle as card approaches the floor
          const alignFactor = 1 - Math.exp(-6 * dt);
          card.rotation += (targetRotation - card.rotation) * alignFactor * 0.45;

          if (card.y >= 0) {
            card.y = 0;
            card.velocityY *= -0.22;
            card.angularVelocity *= -0.25;

            if (Math.abs(card.velocityY) < 140) {
              card.mode = 'settling';
            }
          }
          render(card);
        }

        if (card.mode === 'settling') {
          // Critically damped exponential spring easing — ZERO snapping!
          const springFactor = 1 - Math.exp(-14 * dt);
          card.y += (0 - card.y) * springFactor;
          card.x += (0 - card.x) * springFactor;
          card.rotation += (targetRotation - card.rotation) * springFactor;
          card.velocityY *= Math.exp(-12 * dt);
          card.angularVelocity *= Math.exp(-12 * dt);

          if (
            Math.abs(card.y) < 0.15 &&
            Math.abs(card.x) < 0.15 &&
            Math.abs(card.rotation - targetRotation) < 0.08
          ) {
            card.y = 0;
            card.x = 0;
            card.rotation = targetRotation;
            card.mode = 'resting';
            card.element.style.willChange = 'auto';
          }
          render(card);
        }

        if (card.mode === 'throwing') {
          card.x += card.velocityX * dt;
          card.y += card.velocityY * dt;
          card.rotation += card.angularVelocity * dt;
          card.velocityX *= Math.pow(0.02, dt);
          card.velocityY *= Math.pow(0.02, dt);
          card.angularVelocity *= Math.pow(0.04, dt);

          if (card.x < card.bounds.minX || card.x > card.bounds.maxX) {
            card.x = clamp(card.x, card.bounds.minX, card.bounds.maxX);
            card.velocityX *= -0.28;
          }
          if (card.y < card.bounds.minY || card.y > card.bounds.maxY) {
            card.y = clamp(card.y, card.bounds.minY, card.bounds.maxY);
            card.velocityY *= -0.28;
          }

          if (Math.hypot(card.velocityX, card.velocityY) < 22 && Math.abs(card.angularVelocity) < 6) {
            const clampedTargetRot = clamp(card.rotation, -16, 16);
            const throwEase = 1 - Math.exp(-14 * dt);
            card.rotation += (clampedTargetRot - card.rotation) * throwEase;
            card.velocityX *= 0.8;
            card.velocityY *= 0.8;

            if (Math.abs(card.rotation - clampedTargetRot) < 0.1) {
              card.rotation = clampedTargetRot;
              card.mode = 'resting';
              card.element.style.willChange = 'auto';
            }
          }
          render(card);
        }
      });

      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const onPointerMove = (event: PointerEvent) => {
      const card = activeCard.current;
      if (!card || card.mode !== 'dragging') return;

      const elapsed = Math.max((event.timeStamp - card.lastPointerTime) / 1000, 0.016);
      const deltaX = event.clientX - card.lastPointerX;
      const deltaY = event.clientY - card.lastPointerY;
      card.x = clamp(card.x + deltaX, card.bounds.minX, card.bounds.maxX);
      card.y = clamp(card.y + deltaY, card.bounds.minY, card.bounds.maxY);
      card.velocityX = deltaX / elapsed;
      card.velocityY = deltaY / elapsed;
      card.rotation = clamp(card.rotation + deltaX * 0.025, -18, 18);
      card.angularVelocity = (deltaX * 0.025) / elapsed;
      card.lastPointerX = event.clientX;
      card.lastPointerY = event.clientY;
      card.lastPointerTime = event.timeStamp;
      render(card);
    };

    const releaseCard = () => {
      const card = activeCard.current;
      if (!card) return;
      card.element.releasePointerCapture?.(card.element.dataset.pointerId ? Number(card.element.dataset.pointerId) : -1);
      delete card.element.dataset.pointerId;
      card.mode = reducedMotion ? 'resting' : 'throwing';
      activeCard.current = null;
      setDraggedCard(null);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', releaseCard);
    window.addEventListener('pointercancel', releaseCard);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', releaseCard);
      window.removeEventListener('pointercancel', releaseCard);
      ctx.revert();
    };
  }, []);

  const startDrag = (index: number, event: React.PointerEvent<HTMLButtonElement>) => {
    const card = cardMotion.current[index];
    const hero = heroRef.current;
    if (!card || !hero || event.button !== 0) return;

    event.preventDefault();
    const heroBounds = hero.getBoundingClientRect();
    const cardBounds = card.element.getBoundingClientRect();
    card.bounds = {
      minX: card.x + heroBounds.left - cardBounds.left + 8,
      maxX: card.x + heroBounds.right - cardBounds.right - 8,
      minY: card.y + heroBounds.top - cardBounds.top + 8,
      maxY: card.y + heroBounds.bottom - cardBounds.bottom - 8,
    };
    card.mode = 'dragging';
    card.velocityX = 0;
    card.velocityY = 0;
    card.angularVelocity = 0;
    card.lastPointerX = event.clientX;
    card.lastPointerY = event.clientY;
    card.lastPointerTime = event.timeStamp;
    card.element.dataset.pointerId = String(event.pointerId);
    card.element.setPointerCapture(event.pointerId);
    card.element.style.willChange = 'transform';
    activeCard.current = card;
    setDraggedCard(index);
  };

  return (
    <section ref={heroRef} className="home-hero home-hero--editorial" aria-label="Welcome to Amani">
      <div className="home-hero__bg-pattern" aria-hidden="true">
        <img
          src="/media/images/hero-pattern.png"
          alt=""
          className="home-hero__bg-pattern-img"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="home-hero__content">
        <p className="home-hero__kicker">A table shaped by warmth and memory</p>
        <h1 className="home-hero__title" data-split="true">
          <span className="home-hero__title-line">
            <span className="home-hero__title-line-inner">
              FLAVOUR FROM <span className="home-hero__word home-hero__word--fire">FIRE</span>.
            </span>
          </span>
          <span className="home-hero__title-line">
            <span className="home-hero__title-line-inner">
              MEMORY FROM{' '}
              <span className="home-hero__dynamic-wrap">
                <span className={`home-hero__word home-hero__word--dynamic is-${wordState}`}>
                  {DYNAMIC_WORDS[wordIndex]}
                </span>
                <span className="home-hero__period">.</span>
              </span>
            </span>
          </span>
        </h1>
      </div>

      <div className="home-hero__card-deck" aria-label="Draggable Amani visual introduction">
        {HERO_CARDS.map((card, index) => {
          const meta = HERO_CARD_META[index] || { stamp: 'AMANI 1974', tag: 'TIFFIN' };
          const tearVariant = (index % 4) + 1;
          return (
            <button
              type="button"
              key={card.image}
              style={{ '--hero-card-scale': String(cardScales.current[index] ?? 1) } as HeroCardStyle}
              ref={(element) => { cardRefs.current[index] = element; }}
              className={`home-hero__card home-hero__card--retro home-hero__card--tear-${tearVariant} ${draggedCard === index ? 'is-grabbing' : ''}`}
              onPointerDown={(event) => startDrag(index, event)}
              aria-label={`Drag card: ${card.alt}`}
            >
              {/* Translucent Frosted Scotch Tape Strip */}
              <span className="home-hero__card-tape" aria-hidden="true" />
              
              {/* Paper Crease Line */}
              <span className="home-hero__card-crease" aria-hidden="true" />

              {/* Vintage Ink Stamp */}
              <span className="home-hero__card-stamp" aria-hidden="true">
                {meta.stamp}
              </span>

              {/* Photo Frame & Vintage Vignette */}
              <div className="home-hero__card-media">
                <img src={card.image} alt="" loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />
                <div className="home-hero__card-vignette" aria-hidden="true" />
              </div>

              {/* Retro Footer Tag & Number */}
              <div className="home-hero__card-footer">
                <span className="home-hero__card-tag">{meta.tag}</span>
                <span className="home-hero__card-caption">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
