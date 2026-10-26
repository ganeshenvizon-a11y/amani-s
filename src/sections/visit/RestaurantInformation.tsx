import type { ReactNode } from 'react';
import { Reveal } from '../../components/motion/Reveal';
import { RESTAURANT_CONFIG } from '../../config/restaurant';

const details: { label: string; value: string; icon: ReactNode }[] = [
  {
    label: 'Accessibility',
    value: 'Step-free, ground-floor entrance with wheelchair-accessible seating and restrooms.',
    icon: (
      <>
        <circle cx="12" cy="4" r="2" />
        <path d="M12 6v7h5l1.5 5" />
        <path d="M6.5 13.5a5.5 5.5 0 1 0 8.5 4.5" />
      </>
    ),
  },
  {
    label: 'Seating',
    value: 'Indoor and covered outdoor tables, plus a private dining area for gatherings.',
    icon: (
      <>
        <path d="M7 3v9h10V3" />
        <path d="M5 12h14" />
        <path d="M7 12l-1 9" />
        <path d="M17 12l1 9" />
        <path d="M6.5 16.5h11" />
      </>
    ),
  },
  {
    label: 'Parking',
    value: 'Valet on weekends; self and street parking available along Road No. 36.',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
      </>
    ),
  },
];

export function RestaurantInformation() {
  const todayIndex = new Date().getDay();

  return (
    <section id="info" className="vst-info" aria-labelledby="vst-info-title">
      <div className="vst-container">
        <div className="vst-info__split">
          <Reveal className="vst-info__anchor">
            <h2 id="vst-info-title">Good to <em>know.</em></h2>
          </Reveal>

          <Reveal className="vst-info__hours">
            <span className="vst-info__label">Hours</span>
            <div className="vst-info__value">
              <div className="vst-hours">
                {RESTAURANT_CONFIG.schedule.map((day, index) => (
                  <div key={day.dayName} className={`vst-hours__row${index === todayIndex ? ' vst-hours__row--today' : ''}`}>
                    <span className="vst-hours__day">{day.dayName}{index === todayIndex ? ' · Today' : ''}</span>
                    <span>{day.isClosed ? 'Closed' : day.slots.map((s) => s.label).join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="vst-info__bottom">
            {details.map((detail) => (
              <Reveal key={detail.label} className="vst-info__cell">
                <span className="vst-info__label vst-info__label--icon">
                  <svg className="vst-info__icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    {detail.icon}
                  </svg>
                  {detail.label}
                </span>
                <div className="vst-info__value"><p>{detail.value}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
