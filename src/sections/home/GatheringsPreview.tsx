/**
 * Section 09 — Gatherings Preview & Final Reservation Invitation
 * Introduces private dining and transitions naturally into the dark Footer with a final reservation CTA.
 */

import { NavLink } from 'react-router-dom';
import { GATHERINGS_PREVIEW_CONTENT } from '../../content/home';
import { Reveal } from '../../components/motion/Reveal';

export function GatheringsPreview() {
  const { finalInvitation } = GATHERINGS_PREVIEW_CONTENT;

  return (
    <section
      className="section-padding bg-[var(--amani-paper)] text-[var(--amani-ink)] border-b border-[var(--amani-hairline)]"
      aria-label="Gatherings & Celebrations Preview"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <span className="text-eyebrow mb-3 block">{GATHERINGS_PREVIEW_CONTENT.label}</span>
              <h2 className="text-h1 mb-4 font-serif">{GATHERINGS_PREVIEW_CONTENT.heading}</h2>
              <p className="text-body-lg mb-8">{GATHERINGS_PREVIEW_CONTENT.body}</p>
            </Reveal>

            {/* Occasions List */}
            <div className="space-y-4 pt-4 border-t border-[var(--amani-hairline)] font-sans">
              <span className="text-xs uppercase tracking-widest text-[var(--amani-ink-muted)] font-semibold block">
                Occasions We Host:
              </span>
              <ul className="space-y-3">
                {GATHERINGS_PREVIEW_CONTENT.occasions.map((occ, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={occ.path}
                      className="font-serif text-xl text-[var(--amani-ink)] hover:text-[var(--amani-maroon)] transition-colors flex items-center justify-between border-b border-[var(--amani-hairline)] pb-2"
                    >
                      <span>{occ.label}</span>
                      <span className="text-sm font-mono">→</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <NavLink
                to={GATHERINGS_PREVIEW_CONTENT.primaryCtaLink}
                className="inline-flex items-center justify-center bg-[var(--amani-maroon)] text-[var(--amani-canvas)] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest rounded-[var(--amani-radius-sm)] hover:bg-[var(--amani-maroon-dark)] transition-colors"
              >
                {GATHERINGS_PREVIEW_CONTENT.primaryCta}
              </NavLink>
            </div>
          </div>

          {/* Gathering Image */}
          <div className="lg:col-span-6 aspect-[4/3] rounded-[var(--amani-radius-md)] overflow-hidden border border-[var(--amani-hairline)] shadow-sm">
            <img
              src={GATHERINGS_PREVIEW_CONTENT.image}
              alt="Family and friends gathered around warm South Indian dinner table"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Final Integrated Reservation Invitation Card */}
        <div className="mt-20 p-10 md:p-16 bg-[var(--amani-dark-warm)] text-[var(--amani-cream-on-dark)] rounded-[var(--amani-radius-md)] text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden border border-[var(--amani-hairline-dark)]">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--amani-terracotta)] font-semibold font-mono block mb-2">
              RESERVATIONS
            </span>
            <h3 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
              {finalInvitation.heading}
            </h3>
            <p className="text-body-lg text-[var(--amani-cream-muted)] max-w-xl mx-auto mb-8 font-sans">
              {finalInvitation.description}
            </p>
            <NavLink
              to={finalInvitation.ctaLink}
              className="inline-flex items-center justify-center bg-[var(--amani-canvas)] text-[var(--amani-ink)] px-10 py-4 text-xs font-semibold uppercase tracking-widest rounded-[var(--amani-radius-sm)] hover:bg-[var(--amani-paper)] transition-colors focus:ring-2 focus:ring-[var(--amani-cream-on-dark)]"
            >
              {finalInvitation.ctaText}
            </NavLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
