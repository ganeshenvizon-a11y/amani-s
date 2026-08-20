/**
 * Gatherings preview — Minimal modern 2-card layout.
 */
import { NavLink } from 'react-router-dom';
import { GATHERINGS_PREVIEW_CONTENT } from '../../content/home';
import { Reveal } from '../../components/motion/Reveal';
import { RangoliPattern } from '../../components/motion/RangoliPattern';

export function GatheringsPreview() {
  return (
    <section className="gatherings-section" aria-labelledby="gatherings-heading">
      {/* Background Pattern Texture Overlay */}
      <div className="gatherings-section__bg-pattern" aria-hidden="true">
        <img
          src="/media/images/hero-pattern.png"
          alt=""
          className="gatherings-section__bg-pattern-img"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Rangoli Watermark Motifs */}
      <div className="gatherings-section__motif gatherings-section__motif--left" aria-hidden="true">
        <RangoliPattern size={420} color="var(--amani-gold, #c8a762)" strokeWidth={0.8} />
      </div>
      <div className="gatherings-section__motif gatherings-section__motif--right" aria-hidden="true">
        <RangoliPattern size={420} color="var(--amani-gold, #c8a762)" strokeWidth={0.8} />
      </div>

      <div className="gatherings-container">
        {/* TOP: HEADING AND CONTENT */}
        <Reveal direction="up" className="w-full">
          <div className="gatherings-top-content">
            <h2 id="gatherings-heading" className="gatherings-title">
              {GATHERINGS_PREVIEW_CONTENT.heading}
            </h2>
          </div>
        </Reveal>

        {/* BOTTOM: TWO MINIMAL IMAGE-BACKED CARDS */}
        <div className="gatherings-duo">
          {GATHERINGS_PREVIEW_CONTENT.choices.map((choice, index) => (
            <Reveal key={choice.id} direction="up" delay={index * 0.12} className="gath-duo-card-wrapper">
              <NavLink
                to={choice.ctaLink}
                className="gath-duo-card"
                aria-label={`${choice.ctaText}: ${choice.title}`}
              >
                <div className="gath-duo-card__media">
                  <img
                    src={choice.image}
                    alt={choice.imageAlt || ''}
                    className="gath-duo-card__image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="gath-duo-card__content">
                  <div className="gath-duo-card__header">
                    <span className="gath-duo-card__tag">
                      {choice.id === 'catering' ? 'Catering' : 'Gatherings'}
                    </span>
                    <h3 className="gath-duo-card__title">{choice.title}</h3>
                    <p className="gath-duo-card__desc">{choice.description}</p>
                  </div>

                  <div className="gath-duo-card__cta-btn">
                    <span>{choice.ctaText}</span>
                    <svg aria-hidden="true" viewBox="0 0 18 18" fill="none" className="gath-duo-card__cta-arrow">
                      <path
                        d="M3.75 9h10.5M9.75 4.5l4.5 4.5-4.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </NavLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

