import { Reveal } from '../../components/motion/Reveal';
import { RESTAURANT_CONFIG } from '../../config/restaurant';

const details = [
  { label: 'Parking', value: 'Valet on weekends; self and street parking available along Road No. 36.' },
  { label: 'Accessibility', value: 'Step-free, ground-floor entrance with wheelchair-accessible seating and restrooms.' },
  { label: 'Seating', value: 'Indoor and covered outdoor tables, plus a private dining area for gatherings.' },
  { label: 'Dress Code', value: 'Smart casual — come comfortable, come as you are.' },
];

export function RestaurantInformation() {
  const todayIndex = new Date().getDay();

  return (
    <section id="info" className="vst-info" aria-labelledby="vst-info-title">
      <div className="vst-container">
        <Reveal className="vst-head">
          <p className="vst-eyebrow">Restaurant information / 03</p>
          <h2 id="vst-info-title">Good to <em>know.</em></h2>
        </Reveal>

        <div className="vst-info__list">
          <Reveal>
            <div className="vst-info__row">
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
            </div>
          </Reveal>

          {details.map((detail) => (
            <Reveal key={detail.label}>
              <div className="vst-info__row">
                <span className="vst-info__label">{detail.label}</span>
                <div className="vst-info__value"><p>{detail.value}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
