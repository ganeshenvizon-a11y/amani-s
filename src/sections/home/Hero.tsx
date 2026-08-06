/**
 * Section 01 — Hero
 * A tactile editorial collage that introduces Amani before the image story begins.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { HERO_CONTENT } from '../../content/home';
import { gsap } from '../../lib/gsap';
import { RangoliPattern } from '../../components/motion/RangoliPattern';

const HERO_CARDS = [
  ...HERO_CONTENT.slides,
  {
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=85&w=1200&auto=format&fit=crop',
    alt: 'Traditional South Indian filter coffee',
  },
  {
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=85&w=1200&auto=format&fit=crop',
    alt: 'South Indian tiffin served for the table',
  },
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
  mode: 'waiting' | 'falling' | 'resting' | 'dragging' | 'throwing';
  launchAt: number;
  lastPointerX: number;
  lastPointerY: number;
  lastPointerTime: number;
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const cardMotion = useRef<CardMotion[]>([]);
  const activeCard = useRef<CardMotion | null>(null);
  const cardRotations = useRef<number[]>([]);
  const cardScales = useRef<number[]>([]);
  const [draggedCard, setDraggedCard] = useState<number | null>(null);
  const headlineLines = HERO_CONTENT.headline.split('\n');

  if (cardRotations.current.length === 0) {
    cardRotations.current = CARD_ROTATION_RANGES.map(([min, max]) => min + Math.random() * (max - min));
    cardScales.current = HERO_CARDS.map(() => 0.95 + Math.random() * 0.13);
  }

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

      cardMotion.current.forEach((card) => {
        if (card.mode === 'waiting' && time >= card.launchAt) {
          card.mode = 'falling';
          card.velocityY = 0;
          card.angularVelocity = (card.rotation > 0 ? -1 : 1) * 38;
          card.element.style.visibility = 'visible';
          card.element.style.opacity = '1';
        }

        if (card.mode === 'falling') {
          // Gravity and a damped floor collision produce the landing rather than a preset bounce ease.
          card.velocityY += 5100 * dt;
          card.y += card.velocityY * dt;
          card.rotation += card.angularVelocity * dt;

          if (card.y >= 0) {
            card.y = 0;
            card.velocityY *= -0.28;
            card.angularVelocity *= -0.36;
            if (Math.abs(card.velocityY) < 82) {
              card.velocityY = 0;
              card.angularVelocity = 0;
              card.rotation = cardRotations.current[cards.indexOf(card.element)] ?? 0;
              card.mode = 'resting';
              card.element.style.willChange = 'auto';
            }
          }
          render(card);
        }

        if (card.mode === 'throwing') {
          card.x += card.velocityX * dt;
          card.y += card.velocityY * dt;
          card.rotation += card.angularVelocity * dt;
          card.velocityX *= Math.pow(0.018, dt);
          card.velocityY *= Math.pow(0.018, dt);
          card.angularVelocity *= Math.pow(0.035, dt);

          if (card.x < card.bounds.minX || card.x > card.bounds.maxX) {
            card.x = clamp(card.x, card.bounds.minX, card.bounds.maxX);
            card.velocityX *= -0.32;
          }
          if (card.y < card.bounds.minY || card.y > card.bounds.maxY) {
            card.y = clamp(card.y, card.bounds.minY, card.bounds.maxY);
            card.velocityY *= -0.32;
          }

          if (Math.hypot(card.velocityX, card.velocityY) < 18 && Math.abs(card.angularVelocity) < 5) {
            card.rotation = clamp(card.rotation, -16, 16);
            card.mode = 'resting';
            card.element.style.willChange = 'auto';
            render(card);
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
      <div className="home-hero__rangoli home-hero__rangoli--left" aria-hidden="true">
        <RangoliPattern size="100%" color="var(--amani-maroon)" strokeWidth={0.8} />
      </div>
      <div className="home-hero__rangoli home-hero__rangoli--right" aria-hidden="true">
        <RangoliPattern size="100%" color="var(--amani-maroon)" strokeWidth={0.8} />
      </div>
      <div className="home-hero__content">
        <p className="home-hero__kicker">A table shaped by warmth and memory</p>
        <h1 className="home-hero__title" data-split="true">
          {headlineLines.map((line, index) => (
            <span key={index} className="home-hero__title-line">
              <span className="home-hero__title-line-inner">{line}</span>
            </span>
          ))}
        </h1>
      </div>

      <div className="home-hero__card-deck" aria-label="Draggable Amani visual introduction">
        {HERO_CARDS.map((card, index) => (
          <button
            type="button"
            key={card.image}
            style={{ '--hero-card-scale': String(cardScales.current[index] ?? 1) } as HeroCardStyle}
            ref={(element) => { cardRefs.current[index] = element; }}
            className={`home-hero__card ${draggedCard === index ? 'is-grabbing' : ''}`}
            onPointerDown={(event) => startDrag(index, event)}
            aria-label={`Drag card: ${card.alt}`}
          >
            <img src={card.image} alt="" loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />
            <span className="home-hero__card-caption">{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
