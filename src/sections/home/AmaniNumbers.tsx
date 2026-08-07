/**
 * Amani by the numbers — "Three Numbers / One Table" editorial section.
 * Recreates the 3-column stepped drop-down layout adapted specifically for Amani's heritage brand language.
 */
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from '../../lib/gsap';

interface PanelData {
  number: string;
  marker: string;
  mainPhrase: string[];
  microCopy?: string;
  metadataLeft: string;
  metadataRight?: string;
  tone: 'green' | 'terracotta' | 'turmeric';
  cardHeightPct: number;
}

const PANELS_DATA: PanelData[] = [
  {
    number: '07',
    marker: 'DISHES /',
    mainPhrase: ['SEVEN PLATES', 'WORTH RETURNING'],
    microCopy: 'From our fire to your table.',
    metadataLeft: "AMANI'S SIGNATURES",
    metadataRight: '',
    tone: 'green',
    cardHeightPct: 52,
  },
  {
    number: '03',
    marker: 'CHOICES /',
    mainPhrase: ['VEGETARIAN', 'NON-VEG', 'JAIN'],
    microCopy: 'Three ways. One shared table.',
    metadataLeft: 'MADE FOR EVERY TABLE',
    metadataRight: '',
    tone: 'terracotta',
    cardHeightPct: 69,
  },
  {
    number: '01',
    marker: 'TOGETHER /',
    mainPhrase: ['ONE TABLE.', 'YOUR WAY.'],
    microCopy: 'Food, memory and warmth — shared.',
    metadataLeft: 'THE AMANI WAY',
    metadataRight: '',
    tone: 'turmeric',
    cardHeightPct: 84,
  },
];

export function AmaniNumbers() {
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
    <section ref={sectionRef} className="amani-numbers" aria-label="Amani by the numbers">
      <div className="amani-numbers__grid">
        {/* Panel 01 - 07 Signature Plates */}
        <div className="amani-numbers__col">
          <article
            ref={(el) => {
              if (el) cardRefs.current[0] = el;
            }}
            className={`amani-numbers-card amani-numbers-card--${PANELS_DATA[0].tone}`}
            style={{ height: `${PANELS_DATA[0].cardHeightPct}%` }}
          >
            <div className="amani-numbers-card__top">
              <span className="amani-numbers-card__number">{PANELS_DATA[0].number}</span>
              <span className="amani-numbers-card__marker">{PANELS_DATA[0].marker}</span>
            </div>

            <div className="amani-numbers-card__body">
              <div className="amani-numbers-card__phrase">
                {PANELS_DATA[0].mainPhrase.map((line, idx) => (
                  <span key={idx}>{line}</span>
                ))}
              </div>
              {PANELS_DATA[0].microCopy && (
                <p className="amani-numbers-card__micro">{PANELS_DATA[0].microCopy}</p>
              )}
            </div>

            <div className="amani-numbers-card__meta">
              <span>{PANELS_DATA[0].metadataLeft}</span>
              {PANELS_DATA[0].metadataRight && <span>{PANELS_DATA[0].metadataRight}</span>}
            </div>
          </article>

          <div className="amani-numbers__col-bottom">
            <h2 className="amani-numbers__editorial-title">
              <span>Food.</span>
              <span>Memory.</span>
              <span>Home.</span>
            </h2>
          </div>
        </div>

        {/* Panel 02 - 03 Ways to the table */}
        <div className="amani-numbers__col">
          <article
            ref={(el) => {
              if (el) cardRefs.current[1] = el;
            }}
            className={`amani-numbers-card amani-numbers-card--${PANELS_DATA[1].tone}`}
            style={{ height: `${PANELS_DATA[1].cardHeightPct}%` }}
          >
            <div className="amani-numbers-card__top">
              <span className="amani-numbers-card__number">{PANELS_DATA[1].number}</span>
              <span className="amani-numbers-card__marker">{PANELS_DATA[1].marker}</span>
            </div>

            <div className="amani-numbers-card__body">
              <div className="amani-numbers-card__phrase">
                {PANELS_DATA[1].mainPhrase.map((line, idx) => (
                  <span key={idx}>{line}</span>
                ))}
              </div>
              {PANELS_DATA[1].microCopy && (
                <p className="amani-numbers-card__micro">{PANELS_DATA[1].microCopy}</p>
              )}
            </div>

            <div className="amani-numbers-card__meta">
              <span>{PANELS_DATA[1].metadataLeft}</span>
              {PANELS_DATA[1].metadataRight && <span>{PANELS_DATA[1].metadataRight}</span>}
            </div>
          </article>

          <div className="amani-numbers__col-bottom">
            <div className="amani-numbers__editorial-support">
              <p className="amani-numbers__support-text">
                Seven signatures.<br />
                Three ways to eat.<br />
                One table that brings it together.
              </p>
              <NavLink to="/menu/" className="amani-numbers__cta">
                <span>EXPLORE THE MENU</span>
                <span className="amani-numbers__cta-line" aria-hidden="true" />
              </NavLink>
            </div>
          </div>
        </div>

        {/* Panel 03 - 01 Shared Table */}
        <div className="amani-numbers__col">
          <article
            ref={(el) => {
              if (el) cardRefs.current[2] = el;
            }}
            className={`amani-numbers-card amani-numbers-card--${PANELS_DATA[2].tone}`}
            style={{ height: `${PANELS_DATA[2].cardHeightPct}%` }}
          >
            <div className="amani-numbers-card__top">
              <span className="amani-numbers-card__number">{PANELS_DATA[2].number}</span>
              <span className="amani-numbers-card__marker">{PANELS_DATA[2].marker}</span>
            </div>

            <div className="amani-numbers-card__body">
              <div className="amani-numbers-card__phrase">
                {PANELS_DATA[2].mainPhrase.map((line, idx) => (
                  <span key={idx}>{line}</span>
                ))}
              </div>
              {PANELS_DATA[2].microCopy && (
                <p className="amani-numbers-card__micro">{PANELS_DATA[2].microCopy}</p>
              )}
            </div>

            <div className="amani-numbers-card__meta">
              <span>{PANELS_DATA[2].metadataLeft}</span>
              {PANELS_DATA[2].metadataRight && <span>{PANELS_DATA[2].metadataRight}</span>}
            </div>
          </article>

          <div className="amani-numbers__col-bottom" />
        </div>
      </div>
    </section>
  );
}


