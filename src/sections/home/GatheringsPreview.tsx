/**
 * Gatherings preview — Heading and content on top, two image-backed cards below.
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

        {/* BOTTOM: TWO IMAGE-BACKED CARDS */}
        <div className="gatherings-duo">
          {GATHERINGS_PREVIEW_CONTENT.choices.map((choice, index) => (
            <Reveal key={choice.id} direction="up" delay={index * 0.12} className="gath-duo-card">
              <div className="gath-duo-card__media" aria-hidden="true">
                <img
                  src={choice.image}
                  alt=""
                  className="gath-duo-card__image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="gath-duo-card__overlay" />
              </div>

              <div className="gath-duo-card__content">
                <h3 className="gath-duo-card__title">{choice.title}</h3>
                <NavLink to={choice.ctaLink} className="gath-duo-card__cta">
                  <span>{choice.ctaText}</span>
                  <span className="gath-duo-card__cta-line" aria-hidden="true" />
                </NavLink>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
