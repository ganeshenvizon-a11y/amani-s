/**
 * Section 08 — Visit Preview
 * Practical location details, live hours, telephone, and Get Directions CTA.
 */

import { NavLink } from 'react-router-dom';
import { VISIT_PREVIEW_CONTENT } from '../../content/home';
import { RESTAURANT_CONFIG, getRestaurantStatus } from '../../config/restaurant';
import { Reveal } from '../../components/motion/Reveal';

export function VisitPreview() {
  const status = getRestaurantStatus();

  return (
    <section
      className="section-padding bg-[var(--amani-canvas)] text-[var(--amani-ink)] border-b border-[var(--amani-hairline)]"
      aria-label="Visit Amani"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Arrival Exterior Image */}
          <div className="lg:col-span-7 aspect-[4/3] rounded-[var(--amani-radius-md)] overflow-hidden border border-[var(--amani-hairline)] shadow-sm">
            <img
              src={VISIT_PREVIEW_CONTENT.image}
              alt="Amani restaurant exterior entry framed with warm light and greenery"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Right Column: Practical Details & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <span className="text-eyebrow mb-3 block">{VISIT_PREVIEW_CONTENT.label}</span>
              <h2 className="text-h1 mb-4 font-serif">{VISIT_PREVIEW_CONTENT.heading}</h2>
              <p className="text-body-lg mb-6">{VISIT_PREVIEW_CONTENT.description}</p>
            </Reveal>

            {/* Live Status Badge */}
            <div className="p-4 bg-[var(--amani-paper)] rounded-[var(--amani-radius-sm)] border border-[var(--amani-hairline)] space-y-2 font-sans">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                  aria-hidden="true"
                />
                <span className="font-semibold text-sm">{status.statusLabel}</span>
              </div>
              <p className="text-xs text-[var(--amani-ink-soft)] font-mono">
                {status.nextOpeningLabel}
              </p>
            </div>

            {/* Address & Contact Info */}
            <div className="space-y-3 font-sans text-sm border-t border-[var(--amani-hairline)] pt-4">
              <p>
                <strong className="block text-xs uppercase tracking-wider text-[var(--amani-ink-muted)] mb-1">
                  Address
                </strong>
                {RESTAURANT_CONFIG.address.formatted}
              </p>
              <p>
                <strong className="block text-xs uppercase tracking-wider text-[var(--amani-ink-muted)] mb-1">
                  Telephone
                </strong>
                <a href={`tel:${RESTAURANT_CONFIG.contact.phoneRaw}`} className="underline hover:text-[var(--amani-maroon)]">
                  {RESTAURANT_CONFIG.contact.phone}
                </a>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={RESTAURANT_CONFIG.contact.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[var(--amani-maroon)] text-[var(--amani-canvas)] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest rounded-[var(--amani-radius-sm)] hover:bg-[var(--amani-maroon-dark)] transition-colors focus:ring-2 focus:ring-[var(--amani-maroon)]"
              >
                {VISIT_PREVIEW_CONTENT.primaryCta} ↗
              </a>
              <NavLink
                to={VISIT_PREVIEW_CONTENT.secondaryCtaLink}
                className="inline-flex items-center justify-center border border-[var(--amani-hairline)] text-[var(--amani-ink)] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest rounded-[var(--amani-radius-sm)] hover:bg-[var(--amani-paper)] transition-colors focus:ring-2 focus:ring-[var(--amani-maroon)]"
              >
                {VISIT_PREVIEW_CONTENT.secondaryCta}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
