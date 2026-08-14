/**
 * Gatherings preview — Minimal modern 2-card layout.
 */
import { NavLink } from 'react-router-dom';
import { GATHERINGS_PREVIEW_CONTENT } from '../../content/home';
import { Reveal } from '../../components/motion/Reveal';

export function GatheringsPreview() {
  return (
    <section className="gatherings-section" aria-labelledby="gatherings-heading">
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
                  <span className="gath-duo-card__tag">
                    {choice.id === 'catering' ? 'Catering' : 'Gatherings'}
                  </span>

                  <div className="gath-duo-card__title-row">
                    <h3 className="gath-duo-card__title">{choice.title}</h3>
                    <span className="gath-duo-card__circle-btn">
                      <svg aria-hidden="true" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M5 13 13 5M7 5h6v6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <p className="gath-duo-card__desc">{choice.description}</p>
                </div>
              </NavLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

