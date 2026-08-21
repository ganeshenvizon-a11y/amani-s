/**
 * Gatherings preview — Redesigned with amani-numbers__grid layout and editorial cards.
 */
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from '../../lib/gsap';

interface PanelData {
  id: string;
  number: string;
  marker: string;
  mainPhrase: string[];
  description: string;
  ctaText: string;
  ctaLink: string;
  tone: 'green' | 'terracotta' | 'turmeric';
  cardHeightPct: number;
}

const GATHERINGS_PANELS: PanelData[] = [
  {
    id: 'dine',
    number: '01',
    marker: '/ DINE',
    mainPhrase: ['COME HOME', 'TO THE TABLE'],
    description: 'Familiar South Indian flavours, generous meals and thoughtful hospitality in the heart of Jubilee Hills.',
    ctaText: 'BOOK A TABLE →',
    ctaLink: '/visit/#reserve',
    tone: 'green',
    cardHeightPct: 56,
  },
  {
    id: 'celebrate',
    number: '02',
    marker: '/ CELEBRATE',
    mainPhrase: ['BRING YOUR OCCASION', 'TO AMANI’S'],
    description: 'Birthdays, anniversaries, family milestones and intimate gatherings, hosted with warmth at our table.',
    ctaText: 'PLAN A GATHERING →',
    ctaLink: '/gatherings/',
    tone: 'terracotta',
    cardHeightPct: 72,
  },
  {
    id: 'cater',
    number: '03',
    marker: '/ CATER',
    mainPhrase: ['OUR WARMTH,', 'YOUR OCCASION'],
    description: 'Authentic South Indian menus and thoughtful service for weddings, ceremonies, corporate events and celebrations across Hyderabad.',
    ctaText: 'REQUEST A QUOTE →',
    ctaLink: '/catering/',
    tone: 'turmeric',
    cardHeightPct: 88,
  },
];

export function GatheringsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (
      !section ||
      cards.length === 0 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          yPercent: -120,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="amani-numbers gatherings-section"
      aria-label="Gatherings, Dining & Catering at Amani's"
    >
      <div className="amani-numbers__grid">
        {/* Panel 01 - DINE */}
        <div className="amani-numbers__col">
          <article
            ref={(el) => {
              if (el) cardRefs.current[0] = el;
            }}
            className={`amani-numbers-card amani-numbers-card--${GATHERINGS_PANELS[0].tone}`}
            style={{ height: `${GATHERINGS_PANELS[0].cardHeightPct}%` }}
          >
            <div className="amani-numbers-card__top">
              <span className="amani-numbers-card__number">{GATHERINGS_PANELS[0].number}</span>
              <span className="amani-numbers-card__marker">{GATHERINGS_PANELS[0].marker}</span>
            </div>

            <div className="amani-numbers-card__body">
              <div className="amani-numbers-card__phrase">
                {GATHERINGS_PANELS[0].mainPhrase.map((line, idx) => (
                  <span key={idx}>{line}</span>
                ))}
              </div>
              <p className="amani-numbers-card__micro gatherings-card__desc">
                {GATHERINGS_PANELS[0].description}
              </p>
            </div>

            <div className="amani-numbers-card__meta">
              <NavLink to={GATHERINGS_PANELS[0].ctaLink} className="amani-numbers__cta">
                <span>{GATHERINGS_PANELS[0].ctaText}</span>
              </NavLink>
            </div>
          </article>

          <div className="amani-numbers__col-bottom">
            <h2 className="amani-numbers__editorial-title">
              <span>Dine.</span>
              <span>Celebrate.</span>
              <span>Cater.</span>
            </h2>
          </div>
        </div>

        {/* Panel 02 - CELEBRATE */}
        <div className="amani-numbers__col">
          <article
            ref={(el) => {
              if (el) cardRefs.current[1] = el;
            }}
            className={`amani-numbers-card amani-numbers-card--${GATHERINGS_PANELS[1].tone}`}
            style={{ height: `${GATHERINGS_PANELS[1].cardHeightPct}%` }}
          >
            <div className="amani-numbers-card__top">
              <span className="amani-numbers-card__number">{GATHERINGS_PANELS[1].number}</span>
              <span className="amani-numbers-card__marker">{GATHERINGS_PANELS[1].marker}</span>
            </div>

            <div className="amani-numbers-card__body">
              <div className="amani-numbers-card__phrase">
                {GATHERINGS_PANELS[1].mainPhrase.map((line, idx) => (
                  <span key={idx}>{line}</span>
                ))}
              </div>
              <p className="amani-numbers-card__micro gatherings-card__desc">
                {GATHERINGS_PANELS[1].description}
              </p>
            </div>

            <div className="amani-numbers-card__meta">
              <NavLink to={GATHERINGS_PANELS[1].ctaLink} className="amani-numbers__cta">
                <span>{GATHERINGS_PANELS[1].ctaText}</span>
              </NavLink>
            </div>
          </article>

          <div className="amani-numbers__col-bottom">
            <div className="amani-numbers__editorial-support">
              <p className="amani-numbers__support-text">
                Familiar flavours at home or hosted with warmth at our table in Jubilee Hills.
              </p>
            </div>
          </div>
        </div>

        {/* Panel 03 - CATER */}
        <div className="amani-numbers__col">
          <article
            ref={(el) => {
              if (el) cardRefs.current[2] = el;
            }}
            className={`amani-numbers-card amani-numbers-card--${GATHERINGS_PANELS[2].tone}`}
            style={{ height: `${GATHERINGS_PANELS[2].cardHeightPct}%` }}
          >
            <div className="amani-numbers-card__top">
              <span className="amani-numbers-card__number">{GATHERINGS_PANELS[2].number}</span>
              <span className="amani-numbers-card__marker">{GATHERINGS_PANELS[2].marker}</span>
            </div>

            <div className="amani-numbers-card__body">
              <div className="amani-numbers-card__phrase">
                {GATHERINGS_PANELS[2].mainPhrase.map((line, idx) => (
                  <span key={idx}>{line}</span>
                ))}
              </div>
              <p className="amani-numbers-card__micro gatherings-card__desc">
                {GATHERINGS_PANELS[2].description}
              </p>
            </div>

            <div className="amani-numbers-card__meta">
              <NavLink to={GATHERINGS_PANELS[2].ctaLink} className="amani-numbers__cta">
                <span>{GATHERINGS_PANELS[2].ctaText}</span>
              </NavLink>
            </div>
          </article>

          <div className="amani-numbers__col-bottom" />
        </div>
      </div>
    </section>
  );
}


