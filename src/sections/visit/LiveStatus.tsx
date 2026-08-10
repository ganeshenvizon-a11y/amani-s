import { useEffect, useState } from 'react';
import { Reveal } from '../../components/motion/Reveal';
import { RESTAURANT_CONFIG, getRestaurantStatus, type RestaurantStatusResult } from '../../config/restaurant';

const MAP_EMBED = 'https://www.google.com/maps?q=Amani+Restaurant+Jubilee+Hills+Hyderabad&output=embed';

export function LiveStatus() {
  const [status, setStatus] = useState<RestaurantStatusResult>(() => getRestaurantStatus());

  useEffect(() => {
    // Keep the open/closed badge honest as time passes.
    const id = window.setInterval(() => setStatus(getRestaurantStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const { contact, address } = RESTAURANT_CONFIG;

  return (
    <section id="reserve" className="vst-find" aria-labelledby="vst-find-title">
      <div className="vst-container vst-find__grid">
        <Reveal>
          <p className="vst-eyebrow">Live status / 02</p>
          <h2 id="vst-find-title">Find <em>us.</em></h2>

          <p className={`vst-status ${status.isOpen ? 'vst-status--open' : 'vst-status--closed'}`}>
            <span className="vst-status__dot" aria-hidden="true" />
            <span>{status.statusLabel}</span>
            <span className="vst-status__detail">· {status.isOpen ? `Closes ${status.closingTimeToday}` : status.nextOpeningLabel}</span>
          </p>

          <p className="vst-find__address">{address.formatted}</p>

          <div className="vst-find__actions">
            <a className="vst-button" href={`tel:${contact.phoneRaw}`}>Reserve a table <span aria-hidden="true">→</span></a>
            <a className="vst-button vst-button--outline" href={contact.directionsUrl} target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">→</span></a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="vst-map">
            <iframe
              title={`Map to ${RESTAURANT_CONFIG.name} — ${RESTAURANT_CONFIG.servingArea}`}
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a className="vst-map__open" href={contact.directionsUrl} target="_blank" rel="noopener noreferrer">
              Open in Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
