/**
 * Gatherings preview — Heading and content on top, reference cards grid at bottom.
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
            <p className="gatherings-body-text">
              {GATHERINGS_PREVIEW_CONTENT.body}
            </p>
          </div>
        </Reveal>

        {/* BOTTOM: THE CARDS GRID */}
        <div className="gatherings-cards-grid">
          {GATHERINGS_PREVIEW_CONTENT.choices.map((choice, index) => (
            <Reveal key={choice.id} direction="up" delay={index * 0.12}>
              <NavLink
                to={choice.ctaLink}
                className="gath-ref-card"
                aria-label={`${choice.title} — ${choice.description}`}
              >
                <div className="gath-ref-card__media">
                  <img
                    src={choice.image}
                    alt={choice.imageAlt}
                    className="gath-ref-card__image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="gath-ref-card__overlay" />
                </div>

                <div className="gath-ref-card__content">
                  <span className="gath-ref-card__number">{choice.number}</span>
                  <h3 className="gath-ref-card__title">{choice.title}</h3>
                  <p className="gath-ref-card__desc">{choice.description}</p>

                  <div className="gath-ref-card__footer">
                    <div className="gath-ref-card__tags">
                      {choice.tags.map((tag) => (
                        <span key={tag} className="gath-ref-card__tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="gath-ref-card__arrow" aria-hidden="true">
                      ↗
                    </div>
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

