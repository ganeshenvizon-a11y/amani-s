/**
 * Section 07 — Visit Preview (Full Map Background with Left-Aligned Floating Card)
 * Card docked cleanly to left container grid margin; hotel location pin prominently visible on right.
 */

import { VISIT_PREVIEW_CONTENT } from '../../content/home';
import { RESTAURANT_CONFIG, getRestaurantStatus } from '../../config/restaurant';
import { Reveal } from '../../components/motion/Reveal';

export function VisitPreview() {
  const status = getRestaurantStatus();

  const openStatusText = status.isOpen
    ? `OPEN NOW · UNTIL ${status.closingTimeToday || '11:00 PM'}`
    : `CLOSED NOW · ${status.nextOpeningLabel.toUpperCase()}`;

  // Floating thumbnail pins positioned in the open right-side map area
  const landmarkPins = [
    { top: '22%', left: '58%', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=300&auto=format&fit=crop', alt: 'Ghee Podi Idli' },
    { top: '24%', left: '84%', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=300&auto=format&fit=crop', alt: 'Crisp Dosa' },
    { top: '74%', left: '76%', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=300&auto=format&fit=crop', alt: 'Amani Dining Room' },
  ];

  return (
    <section className="visit-section-fullmap" aria-label="Visit Amani">
      {/* Full-Bleed Map Background (Center shifted so Jubilee Hills is on the right) */}
      <div className="visit-fullmap-bg">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=78.3820%2C17.4210%2C78.4260%2C17.4410&amp;layer=mapnik&amp;marker=17.4318%2C78.4072"
          className="visit-fullmap-iframe"
          title="Amani Jubilee Hills Location Map"
          loading="lazy"
        />

        {/* Floating Photo Landmark Pins in Right Map Area */}
        {landmarkPins.map((pin, idx) => (
          <div
            key={idx}
            className="visit-map-pin-thumb hidden lg:block"
            style={{ top: pin.top, left: pin.left }}
            title={pin.alt}
          >
            <img src={pin.image} alt={pin.alt} loading="lazy" />
          </div>
        ))}

        {/* Primary Hotel Location Badge Pin & Interactive Hover Popover Card */}
        <div className="visit-map-pin-container hidden lg:block" style={{ top: '48%', left: '66%' }}>
          {/* Hover Preview Card showing Restaurant Location & Photography */}
          <a
            href={RESTAURANT_CONFIG.contact.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-map-popover"
            title="Open directions in Google Maps"
          >
            <div className="visit-popover-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop"
                alt="Amani Dining Atmosphere"
                className="visit-popover-image"
                loading="lazy"
              />
              <span className="visit-popover-tag">JUBILEE HILLS</span>
            </div>
            <div className="visit-popover-body">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="visit-popover-title">{RESTAURANT_CONFIG.name} — {RESTAURANT_CONFIG.subName}</h4>
                <span className="visit-popover-rating">★ {RESTAURANT_CONFIG.googleRating}</span>
              </div>
              <p className="visit-popover-address">{RESTAURANT_CONFIG.address.formatted}</p>
              <div className="visit-popover-footer">
                <span className="visit-popover-status">● Open Now · 11 PM</span>
                <span className="visit-popover-link">Get Directions ↗</span>
              </div>
            </div>
            <div className="visit-popover-arrow" />
          </a>

          {/* Location Badge Pin Trigger */}
          <a
            href={RESTAURANT_CONFIG.contact.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-map-primary-badge"
            title="Hover to preview Amani location & photography"
          >
            <div className="visit-map-badge-pill">
              <img
                src="/media/images/amani-loader-symbol.svg"
                alt="Amani Chakra Logo"
                className="visit-map-chakra-icon"
              />
              <span>Amani · Jubilee Hills ★ {RESTAURANT_CONFIG.googleRating}</span>
            </div>
            <div className="visit-map-badge-pointer" />
          </a>
        </div>
      </div>

      {/* Left-Aligned Floating Container Card Over Map */}
      <div className="visit-floating-card-wrapper">
        <Reveal direction="right" className="visit-floating-card">
          {/* Brand & Restaurant Highlight Header */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="visit-eyebrow">{VISIT_PREVIEW_CONTENT.label}</span>
            <span className="visit-rating-badge">
              <span className="visit-star">★</span> {RESTAURANT_CONFIG.googleRating} · Jubilee Hills
            </span>
          </div>

          {/* Headline & Description */}
          <h2 className="visit-heading">{VISIT_PREVIEW_CONTENT.heading}</h2>
          <p className="visit-description">{VISIT_PREVIEW_CONTENT.description}</p>

          {/* Compact Live Status Row */}
          <div className="visit-status-row">
            <span
              className={`visit-status-dot ${
                status.isOpen ? 'visit-status-dot--open' : 'visit-status-dot--closed'
              }`}
              aria-hidden="true"
            />
            <span>{openStatusText}</span>
          </div>

          {/* Address, Parking & Phone Info Grid */}
          <div className="visit-contact-grid">
            <div>
              <span className="visit-label">ADDRESS /</span>
              <p className="visit-value">
                {RESTAURANT_CONFIG.address.street}, {RESTAURANT_CONFIG.address.area}<br />
                {RESTAURANT_CONFIG.address.city}, {RESTAURANT_CONFIG.address.state} {RESTAURANT_CONFIG.address.postalCode}
              </p>
            </div>
            <div>
              <span className="visit-label">PARKING /</span>
              <p className="visit-value">
                Valet Parking<br />
                <span className="visit-subvalue">Dedicated On-Site Valet</span>
              </p>
            </div>
            <div>
              <span className="visit-label">CALL /</span>
              <p className="visit-value">
                <a
                  href={`tel:${RESTAURANT_CONFIG.contact.phoneRaw}`}
                  aria-label={`Call Amani at ${RESTAURANT_CONFIG.contact.phone}`}
                >
                  {RESTAURANT_CONFIG.contact.phone}
                </a>
              </p>
            </div>
          </div>

          {/* High-Visibility Primary Editorial CTA Button */}
          <div className="pt-1">
            <a
              href={RESTAURANT_CONFIG.contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-cta-btn"
            >
              <span>GET DIRECTIONS</span>
              <span className="visit-cta-btn__line" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}




